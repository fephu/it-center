"use client";

import Container from "@/app/components/Container";
import CourseHeading from "@/app/components/courses/CourseHeading";
import CourseInfo from "@/app/components/courses/CourseInfo";
import { SafeCourse, SafeUser } from "@/app/types";
import { Classing, Course } from "@prisma/client";
import React from "react";

interface CourseClientProps {
    classings?: Classing[];
    course: SafeCourse;
    currentUser?: SafeUser | null;
}

const CourseClient: React.FC<CourseClientProps> = ({
    classings,
    course,
    currentUser,
}) => {
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <CourseHeading
                        title={course?.title}
                        imageSrc={course?.imageSrc}
                        id={course?.courseId}
                        currentUser={currentUser}
                    />
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        "
                    >
                        <CourseInfo
                            classings={classings}
                            description={course.description}
                            level={course.level}
                            price={course.price}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default CourseClient;