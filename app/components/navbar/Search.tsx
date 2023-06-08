'use client';

import { IoSearch } from "react-icons/io5";
import { TiTimes } from "react-icons/ti";
import SearchInput from "../inputs/SearchInput";
import { useEffect, useState } from "react";

const Search = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className="
                border-[1px]
                px-2
                py-4
                rounded-full
                w-1/2
                h-full
              border-black
                transition
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-around
                    w-full
                    h-full
                    px-2
                "
            >
                <IoSearch
                    onClick={toggleSearch}
                    size={20}
                />
                <SearchInput
                    placeholder="Tìm kiếm nội dung bất kì"
                />
            </div>
        </div>
    );
}

export default Search;