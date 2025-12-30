// pages/api/products.js
import { logger } from "../../lib/logger";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await logger.info("Fetching products...");
    const client = await clientPromise;
    const products = await client.db("mydb").collection("products").find().toArray();
    await logger.info(`Fetched ${products.length} products`);
    res.status(200).json(products);
  } catch (err) {
    await logger.error(`Error fetching products: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
