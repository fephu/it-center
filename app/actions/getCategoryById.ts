import prisma from "@/app/libs/prismadb";

interface IParams {
    cateId?: string;
}

export default async function getCategoryById(
    params: IParams
) {
    try {

        const { cateId } = params;
        const category = await prisma.category.findUnique({
            where: {
                cateId: cateId,
            }
        });

        return category;
    } catch (error: any) {
        console.log(error);
    }
}