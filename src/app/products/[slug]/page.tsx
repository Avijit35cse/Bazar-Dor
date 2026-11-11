import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

type ProductDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const toBanglaDigits = (value: string) =>
    value.replace(/\d/g, (digit) => BANGLA_DIGITS[Number(digit)]);

const formatPrice = (value: number) =>
    toBanglaDigits(value.toLocaleString("en-US", { maximumFractionDigits: 2 }));

const formatAverage = (value: number) =>
    Number.isInteger(value)
        ? formatPrice(value)
        : toBanglaDigits(value.toFixed(2));

const formatPercent = (value: number) =>
    toBanglaDigits(Math.abs(value).toFixed(1));

const UNIT_LABELS: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

// Async component: এখানে API থেকে data fetch হবে
const ProductDetailsContent = async ({
    params,
}: ProductDetailsPageProps) => {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const markets = product.markets ?? [];

    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const changeColor = isUp
        ? "text-[#d03739]"
        : isDown
            ? "text-[#1a9951]"
            : "text-[#1d271f]";

    const arrow = isUp ? "▲" : isDown ? "▼" : "—";

    const changeWord = isUp
        ? "বেড়েছে"
        : isDown
            ? "কমেছে"
            : "অপরিবর্তিত";

    const unitLabel = UNIT_LABELS[product.unit] ?? product.unit;

    const dayDifference = Math.abs(product.today - product.yesterday);

    const lowestPrice = markets.length
        ? Math.min(...markets.map((market) => market.min))
        : product.today;

    const highestPrice = markets.length
        ? Math.max(...markets.map((market) => market.max))
        : product.today;

    return (
        <div className="min-h-screen bg-[#f0f5f0]">
            <div className="mx-auto w-full max-w-[1152px] px-4 pb-16 pt-8">
                {/* Breadcrumb */}
                <nav
                    aria-label="ব্রেডক্রাম্ব"
                    className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2 text-sm leading-5"
                >
                    <Link
                        href="/"
                        className="text-[#1d271f]/75 transition-colors hover:text-[#05893e]"
                    >
                        হোম
                    </Link>

                    <span aria-hidden="true" className="text-[#1d271f]/40">
                        ›
                    </span>

                    <Link
                        href={`/category/${product.category}`}
                        className="text-[#1d271f]/75 transition-colors hover:text-[#05893e]"
                    >
                        {product.categoryNameBn}
                    </Link>

                    <span aria-hidden="true" className="text-[#1d271f]/40">
                        ›
                    </span>

                    <span className="font-medium text-[#1d271f]">
                        {product.nameBn}
                    </span>
                </nav>

                {/* Product summary */}
                <section
                    aria-labelledby="product-title"
                    className="mt-[34px] flex flex-col gap-5 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:flex-row sm:items-stretch sm:justify-between"
                >
                    <div className="flex min-w-0 items-center gap-4">
                        <span
                            aria-hidden="true"
                            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl leading-none sm:h-[76px] sm:w-20"
                        >
                            {product.image || product.categoryIcon}
                        </span>

                        <div className="min-w-0">
                            <h1
                                id="product-title"
                                className="text-2xl font-bold leading-[1.2] text-[#1d271f] sm:text-[30px]"
                            >
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-sm leading-5 text-[#5d6b60]">
                                প্রতি {unitLabel} · {product.categoryNameBn}
                            </p>

                            <p className="mt-2 text-sm leading-5 text-[#5d6b60]">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className="font-medium text-[#1d271f]">
                                    {changeWord}
                                </span>{" "}
                                · {formatPrice(dayDifference)} টাকা
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-[#f0f5f0] px-5 py-4 sm:min-w-[117px]">
                        <span className="text-sm leading-5 text-[#5d6b60]">
                            আজকের দাম
                        </span>

                        <span className="text-[32px] font-bold leading-10 text-[#1d271f]">
                            {formatPrice(product.today)}
                        </span>

                        <span className="text-sm leading-5 text-[#5d6b60]">
                            টাকা / {unitLabel}
                        </span>

                        <span
                            className={`text-[13px] font-semibold leading-[18px] ${changeColor}`}
                        >
                            <span className="sr-only">
                                {isUp
                                    ? "দাম বেড়েছে"
                                    : isDown
                                        ? "দাম কমেছে"
                                        : "দামের পরিবর্তন নেই"}
                                :{" "}
                            </span>

                            <span aria-hidden="true">{arrow}</span>{" "}
                            {formatPercent(product.change.pct)}%
                        </span>
                    </div>
                </section>

                {/* Price statistics + market table */}
                <section
                    aria-labelledby="price-stats-heading"
                    className="mt-6 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5"
                >
                    <h2
                        id="price-stats-heading"
                        className="text-[18px] font-bold leading-7 text-[#1d271f]"
                    >
                        দামের পরিসংখ্যান
                    </h2>

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#e7eee7] px-6 py-4">
                            <p className="text-xs leading-4 text-[#5d6b60]">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="mt-1 text-[24px] font-semibold leading-8 text-[#1a9951]">
                                {formatPrice(lowestPrice)}
                                <span className="ml-1 text-[13px] font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="text-xs leading-4 text-[#5d6b60]">
                                <span className="text-[#1d271f]/75">
                                    সবচেয়ে কম
                                </span>{" "}
                                দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#e7eee7] px-6 py-4">
                            <p className="text-xs leading-4 text-[#5d6b60]">
                                সর্বোচ্চ দাম
                            </p>

                            <p className="mt-1 text-[24px] font-semibold leading-8 text-[#d03739]">
                                {formatPrice(highestPrice)}
                                <span className="ml-1 text-[13px] font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="text-xs leading-4 text-[#5d6b60]">
                                <span className="text-[#1d271f]/75">
                                    সবচেয়ে বেশি
                                </span>{" "}
                                দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#e7eee7] px-6 py-4">
                            <p className="text-xs leading-4 text-[#5d6b60]">
                                গত মাস
                            </p>

                            <p className="mt-1 text-[24px] font-semibold leading-8 text-[#05893e]">
                                {formatPrice(product.lastMonth)}
                                <span className="ml-1 text-[13px] font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="text-xs leading-4 text-[#5d6b60]">
                                প্রতি {unitLabel} · এর হিসাব
                            </p>
                        </div>
                    </div>

                    <h2 className="mt-5 text-[18px] font-bold leading-7 text-[#1d271f]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    {markets.length === 0 ? (
                        <div className="mt-3 rounded-lg border border-[#e7eee7] px-4 py-10 text-center">
                            <p className="text-sm font-semibold leading-5 text-[#1d271f]">
                                বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
                            </p>

                            <p className="mt-1 text-sm leading-5 text-[#5d6b60]">
                                এই পণ্যের বাজারের তথ্য শীঘ্রই যোগ করা হবে।
                            </p>
                        </div>
                    ) : (
                        <div className="mt-3 overflow-hidden rounded-lg border border-[#e7eee7]">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px] table-fixed border-collapse text-left">
                                    <colgroup>
                                        <col className="w-[28.3%]" />
                                        <col className="w-[28.2%]" />
                                        <col className="w-[15.4%]" />
                                        <col className="w-[14.05%]" />
                                        <col className="w-[14.05%]" />
                                    </colgroup>

                                    <thead>
                                        <tr className="border-b border-[#eef3ee] text-sm text-[#5d6b60]">
                                            <th
                                                scope="col"
                                                className="px-4 py-[12.5px] font-normal leading-5"
                                            >
                                                বাজার
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-[12.5px] font-normal leading-5"
                                            >
                                                বিভাগ
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-[12.5px] font-normal leading-5"
                                            >
                                                সর্বনিম্ন
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-[12.5px] font-normal leading-5"
                                            >
                                                সর্বোচ্চ
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-[12.5px] text-right font-normal leading-5"
                                            >
                                                গড়
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm leading-5 text-[#1d271f]">
                                        {markets.map((market, index) => (
                                            <tr
                                                key={`${market.market}-${market.division}-${index}`}
                                                className={[
                                                    index % 2 === 1
                                                        ? "bg-[#f0f5f0]"
                                                        : "",
                                                    index < markets.length - 1
                                                        ? "border-b border-[#1d271f]"
                                                        : "",
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ")}
                                            >
                                                <td className="px-4 py-[12.5px] break-words">
                                                    {market.market}
                                                </td>

                                                <td className="px-4 py-[12.5px] break-words">
                                                    {market.division}
                                                </td>

                                                <td className="px-4 py-[12.5px]">
                                                    {formatPrice(market.min)}{" "}
                                                    টাকা
                                                </td>

                                                <td className="px-4 py-[12.5px]">
                                                    {formatPrice(market.max)}{" "}
                                                    টাকা
                                                </td>

                                                <td className="px-4 py-[12.5px] text-right">
                                                    {formatAverage(
                                                        (market.min +
                                                            market.max) /
                                                        2
                                                    )}{" "}
                                                    টাকা
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

// Synchronous page: Async component-কে Suspense দিয়ে wrap করবে
const ProductDetailsPage = ({
    params,
}: ProductDetailsPageProps) => {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-40 items-center justify-center">
                    <p>পণ্যের তথ্য লোড হচ্ছে...</p>
                </div>
            }
        >
            <ProductDetailsContent params={params} />
        </Suspense>
    );
};

export default ProductDetailsPage;
