
type SkeletonBlockProps = {
    className?: string;
};

type ProductGridSkeletonProps = {
    count?: number;
    className?: string;
};

const SkeletonBlock = ({ className = "" }: SkeletonBlockProps) => (
    <span
        aria-hidden="true"
        className={`block rounded-md bg-[#e6ede7] motion-safe:animate-pulse ${className}`}
    />
);

/** Mirrors the layout of a real ProductCard so nothing shifts on swap. */
export const ProductCardSkeleton = () => (
    <div
        aria-hidden="true"
        className="flex h-full flex-col gap-3 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4"
    >
        <div className="flex items-start gap-3">
            <SkeletonBlock className="h-12 w-12 rounded-xl" />

            <div className="min-w-0 flex-1 space-y-2 pt-1">
                <SkeletonBlock className="h-4 w-3/4" />
                <SkeletonBlock className="h-3 w-1/3" />
            </div>
        </div>

        <div className="flex items-end justify-between gap-2">
            <div className="space-y-2">
                <SkeletonBlock className="h-3 w-16" />
                <SkeletonBlock className="h-5 w-24" />
            </div>

            <SkeletonBlock className="h-6 w-14 rounded-full" />
        </div>
    </div>
);

export const ProductGridSkeleton = ({
    count = 6,
    className = "",
}: ProductGridSkeletonProps) => (
    <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
        {Array.from({ length: count }, (_, index) => (
            <ProductCardSkeleton key={index} />
        ))}
    </div>
);

/** Suspense fallback for the home page's product sections. */
export const HomeProductsSkeleton = () => (
    <section
        role="status"
        aria-live="polite"
        className="bg-[#f0f5f0] px-4 pb-16 pt-10"
    >
        <span className="sr-only">পণ্যের দাম লোড হচ্ছে...</span>

        <div className="mx-auto w-full max-w-[1152px]">
            <SkeletonBlock className="h-6 w-40" />
            <ProductGridSkeleton count={6} className="mt-3" />

            <SkeletonBlock className="mt-10 h-6 w-40" />
            <ProductGridSkeleton count={6} className="mt-3" />

            <SkeletonBlock className="mt-10 h-6 w-24" />
            <SkeletonBlock className="mt-3 h-3 w-64 max-w-full" />
            <ProductGridSkeleton count={6} className="mt-4" />
        </div>
    </section>
);

/** Hero-shaped placeholder so the home page keeps its frame while streaming. */
const HeroSkeleton = () => (
    <section className="bg-[#f0f5f0] px-4 py-4">
        <div className="mx-auto w-full max-w-[1152px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-4 shadow-[0_1px_2px_rgba(23,58,36,0.03)] sm:py-2.5">
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:gap-7">
                <div className="min-w-0">
                    <SkeletonBlock className="h-[22px] w-32 rounded-full" />
                    <SkeletonBlock className="mt-2.5 h-7 w-72 max-w-full" />
                    <SkeletonBlock className="mt-2 h-3 w-full max-w-[440px]" />
                    <SkeletonBlock className="mt-1.5 h-3 w-4/5 max-w-[360px]" />
                    <SkeletonBlock className="mt-[18px] h-[29px] w-32 rounded-md" />
                </div>

                <div className="flex justify-center md:justify-end">
                    <SkeletonBlock className="h-[160px] w-[190px] rounded-xl sm:w-[200px] md:-translate-y-3" />
                </div>
            </div>
        </div>
    </section>
);

/** Used by (home)/loading.tsx – mirrors the real Hero + product sections. */
export const HomePageSkeleton = () => (
    <div>
        <HeroSkeleton />
        {/* Owns the single live region for the whole page placeholder. */}
        <HomeProductsSkeleton />
    </div>
);

/** Used by category/[slug]/loading.tsx and the category Suspense boundary. */
export const CategoryPageSkeleton = () => (
    <section
        role="status"
        aria-live="polite"
        className="min-h-[calc(100vh-13.5rem)] bg-[#f0f5f0] pb-16 pt-6"
    >
        <span className="sr-only">ক্যাটাগরির পণ্য লোড হচ্ছে...</span>

        <div className="mx-auto w-full max-w-[1152px] px-4">
            <div className="flex items-center gap-2 rounded-xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-[18px]">
                <SkeletonBlock className="h-11 w-11 rounded-xl" />

                <div className="w-full space-y-2">
                    <SkeletonBlock className="h-5 w-32" />
                    <SkeletonBlock className="h-3 w-48 max-w-full" />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 rounded-xl border border-[#e1e8e1] bg-[#fafcfa] px-9 py-[17px]">
                <SkeletonBlock className="h-4 w-12" />
                <SkeletonBlock className="h-8 w-20 rounded-lg" />
            </div>

            <SkeletonBlock className="mt-3 h-3 w-44 max-w-full" />
            <ProductGridSkeleton count={6} className="mt-5" />
        </div>
    </section>
);

/** Used by product/[slug]/loading.tsx and the product Suspense boundary. */
export const ProductDetailsSkeleton = () => (
    <div
        role="status"
        aria-live="polite"
        className="min-h-screen bg-[#f0f5f0]"
    >
        <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</span>

        <div className="mx-auto w-full max-w-[1152px] px-4 pb-16 pt-8">
            <SkeletonBlock className="h-4 w-56 max-w-full" />

            <div className="mt-[34px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                        <SkeletonBlock className="h-16 w-16 rounded-2xl sm:h-20 sm:w-20" />

                        <div className="w-full space-y-2">
                            <SkeletonBlock className="h-7 w-48 max-w-full" />
                            <SkeletonBlock className="h-4 w-36 max-w-full" />
                            <SkeletonBlock className="h-4 w-56 max-w-full" />
                        </div>
                    </div>

                    <SkeletonBlock className="h-[92px] w-full shrink-0 rounded-2xl sm:w-[117px]" />
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
                <SkeletonBlock className="h-5 w-36" />

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div
                            key={index}
                            className="space-y-2 rounded-xl border border-[#e7eee7] px-6 py-4"
                        >
                            <SkeletonBlock className="h-3 w-20" />
                            <SkeletonBlock className="h-6 w-24" />
                            <SkeletonBlock className="h-3 w-28 max-w-full" />
                        </div>
                    ))}
                </div>

                <SkeletonBlock className="mt-5 h-5 w-52 max-w-full" />

                <div className="mt-3 space-y-3 rounded-lg border border-[#e7eee7] px-4 py-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <SkeletonBlock key={index} className="h-4 w-full" />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

/** Used by profile/loading.tsx – mirrors the heading, account card and form. */
export const ProfileSkeleton = () => (
    <main
        role="status"
        aria-live="polite"
        className="min-h-[calc(100vh-246px)] bg-[#f0f5f0] sm:min-h-[calc(100vh-217px)]"
    >
        <span className="sr-only">প্রোফাইল লোড হচ্ছে...</span>

        <div className="mx-auto w-full max-w-[1152px] px-4">
            <div className="mx-auto w-full max-w-[736px] pb-16 pt-12 sm:pb-24 sm:pt-[136px]">
                <div className="mb-7 space-y-2">
                    <SkeletonBlock className="h-7 w-40 max-w-full" />
                    <SkeletonBlock className="h-3 w-56 max-w-full" />
                </div>

                <section className="rounded-[14px] border border-[#e2e9e2] bg-[#fafcfa] p-5 sm:px-7 sm:py-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                            <SkeletonBlock className="h-14 w-14 shrink-0 rounded-[10px] sm:h-16 sm:w-16" />

                            <div className="min-w-0 flex-1 space-y-2">
                                <SkeletonBlock className="h-5 w-36 max-w-full" />
                                <SkeletonBlock className="h-3.5 w-48 max-w-full" />
                            </div>
                        </div>

                        <SkeletonBlock className="h-11 w-full shrink-0 rounded-[10px] sm:h-[50px] sm:w-28" />
                    </div>
                </section>

                <section className="mt-7 rounded-[14px] border border-[#e2e9e2] bg-[#fafcfa] px-5 pb-10 pt-5 sm:px-6">
                    <SkeletonBlock className="h-5 w-14" />

                    <div className="mt-8 space-y-6 px-1 sm:mt-9 sm:px-3">
                        <div className="space-y-2">
                            <SkeletonBlock className="h-3 w-10" />
                            <SkeletonBlock className="h-10 w-full rounded-md sm:h-9" />
                        </div>

                        <SkeletonBlock className="h-10 w-full rounded-md sm:h-9" />
                    </div>
                </section>
            </div>
        </div>
    </main>
);

/** Shared by Navbar's Suspense fallback and CategoryNav's fetch state. */
export const CategoryNavSkeleton = () => (
    <div
        role="status"
        aria-live="polite"
        className="border-t border-[#f0f5f0] bg-[#fafcfa]"
    >
        <span className="sr-only">ক্যাটাগরি লোড হচ্ছে...</span>

        <div className="mx-auto flex w-full max-w-[1152px] items-center gap-1 overflow-hidden px-4 py-2">
            {["w-16", "w-20", "w-14", "w-24", "w-16", "w-20"].map(
                (width, index) => (
                    <span
                        key={index}
                        aria-hidden="true"
                        className={`h-8 shrink-0 rounded-lg bg-[#eef3ee] motion-safe:animate-pulse ${width}`}
                    />
                )
            )}
        </div>
    </div>
);
