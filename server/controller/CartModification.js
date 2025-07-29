import Cart from "../models/cartModel.js";

const Modify = async (req, res) => {
  const { userEmail, productId, price } = req.body;
  console.log("Received data:", req.body);
  try {
    if (!userEmail || !productId || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({
        userEmail,
        items: [{ productId, quantity: 1, price }],
      });
    } else {
      //product already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1, price });
      }
    }
    await cart.save();
    res.status(200).json({ message: "Item added Succesfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: "Unable to Modify cart" });
  }
};
const Remove = async (req, res) => {
  const { userEmail, productId, price } = req.body;
  console.log("Received data:", req.body);
  try {
    if (!userEmail || !productId || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let cart = await Cart.findOne({ userEmail });

    if (!cart) return res.status(404).json({ error: "cart not fount" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1)
        cart.items[itemIndex].quantity -= 1;
      else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(404).json({ error: "Item not in cart " });
    }

    await cart.save();
    res.status(200).json({ message: "Item remmoved Succesfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: "Unable to Modify cart" });
  }
};

export { Modify, Remove };
