import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "@/lib/mongodb";

const client = await clientPromise;

const stripTrailingSlash = (origin: string) => origin.trim().replace(/\/+$/, "");


const authBaseURL = process.env.BETTER_AUTH_URL
    ? stripTrailingSlash(process.env.BETTER_AUTH_URL)
    : undefined;


const trustedOrigins = [
    authBaseURL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
        `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") ?? []),
]
    .filter((origin): origin is string => Boolean(origin))
    .map(stripTrailingSlash)
    .filter(Boolean);

export const auth = betterAuth({

    baseURL: authBaseURL,

    trustedOrigins: [...new Set(trustedOrigins)],

    database: mongodbAdapter(client.db("bazar-dor"), {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },

        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },


});
