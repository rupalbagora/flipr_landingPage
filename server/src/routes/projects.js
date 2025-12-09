import express from "express";
import Project from "../models/Project.js";
import { upload, processImage } from "../middleware/upload.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public: get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: create project
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  processImage("projects"),
  async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
      const project = await Project.create({ name, description, imageUrl });
      res.status(201).json(project);
    } catch (err) {
      res.status(400).json({ message: "Could not create project" });
    }
  }
);
// Admin: delete project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete project" });
  }
});
// UPDATE PROJECT
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  processImage("projects"),
  async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;

      const updateData = { name, description };

      // Only update image if a new file was uploaded
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      const updated = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Could not update project" });
    }
  }
);


export default router;
