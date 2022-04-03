import { Schema, model, Types, Document } from "mongoose";
import { IProduct, productSchema } from "./product";
import { CATALOG_REF, USER_REF } from "./refs";

export interface ICatalog {
  name: string;
  products: IProduct[];
  creator: Types.ObjectId;
}

export interface ICatalogDocument extends ICatalog, Document {}

const catalogSchema = new Schema<ICatalogDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    products: [productSchema],
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER_REF,
    },
  },
  { timestamps: true }
);

catalogSchema.methods.toJSON = function () {
  const catalog = this as ICatalogDocument;
  const { _id, name, products, creator } = catalog.toObject();

  return { _id, name, products };
};

const Catalog = model<ICatalogDocument>(CATALOG_REF, catalogSchema);
export default Catalog;
