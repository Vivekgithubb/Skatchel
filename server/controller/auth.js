import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "vivekisthemessiah";

const register = async (req, res) => {
  const { name, email, password, age, city } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      age,
      city,
    });
    console.log(newUser);
    res.json("Created User Succesfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User) return res.status(400).json({ error: "Invalid Credentials" });

    const matched = await bcrypt.compare(password, User.password);
    if (!matched) return res.status(400).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ email: User.email }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return res.json({
      message: "Login successful",
      user: { email: User.email, name: User.name },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

const password = async (req, res) => {
  const { email, oldPass, newPass } = req.body;

  if (!email || !oldPass || !newPass)
    return res.status(404).json({ error: "Something is missing" });

  try {
    let changed = await user.findOne({ email: email });
    if (!changed) return res.status(404).json({ error: "No such User" });

    const isMatch = await bcrypt.compare(oldPass, changed.password);

    if (!isMatch)
      return res.status(401).json({ error: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPass, 10);

    changed.password = hashedPassword;
    await changed.save();
    res.json({ success: "Changed succesfuly" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server gone man" });
  }
};

export { register, login, logout, password };
