import prisma from "@/app/libs/prismadb";

// export interface ICourseParams {
//     name?: string;
// }

export default async function getAllCourses(
    // course: ICourseParams,
) {
    try {

        // const { name } = course;


        // if (name) {
        //     const courses = await prisma.course.findMany({
        //         where: {
        //             title: name,
        //         }
        //     })
        //     const safeCourses = courses.map((course) => ({
        //         ...course,
        //         createdAt: course.createdAt.toISOString(),
        //         updatedAt: course.createdAt.toISOString(),
        //     }))

        //     return safeCourses;
        // }

        const courses = await prisma.course.findMany();

        const safeCourses = courses.map((course) => ({
            ...course,
            createdAt: course.createdAt.toISOString(),
            updatedAt: course.createdAt.toISOString(),
        }))

        return safeCourses;
    } catch (error: any) {
        console.log(error);
    }
}