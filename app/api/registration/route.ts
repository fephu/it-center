import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return null;
    }
    const body = await request.json();
    const {
        guestName,
        email,
        bornWhere,
        birthday,
        phone,
        object,
        userId,
        state,
        totalPrice,
        classingId,
        count,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const cart = await prisma.cart.create({
        data: {
            guestName,
            email,
            bornWhere,
            birthday,
            phone,
            object,
            userId: currentUser.id,
            totalPrice: 0,
            classingId,
            count
        }
    });

    return NextResponse.json(cart);
}