import clientPromise from "./mongodb";

const DB_NAME = "papanketik";

export const logger = {
  info: async (message: any) => log("info", message),
  warn: async (message: any) => log("warn", message),
  error: async (message: any) => log("error", message),
};

async function log(level: "info" | "warn" | "error", message: any) {
  const timestamp = new Date();
  let msg;

  try {
    if (message && typeof message === "object") {
      if (message.method && message.url) {
        msg = `[Request] ${message.method} ${message.url}`;
      } else {
        msg = JSON.stringify(message, getCircularReplacer());
      }
    } else {
      msg = String(message);
    }
  } catch {
    msg = String(message);
  }

  if (console[level]) {
    console[level](msg);
  } else {
    console.log(msg);
  }

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection("logs").insertOne({ level, message: msg, timestamp });
  } catch (err) {
    console.error("Failed logging to MongoDB:", err);
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  };
}
