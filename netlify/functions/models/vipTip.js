import mongoose from "mongoose";

/* ================================
   VIP Tip Schema
================================= */
const vipTipSchema = new mongoose.Schema({
  fixture: {
    date: { type: Date, required: true } // Store as Date for proper sorting and display
  },
  teams: {
    home: { type: String, required: true },
    away: { type: String, required: true }
  },
  league: {
    name: { type: String, required: true }
  },
  vipPicks: [
    {
      label: { type: String, required: true },
      pct: { type: Number, required: true },
      risk: {
        type: String,
        required: true,
        enum: ["safe", "medium", "high"] // restrict to valid risk levels
      }
    }
  ],
  confidence: { type: Number, required: true },
  stake: {
    type: String,
    required: true,
    enum: ["LOW", "MEDIUM", "HIGH"] // restrict to valid stake levels
  },
  isLatest: {
    type: Boolean,
    default: true, // Marks the tip as the currently active one for tipsters
    index: true // Optional: index for faster queries on tipster page
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

/* ================================
   Model Export
================================= */
export default mongoose.model("VipTip", vipTipSchema);
