'use client';

import { FiArrowUpRight } from "react-icons/fi";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import Button from "../Button";
import Link from "next/link";
import useClassingModal from "@/app/hooks/useClassingModal";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const classingModal = useClassingModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // Open Rent Modal
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    const onClassing = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        classingModal.onOpen();
    }, [currentUser, loginModal, classingModal]);

    return (

        <div className="flex flex-row items-center justify-end gap-3 relative">
            {currentUser?.role === 'ADMIN' ? (
                <>
                    <div
                        onClick={onClassing}
                        className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                    >
                        Add Classing
                    </div>
                    <div
                        onClick={onRent}
                        className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                    >
                        Add Course
                    </div>
                </>
            ) : (
                <>
                </>
            )}
            <div
                onClick={toggleOpen}
                className="
                        cursor-pointer
                        w-full
                        rounded-md
                        flex
                        items-center
                        justify-center
                        transition
                    "
            >
                {currentUser ? (
                    <Avatar src={currentUser?.image} />
                ) : (
                    <div
                        className="
                                flex 
                                items-center
                                gap-4
                            "
                    >
                        <div
                            onClick={loginModal.onOpen}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                font-medium
                                py-3
                                px-2
                                bg-white
                                text-black
                                border-2
                                border-black
                                hover:opacity-75
                                transition
                                cursor-pointer
                            "
                        >
                            Đăngnhập
                        </div>
                        <div
                            onClick={registerModal.onOpen}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                font-medium
                                py-3
                                px-2
                                border-2
                                bg-black
                                text-white
                                hover:opacity-75
                                transition
                                cursor-pointer
                            "
                        >
                            Đăng kí
                        </div>
                    </div>
                )}
                {
                    currentUser ? (
                        <>
                            {isOpen && (
                                <div
                                    className={`
                                        absolute 
                                        bg-white 
                                        rounded-md 
                                        w-full  
                                        top-14
                                        ${currentUser?.role === 'ADMIN' ? 'right-0' : 'right-0'}
                                        z-100
                                        flex
                                        flex-col  
                                    `}
                                >
                                    <MenuItem
                                        onClick={() => { }}
                                        label="My orders"
                                    />
                                    <MenuItem
                                        onClick={() => { }}
                                        label="My courses"
                                    />
                                    <MenuItem
                                        onClick={() => { }}
                                        label="My favorites"
                                    />
                                    <hr />
                                    <MenuItem
                                        onClick={() => signOut()}
                                        label="Log out"
                                    />
                                </div>
                            )}
                        </>

                    ) : (
                        <>
                        </>
                    )
                }
            </div>

        </div>
    );
}

export default UserMenu;