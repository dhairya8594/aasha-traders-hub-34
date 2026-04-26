require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ================= CORS ================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* ================= INQUIRY SCHEMA ================= */
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

/* ================= QUOTE SCHEMA ================= */
const quoteSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    notes: String
  },
  items: [
    {
      key: String,
      productId: String,
      name: String,
      size: String,
      quantity: Number
    }
  ],
  status: {
    type: String,
    default: "New"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Quote = mongoose.model("Quote", quoteSchema, "chemovr_quotes");

/* ================= ROUTES ================= */

// ✅ POST CHAT
app.post("/api/chat", async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const { name, email, phone, address, service, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    let reply = "Thank you! We will contact you.";

    if (message.toLowerCase().includes("price")) {
      reply = "Please contact us for pricing.";
    }

    if (message.toLowerCase().includes("product")) {
      reply = "We offer cleaning and bio products.";
    }

    const saved = await Inquiry.create({
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
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST QUOTE REQUEST
app.post("/api/quotes", async (req, res) => {
  try {
    console.log("📥 Quote Data:", req.body);

    const { customer, items } = req.body;

    if (!customer?.name || !customer?.email) {
      return res.status(400).json({
        success: false,
        error: "Name and email required"
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No products selected"
      });
    }

    const savedQuote = await Quote.create({
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        notes: customer.notes || ""
      },
      items
    });

    console.log("💾 Quote saved:", savedQuote);

    res.status(201).json({
      success: true,
      message: "Quote request saved successfully",
      quoteId: savedQuote._id
    });

  } catch (error) {
    console.error("❌ Quote Error:", error);
    res.status(500).json({
      success: false,
      error: "Quote server error"
    });
  }
});

// ✅ GET ALL INQUIRIES
app.get("/api/inquiries", async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ✅ GET ALL QUOTES
app.get("/api/quotes", async (req, res) => {
  try {
    const data = await Quote.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

// ✅ ROOT CHECK
app.get("/", (req, res) => {
  res.send("🚀 Aasha Traders API Running");
});

/* ================= DATABASE + SERVER ================= */

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
  });