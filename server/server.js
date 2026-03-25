require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  let reply = "Thank you! We will contact you.";

  if (message.toLowerCase().includes("price"))
    reply = "Please contact us for pricing.";
  if (message.toLowerCase().includes("product"))
    reply = "We offer cleaning and bio products.";

  res.json({ reply });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));