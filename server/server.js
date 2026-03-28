require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* CORS */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* SCHEMA */
const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  service: String,
  message: String,
  reply: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

/* ROUTES */

// CHAT API
app.post("/api/chat", async (req, res) => {
  try {
    console.log("Incoming Data:" , req.body);
    const { name, email, phone, address, service, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    let reply = "Thank you! We will contact you.";

    if (message.toLowerCase().includes("price"))
      reply = "Please contact us for pricing.";

    if (message.toLowerCase().includes("product"))
      reply = "We offer cleaning and bio products.";

    await Inquiry.create({
      name,
      email,
      phone,
      address,
      service,
      message,
      reply
    });
    console.log("💾 Saved to DB:", saved);
    res.json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL INQUIRIES
app.get("/api/inquiries", async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json(data);
});

// ROOT
app.get("/", (req, res) => {
  res.send("API Running");
});

/* DB + SERVER */
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch(err => console.log(err));