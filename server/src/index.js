import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

import projectRoutes from "./routes/projects.js";
import clientRoutes from "./routes/clients.js";
import contactRoutes from "./routes/contacts.js";
import subscriberRoutes from "./routes/subscribers.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
