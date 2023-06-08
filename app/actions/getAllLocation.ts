import prisma from "@/app/libs/prismadb";

export default async function getAllCategory() {
    try {
        const location = await prisma.location.findMany();

        return location;
    } catch (error: any) {
        console.log(error);
    }
}