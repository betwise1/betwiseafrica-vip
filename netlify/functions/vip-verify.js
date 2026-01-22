import axios from "axios";
import connectDB from "./_db.js";
import VipUser from "./models/vipUser.js";

/* ==========================
   VIP EXPIRY HELPER
========================== */
function getVipExpiry(existing, days = 30) {
  const base =
    existing && new Date(existing) > new Date()
      ? new Date(existing)
      : new Date();

  base.setDate(base.getDate() + days);
  base.setHours(23, 59, 59, 999);
  return base;
}

/* ==========================
   PAYSTACK VERIFY (NETLIFY)
========================== */
export async function handler(event) {
  // 🔒 METHOD LOCK
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: "Method Not Allowed",
    };
  }

  const ref = event.queryStringParameters?.reference;
  if (!ref) {
    return {
      statusCode: 302,
      headers: { Location: "/payment-failed.html" },
    };
  }

  try {
    const verify = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      }
    );

    const data = verify.data?.data;
    if (!data || data.status !== "success") {
      return {
        statusCode: 302,
        headers: { Location: "/payment-failed.html" },
      };
    }

    await connectDB();

    const userId = data.metadata?.userId;
    if (!userId) {
      return {
        statusCode: 302,
        headers: { Location: "/payment-failed.html" },
      };
    }

    const vip = await VipUser.findOne({ userId });

    // 🔁 Prevent double credit
    if (vip?.lastPaymentRef === ref) {
      return {
        statusCode: 302,
        headers: { Location: "/vip.html" },
      };
    }

    const expiry = getVipExpiry(vip?.expire);

    await VipUser.findOneAndUpdate(
      { userId },
      {
        expire: expiry,
        lastPaymentRef: ref,
        activatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return {
      statusCode: 302,
      headers: { Location: "/vip.html" },
    };

  } catch (err) {
    console.error(
      "PAYSTACK VERIFY ERROR:",
      err.response?.data || err.message
    );

    return {
      statusCode: 302,
      headers: { Location: "/payment-failed.html" },
    };
  }
}
