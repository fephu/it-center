import getCategoryById from "@/app/actions/getCategoryById";
import getCourseByCateId from "@/app/actions/getCoursesByCategory";
import Container from "@/app/components/Container";
import CourseCard from "@/app/components/courses/CourseCard";

interface IParams {
    cateId?: string,
}

const CoursePageByCategory = async (
    { params }: { params: IParams }
) => {
    const courses = await getCourseByCateId(params);

    const category = await getCategoryById(params);

    if (!courses) {
        return null;
    }

    if (!category) {
        return null;
    }

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
                <h1 className="mt-10 text-3xl">Tất cả các khóa học {category.name}</h1>
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
                        HAHHAH
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
    );
}

export default CoursePageByCategory;