'use client';

interface TitleInputProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({
    title,
    value,
    onChange,
}) => {

    return (
        <div
        >
            <label className="">{title}</label>
            <input
                className="
                    p-3
                    w-full 
                    rounded-md
                    outline-none 
                    focus:outline-none
                    border-[2px] 
                    border-neutral-400
                    hover:border-neutral-600
                    focus:border-sky-700
                    text-md
                    font-medium
                "
                onChange={(e) => onChange(value = e.target.value)}
            />
        </div>
    );
}

export default TitleInput;