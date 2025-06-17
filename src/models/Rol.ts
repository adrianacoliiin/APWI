import { Document, Schema, Types, model } from 'mongoose';

export interface IRol extends Document {
    name: string;
    type: String;
    status: boolean;
}

const rolSchema = new Schema<IRol>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        default: 'user',
    },
    status: {
        type: Boolean,
        default: true,
    }
});

export const Rol = model<IRol>('Rol', rolSchema);