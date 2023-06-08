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
        cateId,
        title,
        imageSrc,
        description,
        level,
        price,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const courses = await prisma.course.create({
        data: {
            title,
            description,
            imageSrc,
            level,
            cateId,
            price: parseInt(price, 10),
        }
    })

    return NextResponse.json(courses);
}