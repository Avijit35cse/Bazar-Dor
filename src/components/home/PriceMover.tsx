import { PriceMoverProps } from '@/types/allTypes';
import ProductCard from './ProductCard';

const PriceMover = ({ products }: PriceMoverProps) => {

    const increasedPoducts = products.filter(
        (product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const decreasedProducts = products.filter(
        (product) => product.change.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <section className="bg-white px-4 pt-10">
            <div className="mx-auto w-full max-w-[1152px]">
                <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold leading-[1.4] text-[#1d271f]">
                        <span
                            aria-hidden="true"
                            className="shrink-0 text-base leading-none text-[#d03739]"
                        >
                            ▲
                        </span>
                        <span>আজ দাম বেড়েছে</span>
                    </h2>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {increasedPoducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="flex items-center gap-2 text-xl font-bold leading-[1.4] text-[#1d271f]">
                        <span
                            aria-hidden="true"
                            className="shrink-0 text-base leading-none text-[#1a9951]"
                        >
                            ▼
                        </span>
                        <span>আজ দাম কমেছে</span>
                    </h2>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {decreasedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceMover;
