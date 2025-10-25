import bodyParser from "body-parser"; // Body Parser ගේනවා, එන දත්ත ගන්න
import dotenv from "dotenv"; // Dotenv ගේනවා, environment variables ගන්න
import express from "express"; // Express ගේනවා, වෙබ් server හදන්න
import jwt from "jsonwebtoken"; // JWT ගේනවා, ටෝකන් verify කරන්න
import mongoose from "mongoose"; // Mongoose ගේනවා, MongoDB එක්ක වැඩ කරන්න

import cors from "cors"; // CORS ගේනවා, cross-origin requests වලට

import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js"; // Product routes ගේනවා
import userRouter from "./routes/userRouter.js"; // User routes ගේනවා

dotenv.config(); // Environment variables ලෝඩ් කරනවා

const app = express(); // Express app හදනවා

app.use(cors()); // CORS middleware එක යොදනවා

app.use(bodyParser.json()); // JSON දත්ත ගන්න bodyParser යොදනවා

const mongoUrl = process.env.MONGO_DB_URI; // MongoDB URL එක ගන්නවා

mongoose.connect(mongoUrl, {}); // MongoDB එක්ක connect වෙනවා

const connection = mongoose.connection; // DB connection එක ගබඩා කරනවා

connection.once("open", () => {
  console.log("Database Connected"); // DB connect උනාම print කරනවා
});

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // ටෝකන් ගන්නවා
  console.log("Token:", token);

  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (!error) {
        console.log("Decoded Token:", decoded); // ටෝකන් decode කරනවා
        req.user = decoded; // User තොරතුරු request එකට දානවා
      } else {
        console.log("Token verify error:", error.message); // එරර් print කරනවා
      }
      next(); // ඊළඟ middleware එකට යනවා
    });
  } else {
    next(); // ටෝකන් නැත්නම් ඊළඟට යනවා
  }
});

app.use("/api/users", userRouter); // User routes යොදනවා
app.use("/api/orders", orderRouter); // Order routes යොදනවා
app.use("/api/products", productRouter); // Product routes යොදනවා


app.listen(5000, () => {
  console.log("server is running on port 5000"); // Server 5000 port එකේ යනවා
});