'use client';

import { TiBeaker } from "react-icons/ti";

import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { Category, Course, Location, MtoS, Schedule } from "@prisma/client";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useClassingModal from "@/app/hooks/useClassingModal";
import { SafeCourse } from "@/app/types";

enum STEPS {
    COURSES = 0,
    SCHEDULE = 1,
    LOCATION = 2,
}

interface ClassingModalProps {
    courses: SafeCourse[] | undefined;
    schedule: Schedule[] | undefined;
    location: Location[] | undefined;
}


const ClassingModal: React.FC<ClassingModalProps> = ({
    courses,
    schedule,
    location,
}) => {
    const router = useRouter();
    const rentModal = useRentModal();

    const classingModal = useClassingModal();

    const [step, setStep] = useState(STEPS.COURSES);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            courseId: '',
            scheId: 1,
            locationId: 1,
        }
    });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.LOCATION) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/classing', data)
            .then(() => {
                toast.success('Classing Created');
                router.refresh();
                reset();
                setStep(STEPS.COURSES,
                );
                classingModal.onClose();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return 'Create'
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.COURSES) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title=""
                subtitle="Pick a course"
            />
            <select
                name="courseSelect"
                id="courseSelect"
                onChange={(e) => setCustomValue('courseId', e.target.value)}
                className="
                        w-full
                        px-2
                        py-4
                        text-md
                        rounded-md
                        border-2
                        outline-none
                        focus:outline-none
                        border-purple-700
                    "
            >
                {courses && courses.map((item, index) => (
                    <option
                        value={item.courseId}
                    >
                        {index + 1}. {item.title}
                    </option>
                ))}
            </select>

        </div >
    );

    if (step === STEPS.SCHEDULE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title=""
                    subtitle="Pick a schedule"
                />
                <select
                    name="scheduleSelect"
                    id="scheduleSelect"
                    onChange={(e) => setCustomValue('scheId', e.target.value)}
                    className="
                        w-full
                        px-2
                        py-4
                        text-md
                        rounded-md
                        border-2
                        outline-none
                        focus:outline-none
                        border-purple-700
                    "
                >
                    {schedule && schedule.map((item, index) => (
                        <option
                            value={item.scheId}
                        >
                            {index + 1}. {item.nameMtoS} ({item.nameTime})
                        </option>
                    ))}
                </select>
            </div>
        )
    };

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title=""
                    subtitle="Pick a location"
                />
                <select
                    name="locationSelect"
                    id="locationSelect"
                    onChange={(e) => setCustomValue('locationId', e.target.value)}
                    className="
                        w-full
                        px-2
                        py-4
                        text-md
                        rounded-md
                        border-2
                        outline-none
                        focus:outline-none
                        border-purple-700
                    "
                >
                    {location && location.map((item, index) => (
                        <option
                            value={item.locationId}
                        >
                            {index + 1}. {item.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    };

    return (
        <Modal
            isOpen={classingModal.isOpen}
            onClose={classingModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.COURSES ? undefined : onBack}
            title="Add New Classing"
            body={bodyContent}
        />
    );
}

export default ClassingModal;