interface BotanicalSvgProps {
    className?: string;
}

export default function BotanicalSvg({ className = '' }: BotanicalSvgProps) {
    return (
        <svg
            width="120"
            height="220"
            viewBox="0 0 120 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            {/* Main stem */}
            <path
                d="M60 220 C60 180, 55 140, 58 100 C61 60, 50 30, 55 10"
                stroke="var(--inv-accent)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.5"
            />
            {/* Left leaves */}
            <path
                d="M58 160 C40 150, 20 155, 15 145 C10 135, 25 130, 45 140 C35 130, 15 125, 12 115 C9 105, 28 108, 50 125"
                stroke="var(--inv-accent)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
            />
            <path
                d="M56 110 C38 100, 22 105, 18 95 C14 85, 30 82, 48 95"
                stroke="var(--inv-accent)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
            />
            {/* Right leaves */}
            <path
                d="M60 140 C78 130, 95 135, 98 125 C101 115, 85 112, 68 125"
                stroke="var(--inv-accent)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
            />
            <path
                d="M58 80 C75 70, 90 75, 92 65 C94 55, 78 52, 62 68"
                stroke="var(--inv-accent)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
            />
            {/* Top bud */}
            <path
                d="M55 10 C48 5, 52 -2, 58 2 C64 -2, 68 5, 55 10"
                stroke="var(--inv-accent)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.4"
            />
            {/* Small berries */}
            <circle
                cx="15"
                cy="145"
                r="2.5"
                fill="var(--inv-accent)"
                opacity="0.2"
            />
            <circle
                cx="98"
                cy="125"
                r="2"
                fill="var(--inv-accent)"
                opacity="0.2"
            />
            <circle
                cx="18"
                cy="95"
                r="2"
                fill="var(--inv-accent)"
                opacity="0.15"
            />
            <circle
                cx="92"
                cy="65"
                r="2.5"
                fill="var(--inv-accent)"
                opacity="0.15"
            />
        </svg>
    );
}
