import express from "express";
import { register, login, logout, password } from "../controller/auth.js";
import verifyUser from "../middleware/isLoggedin.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/password", password);

router.get("/verify", verifyUser, (req, res) => {
  res.json({ message: "Authenticated" });
});
// Example of a protected route using email from JWT
router.get("/profile", verifyUser, (req, res) => {
  res.json({ message: `Welcome ${req.email}, you're authenticated!` });
});

export default router;
