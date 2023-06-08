'use client';

import axios from "axios";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

import { toast } from "react-hot-toast";
import Button from "../Button";
import Link from "next/link";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Register Success')
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                id="email"
                label="Email"
                type="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Tên"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Mật khẩu"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col items-center justify-center gap-4 m-3">
            <hr />
            <div className="flex flex-row items-center w-full justify-center">
                <span className="text-sm font-light">Đăng ký với: </span>
                <Link
                    href={'/'}
                    className="
                        text-sky-600
                        hover:opacity-70
                        ml-4
                    "
                >
                    <BsFacebook size={22} />
                </Link>
                <Link
                    href={'/'}
                    className="
                        hover:opacity-70
                        ml-4
                    "
                >
                    <FcGoogle size={22} />
                </Link>
            </div>

            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="text-md font-light">
                        Bạn đã có tài khoản?
                    </div>
                    <div
                        onClick={toggle}
                        className="
                            text-purple-700
                            cursor-pointer
                            hover:underline
                            font-medium
                        "
                    >
                        Đăng nhập
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Đăng ký vào Udemy"
            actionLabel="Đăng ký"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;