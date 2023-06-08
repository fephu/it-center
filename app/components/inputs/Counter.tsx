'use client';

import { useCallback } from "react";

import { HiMinusSm, HiPlusSm } from "react-icons/hi";

interface CounterProps {
    title: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    value,
    onChange,
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }

        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div
            className="flex flex-row items-center justify-between"
        >
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                    "
                >
                    <HiMinusSm size={25} />
                </div>
                <div className="font-medium text-lg text-neutral-600">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                    "
                >
                    <HiPlusSm size={25} />
                </div>
            </div>
        </div>
    );
}

export default Counter;