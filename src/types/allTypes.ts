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
    direction: "up" | "down" | "flat";
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

export type PriceMoverProps ={
    products : Product[]
}

export type ProductCardProps = {
    product: Product;
};

export type AllProductsProps = {
    products: Product[];
};