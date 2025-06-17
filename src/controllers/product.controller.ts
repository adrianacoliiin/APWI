import { Product } from "../models/Product";
import dayjs from "dayjs";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
            .sort({ createDate: -1 })
            .select("-__v -deleteDate");

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
        });

        const product = await newProduct.save();


        res.status(201).json(product);
        return res.json({ product});
        
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                stock,
                updateDate: dayjs().toDate(),
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndUpdate(
            productId,
            { status: false },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto eliminado correctamente", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
}