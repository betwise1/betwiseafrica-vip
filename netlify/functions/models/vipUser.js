import mongoose from "mongoose";

const vipUserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String },
    lastPaymentRef: { type: String },
    active: { type: Boolean, default: false },
    expire: { type: Date },
    activatedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.VipUser ||
  mongoose.model("VipUser", vipUserSchema);
