import express from "express";
import Client from "../models/Client.js";
import { upload, processImage } from "../middleware/upload.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public: get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: create client
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  processImage("clients"),
  async (req, res) => {
    try {
      const { name, designation, description, imageUrl } = req.body;
      const client = await Client.create({
        name,
        designation,
        description,
        imageUrl
      });
      res.status(201).json(client);
    } catch {
      res.status(400).json({ message: "Could not create client" });
    }
  }
);
// Admin: delete client
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete client" });
  }
});
// PUT update client
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  processImage("clients"),
  async (req, res) => {
    try {
      const { name, designation, description, imageUrl } = req.body;

      const updateData = {
        name,
        designation,
        description
      };

      // Only update imageUrl if a new image was uploaded
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      const updated = await Client.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Could not update client" });
    }
  }
);


export default router;
