'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (

        <Image
            alt="Logo"
            src="/images/logo-udemy.svg"
            onClick={() => router.push('/')}
            className="
                hidden
                md:block 
                cursor-pointer
                font-semibold
                text-xl
            "
            width={100}
            height={100}
        />
    );
}

export default Logo;