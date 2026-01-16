import connectDB from "./_db.js";
import VipUser from "./models/vipUser.js";
import VipTip from "./models/vipTip.js";

export async function handler(event) {
  try {
    const userId = event.queryStringParameters?.userId;

    if (!userId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing userId" }),
      };
    }

    await connectDB();

    /* ---------- CHECK VIP ---------- */
    const vip = await VipUser.findOne({ userId });

    if (!vip || !vip.expire || new Date(vip.expire) <= new Date()) {
      return {
        statusCode: 403,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "VIP required" }),
      };
    }

    /* ---------- FETCH LATEST TIPS ---------- */
    const tips = await VipTip.find({ isLatest: true })
      .sort({ createdAt: -1 })
      .lean();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ tips }),
    };

  } catch (err) {
    console.error("VIP TIPS ERROR:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Server error" }),
    };
  }
}
