import connectDB from "./_db.js";
import VipUser from "./models/vipUser.js";

export async function handler(event) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers,
      };
    }

    const userId = event.queryStringParameters?.userId;
    if (!userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing userId" }),
      };
    }

    await connectDB();

    const vip = await VipUser.findOne({ userId }).lean();

    if (!vip || !vip.expire) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ active: false, daysLeft: 0 }),
      };
    }

    const expireDate = new Date(vip.expire);
    const now = new Date();

    if (expireDate <= now) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ active: false, daysLeft: 0 }),
      };
    }

    const daysLeft = Math.ceil((expireDate - now) / 86400000);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        active: true,
        daysLeft,
        expire: expireDate.toISOString(),
      }),
    };
  } catch (err) {
    console.error("VIP STATUS ERROR:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ active: false }),
    };
  }
}
