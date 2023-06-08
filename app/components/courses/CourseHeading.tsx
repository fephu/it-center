'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";

interface CourseHeadingProps {
    title: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const CourseHeading: React.FC<CourseHeadingProps> = ({
    title,
    imageSrc,
    id,
    currentUser
}) => {
    return (
        <div className="py-10">
            <Heading
                title={title}
                subtitle=""
            />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
            </div>
        </div>
    );

}

export default CourseHeading;