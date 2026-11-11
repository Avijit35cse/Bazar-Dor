
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

const CategoryNav = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const pathname = usePathname()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/categories"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data: Category[] = await response.json();

                setCategories(data);

            } catch (error) {
                console.error("Category fetch error:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="border-t border-[#f0f5f0] bg-[#fafcfa]"
        >
            <div className="mx-auto flex w-full max-w-[1152px] items-center gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((category) => {
                    const isActive = pathname === `/category/${category.slug}`;

                    return (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] ${isActive
                                    ? "border-[#047c37] bg-[#047f39] text-[#f3fbf4]"
                                    : "border-transparent text-[#1d271f] hover:bg-[#f0f5f0]"
                                }`}
                        >
                            <span aria-hidden="true">{category.icon}</span>
                            <span>{category.nameBn}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default CategoryNav;
