import { Schema, model } from "mongoose";
import { CATALOG_REF, PRODUCT_REF } from "./refs";

interface ICatalog {
  name: string;
}

const catalogSchema = new Schema<ICatalog>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

catalogSchema.virtual('products', {
  ref: PRODUCT_REF,
  localField: '_id',
  foreignField: 'catalog'
})

export const Catalog = model<ICatalog>(CATALOG_REF, catalogSchema);
