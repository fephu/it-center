'use client';

import { IconType } from "react-icons";

interface CategoryInputProps {
    icon: IconType;
    cateId: string;
    name: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    cateId,
    name,
    selected,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(cateId)}
            className={`
                rounded-md
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            <Icon size={30} />
            <div className="font-semibold">
                {name}
            </div>
        </div>
    );
}

export default CategoryInput;