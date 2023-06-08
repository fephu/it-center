import getClassingByCourseId from "@/app/actions/getClassingByCourseId";
import getCourseById from "@/app/actions/getCourseById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";
import CourseBody from "@/app/components/courses/CourseBody";
import CourseHeading from "@/app/components/courses/CourseHeading";
import CourseClient from "./CourseClient";

interface IParams {
    courseId?: string,
}

const CoursePage = async (
    { params }: { params: IParams }
) => {

    const currentUser = await getCurrentUser();

    const course = await getCourseById(params);

    const classings = await getClassingByCourseId(params);

    if (!course) {
        return null;
    }

    return (
        <ClientOnly>
            <CourseClient
                classings={classings}
                currentUser={currentUser}
                course={course}
            />
        </ClientOnly>
    );
}

export default CoursePage;