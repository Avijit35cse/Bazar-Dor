type PriceChange = {
    emoji: string;
    name: string;
    price: string;
    unit: string;
    change: string;
    direction: "up" | "down";
};

const TICKER_ITEMS: readonly PriceChange[] = [
    { emoji: "🍚", name: "স্বর্ণমাছি চাল", price: "১৪৮", unit: "কেজি", change: "২.১", direction: "up" },
    { emoji: "🍚", name: "মিনিকেট চাল", price: "৯৯", unit: "কেজি", change: "২.৯", direction: "down" },
    { emoji: "🍚", name: "বাটাম সাইজ চাল", price: "৬৬", unit: "কেজি", change: "৩.১", direction: "up" },
    { emoji: "🫘", name: "মসুর ডাল", price: "১৪২", unit: "কেজি", change: "২.৯", direction: "up" },
    { emoji: "🫘", name: "ছোলা", price: "১২০", unit: "কেজি", change: "২.৪", direction: "down" },
    { emoji: "🫘", name: "আমন ডাল (খোসাসিলা)", price: "১৫৬", unit: "কেজি", change: "২.৬", direction: "up" },
    { emoji: "🛢️", name: "সয়াবিন তেল", price: "১৭৫", unit: "লিটার", change: "১.৮", direction: "down" },
    { emoji: "🥬", name: "আলু", price: "৩২", unit: "কেজি", change: "৪.২", direction: "up" },
    { emoji: "🐟", name: "ইলিশ মাছ", price: "১৪০০", unit: "কেজি", change: "৩.৫", direction: "down" },
    { emoji: "🥚", name: "ডিম", price: "১২", unit: "পিস", change: "২.০", direction: "up" },
];

const TICKER_KEYFRAMES = `
    @keyframes ticker-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    }
`;

const TickerList = ({ duplicate = false }: { duplicate?: boolean }) => (
    <ul
        aria-hidden={duplicate || undefined}
        className={`flex shrink-0 ${duplicate ? "motion-reduce:hidden" : ""}`}
    >
        {TICKER_ITEMS.map((item) => (
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
                        item.direction === "up" ? "text-[#1a9951]" : "text-[#d03739]"
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

const PriceTicker = () => (
    <section
        aria-label="আজকের দামের পরিবর্তন"
        className="w-full border-b border-[#e1e8e1] bg-[#fafcfa]"
    >
        <style>{TICKER_KEYFRAMES}</style>
        <div className="overflow-hidden motion-reduce:overflow-x-auto">
            <div className="flex w-max animate-[ticker-scroll_45s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
                <TickerList />
                <TickerList duplicate />
            </div>
        </div>
    </section>
);

export default PriceTicker;
