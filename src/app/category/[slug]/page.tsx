import { Suspense } from "react";
import type { Product } from "@/types/allTypes";
import CategoryProducts from "./categoryProducts";
import { notFound } from "next/navigation";

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
        notFound();
    }

    const category: Category = await response.json();

    const productsResponse = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
    );

    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await productsResponse.json();


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