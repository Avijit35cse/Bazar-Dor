
import Link from "next/link";
import { ProductCardProps } from "@/types/allTypes";

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

const ProductCard = ({ product }: ProductCardProps) => {
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const changeColor = isUp
        ? "text-[#d03739]"
        : isDown
            ? "text-[#1a9951]"
            : "text-[#1d271f]";

    const arrow = isUp ? "▲" : isDown ? "▼" : "—";

    const unitLabel = UNIT_LABELS[product.unit] ?? product.unit;

    return (
        <Link
            href={`/products/${product.slug}`}
            className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFCFA]"
        >
            <article className="flex h-full flex-col gap-3 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 transition-colors duration-200 hover:border-[#c9dccd] hover:bg-white">
                <div className="flex items-start gap-3">
                    <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl leading-none"
                        aria-hidden="true"
                    >
                        {product.categoryIcon}
                    </span>

                    <div className="min-w-0 flex-1">
                        <h3
                            className="truncate text-base font-semibold leading-[1.5] text-[#1d271f]"
                            title={product.nameBn}
                        >
                            {product.nameBn}
                        </h3>

                        <p className="text-xs leading-[1.33] text-[#1d271f]">
                            প্রতি {unitLabel}
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-between gap-2">
                    <div>
                        <span className="block text-xs leading-[1.33] text-[#1d271f]">
                            আজকের দাম
                        </span>

                        <p className="text-xl font-bold leading-[1.4] text-[#1d271f]">
                            {formatPrice(product.today)} টাকা
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

                        <span aria-hidden="true">{arrow}</span>
                        <span>{formatPercent(product.change.pct)}%</span>
                    </span>
                </div>
            </article>
        </Link>
    );
};

export default ProductCard;
