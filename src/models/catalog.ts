import { Schema, model } from "mongoose";

const catalogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Catalog = model('Catalog', catalogSchema) 
