import prisma from "@/app/libs/prismadb";

import { Classing } from "@prisma/client";
import { NextResponse } from "next/server";

interface IParams {
    classId?: string;
}

export default async function getClassingByClassId(
    params: IParams
) {
    try {

        const { classId } = params;

        const classings = await prisma.$queryRaw<Classing[]>`
            SELECT DISTINCT "Classing".*, "Location"."name", "s"."nameTime", "s"."nameMtoS", "Course".* FROM "Classing"
            INNER JOIN "Course" on "Classing"."courseId" = "Course"."courseId"
            INNER JOIN "Location" on "Classing"."locationId" = "Location"."locationId"
            INNER JOIN (SELECT * FROM "Schedule" 
                        INNER JOIN "MtoS" on "Schedule"."mtosId" = "MtoS"."mtosId"
                        INNER JOIN "TimeSche" on "Schedule"."timeScheId" = "TimeSche"."timeScheId" 
                        ) as "s" on "Classing"."scheId" = "s"."scheId"
            WHERE "Classing"."classId" = ${classId}
        `

        return classings;
    } catch (error: any) {
        NextResponse.error;
    }
}