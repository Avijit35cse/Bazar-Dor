"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

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
        <section className="mt-[12px] rounded-[9px] border border-[#e2e9e2] bg-[#fafcfa] px-[22px] py-[17px]">
            {/* Section title */}
            <h2 className="text-[11px] font-semibold leading-4 text-[#1d271f]">
                তথ্য
            </h2>

            {/* Name */}
            <div className="mt-[17px]">
                <label
                    htmlFor="name"
                    className="mb-[6px] block text-[9px] font-medium leading-3 text-[#1d271f]"
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
                    className="h-[21px] w-full rounded-[5px] border border-[#dfe7df] bg-white px-2 text-[9px] text-[#1d271f] outline-none transition focus:border-[#05893e] focus:ring-1 focus:ring-[#05893e]"
                    placeholder="আপনার নাম"
                />
            </div>

            {/* Update button */}
            <button
                type="button"
                onClick={handleUpdateProfile}
                disabled={isSaving}
                className="mt-[9px] h-[22px] w-full rounded-[5px] bg-[#05893e] text-[9px] font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition hover:bg-[#047a37] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSaving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>

            {message && (
                <p className="mt-2 text-center text-[8px] text-[#5d6b60]">
                    {message}
                </p>
            )}
        </section>
    );
}

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();

    /* Loading */
    if (isPending) {
        return (
            <main className="min-h-[calc(100vh-120px)] bg-[#f1f6f1]">
                <div className="mx-auto flex min-h-[400px] max-w-[376px] items-center justify-center">
                    <p className="text-[10px] text-[#5d6b60]">
                        প্রোফাইল লোড হচ্ছে...
                    </p>
                </div>
            </main>
        );
    }

    /* Not logged in */
    if (!session?.user) {
        return (
            <main className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#f1f6f1] px-4">
                <div className="w-full max-w-[376px] rounded-[9px] border border-[#e2e9e2] bg-[#fafcfa] p-6 text-center">
                    <h1 className="text-base font-bold text-[#1d271f]">
                        লগইন করুন
                    </h1>

                    <p className="mt-2 text-[10px] text-[#5d6b60]">
                        প্রোফাইল দেখতে আগে লগইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-4 inline-flex h-8 items-center rounded-md bg-[#05893e] px-5 text-[10px] font-semibold text-white"
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
        <main className="min-h-[calc(100vh-120px)] bg-[#f1f6f1]">
            <div className="mx-auto w-full max-w-[1152px] px-4">
                <div className="mx-auto w-full max-w-[376px] pt-[73px] pb-[112px]">

                    {/* Page heading */}
                    <div className="mb-[20px]">
                        <h1 className="text-[15px] font-bold leading-[19px] text-[#1d271f]">
                            আমার প্রোফাইল
                        </h1>

                        <p className="mt-[1px] text-[8px] leading-[12px] text-[#7a857d]">
                            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                        </p>
                    </div>

                    {/* User information card */}
                    <section className="rounded-[9px] border border-[#e2e9e2] bg-[#fafcfa] px-[15px] py-[13px]">
                        <div className="flex items-center justify-between gap-3">

                            {/* Avatar + user info */}
                            <div className="flex min-w-0 items-center gap-[9px]">
                                <img
                                    src={avatar}
                                    alt={session.user.name || "User"}
                                    className="h-[43px] w-[43px] shrink-0 rounded-[8px] object-cover"
                                />

                                <div className="min-w-0">
                                    <h2 className="truncate text-[10px] font-semibold leading-[14px] text-[#1d271f]">
                                        {session.user.name ||
                                            "ব্যবহারকারী"}
                                    </h2>

                                    <p className="mt-[1px] truncate text-[8px] leading-[11px] text-[#7a857d]">
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
                                className="inline-flex h-[37px] shrink-0 items-center justify-center gap-[5px] rounded-[8px] border border-[#ef8585] bg-white px-[11px] text-[12px] font-medium leading-none text-[#d03739] transition-colors hover:bg-[#fff5f5]"
                            >
                                <ArrowLeft className="h-[12px] w-[12px] shrink-0" />
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