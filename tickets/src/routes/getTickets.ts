import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { redisClient } from "../redis-client";

console.log("getTickets route file loaded");

const router = express.Router();

router.get("/api/ticket", async (req: Request, res: Response) => {
  console.log("🚀 handler reached");

  const cacheKey = "tickets:all";

  try {
    let cached;
    try {
      cached = await redisClient.get(cacheKey);
      console.log("✅ redis GET done, cached value:", cached);
    } catch (redisErr) {
      console.error("❌ Redis GET error:", redisErr instanceof Error ? redisErr.message : redisErr);
      console.error("Full redis error:", redisErr);
      throw redisErr;
    }

    if (cached) {
      console.log("⚡ Cache HIT:", cacheKey);
      return res.send(JSON.parse(cached));
    }

    console.log("❌ Cache MISS:", cacheKey);

    const tickets = await Ticket.find({});
    console.log("✅ mongo find done");

    console.log("➡️ about to SET cache");
    await redisClient.set(cacheKey, JSON.stringify(tickets), "EX", 60);
    console.log("✅ cache SET done");

    return res.send(tickets);
  } catch (err) {
    console.error("❌ caching error:", err);
    return res.status(500).send({ error: "cache failed" });
  }
});


export { router as getTicketsRouter };
