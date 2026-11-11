
"use client";

import { useState } from "react";
import type { Product } from "@/types/allTypes";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type CategoryProductsProps = {
    products: Product[];
};

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const toBanglaDigits = (value: string) =>
    value.replace(/\d/g, (digit) => BANGLA_DIGITS[Number(digit)]);

const formatPrice = (value: number) =>
    toBanglaDigits(value.toLocaleString("en-US", { maximumFractionDigits: 2 }));

const formatPercent = (value: number) =>
    toBanglaDigits(Math.abs(value).toFixed(1));

const UNIT_LABELS: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const CategoryProducts = ({ products }: CategoryProductsProps) => {
    const [sortOrder, setSortOrder] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low-high") {
            return a.today - b.today;
        }

        if (sortOrder === "high-low") {
            return b.today - a.today;
        }

        return 0;
    });

    const categoryName = products[0]?.categoryNameBn ?? "";
    const categoryIcon = products[0]?.categoryIcon ?? "🛒";
    const unitLabel =
        UNIT_LABELS[products[0]?.unit ?? ""] ?? products[0]?.unit ?? "কেজি";

    return (
        <section className="min-h-[calc(100vh-13.5rem)] bg-[#f0f5f0] pb-16 pt-6">
            <div className="mx-auto w-full max-w-[1152px] px-4">
                {/* Category header */}
                <div className="flex items-center gap-2 rounded-xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-[18px] shadow-[0_1px_2px_rgba(23,58,36,0.03)]">
                    <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center text-[34px] leading-none"
                        aria-hidden="true"
                    >
                        {categoryIcon}
                    </span>

                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold leading-[1.3] text-[#1d271f]">
                            {categoryName}
                        </h1>

                        <p className="mt-1 text-xs leading-[1.5] text-[#8b968d]">
                            প্রতি {unitLabel} আজকের বাজার দর • সর্বনিম্ন
                        </p>
                    </div>
                </div>

                {/* Sorting section */}
                <div className="mt-6 flex items-center justify-end rounded-xl border border-[#e1e8e1] bg-[#fafcfa] px-9 py-[17px] shadow-[0_1px_2px_rgba(23,58,36,0.03)]">
                    <label
                        htmlFor="category-sort"
                        className="mr-2 text-sm text-[#7d8a80]"
                    >
                        সাজান
                    </label>

                    <div className="relative">
                        <select
                            id="category-sort"
                            aria-label="পণ্য সাজান"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="h-8 w-20 cursor-pointer appearance-none rounded-lg border border-[#dce5dc] bg-transparent pl-2.5 pr-7 text-sm font-semibold text-[#1d271f] transition-colors hover:border-[#c9dccd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa]"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low-high">কম থেকে বেশি</option>
                            <option value="high-low">বেশি থেকে কম</option>
                        </select>

                        <ChevronDown
                            className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6f7f73]"
                            strokeWidth={3}
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Product count */}
                <p className="mt-3 text-sm leading-[1.5] text-[#8b968d]">
                    মোট {toBanglaDigits(String(products.length))}টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Product grid */}
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => {
                        const isUp = product.change.dir === "up";
                        const isDown = product.change.dir === "down";

                        const changeColor = isUp
                            ? "text-[#d03739]"
                            : isDown
                                ? "text-[#1a9951]"
                                : "text-[#1d271f]";

                        const arrow = isUp ? "▲" : isDown ? "▼" : "—";

                        const productUnit =
                            UNIT_LABELS[product.unit] ?? product.unit;

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0f5f0]"
                            >
                                <article className="flex h-full flex-col justify-between gap-3.5 rounded-xl border border-[#e1e8e1] bg-[#fafcfa] p-4 shadow-[0_1px_2px_rgba(23,58,36,0.03)] transition-colors duration-200 group-hover:border-[#c9dccd]">
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f0] text-[26px] leading-none"
                                            aria-hidden="true"
                                        >
                                            {product.categoryIcon}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h3
                                                className="truncate text-base font-semibold leading-[1.4] text-[#1d271f]"
                                                title={product.nameBn}
                                            >
                                                {product.nameBn}
                                            </h3>

                                            <p className="text-xs leading-[1.5] text-[#66756b]">
                                                প্রতি {productUnit}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between gap-2">
                                        <div>
                                            <span className="block text-xs leading-[1.4] text-[#7d8a80]">
                                                আজকের দাম
                                            </span>

                                            <p className="mt-0.5 text-base font-bold leading-[1.4] text-[#1d271f]">
                                                ৳{formatPrice(product.today)} টাকা
                                            </p>
                                        </div>

                                        <span
                                            className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-2 py-1 text-xs font-semibold leading-[1.33] ${changeColor}`}
                                        >
                                            <span className="sr-only">
                                                {isUp
                                                    ? "দাম বেড়েছে"
                                                    : isDown
                                                        ? "দাম কমেছে"
                                                        : "দামের পরিবর্তন নেই"}
                                            </span>

                                            <span aria-hidden="true" className="text-[10px]">
                                                {arrow}
                                            </span>
                                            <span>{formatPercent(product.change.pct)}%</span>
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryProducts;
