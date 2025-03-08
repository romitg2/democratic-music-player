import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {
        // Count total users as a simple database check
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

        console.log("......... token ..........")
        console.log(token);
        console.log("......... token ..........")
        
        if(!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userCount = await prisma.user.count();
        
        return NextResponse.json({ 
            picture: token?.picture,
            status: "Database connection successful",
            userCount: userCount 
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json(
            { error: "Failed to connect to database" },
            { status: 500 }
        );
    }
}