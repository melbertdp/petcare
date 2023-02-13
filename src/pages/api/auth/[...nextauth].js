//next auth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    // callbacks: {
    //     async session(session, user) {
    //         session.user.id = user._id;
    //         return session;
    //     }
    // },
    // A database is optional, but required to persist accounts in a database
});