"use client";

import { Suspense, useSyncExternalStore } from "react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";

import CategoryNav from "@/components/layout/CategoryNav";

type NavbarProps = {
    isLoggedIn?: boolean;
};

const BRAND_NAME = "বাজার দর";

const banglaDateFormatter = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    numberingSystem: "beng",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});

const formatBanglaDate = (date: Date) => banglaDateFormatter.format(date);

const subscribeToNothing = () => () => {};

const getClientDate = () => formatBanglaDate(new Date());
const getServerDate = () => null;

const Logo = () => (
    <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#05893e] sm:h-10 sm:w-10"
        aria-hidden="true"
    >
        <span className="text-base leading-none sm:text-[18px]">🛒</span>
    </div>
);

const BanglaDate = () => {
    // Reads the current date only in the browser, so prerendering stays stable.
    const today = useSyncExternalStore(
        subscribeToNothing,
        getClientDate,
        getServerDate
    );

    return (
        <p className="min-h-3.5 text-[10px] leading-[1.333] text-[#1d271f] sm:min-h-4 sm:text-xs">
            {today}
        </p>
    );
};

const Brand = () => (
    <div className="flex min-w-0 items-center gap-2">
        <Logo />

        <div className="flex min-w-0 flex-col">
            <span className="text-base font-bold leading-[1.4] tracking-[-0.5px] text-[#1d271f] sm:text-xl">
                {BRAND_NAME}
            </span>

            <BanglaDate />
        </div>
    </div>
);

const AuthButtons = () => (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-[9px]">
        <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-lg px-2 text-[11px] font-semibold text-[#1d271f] transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:w-[90px] sm:px-0 sm:text-sm"
        >
            সাইন ইন
        </button>

        <button
            type="button"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] px-2 text-[11px] font-semibold text-[#f3fbf4] transition-colors hover:bg-[#047f39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:w-[92px] sm:px-0 sm:text-sm"
        >
            সাইন আপ
        </button>
    </div>
);

const ProfileMenuPlaceholder = () => (
    <div className="flex shrink-0 items-center gap-1">
        <button
            type="button"
            aria-label="প্রোফাইল মেনু (শীঘ্রই আসছে)"
            className="inline-flex h-8 items-center gap-2 rounded-lg px-1 transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:px-1.5"
        >
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#05893e] sm:h-9 sm:w-9">
                <UserRound className="h-4 w-4 text-[#f3fbf4] sm:h-5 sm:w-5" aria-hidden="true" />
            </span>

            <span className="hidden text-sm font-medium text-[#1d271f] sm:block">
                
            </span>

            <ChevronDown
                className="hidden h-4 w-4 text-[#1d271f] sm:block"
                aria-hidden="true"
            />
        </button>

        <button
            type="button"
            aria-label="সাইন আউট (শীঘ্রই আসছে)"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#1d271f] transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:w-10"
        >
            <LogOut className="h-4 w-4" aria-hidden="true" />
        </button>
    </div>
);



const Navbar = ({ isLoggedIn = false }: NavbarProps) => (
    <>
        <header className="sticky top-0 z-40 border-b border-[#e1e8e1] bg-[#fafcfa]">
            <div className="mx-auto flex h-16 w-full max-w-[1164px] items-center justify-between gap-2 px-3 sm:h-[68px] sm:gap-3 sm:px-4">
                <Brand />

                {isLoggedIn ? <ProfileMenuPlaceholder /> : <AuthButtons />}
            </div>
            <Suspense fallback={<div className="h-12" />}>
                <CategoryNav />
            </Suspense>
            
        </header>

    </>
);

export default Navbar;
