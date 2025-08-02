import express from "express";
import { sendMailer } from "../middleware/emailer.js";
import Cart from "../models/cartModel.js";
const router = express.Router();

router.post("/confirm", async (req, res) => {
  console.log("📩 placeOrder route loaded");

  try {
    const { email, name, total, cart } = req.body;
    console.log("received confirmation sending mail now");
    await sendMailer(name, total, cart, email);
    await Cart.findOneAndDelete({ userEmail: email });
    res.json({ success: "Mail sent successfully" });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ error: "Email failed" });
  }
});
export default router;
