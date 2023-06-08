'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineDollar } from "react-icons/ai";

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <AiOutlineDollar
                    size={22}
                    className="
                        text-neutral-700
                        absolute
                        left-10
                    "
                />
            )}
            <span
                // absolute duration-150
                //     transform
                //     -translate-y-3
                //     z-10
                //     origin-[0]
                //     ${formatPrice ? 'left-9' : 'left-4'}
                //     peer-placeholder-shown:scale-100
                //     peer-placeholder-shown:translate-y-0
                //     peer-focus:scale-75
                //     peer-focus:-translate-y-4
                //     ${errors[id] ? 'text-sky-700' : 'text-black'
                className={`
                    block   
                    text-md
                    font-semibold
                `}
            >
                {label}
            </span>
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=""
                type={type}
                className={`
                    peer
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
                    hover:border-neutral-400
                    focus:outline-none
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-sky-700' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-sky-700' : 'focus:border-purple-700'}
                `}
            />
        </div>
    );
}

export default Input;