'use client';

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
}) => {
    return (
        <Image
            className="rounded-full block"
            height={34}
            width={34}
            alt="Avatar"
            src={src || "/images/placeholder.jpg"}
        />
    );
}

export default Avatar;