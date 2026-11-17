"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

type ErrorPageProps = {
    error: unknown;
    reset: () => void;
    retry?: () => void;
};

const ErrorPage = ({ error, reset, retry }: ErrorPageProps) => {
    useEffect(() => {
        // Logged for debugging only. The UI never shows raw error details.
        console.error(error);
    }, [error]);

    const handleRetry = () => {
        // Next 16 passes `retry` (re-fetches the failed segment, then clears
        // the error state) next to the older `reset`. Preferring `retry`
        // makes the button actually re-request the server data that failed,
        // which `reset` alone does not do.
        if (typeof retry === "function") {
            retry();
            return;
        }

        reset();
    };

    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4 py-16">
            <section
                role="alert"
                aria-labelledby="error-heading"
                className="w-full max-w-md rounded-2xl border border-[#e2e9e2] bg-[#fafcfa] px-6 py-12 text-center shadow-sm"
            >
                <span
                    aria-hidden="true"
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff5f5] text-[#d03739]"
                >
                    <AlertTriangle size={26} />
                </span>

                <h1
                    id="error-heading"
                    className="mt-5 text-2xl font-bold leading-[1.3] text-[#1d271f]"
                >
                    কিছু একটা সমস্যা হয়েছে!
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#5d6b60]">
                    দুঃখিত, তথ্য লোড করার সময় একটি সমস্যা দেখা দিয়েছে।
                    আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#05893e] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#047a37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa]"
                    >
                        <RotateCcw size={17} />
                        আবার চেষ্টা করুন
                    </button>

                    <Link
                        href="/"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#c8d5cb] bg-white px-6 text-sm font-semibold text-[#1d271f] transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa]"
                    >
                        <Home size={17} />
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;
