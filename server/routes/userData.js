import express from "express";
import user from "../models/userModel.js";

const router = express.Router();

router.get("/getinfo", async (req, res) => {
  const { email } = req.query;

  try {
    const User = await user.findOne({ email: email });
    if (!user) return res.status(404).json({ error: "User Not Found" });

    res.json(User);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ error: "some error" });
  }
});

router.post("/update", async (req, res) => {
  const { email, newData } = req.body;

  try {
    if (!newData | !email)
      return res.status(404).json({ error: "no new data given or email" });
    let User = await user.findOneAndUpdate(
      { email: email }, // ✅ Find by email
      { $set: newData }, // ✅ Update the provided fields
      { new: true } // ✅ Return updated document
    );

    res.json(User);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "internal server" });
  }
});

export default router;
