import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectedDB from "./config/db.js";
import usersRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

await connectedDB();
const app = express();
app.use(
  cors({
    origin: ["e-commerce-app-frontend-orcin.vercel.app"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Root route for the API
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

// Catch-all route for undefined paths
app.use((req, res) => {
  res.status(404).send("API route not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
