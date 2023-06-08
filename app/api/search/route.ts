import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest
) {
    try {
        const param = req.url.split('=')[1];

        const courses = await prisma.course.findMany({
            where: {
                title: {
                    contains: param,
                }
            }
        })

        return NextResponse.json({ courses });
    } catch (error: any) {
        throw new Error(error);
    }
}