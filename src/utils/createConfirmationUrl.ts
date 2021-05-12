import { v4 } from "uuid";
import { confirmUserPrefix } from "../constants/redisPrefixes";
import { redis } from "../redis";

export const createConfirmationEmail = async (userId: string) => {
    const token = v4();

    await redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

    return `http://localhost:3000/user/confirm/${token}`;
};
