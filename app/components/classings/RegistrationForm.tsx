"use client";

import { Classing } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import Heading from "../Heading";
import CourseReview from "./CourseReview";
import ActionLabel from "./ActionLabel";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Logo from "../navbar/Logo";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { format } from "date-fns"

interface RegistrationFormProps {
    classId: string | undefined;
    classing: Classing[] | null;
}

enum STEPS {
    REVIEW = 0,
    INFO = 1,
    BILL = 2,
    PAY = 3,
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    classing,
    classId,
}) => {

    const router = useRouter();

    const [step, setStep] = useState(STEPS.REVIEW);

    const [dateNow, setDateNow] = useState('');

    useEffect(() => {
        const date = format(Date.now(), "'Ngày' dd 'tháng' MM 'năm' yyyy");
        setDateNow(date);
    })

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset, getValues
    } = useForm<FieldValues>({
        defaultValues: {
            guestName: '',
            email: '',
            bornWhere: '',
            birthday: '',
            phone: '',
            object: '',
            userId: '',
            state: '',
            totalPrice: 0,
            classingId: classId,
            count: 1,
        }
    });

    const guestName = watch('guestName');

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

    const actionLabel = useMemo(() => {
        if (step === STEPS.PAY) {
            return 'Pay'
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.REVIEW) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PAY) {
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/registration', data)
            .then(() => {
                toast.success('Thanh toán thành công');
                router.back();
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    if (!classing) {
        return null;
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Thông tin khóa học"
                subtitle="Anh/Chị đã đăng ký online khóa học với thông tin như sau:"
            />
            <CourseReview
                classing={classing}
            />
        </div>
    )

    if (step === STEPS.INFO) {
        bodyContent = (
            <div>
                <Heading
                    title="Thông tin học viên"
                    subtitle={`Thông tin học viên đăng ký lớp`}
                />
                <div className="flex w-full">
                    <div className="py-4 px-12">
                        <div className="">
                            <span className="text-lg text-purple-700">Họ tên: </span>
                            <input
                                onChange={(e) => setCustomValue("guestName", e.target.value)}
                                type="text"
                                className="
                                    w-full
                                    p-2
                                    text-md
                                    font-medium
                                    bg-white
                                    border-2
                                    rounded-md
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    focus:bg-white
                                    focus:border-purple-700
                                    hover:border-neutral-400
                                    focus:outline-none
                                "
                            />
                        </div>
                        <div className="">
                            <span className="text-lg text-purple-700">Email: </span>
                            <input
                                onChange={(e) => setCustomValue("email", e.target.value)}
                                type="email"
                                className="
                                    w-full
                                    p-2
                                    text-md
                                    font-medium
                                    bg-white
                                    border-2
                                    rounded-md
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    focus:bg-white
                                    focus:border-purple-700
                                    hover:border-neutral-400
                                    focus:outline-none
                                "
                            />
                        </div>
                        <div className="">
                            <span className="text-lg text-purple-700">Nơi sinh: </span>
                            <input
                                onChange={(e) => setCustomValue("bornWhere", e.target.value)}
                                type="text"
                                className="
                                    w-full
                                    p-2
                                    text-md
                                    font-medium
                                    bg-white
                                    border-2
                                    rounded-md
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    focus:bg-white
                                    focus:border-purple-700
                                    hover:border-neutral-400
                                    focus:outline-none
                                "
                            />
                        </div>
                        <div className="">
                            <span className="text-lg text-purple-700">Đối tượng: </span>
                            <select
                                onChange={(e) => setCustomValue("object", e.target.value)}
                                className="
                                    w-full
                                    p-2
                                    text-md
                                    font-medium
                                    bg-white
                                    border-2
                                    rounded-md
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    focus:bg-white
                                    focus:border-purple-700
                                    hover:border-neutral-400
                                    focus:outline-none
                                "
                            >
                                <option value="Sinh viên học sinh">
                                    Sinh viên học sinh
                                </option>
                                <option value="Học sinh cũ tại TTTH">
                                    Học sinh cũ tại TTTH
                                </option>
                                <option value="Đã đi làm">
                                    Đã đi làm
                                </option>
                                <option value="Khác">
                                    Khác
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="py-4 px-12">
                        <div className="">
                            <span className="text-lg text-purple-700">Ngày sinh: </span>
                            <input
                                onChange={(e) => setCustomValue("birthday", format(new Date(e.target.value), 'dd-MM-yyyy'))}
                                type="date"
                                className="
                                    w-full
                                    p-2
                                    text-md
                                    font-medium
                                    bg-white
                                    border-2
                                    rounded-md
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    focus:bg-white
                                    focus:border-purple-700
                                    hover:border-neutral-400
                                    focus:outline-none
                                "
                            />
                        </div>
                        <div className="">
                            <span className="text-lg text-purple-700">Điện thoại: </span>
                            <input
                                onChange={(e) => setCustomValue("phone", e.target.value)}
                                type="phone"
                                className="
                                    w-full
                                    p-2
                                    text-md
                                    font-medium
                                    bg-white
                                    border-2
                                    rounded-md
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    focus:bg-white
                                    focus:border-purple-700
                                    hover:border-neutral-400
                                    focus:outline-none
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (step === STEPS.BILL) {
        bodyContent = (
            <div>
                <Heading
                    title="Xem trước biên nhận học phí"
                />
                <div
                    className="
                        w-full 
                        bg-neutral-400 
                        flex 
                        justify-center 
                        items-center 
                        py-4
                    "
                >
                    <div className="w-2/3 bg-white p-4">
                        <Logo />
                        <div
                            className="
                                text-2xl 
                                text-purple-700 
                                font-semibold 
                                text-center
                                my-6
                            "
                        >
                            BIÊN NHẬN HỌC PHÍ
                        </div>
                        <div className="my-4">
                            <span className="text-lg">
                                Số BL:    Được cập nhật sau khi thanh toán thành công
                            </span>
                        </div>
                        <div className="my-4">
                            <span className="text-lg">
                                Họ tên:   {guestName ? guestName : "<Bạn chưa nhập thông tin>"}
                            </span>
                        </div>
                        {classing && classing.map((item) => (
                            <>
                                <div className="flex my-4 items-center">
                                    <span className="text-lg">
                                        Lớp:   {item.classId}
                                    </span>
                                    <span className="text-lg ml-10">
                                        Lịch học:   {item.nameMtoS} ({item.nameTime})
                                    </span>
                                </div>
                                <div className="my-4">
                                    <span className="text-lg">
                                        Môn học:   {item.title}
                                    </span>
                                </div>
                                <div className="my-4">
                                    <span className="text-lg">
                                        Địa điểm:   {item.name}
                                    </span>
                                </div>
                            </>
                        ))}
                        <div className="text-end">
                            <span>
                                {dateNow}
                            </span>
                            <div className="flex flex-col">
                                <span>Thu tiền</span>
                                <span>Trung tâm tin học</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (step === STEPS.PAY) {
        bodyContent = (
            <div>

            </div>
        )
    }

    return (
        <div className="px-32 py-12">
            {bodyContent}
            <ActionLabel
                onSubmit={handleSubmit(onSubmit)}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                secondaryAction={step === STEPS.REVIEW ? undefined : onBack}
            />
        </div>
    );
}

export default RegistrationForm;