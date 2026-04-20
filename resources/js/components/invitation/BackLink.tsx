interface BackLinkProps {
    onClick: () => void;
}

export default function BackLink({ onClick }: BackLinkProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group inline-flex items-center gap-3 py-3 text-lg italic text-wedding-red transition-opacity hover:opacity-70"
        >
            <svg
                width="22"
                height="11"
                viewBox="0 0 24 12"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-1"
            >
                <path d="M23 6H2M7 1.5 2 6l5 4.5" />
            </svg>
            <span>Πίσω</span>
        </button>
    );
}
