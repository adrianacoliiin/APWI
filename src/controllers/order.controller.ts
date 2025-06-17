import { Order, IOrderProduct } from "../models/Order";
import { Request, Response } from "express";    

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find()
            .sort({ createDate: -1 })
            .populate('userId', 'name email') // Asumiendo que tienes un modelo de usuario
            .select("-__v -deleteDate");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las órdenes", error });
    }
}


export const createOrder = async (req: Request, res: Response) => {
    const { userId, products }: { userId: string, products: IOrderProduct[] } = req.body;

    try {
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "La orden debe contener al menos un producto." });
        }

        const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const total = subtotal; // Puedes incluir lógica adicional para impuestos, envíos, etc.

        const newOrder = new Order({
            userId,
            products,
            subtotal,
            total,
            status: 'pending'
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden", error });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                status: 'completed',
                updateDate: new Date()
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la orden", error });
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                status: 'cancelled',
                updateDate: new Date()
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json({ message: "Orden cancelada exitosamente", order });
    } catch (error) {
        res.status(500).json({ message: "Error al cancelar la orden", error });
    }
}