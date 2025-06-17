import { Rol } from './../models/Rol';
import { Request, Response } from "express";    

export const createRol = async (req: Request, res: Response) => {
    const { name, type } = req.body;

    try {
        const newRol = new Rol({
            name,
            type,
        });

        const rol = await newRol.save();
        res.status(201).json(rol); 
    } catch (error) {
        res.status(500).json({ message: "Error al crear el rol", error });
    }
}