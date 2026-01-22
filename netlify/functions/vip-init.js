import axios from "axios";

/* ==========================
   VIP PAYMENT INIT (NETLIFY)
========================== */
export async function handler(event) {
  /* ---------- CORS PREFLIGHT ---------- */
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    };
  }

  /* ---------- METHOD LOCK ---------- */
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  /* ---------- PARSE BODY ---------- */
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const { userId, email } = body;

  if (!userId || !email) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing userId or email" }),
    };
  }

  /* ---------- EMAIL VALIDATION ---------- */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid email address" }),
    };
  }

  try {
    const res = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Number(process.env.VIP_PRICE_GHS || 100) * 100,
        currency: "GHS",

        // ✅ NETLIFY CALLBACK (IMPORTANT)
        callback_url: `${process.env.SITE_URL}/.netlify/functions/vip-verify`,

        metadata: { userId },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        authorization_url: res.data.data.authorization_url,
      }),
    };
  } catch (err) {
    console.error(
      "PAYSTACK INIT ERROR:",
      err.response?.data || err.message
    );

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Payment initialization failed" }),
    };
  }
}
