import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "@/lib/mongodb";

const client = await clientPromise;

export const auth = betterAuth({
    database: mongodbAdapter(client.db("bazar-dor"), {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },
});