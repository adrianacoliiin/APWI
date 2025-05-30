import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el usuario", error });
    }
};


// export const createUser = async (req: Request, res: Response) => {
//     const { firstName, lastName, username, email, password, rol } = req.body;

//     try {
//         const newUser = new User({
//             firstName,
//             lastName,
//             username,
//             email,
//             password, // Asegúrate de cifrar la contraseña antes de guardarla
//             rol
//         });

//         const user = await newUser.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Error al crear el usuario", error });
//     }
// }

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, username, email, password, rol } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            username,
            email,
            password, // Asegúrate de cifrar la contraseña antes de guardarla
            rol
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndUpdate(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        deletedUser.status = false; // Cambiar el estado del usuario a false
        await deletedUser.save(); // Guardar los cambios en la base de datos
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
};