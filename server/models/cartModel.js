import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // To link with user
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
