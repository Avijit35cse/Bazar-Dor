import { Suspense } from "react";
import type { Product } from "@/types/allTypes";
import CategoryProducts from "./categoryProducts";


type Category = {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
};

type CategoryPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const CategoryContent = async ({ params }: CategoryPageProps) => {
    const { slug } = await params;
    const response = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch category");
    }

    const category: Category = await response.json();

    const productsResponse = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
    );
    
    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await productsResponse.json();

    // এই লাইনে যোগ করো
console.log(JSON.stringify(products[0], null, 2));

    return <CategoryProducts products={products} />;
};

const CategoryDetailsPage = ({ params }: CategoryPageProps) => {
    return (
        <Suspense fallback={<div>Loading category...</div>}>
            <CategoryContent params={params} />
        </Suspense>
    );
};

export default CategoryDetailsPage;