import IORedis from "ioredis";

export const redisClient = new IORedis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || 6379),
  db: 0
});

redisClient.on("connect", () => {
  console.log("🟥 Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});