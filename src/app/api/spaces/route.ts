import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
    try {
        const spaces = await prisma.space.findMany({
            where: {
                isPublic: true
            }
        });
        return NextResponse.json(spaces);
    } catch (error) {
        console.error("Error fetching available spaces:", error);
        return NextResponse.json(
            { error: "Failed to fetch available spaces" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, isPublic } = await req.json();
        const space = await prisma.space.create({
            data: {
                title,
                isPublic,
                ownerId: 1
            }
        });
        return NextResponse.json(space);
    } catch (error) {
        console.error("Error creating space:", error);
        return NextResponse.json(
            { error: "Failed to create space" },
            { status: 500 }
        );
    }
}
