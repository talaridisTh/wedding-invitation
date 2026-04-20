import type { ReactNode } from 'react';

interface IconSvgProps {
    children: ReactNode;
    className?: string;
}

function IconSvg({ children, className }: IconSvgProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

export function ChurchIcon({ className }: { className?: string }) {
    return (
        <IconSvg className={className}>
            <path d="M16 3 v4" />
            <path d="M13.5 5 h5" />
            <path d="M7 13 l9 -6 l9 6" />
            <path d="M10 13 v16 h12 v-16" />
            <path d="M14 22 q2 -2 4 0 v7 h-4 z" />
        </IconSvg>
    );
}

export function GlassesIcon({ className }: { className?: string }) {
    return (
        <IconSvg className={className}>
            <path d="M8 6 l4 10 v9" />
            <path d="M16 6 l-4 10" />
            <path d="M8 25 h8" />
            <path d="M20 6 l4 10 v9" />
            <path d="M28 6 l-4 10" />
            <path d="M20 25 h8" />
        </IconSvg>
    );
}

interface LocationCardProps {
    icon: ReactNode;
    label: string;
    title: string;
    time: string;
    address?: string;
    note?: string;
    href: string;
    compact?: boolean;
}

interface LocationItemProps {
    image?: string;
    imageAlt?: string;
    icon?: ReactNode;
    label: string;
    title: string;
    time: string;
    address?: string;
    note?: string;
    href: string;
}

export function LocationItem({
    image,
    imageAlt = '',
    icon,
    label,
    title,
    time,
    address,
    note,
    href,
}: LocationItemProps) {
    return (
        <li
            className={`relative last:mb-0 ${image ? 'pl-32 lg:pl-44' : 'pl-24 lg:pl-32'}`}
            data-page-item
        >
            {image ? (
                <div className="absolute top-0 left-0 h-24 w-24 lg:h-36 lg:w-36">
                    <img
                        src={image}
                        alt={imageAlt}
                        draggable={false}
                        className="h-full w-full object-contain"
                    />
                </div>
            ) : (
                <div className="absolute top-0 left-0 flex h-16 w-16 items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)] lg:h-20 lg:w-20">
                    {icon}
                </div>
            )}

            <p className="text-[10px] font-light tracking-[0.3em] uppercase lg:text-xs">
                {label}
            </p>
            <p className="mt-2 text-xl leading-snug font-medium italic lg:mt-3 lg:text-2xl">
                {title}
            </p>

            <div className="mt-3 space-y-1 text-sm font-light opacity-80 lg:mt-4 lg:space-y-1.5 lg:text-base">
                <p>Ώρα {time}</p>
                {address && <p>{address}</p>}
            </div>

            {note && (
                <p className="mt-3 text-xs leading-relaxed font-light italic opacity-70 lg:mt-4 lg:text-sm">
                    {note}
                </p>
            )}

            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-baseline gap-2 border-b border-wedding-red/50 pb-1 text-sm italic text-wedding-red transition-opacity hover:opacity-70 lg:mt-5 lg:text-base"
            >
                Οδηγίες
                <svg
                    viewBox="0 0 24 12"
                    width="22"
                    height="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                >
                    <path d="M1 6h21M17 1.5 22 6l-5 4.5" />
                </svg>
            </a>
        </li>
    );
}

export default function LocationCard({
    icon,
    label,
    title,
    time,
    address,
    note,
    href,
    compact = false,
}: LocationCardProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-page-item
            className={`group relative flex flex-col items-center border border-wedding-red/35 bg-wedding-red/[0.04] text-center text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] transition-colors hover:bg-wedding-red/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red ${
                compact
                    ? 'px-4 py-5 lg:px-5 lg:py-6'
                    : 'px-6 py-8 lg:px-8 lg:py-10'
            }`}
        >
            <div
                className={`flex items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${
                    compact
                        ? 'h-12 w-12 lg:h-14 lg:w-14'
                        : 'h-16 w-16 lg:h-24 lg:w-24'
                }`}
            >
                {icon}
            </div>

            <p
                className={`mt-4 font-light tracking-[0.3em] uppercase ${
                    compact
                        ? 'text-[9px] lg:text-[10px]'
                        : 'text-[10px] lg:mt-6 lg:text-xs'
                }`}
            >
                {label}
            </p>
            <p
                className={`mt-2 leading-snug font-medium text-balance italic ${
                    compact
                        ? 'text-base lg:text-lg'
                        : 'text-xl lg:mt-3 lg:text-2xl'
                }`}
            >
                {title}
            </p>

            <p
                className={`mt-2 font-light ${
                    compact ? 'text-xs lg:text-sm' : 'mt-3 text-sm lg:mt-4 lg:text-base'
                }`}
            >
                Ώρα {time}
            </p>
            {address && !compact && (
                <p className="mt-1 text-sm font-light opacity-80 lg:text-base">
                    {address}
                </p>
            )}
            {note && !compact && (
                <p className="mt-3 text-xs leading-relaxed font-light italic opacity-80 lg:mt-4 lg:text-sm">
                    {note}
                </p>
            )}

            <span
                className={`inline-flex items-baseline gap-2 border-b border-wedding-red/50 italic tracking-wide ${
                    compact
                        ? 'mt-3 pb-0.5 text-[10px] lg:text-xs'
                        : 'mt-5 pb-1 text-xs lg:mt-6 lg:text-sm'
                }`}
            >
                Οδηγίες
                <svg
                    viewBox="0 0 24 12"
                    width="22"
                    height="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                >
                    <path d="M1 6h21M17 1.5 22 6l-5 4.5" />
                </svg>
            </span>
        </a>
    );
}
