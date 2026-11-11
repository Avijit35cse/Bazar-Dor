"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
    id: string;
    label: string;
    placeholder: string;
    autoComplete: "new-password";
};

const inputClassName =
    "h-11 w-full rounded-lg border border-[#e1e8e1] bg-white px-3.5 text-sm text-[#1d271f] placeholder:text-[#9aa79f] transition-colors hover:border-[#c8d5cb] focus:border-[#05893e] focus:outline-none focus:ring-4 focus:ring-[#05893e]/10";

const PasswordField = ({
    id,
    label,
    placeholder,
    autoComplete,
}: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-[13px] font-semibold text-[#1d271f]"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`${inputClassName} pr-11`}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((isVisible) => !isVisible)}
                    aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-1 my-auto flex h-8 w-8 items-center justify-center rounded-md text-[#66756b] transition-colors hover:bg-[#f0f5f0] hover:text-[#05893e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e]"
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                </button>
            </div>
        </div>
    );
};

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.62v3h3.86c2.26-2.09 3.58-5.17 3.58-8.86Z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
        />
        <path
            fill="#FBBC05"
            d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
        />
        <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
        />
    </svg>
);

const GitHubIcon = () => (
    <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
);

const SocialButton = ({
    icon,
    label,
}: {
    icon: ReactNode;
    label: string;
}) => (
    <button
        type="button"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#e1e8e1] bg-[#fafcfa] px-3 text-[13px] font-semibold text-[#1d271f] transition-all hover:border-[#c8d5cb] hover:bg-[#f0f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] active:scale-[0.99]"
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default function SignUpPage() {
    return (
        <div className="flex min-h-[calc(100vh-220px)] w-full items-start justify-center bg-[#f0f5f0] px-4 py-10 sm:py-14">
            <div className="w-full max-w-[430px]">
                <header className="flex flex-col items-center text-center">
                    
                    <h1
                        id="sign-up-heading"
                        className="mt-6 text-[26px] font-bold leading-tight tracking-[-0.5px] text-[#1d271f] sm:text-[28px]"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 max-w-[330px] text-sm leading-6 text-[#66756b]">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </header>

                <section
                    aria-labelledby="sign-up-heading"
                    className="mt-7 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 shadow-[0_20px_45px_-30px_rgba(29,39,31,0.35)] sm:p-7"
                >
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="full-name"
                                className="mb-2 block text-[13px] font-semibold text-[#1d271f]"
                            >
                                নাম
                            </label>
                            <input
                                id="full-name"
                                name="full-name"
                                type="text"
                                placeholder="যেমন: রহিম উদ্দিন"
                                autoComplete="name"
                                className={inputClassName}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-[13px] font-semibold text-[#1d271f]"
                            >
                                ইমেইল
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                spellCheck={false}
                                className={inputClassName}
                            />
                        </div>

                        <PasswordField
                            id="password"
                            label="পাসওয়ার্ড"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="new-password"
                        />

                        <PasswordField
                            id="confirm-password"
                            label="পাসওয়ার্ড নিশ্চিত করুন"
                            placeholder="আবার লিখুন"
                            autoComplete="new-password"
                        />
                    </div>

                    <button
                        type="button"
                        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#05893e] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-12px_rgba(5,137,62,0.9)] transition-all hover:bg-[#047f39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa] active:scale-[0.995]"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>

                    <div className="my-6 flex items-center gap-3 text-xs font-medium text-[#8a978e]">
                        <span className="h-px flex-1 bg-[#e1e8e1]" aria-hidden="true" />
                        <span>অথবা</span>
                        <span className="h-px flex-1 bg-[#e1e8e1]" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
                        <SocialButton icon={<GoogleIcon />} label="Google দিয়ে চালিয়ে যান" />
                        <SocialButton icon={<GitHubIcon />} label="GitHub দিয়ে চালিয়ে যান" />
                    </div>

                    <p className="mt-6 border-t border-[#e1e8e1] pt-5 text-center text-[13.5px] text-[#66756b]">
                            অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="rounded font-semibold text-[#05893e] transition-colors hover:text-[#047f39] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafcfa]"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </section>

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 rounded-md text-[13px] font-semibold text-[#66756b] transition-colors hover:text-[#05893e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] focus-visible:ring-offset-2"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
}
