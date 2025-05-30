import { verifyAccessToken } from './../utils/token';
import { Request, Response } from "express"
import { generateAccessToken } from "../utils/token";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { User } from './../models/User';
import bycrypt from "bcryptjs";
import { Hash } from 'crypto';

export const loginMethod = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Buscar usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Comparar contraseña
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Crear token
        const userId = user._id.toString();
        const accessToken = generateAccessToken(userId);

        // Guardar token en caché
        cache.set(userId, accessToken, 60 * 15);

        return res.json({ accessToken });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};


// T O K E N   M E T H O D S
export const getTimeToken = (req: Request, res: Response) => {
    const { userId } = req.params;

    const ttl = cache.getTtl(userId);  //Tiempo de vida del token
    if (!ttl) {
        return res.status(404).json({
            message: "Token no encontrado o no existe"
        });
    }

    const now = Date.now();
    const timeToLife = Math.floor((ttl-now)/1000);
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({ timeToLife, expTime });
}


export const updateToken =(req: Request, res: Response) => {
    const { userId } = req.params;

    const ttl = cache.getTtl(userId);  //Tiempo de vida del token
    if (!ttl) {
        return res.status(404).json({
            message: "Token no encontrado o no existe"
        });
    }

    const newTimeToken: number = 60 * 15;
    cache.ttl(userId, newTimeToken);  //Actualizar el tiempo de vida del token

    res.json({ message: "Token Updated"});
}

export const decodeToken = (req: Request, res: Response) => {
    const decodedToken = verifyAccessToken(req.body.token);
    
    if (!decodedToken) {
        return res.status(401).json({
            message: "Token no válido"
        });
    }

}

export const saveUser = async (req: Request, res: Response) => {
    const {firstName, lastName, username, email, password, rol } = req.body

    // Cifrado de la contraseña
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        username,
        rol,
        password: hashedPassword,
        email
    });

    const user = await newUser.save();

    return res.json({ user })
}

