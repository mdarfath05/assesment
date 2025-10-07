import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Use environment port when deployed

app.use(cors());
app.use(express.json());

// ✅ Root route (optional, for checking Render deployment)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// ✅ POST endpoint
app.post("/submit-date", (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    console.log("📅 Received date:", date);
    return res.json({ message: `Date ${date} received successfully` });
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
