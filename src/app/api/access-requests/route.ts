import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { withAuth } from "@/app/lib/withAuth";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const accessRequestSchema = z.object({
    spaceId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive(),
});


export const GET = withAuth(async (req: NextRequest) => {
    try {
        const { userId } = z.object({ userId: z.coerce.number().int().positive() }).parse({
            userId: req.nextUrl.searchParams.get("userId")
        });

        const accessRequests = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                accessRequests: true
            } 
        });

        if (!accessRequests) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(accessRequests);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to fetch access requests" }, { status: 500 });
    }
}, { role: "admin" });

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { spaceId, userId } = accessRequestSchema.parse(body);
        console.log("trying");  

        const request = await prisma.spaceAccessRequest.create({
            data: {
                spaceId,
                userId,
                status: "PENDING",
                accessType: "VIEW",
            }
    });
        
        console.log(request);

        return NextResponse.json(request);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create access request" }, { status: 500 });
    }
};

export const DELETE = async(req: NextRequest) => {
    try {
        const body = await req.json();
        const { userId } = z.object({ userId: z.coerce.number().int().positive() }).parse(body);

        const deletedRequests = await prisma.spaceAccessRequest.deleteMany({
            where: {
                userId,
            }
        });

        return NextResponse.json(deletedRequests);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to delete access requests" }, { status: 500 });
    }
}

export const PATCH = withAuth(async (req: NextRequest) => {
    try {
        const { spaceId, userId } = accessRequestSchema.parse({
            spaceId: req.nextUrl.searchParams.get("spaceId"),
            userId: req.nextUrl.searchParams.get("userId")
        });

        const request = await prisma.spaceAccessRequest.findFirst({
            where: {
                spaceId,
                userId,
            }
        });

        if (!request) return NextResponse.json({ error: "Request not found" }, { status: 404 });

        // Start a transaction to ensure data consistency
        const [updatedRequest, spaceMember] = await prisma.$transaction([
            // Update the request status
            prisma.spaceAccessRequest.update({
                where: { id: request.id },
                data: { 
                    status: "APPROVED"
                }
            }),
            // Create a space member entry with VIEW access
            prisma.spaceMember.create({
                data: {
                    spaceId,
                    userId,
                }
            })
        ]);

        return NextResponse.json({ updatedRequest, spaceMember });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update access request" }, { status: 500 });
    }
}, { role: "admin" });
