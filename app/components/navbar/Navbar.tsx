'use client';

import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { Category } from "@prisma/client";
import CategorySearch from "./CategorySearch";

interface NavbarProps {
    currentUser?: SafeUser | null;
    categories?: Category[] | undefined;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser,
    categories,
}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm ">
            <div
                className="
                    py-2    
                    border-b-[2px]
                "
            >
                <Container>
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-4
                            md:gap-2
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-around
                                w-2/3
                            "
                        >
                            <Logo />
                            <CategorySearch
                                categories={categories}
                            />
                            <Search />
                        </div>

                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            {/* <Categories categories={categories} /> */}
        </div>
    );
}

export default Navbar;