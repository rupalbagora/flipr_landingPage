import express from "express";
import Subscriber from "../models/Subscriber.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public: subscribe
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(200).json(existing);

    const subscriber = await Subscriber.create({ email });
    res.status(201).json(subscriber);
  } catch {
    res.status(400).json({ message: "Could not subscribe" });
  }
});

// Admin: view all
router.get("/", authMiddleware, async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});
// Admin: delete subscriber
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete subscriber" });
  }
});


export default router;
