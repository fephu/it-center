import { Course, User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeCourse = Omit<
    Course,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};