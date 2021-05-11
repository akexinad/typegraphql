import { redis } from "../redis";
import { v4 } from "uuid";

export const createConfirmationEmail = async (userId: string) => {
    const id = v4();

    await redis.set(id, userId, "ex", 60 * 60 * 24); // 1 day expiration

    return `http://localhost:3000/user/confirm/${id}`;
};
