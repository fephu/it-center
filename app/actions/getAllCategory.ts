import prisma from "@/app/libs/prismadb";

export default async function getAllCategory() {
    try {
        const category = await prisma.category.findMany();

        return category;
    } catch (error: any) {
        console.log(error);
    }
}