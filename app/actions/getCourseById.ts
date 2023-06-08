import prisma from "@/app/libs/prismadb";

interface IParams {
    courseId?: string;
}

export default async function getCourseById(
    params: IParams
) {
    try {
        const { courseId } = params;

        if (!courseId) {
            return null;
        }

        const course = await prisma.course.findUnique({
            where: {
                courseId: courseId,
            },
        });


        return {
            ...course,
            createAt: course?.createdAt.toISOString(),
            updatedAt: course?.updatedAt.toISOString(),
        };

    } catch (error: any) {
        throw new Error(error);
    }
}