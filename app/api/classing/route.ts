import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        courseId,
        scheId,
        locationId,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const classing = await prisma.classing.create({
        data: {
            courseId,
            scheId: parseInt(scheId),
            locationId: parseInt(locationId),
        }
    })

    console.log(classing);

    return NextResponse.json(classing);
}