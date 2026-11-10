
import { Product } from "@/types/allTypes";

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await response.json();

    return products;
};

export const getProductBySlug = async (
    slug: string
): Promise<Product | null> => {
    const products = await getProducts();

    const product = products.find(
        (item) => item.slug === slug
    );

    return product ?? null;
};

export default getProducts;
