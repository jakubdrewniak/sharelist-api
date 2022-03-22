import { Schema, model } from "mongoose";
import { CATALOG_REF, PRODUCT_REF } from "./refs";

interface IProduct {
  name: string;
  catalog: Schema.Types.ObjectId;
  quantity?: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  catalog: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: CATALOG_REF
  },
  quantity: { type: Number, required: false },
});

export const Product = model<IProduct>(PRODUCT_REF, productSchema);
