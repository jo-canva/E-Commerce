import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import ProductRoutes from "./routes/Products.js";
import UserRouter from "./routes/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello GFG Developers" });
});

app.use("/api/user/", UserRouter);
app.use("/api/products/", ProductRoutes);

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
  .connect(process.env.MODNO_DB, {
    serverSelectionTimeoutMS: 20000, 
  })
  .then(() => console.log("Connected to MONGO DB"))
  .catch((err) => {
    console.error("Failed to connect with mongo");
    console.error(err);
  });

};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();

