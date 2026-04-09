const gold = 'var(--inv-accent)';
const light = 'rgba(250, 245, 238, 0.3)';

/** Small branch curving right — for top-left corners */
export function BranchTopLeft({ className = '' }: { className?: string }) {
    return (
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className={className} aria-hidden="true">
            <path d="M30 78 C30 55, 28 40, 25 25 C22 10, 18 5, 15 2" stroke={gold} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
            <path d="M25 50 C18 45, 10 47, 8 42 C6 37, 14 36, 22 42" stroke={gold} strokeWidth="0.7" fill="none" opacity="0.3" />
            <path d="M24 35 C17 30, 12 33, 10 28 C8 23, 16 22, 22 30" stroke={gold} strokeWidth="0.7" fill="none" opacity="0.3" />
            <path d="M27 60 C35 55, 42 58, 43 52 C44 46, 36 45, 30 52" stroke={gold} strokeWidth="0.7" fill="none" opacity="0.3" />
            <circle cx="8" cy="42" r="1.5" fill={gold} opacity="0.2" />
            <circle cx="10" cy="28" r="1.5" fill={gold} opacity="0.15" />
            <circle cx="43" cy="52" r="1.5" fill={gold} opacity="0.2" />
        </svg>
    );
}

/** Small branch curving left — for top-right corners */
export function BranchTopRight({ className = '' }: { className?: string }) {
    return (
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className={className} aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
            <path d="M30 78 C30 55, 28 40, 25 25 C22 10, 18 5, 15 2" stroke={gold} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
            <path d="M25 50 C18 45, 10 47, 8 42 C6 37, 14 36, 22 42" stroke={gold} strokeWidth="0.7" fill="none" opacity="0.3" />
            <path d="M24 35 C17 30, 12 33, 10 28 C8 23, 16 22, 22 30" stroke={gold} strokeWidth="0.7" fill="none" opacity="0.3" />
            <circle cx="8" cy="42" r="1.5" fill={gold} opacity="0.2" />
            <circle cx="10" cy="28" r="1.5" fill={gold} opacity="0.15" />
        </svg>
    );
}

/** Tiny leaf sprig — for scattered decoration */
export function LeafSprig({ className = '' }: { className?: string }) {
    return (
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" className={className} aria-hidden="true">
            <path d="M20 48 C20 35, 18 25, 16 12 C15 6, 14 3, 13 1" stroke={gold} strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />
            <path d="M17 30 C12 27, 7 29, 6 25 C5 21, 10 20, 15 25" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.25" />
            <path d="M18 18 C23 15, 28 17, 28 13 C28 9, 23 9, 19 14" stroke={gold} strokeWidth="0.6" fill="none" opacity="0.25" />
            <circle cx="6" cy="25" r="1.2" fill={gold} opacity="0.15" />
            <circle cx="28" cy="13" r="1.2" fill={gold} opacity="0.15" />
        </svg>
    );
}

/** Horizontal flourish — for section separators */
export function Flourish({ className = '' }: { className?: string }) {
    return (
        <svg width="120" height="20" viewBox="0 0 120 20" fill="none" className={className} aria-hidden="true">
            <path d="M10 10 C25 10, 30 4, 40 4 C50 4, 55 10, 60 10 C65 10, 70 16, 80 16 C90 16, 95 10, 110 10" stroke={gold} strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />
            <circle cx="60" cy="10" r="2" fill={gold} opacity="0.2" />
            <circle cx="10" cy="10" r="1.5" fill={gold} opacity="0.15" />
            <circle cx="110" cy="10" r="1.5" fill={gold} opacity="0.15" />
        </svg>
    );
}

/** Light branch for dark backgrounds (FAQ page) */
export function BranchLight({ className = '' }: { className?: string }) {
    return (
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className={className} aria-hidden="true">
            <path d="M30 78 C30 55, 28 40, 25 25 C22 10, 18 5, 15 2" stroke={light} strokeWidth="0.8" strokeLinecap="round" />
            <path d="M25 50 C18 45, 10 47, 8 42 C6 37, 14 36, 22 42" stroke={light} strokeWidth="0.7" fill="none" />
            <path d="M24 35 C17 30, 12 33, 10 28 C8 23, 16 22, 22 30" stroke={light} strokeWidth="0.7" fill="none" />
            <path d="M27 60 C35 55, 42 58, 43 52 C44 46, 36 45, 30 52" stroke={light} strokeWidth="0.7" fill="none" />
            <circle cx="8" cy="42" r="1.5" fill={light} />
            <circle cx="10" cy="28" r="1.5" fill={light} />
            <circle cx="43" cy="52" r="1.5" fill={light} />
        </svg>
    );
}

/** Light leaf sprig for dark backgrounds */
export function LeafSprigLight({ className = '' }: { className?: string }) {
    return (
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" className={className} aria-hidden="true">
            <path d="M20 48 C20 35, 18 25, 16 12 C15 6, 14 3, 13 1" stroke={light} strokeWidth="0.7" strokeLinecap="round" />
            <path d="M17 30 C12 27, 7 29, 6 25 C5 21, 10 20, 15 25" stroke={light} strokeWidth="0.6" fill="none" />
            <path d="M18 18 C23 15, 28 17, 28 13 C28 9, 23 9, 19 14" stroke={light} strokeWidth="0.6" fill="none" />
            <circle cx="6" cy="25" r="1.2" fill={light} />
            <circle cx="28" cy="13" r="1.2" fill={light} />
        </svg>
    );
}
