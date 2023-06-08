'use client';

import axios from "axios";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

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
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
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
                <span className="text-sm font-medium">Đăng nhập với: </span>
                <div
                    onClick={() => signIn('facebook')}
                    className="
                        text-sky-600
                        hover:opacity-70
                        ml-4
                    "
                >
                    <BsFacebook size={22} />
                </div>
                <div
                    onClick={() => signIn('google')}
                    className="
                        hover:opacity-70
                        ml-4
                    "
                >
                    <FcGoogle size={22} />
                </div>
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
                        Bạn chưa có tài khoản?
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
                        Đăng ký
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Đăng nhập vào Udemy"
            actionLabel="Đăng nhập"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;