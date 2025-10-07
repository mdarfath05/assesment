import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint
app.post("/submit-date", (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ message: "Date is required" });

  console.log("Received date:", date);
  return res.json({ message: `Date ${date} received successfully` });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
