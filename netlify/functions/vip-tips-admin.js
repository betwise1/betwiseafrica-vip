import mongoose from "mongoose";
import VipTip from "./models/vipTip.js";

/* ==========================
   DB CONNECTION (CACHED)
========================== */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* ==========================
   ADMIN VIP TIPS HANDLER
========================== */
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  /* ---------- AUTH ---------- */
  const adminKey =
    event.headers["x-admin-key"] ||
    event.headers["X-Admin-Key"];

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return {
      statusCode: 403,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  /* ---------- PARSE BODY ---------- */
  let tips;
  try {
    tips = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  if (!Array.isArray(tips) || tips.length === 0) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid tips format" }),
    };
  }

  try {
    await connectDB();

    /* ---------- DEACTIVATE OLD TIPS ---------- */
    await VipTip.updateMany({}, { $set: { isLatest: false } });

    /* ---------- INSERT NEW TIPS ---------- */
    const saved = await VipTip.insertMany(
      tips.map(tip => ({
        ...tip,
        isLatest: true,
        createdAt: new Date(),
      }))
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "ok",
        count: saved.length,
      }),
    };
  } catch (err) {
    console.error("VIP ADMIN ERROR:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to save tips" }),
    };
  }
}
