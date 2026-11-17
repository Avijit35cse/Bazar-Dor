
type SpinnerProps = {
    className?: string;
};

type BrandLoaderProps = {
    label?: string;
    /** Inline, ticker/navbar sized variant. */
    compact?: boolean;
    className?: string;
};

/**
 * The app's only spinner. Rendered inside buttons and loaders so the
 * loading language stays identical everywhere.
 */
export const Spinner = ({
    className = "border-white/35 border-t-white",
}: SpinnerProps) => (
    <span
        aria-hidden="true"
        className={`inline-block h-4 w-4 shrink-0 rounded-full border-2 motion-safe:animate-spin ${className}`}
    />
);

/**
 * Branded loading indicator.
 * Animation is opt-in via `motion-safe`, so users with
 * `prefers-reduced-motion` get a static, still-legible state.
 */
export const BrandLoader = ({
    label = "বাজারদর লোড হচ্ছে...",
    compact = false,
    className = "",
}: BrandLoaderProps) => {
    if (compact) {
        return (
            <div
                role="status"
                aria-live="polite"
                className={`flex h-[37px] items-center justify-center gap-2 border-b border-[#e1e8e1] bg-[#fafcfa] px-4 ${className}`}
            >
                <Spinner className="h-3.5 w-3.5 border-[#cfe0d4] border-t-[#05893e]" />

                <span className="text-xs leading-none text-[#5d6b60]">
                    {label}
                </span>
            </div>
        );
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex w-full flex-col items-center justify-center px-4 py-16 text-center ${className}`}
        >
            <span
                aria-hidden="true"
                className="relative flex h-14 w-14 items-center justify-center"
            >
                <span className="absolute inset-0 rounded-full border-2 border-[#dbe8dd] border-t-[#05893e] motion-safe:animate-spin" />

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf6ec] text-lg leading-none">
                    🛒
                </span>
            </span>

            <span className="mt-3 text-base font-bold leading-6 tracking-[-0.3px] text-[#1d271f]">
                বাজার দর
            </span>

            <span className="mt-1 text-[13px] leading-5 text-[#5d6b60]">
                {label}
            </span>
        </div>
    );
};

export default BrandLoader;
