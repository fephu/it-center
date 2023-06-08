'use client';

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
                    flex
                    items-center
                    justify-center
                    overflow-x-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    bg-neutral-800/70
                "
            >
                <div
                    className="
                        relative
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-1/3
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                    "
                >
                    {/* CONTENT */}
                    <div
                        className={`
                            translate
                            duration-300
                            h-full
                            ${showModal ? 'translate-y-0' : 'translate-y-full'}
                            ${showModal ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <div
                            className="
                                translate
                                h-full
                                lg:h-auto
                                md:h-auto
                                border-0
                                rounded-md
                                shadow-lg
                                relative
                                flex
                                flex-col
                                w-full
                                bg-white
                                outline-none
                                focus:outline-none
                            "
                        >
                            {/* HEADER */}
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    px-4
                                    pb-2
                                    pt-10
                                    relative
                                "
                            >
                                <button
                                    onClick={handleClose}
                                    className="
                                        p-1
                                        border-0
                                        hover:bg-neutral-200
                                        hover:rounded-md
                                        transition
                                        absolute
                                        top-3
                                        right-3
                                    "
                                >
                                    <GrFormClose size={26} />
                                </button>
                                <div className="flex items-center text-2xl font-bold mt-6 text-purple-700">
                                    <Image
                                        className="mr-8"
                                        alt="Logo Mobile"
                                        width={100}
                                        height={100}
                                        src="/images/logo-udemy.svg"
                                    />
                                    {title}
                                </div>
                            </div>
                            {/* BODY */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 p-6">
                                <div
                                    className="
                                        flex
                                        flex-row
                                        items-center
                                        gap-4
                                        w-full
                                    "
                                >
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Modal;