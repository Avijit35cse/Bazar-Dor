"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import SignOutIcon from "@/components/shared/SignOutIcon";

type ProfileFormProps = {
    initialName: string;
};

function ProfileForm({ initialName }: ProfileFormProps) {
    const [name, setName] = useState(initialName);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpdateProfile = async () => {
        if (!name.trim()) {
            setMessage("নাম লিখুন");
            return;
        }

        setIsSaving(true);
        setMessage("");

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                setMessage(
                    error.message || "প্রোফাইল আপডেট করা যায়নি"
                );
                return;
            }

            setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে");
        } catch {
            setMessage("প্রোফাইল আপডেট করা যায়নি");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="mt-7 rounded-[14px] border border-[#e2e9e2] bg-[#fafcfa] px-5 pb-10 pt-5 sm:px-6">
            {/* Section title */}
            <h2 className="text-base font-semibold leading-6 text-[#1d271f]">
                তথ্য
            </h2>

            <div className="mt-8 px-1 sm:mt-9 sm:px-3">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-1 block text-[13px] font-medium leading-5 text-[#1d271f]"
                    >
                        নাম
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setMessage("");
                        }}
                        className="h-10 w-full rounded-md border border-[#dfe7df] bg-white px-3 text-[13px] text-[#1d271f] outline-none transition focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e] sm:h-9"
                        placeholder="আপনার নাম"
                    />
                </div>

                {/* Update button */}
                <button
                    type="button"
                    onClick={handleUpdateProfile}
                    disabled={isSaving}
                    className="mt-6 h-10 w-full rounded-md bg-[#05893e] text-[13px] font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.14)] transition hover:bg-[#047a37] disabled:cursor-not-allowed disabled:opacity-60 sm:h-9"
                >
                    {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>

                {message && (
                    <p className="mt-3 text-center text-xs text-[#5d6b60]">
                        {message}
                    </p>
                )}
            </div>
        </section>
    );
}

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    /* Loading */
    if (isPending) {
        return (
            <main className="min-h-[calc(100vh-120px)] bg-[#f0f5f0]">
                <div className="mx-auto flex min-h-[400px] max-w-[736px] items-center justify-center">
                    <p className="text-[13px] text-[#5d6b60]">
                        প্রোফাইল লোড হচ্ছে...
                    </p>
                </div>
            </main>
        );
    }

    /* Not logged in */
    if (!session?.user) {
        return (
            <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#f0f5f0] px-4">
                <div className="w-full max-w-[420px] rounded-[14px] border border-[#e2e9e2] bg-[#fafcfa] p-8 text-center">
                    <h1 className="text-xl font-bold text-[#1d271f]">
                        লগইন করুন
                    </h1>

                    <p className="mt-2 text-[13px] text-[#5d6b60]">
                        প্রোফাইল দেখতে আগে লগইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-5 inline-flex h-10 items-center rounded-md bg-[#05893e] px-5 text-[13px] font-semibold text-white"
                    >
                        সাইন ইন
                    </Link>
                </div>
            </main>
        );
    }

    const avatar =
        session.user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            session.user.name || "User"
        )}&background=e7efe8&color=1d271f`;

    return (
        <main className="min-h-[calc(100vh-246px)] bg-[#f0f5f0] sm:min-h-[calc(100vh-217px)]">
            <div className="mx-auto w-full max-w-[1152px] px-4">
                <div className="mx-auto w-full max-w-[736px] pt-12 pb-16 sm:pt-[136px] sm:pb-24">

                    {/* Page heading */}
                    <div className="mb-7">
                        <h1 className="text-xl font-bold leading-7 tracking-[-0.2px] text-[#1d271f] sm:text-[28px] sm:leading-[30px]">
                            আমার প্রোফাইল
                        </h1>

                        <p className="text-xs leading-[18px] text-[#7a857d] sm:text-[13px]">
                            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                        </p>
                    </div>

                    {/* User information card */}
                    <section className="rounded-[14px] border border-[#e2e9e2] bg-[#fafcfa] p-5 sm:px-7 sm:py-7">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

                            {/* Avatar + user info */}
                            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                                <img
                                    src={avatar}
                                    alt={session.user.name || "User"}
                                    className="h-14 w-14 shrink-0 rounded-[10px] object-cover sm:h-16 sm:w-16"
                                />

                                <div className="min-w-0">
                                    <h2 className="truncate text-base font-semibold leading-6 text-[#1d271f] sm:text-lg sm:leading-[24px]">
                                        {session.user.name ||
                                            "ব্যবহারকারী"}
                                    </h2>

                                    <p className="mt-0.5 truncate text-[13px] leading-5 text-[#7a857d] sm:text-sm">
                                        {session.user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Sign out */}
                            <button
                                type="button"
                                onClick={async () => {
                                    await authClient.signOut();
                                    window.location.href = "/";
                                }}
                                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-[10px] border border-[#ef8585] bg-white px-4 text-[13px] font-medium leading-none text-[#d03739] transition-colors hover:bg-[#fff5f5] sm:h-[50px] sm:self-auto sm:px-5 sm:text-sm"
                            >
                                <SignOutIcon className="h-[18px] w-[18px] shrink-0" />
                                সাইন আউট
                            </button>
                        </div>
                    </section>

                    {/* Profile information */}
                    <ProfileForm
                        key={session.user.id}
                        initialName={session.user.name || ""}
                    />
                </div>
            </div>
        </main>
    );
}
