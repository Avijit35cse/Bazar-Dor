import Image from "next/image";

const FilterIcon = () => (
    <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        aria-hidden="true"
    >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="9" cy="6" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="9" cy="18" r="2.4" fill="currentColor" stroke="none" />
    </svg>
);

const Hero = () => {
    return (
        <section className="bg-[#f0f5f0] px-4 py-4">
            <div className="mx-auto w-full max-w-[1152px] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] px-4 py-4 shadow-[0_1px_2px_rgba(23,58,36,0.03)] sm:py-2.5">
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:gap-7">
                    {/* Left Content */}
                    <div className="min-w-0">
                        {/* Bengali Date Badge */}
                        <div className="flex">
                            <span className="inline-flex items-center rounded-full bg-[#eaf6ec] px-3 py-0.5 text-[10px] font-medium leading-[15px] text-[#2f7d3f]">
                                মঙ্গলবার, ৬ আগস্ট, ২০২৬
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mt-2.5 text-[24px] font-bold leading-[1.1] tracking-[-0.3px] text-[#1d271f] sm:text-[28px]">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        {/* Description */}
                        <p className="mt-2 max-w-[440px] text-[11.5px] leading-[1.55] text-[#66756b] sm:text-[10.5px] sm:leading-[1.35]">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও ফলসহ নিত্যপ্রয়োজনীয় দাম — বাজারভিত্তিক বিস্তারিত, গত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক নজরে।
                        </p>

                        {/* CTA */}
                        <a
                            href="#সব-পণ্য"
                            className="mt-[18px] inline-flex items-center gap-1.5 rounded-md bg-[#05893e] px-3 py-1.5 text-[11px] font-semibold leading-[13px] text-white transition-colors hover:bg-[#096a2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b7d34] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefb] sm:px-2.5 sm:text-[10.5px]"
                        >
                            <FilterIcon />
                            সব দাম দেখুন
                        </a>
                    </div>

                    {/* Right Illustration */}
                    <div className="flex justify-center md:justify-end">
                        <Image
                            src="/bazar-hero.png"
                            alt="তাজা বাজারের পণ্য"
                            width={315}
                            height={263}
                            priority
                            sizes="(max-width: 767px) 190px, 200px"
                            className="h-auto w-[190px] object-contain sm:w-[200px] md:-translate-y-3"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
