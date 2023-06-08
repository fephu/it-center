'use client';

import { TiBeaker } from "react-icons/ti";

import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import { Category } from "@prisma/client";
import CategoryBox from "../CategoryBox";

interface CategoriesProps {
    categories?: Category[] | null;
}

const Categories: React.FC<CategoriesProps> = ({
    categories,
}) => {

    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories && categories.map((item) => {

                    return (
                        <CategoryBox
                            selected={category === item.name}
                            key={item.name}
                            label={item.name}
                            icon={TiBeaker}
                        />
                    )

                })}
            </div>
        </Container>
    );
}

export default Categories;