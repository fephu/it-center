'use client';

import { SafeUser } from "@/app/types";
import { Classing } from "@prisma/client";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface CourseBodyProps {
    currentUser?: SafeUser | null;
    classing: Classing;
}

const CourseBody: React.FC<CourseBodyProps> = ({
    classing,
    currentUser
}) => {

    const router = useRouter();

    return (
        <tr className="border-b dark:border-neutral-500">
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {classing.classId}
            </td>
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {classing.nameMtoS} ({classing.nameTime})
            </td>
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {classing.name}
            </td>
            <td
                className="whitespace-nowrap  px-6 py-6 font-medium"
            >
                <Button
                    onClick={() => router.push(`/classings/${classing.classId}`)}
                    label="Đăng kí"
                />
            </td>
        </tr>
    );
}

export default CourseBody;