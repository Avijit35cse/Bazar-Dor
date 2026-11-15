
import type { Product } from "@/types/allTypes";

const PRODUCTS_API =
    "https://openapi.programming-hero.com/api/bazardor/products";

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(PRODUCTS_API, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products: ${response.status}`
        );
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Invalid products API response");
    }

    return data as Product[];
};

export const getProductBySlug = async (
    slug: string
): Promise<Product | null> => {
    const products = await getProducts();

    const normalizedSlug = decodeURIComponent(slug)
        .trim()
        .toLowerCase();

    const product = products.find(
        (item) =>
            item.slug?.trim().toLowerCase() === normalizedSlug
    );

    return product ?? null;
};

export default getProducts;
