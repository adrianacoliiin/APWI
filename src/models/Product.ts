import { Document, Schema, Types, model } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: string;
    createDate: Date;
    deleteDate: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    deleteDate: {
        type: Date,
        default: null,
    }
});

export const Product = model<IProduct>('Product', productSchema);