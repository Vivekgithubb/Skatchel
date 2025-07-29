import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["shirt", "pant", "bag"], // restricts to only these 3 types
    required: true,
  },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  stock: { type: Number, default: 0 },

  // Updated and structured description
  description: {
    short: { type: String }, // for quick preview cards or lists
    long: { type: String }, // detailed product overview
    features: [{ type: String }], // bullet-point features
    specifications: {
      material: { type: String },
      color: { type: String },
      size: { type: String },
      weight: { type: String },
      care: { type: String }, // washing/maintenance instructions
    },
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
