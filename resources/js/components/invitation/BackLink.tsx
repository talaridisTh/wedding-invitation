interface BackLinkProps {
    onClick: () => void;
}

export default function BackLink({ onClick }: BackLinkProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 border-2 border-wedding-red px-5 py-2 text-xs font-light tracking-[0.2em] text-wedding-red uppercase transition-colors hover:bg-wedding-red/5"
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Πίσω
        </button>
    );
}
