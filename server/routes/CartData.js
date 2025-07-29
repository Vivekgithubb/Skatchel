import express from "express";
import { Modify, Remove } from "../controller/CartModification.js";
import Cart from "../models/cartModel.js";

const router = express.Router();

router.post("/add", Modify);
router.post("/remove", Remove);

router.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const data = await Cart.find({ userEmail: email }).populate(
      "items.productId"
    ); // can use directly because be gave productId as ref:product in schema

    res.json(data);
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
