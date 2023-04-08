import { RedisClientType } from "redis";
import { Server } from "socket.io";

export const registerMsgCreateHandler = (
  redisSub: RedisClientType,
  io: Server
) => {
  redisSub.subscribe("MESSAGE_CREATE", (msg) => {
    console.log(msg);
    // io.emit("MESSAGE_CREATE", `new message: ${msg}`);
  });
};
