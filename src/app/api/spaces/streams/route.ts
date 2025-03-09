import { NextRequest, NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";

export const GET = async (req: NextRequest) => {
    const spaceId = req.nextUrl.searchParams.get("spaceId");

    return NextResponse.json(spaceId);
}

export const POST = async (req: NextRequest) => {
    return NextResponse.json({ message: "Hello, world!" });
}