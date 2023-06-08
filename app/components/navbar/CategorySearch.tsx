'use client';

import { Category } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { RiArrowRightSLine } from "react-icons/ri";

interface CategorySearchProps {
    categories?: Category[] | null;
}

const CategorySearch: React.FC<CategorySearchProps> = ({
    categories,
}) => {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div
                className="
                    text-black
                    text-md
                    hover:text-purple-900
                    relative
                    transition
                    cursor-pointer
                    after:block
                    after:absolute
                    after:w-full
                    after:h-9
                "
            >
                Thể loại
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        top-14
                        bg-white
                        text-black
                        border-1
                        border-black
                        z-1000
                        p-2
                        shadow-lg
                        block
                        w-96
                    "
                >
                    <Link
                        href={`/courses`}
                        className="
                            text-black
                            hover:text-purple-700
                            font-medium
                            text-md
                            cursor-pointer
                            flex
                            items-center
                            justify-between
                            px-1
                            py-2
                        "
                    >
                        Tất cả các khóa học
                        <RiArrowRightSLine size={20} />
                    </Link>
                    {categories && categories.map((item) => (
                        <div
                            onClick={() => router.push(`/courses/category/${item.cateId}`)}
                            key={item.cateId}
                            className="
                                text-black
                                hover:text-purple-700
                                font-medium
                                text-md
                                cursor-pointer
                                flex
                                items-center
                                justify-between
                                px-1
                                py-2
                            "
                        >
                            {item.nameCate}
                            <RiArrowRightSLine size={20} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategorySearch;