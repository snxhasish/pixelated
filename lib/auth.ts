import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { sendMail } from "@/actions/send-mail";
import generateEmailHTML from "@/lib/email-html";
import * as schema from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                const sent = await sendMail({
                    sendTo: email,
                    subject: "Login to pixelated",
                    html: generateEmailHTML({ url })
                });

                console.log("Magic link: ", sent === true ? "sent" : "failed");
            }
        })
    ]
});