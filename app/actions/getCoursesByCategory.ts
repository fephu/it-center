import prisma from "@/app/libs/prismadb";

interface IParams {
    cateId?: string;
}

export default async function getCoursesByCategory(
    params: IParams
) {
    try {
        const { cateId } = params;

        const courses = await prisma.course.findMany({
            where: {
                cateId: cateId,
            }
        })

        if (!cateId) {
            return null;
        }

        const safeCourses = courses.map((course) => ({
            ...course,
            createdAt: course.createdAt.toISOString(),
            updatedAt: course.createdAt.toISOString(),
        }))

        return safeCourses;

    } catch (error: any) {
        throw new Error(error);
    }
}