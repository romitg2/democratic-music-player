import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 31536000, // 1 year
        updateAge: 43200, // 12 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            // user is only available on sign in
            if (user) {
                console.log("inside this ");
                token.id = user.id;
                token.role = 'user';
                token.name = user.name;
                token.picture = user.image;
            }
            console.log("outside this");
            return token;
        },
        async signIn({ user, account, profile }) {
            if (!user.email) {
                console.log("No email provided");
                return false;
            }
            
            try {
                // Check if user exists
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email }
                });

                if (!existingUser) {
                    // Create new user if doesn't exist
                    console.log("------ Creating new user:", user.email);
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name || null
                        }
                    });
                    console.log("Created new user:", user.email);
                } else {
                    console.log("Existing user found:", user.email);
                }

                return true;
            } catch (error) {
                console.error("Error during user authentication:", error);
                return false;
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + "/spaces";
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
