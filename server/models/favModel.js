import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

const Favourites = mongoose.model("Favourites", favouritesSchema);
export default Favourites;
