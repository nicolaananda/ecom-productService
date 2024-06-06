import { Schema, model } from "mongoose";

const productSchema = new Schema({
  seller_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [String],
  images: [String],
  created_at: { type: Date, default: Date.now },
});

export const Product = model("Product", productSchema);
