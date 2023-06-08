"use client";

import { Classing } from "@prisma/client";
import CourseBody from "./CourseBody";

interface CourseInfoProps {
    classings: Classing[] | undefined;
    description: string;
    level: string;
    price: number;
}

const CourseInfo: React.FC<CourseInfoProps> = ({
    description,
    classings,
    level,
    price,
}) => {
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                    "
                >
                    <div>
                        Cấp độ: {level}
                    </div>
                    <div>
                        Giá: {price}
                    </div>
                </div>
            </div>
            <hr />
            <table className="min-w-full text-center text-sm font-light border-2 rounded-full">
                <thead className="bg-purple-700 font-sm text-white">
                    <tr>
                        <th scope="col" className="px-6 py-4">Lớp</th>
                        <th scope="col" className="px-6 py-4">Thời gian</th>
                        <th scope="col" className="px-6 py-4">Địa điểm học</th>
                        <th scope="col" className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {classings && classings.map((item) => (
                        <CourseBody
                            classing={item}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseInfo;