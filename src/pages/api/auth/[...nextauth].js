//next auth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import jwt from "jsonwebtoken"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
    adapter: SupabaseAdapter({
        url: process.env.soupUrl,
        secret: process.env.soupSecret,
    }),
    callbacks: {
        async session({ session, user }) {
            const signingSecret = process.env.soupJwt
            if (signingSecret) {
                const payload = {
                    aud: "authenticated",
                    exp: Math.floor(new Date(session.expires).getTime() / 1000),
                    sub: user.id,
                    email: user.email,
                    role: "authenticated",
                }
                session.supabaseAccessToken = jwt.sign(payload, signingSecret)
            }
            return session
        },
    },
    secret: process.env.JWT_SECRET,
    // callbacks: {
    //     async session(session, user) {
    //         session.user.id = user._id;
    //         return session;
    //     }
    // },
    // A database is optional, but required to persist accounts in a database
});