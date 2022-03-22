import { Schema } from "mongoose";

export interface IProduct {
  name: string;
  quantity?: number;
  unit?: string;
}

export const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: false },
  unit: { type: String, required: false },
});
