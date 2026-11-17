"use client";

import { Suspense, useSyncExternalStore } from "react";
import Link from "next/link";

import CategoryNav from "@/components/layout/CategoryNav";
import BanglaDate from "../shared/BanglaDate";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropDown";
import { CategoryNavSkeleton } from "@/components/shared/Skeletons";

type NavbarProps = {
    isLoggedIn?: boolean;
};

const BRAND_NAME = "বাজার দর";

const subscribe = () => () => {};

const getClientSnapshot = () => true;

const getServerSnapshot = () => false;

const Logo = () => (
    <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#05893e] sm:h-10 sm:w-10"
        aria-hidden="true"
    >
        <span className="text-base leading-none sm:text-[18px]">🛒</span>
    </div>
);

const Brand = () => (
    <Link
        href="/"
        className="flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2"
        aria-label="বাজার দর - হোম"
    >
        <Logo />

        <div className="flex min-w-0 flex-col">
            <span className="text-base font-bold leading-[1.4] tracking-[-0.5px] text-[#1d271f] sm:text-xl">
                {BRAND_NAME}
            </span>

            <BanglaDate className="min-h-3.5 text-[10px] leading-[1.333] text-[#1d271f] sm:min-h-4 sm:text-xs" />
        </div>
    </Link>
);

const AuthButtons = () => (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-[9px]">
        <Link
            href="/sign-in"
            className="inline-flex h-8 items-center justify-center rounded-lg px-2 text-[11px] font-semibold text-[#1d271f] transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:w-[90px] sm:px-0 sm:text-sm"
        >
            সাইন ইন
        </Link>

        <Link
            href="/sign-up"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-[#047f39] bg-[#05893e] px-2 text-[11px] font-semibold text-[#f3fbf4] transition-colors hover:bg-[#047f39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:w-[92px] sm:px-0 sm:text-sm"
        >
            সাইন আপ
        </Link>
    </div>
);

const Navbar = (_props: NavbarProps) => {
    const { data: session, isPending } = authClient.useSession();

    const isMounted = useSyncExternalStore(
        subscribe,
        getClientSnapshot,
        getServerSnapshot
    );

    const isLoading = !isMounted || isPending;

    return (
        <header className="sticky top-0 z-40 border-b border-[#e1e8e1] bg-[#fafcfa]">
            <div className="mx-auto flex h-16 w-full max-w-[1164px] items-center justify-between gap-2 px-3 sm:h-[68px] sm:gap-3 sm:px-4">
                <Brand />

                {isLoading ? (
                    <div
                        className="h-9 w-24 shrink-0 animate-pulse rounded-lg bg-[#e1e8e1]"
                        aria-label="লোড হচ্ছে"
                    />
                ) : session?.user ? (
                    <ProfileDropdown
                        user={{
                            name: session.user.name || "ব্যবহারকারী",
                            email: session.user.email,
                            image: session.user.image,
                        }}
                    />
                ) : (
                    <AuthButtons />
                )}
            </div>

            <Suspense fallback={<CategoryNavSkeleton />}>
                <CategoryNav />
            </Suspense>
        </header>
    );
};

export default Navbar;