import express from "express";
import Contact from "../models/Contact.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public: submit contact form
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    const contact = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json(contact);
  } catch {
    res.status(400).json({ message: "Could not save contact" });
  }
});

// Admin: get all contacts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});
// Admin: delete contact
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete contact" });
  }
});

export default router;
