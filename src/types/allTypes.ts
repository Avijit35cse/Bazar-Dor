export type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

export type ProductChange = {
    pct: number;
    dir: "up" | "down";
};

export type PriceChange = {
    emoji: string;
    name: string;
    price: number;
    unit: string;
    change: number;
    direction: "up" | "down";
};

export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: ProductChange;
    markets: Market[];
};