"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useSWR from "swr";


const SearchPage = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const param = useSearchParams();

    const searchQuery = param ? param.get('q') : null;

    const encodedSearchQuery = encodeURI(searchQuery || "");

    const { data, isLoading } = useSWR(`/api/search?q=${encodedSearchQuery}`);

    console.log(data);

    return (
        <div>ssss</div>
    );
}

export default SearchPage;