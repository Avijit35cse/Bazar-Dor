import { AllProductsProps } from '@/types/allTypes';
import React from 'react';
import ProductCard from './ProductCard';

const AllProducts = ({ products }: AllProductsProps) => {
    return (
        <section
            id="সব-পণ্য"
            className="scroll-mt-24 bg-[#F0F5F0] px-4 pb-16 pt-10"
        >
            <div className="mx-auto w-full max-w-[1152px]">
                <div>
                    <h2 className="text-xl font-bold leading-[1.4] text-[#1d271f]">সব পণ্য</h2>
                    <p className="mt-3 text-sm font-normal leading-[1.5] text-[#1d271f]/70">
                        বাজারের নিত্যপ্রয়োজনীয় সব পণ্যের আজকের দাম দেখুন।
                    </p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllProducts;
