import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const { type } = req.query;
    const filtered = type ? products.filter((e) => e.type === type) : products;
    res.json(filtered);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});
export default router;
