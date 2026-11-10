
import { PriceChange, Product } from "@/types/allTypes";

const TICKER_KEYFRAMES = `
@keyframes ticker-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}`;

type TickerListProps = {
    items: PriceChange[];
    duplicate?: boolean;
};

const TickerList = ({
    items,
    duplicate = false,
}: TickerListProps) => {
    return (
        <ul
            aria-hidden={duplicate || undefined}
            className={`flex shrink-0 ${duplicate ? "motion-reduce:hidden" : ""}`}
        >
            {items.map((item) => (
                <li
                    key={item.name}
                    className="flex h-9 shrink-0 items-center gap-1.5 border-r border-[#f0f5f0] px-4 text-sm text-[#1d271f]"
                >
                    <span aria-hidden="true">{item.emoji}</span>

                    <span className="font-medium">{item.name}</span>

                    <span>
                        {item.price} টাকা/{item.unit}
                    </span>

                    <span
                        className={`font-semibold ${
                            item.direction === "up"
                                ? "text-[#d03739]"
                                : "text-[#1a9951]"
                        }`}
                    >
                        <span className="sr-only">
                            {item.direction === "up" ? "বেড়েছে" : "কমেছে"}
                        </span>

                        {item.direction === "up" ? "▲" : "▼"} {item.change}%
                    </span>
                </li>
            ))}
        </ul>
    );
};

const PriceTicker = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product prices");
    }

    const products: Product[] = await response.json();

    const tickerItems: PriceChange[] = products.map((product) => ({
        emoji: product.categoryIcon,
        name: product.nameBn,
        price: product.today,
        unit: product.unit,
        change: product.change.pct,
        direction: product.change.dir,
    }));

    return (
        <section
            aria-label="আজকের দামের পরিবর্তন"
            className="w-full border-b border-[#e1e8e1] bg-[#fafcfa]"
        >
            <style>{TICKER_KEYFRAMES}</style>

            <div className="overflow-hidden motion-reduce:overflow-x-auto">
                <div className="flex w-max animate-[ticker-scroll_45s_linear_infinite] hover:paused motion-reduce:animate-none">
                    <TickerList items={tickerItems} />
                    <TickerList items={tickerItems} duplicate />
                </div>
            </div>
        </section>
    );
};

export default PriceTicker;
