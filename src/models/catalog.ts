import { Schema, model, Types } from "mongoose";
import { IProduct, productSchema } from "./product";
import { CATALOG_REF, USER_REF } from "./refs";

interface ICatalog {
  name: string;
  products: IProduct[];
  creator: Types.ObjectId;
}

const catalogSchema = new Schema<ICatalog>(
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

const Catalog = model<ICatalog>(CATALOG_REF, catalogSchema);
export default Catalog;
