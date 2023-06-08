import prisma from "@/app/libs/prismadb";
import { Schedule } from "@prisma/client";

export default async function getAllSchedule() {
    try {
        const schedule = await prisma.$queryRaw<Schedule[]>`
            SELECT "Schedule"."scheId", "MtoS"."nameMtoS", "TimeSche"."nameTime" FROM "Schedule"
            INNER JOIN "MtoS" on "Schedule"."mtosId" = "MtoS"."mtosId"
            INNER JOIN "TimeSche" on "Schedule"."timeScheId" = "TimeSche"."timeScheId"
        `;

        return schedule;
    } catch (error: any) {
        console.log(error);
    }
}