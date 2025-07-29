import express from "express";
import Favourites from "../models/favModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { email, productId } = req.body;

  try {
    let fav = await Favourites.findOne({ userEmail: email });

    if (!fav) {
      fav = new Favourites({
        userEmail: email,
        items: [{ productId }],
      });
      await fav.save();
      res.status(200).json({ success: "Succesfully added to favourites" });
    } else {
      const exists = fav.items.some(
        (item) => item.productId.toString() === productId
      );
      if (exists) {
        return res.status(200).json({ error: "Already exists" });
      }
      console.log(fav.items);
      fav.items.push({ productId });
      await fav.save();
      res.status(200).json({ success: "Succesfully added to favourites" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/get/:email", async (req, res) => {
  const { email } = req.params;
  try {
    let data = await Favourites.findOne({ userEmail: email }).populate(
      "items.productId"
    );
    if (!data || data.length === 0) return res.status(100).json([]);
    res.json(data);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/delete", async (req, res) => {
  const { email, productId } = req.body;

  try {
    if (!email || !productId) {
      return res.status(400).json({ error: "Missing email or productId" });
    }
    const fav = await Favourites.findOne({ userEmail: email });
    if (!fav) return res.status(400).json({ error: "no favourites" });

    fav.items = fav.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await fav.save();
    res.status(200).json({ success: "Succesfully deleted from  favourites" });
  } catch (err) {
    console.log(err.message);
  }
});
export default router;
