
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4 py-16">
            <div className="w-full max-w-md rounded-2xl border border-[#e2e9e2] bg-[#fafcfa] px-6 py-12 text-center shadow-sm">
                <p className="text-7xl font-extrabold tracking-tight text-[#05893e]">
                    404
                </p>

                <h1 className="mt-5 text-2xl font-bold text-[#1d271f]">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#7a857d]">
                    দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
                    পেজটি সরানো হতে পারে অথবা ঠিকানাটি ভুল হতে পারে।
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#05893e] px-6 text-sm font-semibold text-white transition hover:bg-[#047a37]"
                >
                    <Home size={17} />
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}
