"use client";

import { Classing } from "@prisma/client";
import Image from "next/image";

interface CourseReviewProps {
    classing: Classing[] | null;
}

const CourseReview: React.FC<CourseReviewProps> = ({
    classing,
}) => {
    return (
        <div className="flex flex-col md:flex-row">
            {classing && classing.map((item) => (
                <>
                    <div>
                        <Image
                            alt="Image"
                            src={item.imageSrc}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className="flex flex-col ml-10 text-base">
                        <div className="px-2 pb-4">
                            <span className="text-lg text-purple-700">Môn học: </span>
                            <span>{item.title}</span>
                        </div>
                        <div className="px-2 py-4">
                            <span className="text-lg text-purple-700">Mã học: </span>
                            <span>{item.classId}</span>
                        </div>
                        <div className="px-2 py-4">
                            <span className="text-lg text-purple-700">Học phí: </span>
                            <span>{item.price} đ</span>
                        </div>
                        <div className="px-2 py-4">
                            <span className="text-lg text-purple-700">Lịch học: </span>
                            <span>{item.nameMtoS} ({item.nameTime})</span>
                        </div>
                        <div className="px-2 py-4">
                            <span className="text-lg text-purple-700">Địa điểm: </span>
                            <span>{item.name}</span>
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
}

export default CourseReview;