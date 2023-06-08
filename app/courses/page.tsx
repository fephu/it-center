import getAllCourses from "../actions/getAllCourses";
import Container from "../components/Container";
import Link from "next/link";
import CourseCard from "../components/courses/CourseCard";
import { SafeCourse } from "../types";
import Heading from "../components/Heading";

const sortBy = [
    'Phổ biến nhất',
    'Xếp hạng cao nhất',
    'Mới nhất',
]

export default async function Course() {

    const courses = await getAllCourses();

    return (
        <div
            className="
                border-b-[2px]
                h-full
                shadow-md
                px-14
            "
        >

            <Container>
                <h1 className="mt-10 text-3xl">Tất cả các khóa học</h1>
                <div
                    className="
                        flex
                        items-center
                        justify-start
                    "
                >
                    <div
                        className="
                            border-[2px]
                            border-black
                            p-2
                        "
                    >
                        Bộ lọc
                    </div>
                    <div
                        className="
                            border-[2px]
                            border-black
                            p-2
                            ml-2
                            relative
                        "
                    >
                        <div>
                            <span>Sắp xếp theo</span>
                        </div>
                    </div>
                </div>
                <div
                    className="
                        pt-24
                        flex
                        items-center
                        justify-center
                   "
                >
                    <div
                        className="
                            hidden
                            md:flex
                            border-r-[2px]
                            w-2/6
                        "
                    >
                        <div>
                            <Heading
                                title="Cấp độ"
                            />
                        </div>
                        <div>

                        </div>
                    </div>
                    <div
                        className="
                            flex
                            flex-col
                            w-full
                        "
                    >
                        {courses && courses.map((item) => {
                            return (
                                <CourseCard data={item} />
                            )
                        })}
                    </div>
                </div>
            </Container>
        </div>
    )
}