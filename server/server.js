import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userLogin from "./routes/userLogin.js";
import getData from "./routes/getData.js";
import cookieParser from "cookie-parser";
import CartData from "./routes/CartData.js";
import userData from "./routes/userData.js";
import Fav from "./routes/Fav.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Your frontend's URL
    credentials: true, // ✅ Allow cookies
  })
);

mongoose
  .connect("mongodb://localhost:27017/skatchel")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err.message));

app.use("/api/auth", userLogin);
app.use("/api/user", userData);
app.use("/api/products", getData);
app.use("/api/cart", CartData);
app.use("/api/fav", Fav);

app.listen(5000, () => {
  console.log(`Server running`);
});
