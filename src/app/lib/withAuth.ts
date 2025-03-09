import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

interface WithAuthOptions {
    role?: string;
}

type RouteHandler = (req: NextRequest) => Promise<NextResponse>;

export function withAuth(handler: RouteHandler, options: WithAuthOptions = {}) {
    return async (req: NextRequest) => {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // If role is required, check if user has the required role
        if (options.role && token.role !== options.role) {
            return NextResponse.json(
                { error: "Forbidden: Insufficient permissions" },
                { status: 403 }
            );
        }

        // Add user info to the request for use in the handler
        req.token = token;

        try {
            return await handler(req);
        } catch (error) {
            console.error("API Error:", error);
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    };
}

// Extend the NextRequest type to include our token
declare module "next/server" {
    interface NextRequest {
        token?: any;
    }
}
