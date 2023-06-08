import prisma from "@/app/libs/prismadb";

interface IParams {
    name?: string;
}

export default async function getCourseBySearch(
    params: IParams
) {
    try {
        const { name } = params;

        const course = await prisma.course.findMany({
            where: {
                title: name,
            },
        });

        if (!name) {
            return null;
        }

        return course;

    } catch (error: any) {
        throw new Error(error);
    }
}