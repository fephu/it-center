import prisma from "@/app/libs/prismadb";

import { Classing } from "@prisma/client";

interface IParams {
    courseId?: string;
}

export default async function getClassingByCourseId(
    params: IParams
) {
    try {

        const { courseId } = params;

        const classings = await prisma.$queryRaw<Classing[]>`
            SELECT DISTINCT "Classing"."classId", "Location"."name", "s"."nameTime", "s"."nameMtoS" FROM "Classing"
            INNER JOIN "Course" on "Classing"."courseId" = ${courseId}
            INNER JOIN "Location" on "Classing"."locationId" = "Location"."locationId"
            INNER JOIN (SELECT * FROM "Schedule" 
                        INNER JOIN "MtoS" on "Schedule"."mtosId" = "MtoS"."mtosId"
                        INNER JOIN "TimeSche" on "Schedule"."timeScheId" = "TimeSche"."timeScheId" 
                        ) as "s" on "Classing"."scheId" = "s"."scheId"
        `

        return classings;
    } catch (error: any) {
        console.log(error);
    }
}