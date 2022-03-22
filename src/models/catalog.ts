import { Schema, model } from "mongoose";
import { IProduct, productSchema } from "./product";
import { CATALOG_REF } from "./refs";

interface ICatalog {
  name: string;
  products: IProduct[];
}

const catalogSchema = new Schema<ICatalog>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    products: [productSchema],
  },
  { timestamps: true }
);

export const Catalog = model<ICatalog>(CATALOG_REF, catalogSchema);
