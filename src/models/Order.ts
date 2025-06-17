import { Document, Schema, model, Types } from 'mongoose';

export interface IOrderProduct {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    _id: Types.ObjectId;
    userId: Schema.Types.ObjectId;
    total: number;
    subtotal: number;
    status: string;
    createDate: Date;
    updateDate?: Date;
    products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
}, { _id: false });

const orderSchema = new Schema<IOrder>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
    products: {
        type: [orderProductSchema],
        required: true,
    },
});

export const Order = model<IOrder>('Order', orderSchema);