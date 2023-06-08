'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
    placeholder: string;
}


const SearchInput: React.FC<SearchInputProps> = ({
    placeholder,
}) => {

    const [searchValue, setSearchValue] = useState('');

    const [searchResult, setSearchResult] = useState([])

    const router = useRouter();

    const onSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        const encodedSearchQuery = encodeURI(searchValue);

        router.push(`/courses/search?q=${encodedSearchQuery}`);

        // const courses = await axios.get(`/api/search?q=${encodedSearchQuery}`);
    }

    return (
        <div
            className="w-full ml-4 relative"
        >
            <form onSubmit={onSearch}>
                <input
                    className="
                    outline-none
                    focus:outline-none
                    w-full
                    font-light
                    text-black
                "
                    placeholder={placeholder}

                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </form>
            {searchValue && (
                <div
                    className="
                        absolute
                        top-14
                        shadow-md
                        right-20
                        bg-white
                        w-96
                        px-4
                        py-6
                        z-1000
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                        "
                    >
                        <IoSearch
                            size={18}
                            className="mr-4"
                        />
                        {searchValue}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchInput;