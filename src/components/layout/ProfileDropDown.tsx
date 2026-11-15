
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronDown,
    UserCircle,
    UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import SignOutIcon from "@/components/shared/SignOutIcon";

type ProfileDropdownProps = {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
};

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
    const router = useRouter();
    const menuRef = useRef < HTMLDivElement > (null);

    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

   
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        setErrorMessage("");

        try {
            const { error } = await authClient.signOut();

            if (error) {
                setErrorMessage(
                    error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            setIsOpen(false);
            router.push("/");
            router.refresh();
        } catch {
            setErrorMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsSigningOut(false);
        }
    };

    return (
        <div ref={menuRef} className="relative shrink-0">
            {/* Avatar + Name + Chevron */}
            <button
                type="button"
                onClick={() => setIsOpen((previous) => !previous)}
                aria-label="প্রোফাইল মেনু খুলুন"
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="flex h-9 max-w-[180px] items-center gap-1.5 rounded-lg px-1.5 transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] sm:h-10 sm:gap-2 sm:px-2"
            >
                <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#05893e] bg-cover bg-center sm:h-9 sm:w-9"
                    style={
                        user.image
                            ? { backgroundImage: `url("${user.image}")` }
                            : undefined
                    }
                >
                    {!user.image && (
                        <UserRound
                            className="h-4 w-4 text-white sm:h-5 sm:w-5"
                            aria-hidden="true"
                        />
                    )}
                </span>

                <span className="hidden max-w-[90px] truncate text-sm font-medium text-[#1d271f] sm:block">
                    {user.name}
                </span>

                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#66756b] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    aria-hidden="true"
                />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full z-50 mt-1 w-[256px] max-w-[calc(100vw_-_1.5rem)] overflow-hidden rounded-[14px] border border-[#e1e8e1] bg-[#fafcfa] shadow-[0_12px_32px_-10px_rgba(29,39,31,0.28)]"
                    role="menu"
                >
                    {/* User Information */}
                    <div className="border-b border-[#e8eee8] px-4 py-3.5">
                        <p className="truncate text-[15px] font-semibold leading-[22px] text-[#1d271f]">
                            {user.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs leading-[18px] text-[#7b887f]">
                            {user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2.5">
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            role="menuitem"
                            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium leading-5 text-[#1d271f] transition-colors hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e]"
                        >
                            <UserCircle
                                className="h-4 w-4 shrink-0 text-[#66756b]"
                                aria-hidden="true"
                            />
                            আমার প্রোফাইল
                        </Link>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            role="menuitem"
                            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm font-medium leading-5 text-[#d03739] transition-colors hover:bg-[#fdf2f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <SignOutIcon className="h-[18px] w-[18px] shrink-0" />
                            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                        </button>

                        {errorMessage && (
                            <p className="px-2.5 pb-1 pt-1 text-xs text-red-600">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
