import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./router/productRouters";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/products", productRouter);

app.get("/", (req, res) =>
  res.json({ message: "Pesan dari backend, terimakasih" })
);

app.listen(8003, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:8003`);
});
