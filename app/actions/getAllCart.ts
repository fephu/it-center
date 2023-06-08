import prisma from "@/app/libs/prismadb";

export default async function getAllCart() {
    try {
        const carts = await prisma.cart.findMany();

        return carts;
    } catch (error: any) {
        console.log(error);
    }
}