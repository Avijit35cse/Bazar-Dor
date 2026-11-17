import BrandLoader from "@/components/shared/BrandLoader";

export default function Loading() {
    return (
        <div className="flex min-h-[calc(100vh-220px)] w-full items-center justify-center bg-[#f0f5f0] px-4">
            <BrandLoader />
        </div>
    );
}
