import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["shirt", "pant", "bag"], // restricts to only these 3 types
    required: true,
  },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  stock: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
