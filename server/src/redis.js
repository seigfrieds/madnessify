//Connects to Cache (which is a Redis data store)

import { Redis } from "ioredis";

const redisClient = new Redis();

export default redisClient;
