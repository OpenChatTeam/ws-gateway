require("dotenv").config();

import http from "http";
import { createClient } from "redis";
import { Server } from "socket.io";
import { registerMsgCreateHandler } from "./redis/msg_create";

const port = (process.env.WS_PORT as any as number) || 7000;

const httpServer = http.createServer();
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const redisClient = createClient();
export const redisSub = redisClient.duplicate();

(async () => {
  await redisSub.connect();
  registerMsgCreateHandler(redisSub as any, io);
  console.log("Connected to Redis");
  httpServer.listen(port, () => console.log(`Server running on port ${port}`));
})();
