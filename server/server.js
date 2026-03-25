require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* 🔥 FIXED CORS (IMPORTANT) */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* 🔥 Create Schema */
const inquirySchema = new mongoose.Schema({
  message: String,
  reply: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

// Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let reply = "Thank you! We will contact you.";

    if (message.toLowerCase().includes("price"))
      reply = "Please contact us for pricing.";
    if (message.toLowerCase().includes("product"))
      reply = "We offer cleaning and bio products.";

    // ✅ SAVE TO DATABASE
    await Inquiry.create({ message, reply });

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔥 Admin route
app.get("/api/inquiries", async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));