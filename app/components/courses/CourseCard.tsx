'use client';

import { SafeCourse, SafeUser } from "@/app/types";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface CourseCardProps {
    data: SafeCourse;
    onAction?: (id: number) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const CourseCard: React.FC<CourseCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser,
}) => {

    const router = useRouter();

    return (
        <div
            className="
                border-[1px]
                border-neutral-200
                rounded-md
                shadow-md
                p-4
                flex
                flex-col
                justify-around
                items-center
                w-full
            "
        >
            <div
                className="
                flex
                flex-col
                md:flex-row
                justify-start
                items-center
                md:items-start
                w-full
            "
            >
                <img
                    className="w-64 h-36"
                    src={data.imageSrc}
                />
                <div
                    className="
                    flex
                    flex-col
                    ml-4
                "
                >
                    <span className="text-lg font-semibold">
                        {data.title}
                    </span>
                    <span className="text-sm">Cấp độ: {data.level}</span>
                    <span>Học phí: {data.price}đ</span>
                    <span className="text-sm">
                        {data.description}
                    </span>
                </div>
            </div>
            <div
                className="
                    text-right
                    w-1/6
                    flex
                    justify-end
                "
            >
                <Button
                    small
                    onClick={() => router.push(`/courses/${data.courseId}`)}
                    label="Lịch khai giảng"
                />
            </div>
        </div>
    );
}

export default CourseCard;