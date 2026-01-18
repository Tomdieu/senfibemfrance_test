import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // Credentials({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         // Add your authentication logic here
        //         return { id: 1, name: "John Doe" }
        //     },
        // }),
    ],
})