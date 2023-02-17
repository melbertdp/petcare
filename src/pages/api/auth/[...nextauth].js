//next auth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
        // ...add more providers here
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_soupUrl,
        secret: process.env.NEXT_PUBLIC_soupSecret,
    }),
    callbacks: {
        async session({ session, user }) {
            const signingSecret = process.env.NEXT_PUBLIC_soupJwt
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