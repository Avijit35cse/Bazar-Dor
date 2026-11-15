type SignOutIconProps = {
    className?: string;
};

const SignOutIcon = ({ className }: SignOutIconProps) => (
    <svg
        viewBox="0 0 20 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className={className}
    >
        <path d="M1.5 9.5H12.5C16.1 9.5 19 6.6 19 3V2" />
        <path d="m6.5 4.5-5 5 5 5" />
    </svg>
);

export default SignOutIcon;
