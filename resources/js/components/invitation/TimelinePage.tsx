import type { ComponentType } from 'react';
import type { WeddingTimelineIcon, WeddingTimelineItem } from '@/types';
import BackLink from './BackLink';

interface TimelinePageProps {
    dateDisplay: string;
    items: WeddingTimelineItem[];
    onBack: () => void;
}

type IconProps = { className?: string };

function RingsIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <circle cx="19" cy="28" r="9" />
            <circle cx="29" cy="28" r="9" />
            <path d="M16 18 l3 -4 h2 l1 3" />
            <path d="M32 18 l-3 -4 h-2 l-1 3" />
        </svg>
    );
}

function CocktailIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M9 12 h12 l-3 14 v11" />
            <path d="M12 37 h12" />
            <path d="M27 12 h12 l-3 14 v11" />
            <path d="M30 37 h12" />
            <path d="M18 26 q3 -2 6 0 q3 2 6 0" />
        </svg>
    );
}

function CoupleIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <circle cx="17" cy="13" r="3.2" />
            <circle cx="31" cy="13" r="3.2" />
            <path d="M13 21 q-2 6 0 11 l1 10 M21 21 q2 4 1 11 l-1 10" />
            <path d="M27 21 q-2 4 -1 11 l1 10 M35 21 q2 6 0 11 l-1 10" />
            <path d="M22 27 h4" />
        </svg>
    );
}

function CakeIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M24 6 v5" />
            <path d="M23 6 q1 -3 2 0" />
            <path d="M14 14 h20 v9 h-20 z" />
            <path d="M8 25 h32 v12 h-32 z" />
            <path d="M7 37 h34" />
            <path d="M18 17 q2 2 4 0 q2 -2 4 0 q2 2 4 0" />
            <path d="M11 28 q3 2 5 0 q3 -2 6 0 q3 2 5 0 q3 -2 6 0" />
        </svg>
    );
}

function DanceIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <circle cx="15" cy="38" r="3" fill="currentColor" stroke="none" />
            <path d="M18 38 v-22 l16 -5 v22" />
            <circle cx="31" cy="33" r="3" fill="currentColor" stroke="none" />
            <path d="M18 21 l16 -5" />
            <path d="M38 11 q4 -2 6 1" />
            <path d="M38 16 q3 -1 5 1" />
        </svg>
    );
}

function PartyIcon({ className }: IconProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M10 12 h28 l-14 16 v12" />
            <path d="M15 40 h18" />
            <circle cx="24" cy="22" r="1.2" fill="currentColor" stroke="none" />
            <path d="M6 8 l2 2 M40 6 l-2 2 M42 16 l-2 1 M8 18 l2 -1" />
        </svg>
    );
}

const ICONS: Record<WeddingTimelineIcon, ComponentType<IconProps>> = {
    rings: RingsIcon,
    cocktail: CocktailIcon,
    couple: CoupleIcon,
    cake: CakeIcon,
    dance: DanceIcon,
    party: PartyIcon,
};

function TimelineIcon({ name }: { name?: WeddingTimelineIcon }) {
    if (!name) {
        return null;
    }

    const Component = ICONS[name];

    return <Component className="h-10 w-10" />;
}

export default function TimelinePage({
    dateDisplay,
    items,
    onBack,
}: TimelinePageProps) {
    return (
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red">
            <div className="mx-auto max-w-md pt-10">
                <h2 className="text-3xl font-medium italic" data-page-item>
                    Πρόγραμμα
                </h2>
                <p
                    className="mt-2 text-sm font-light tracking-[0.2em] uppercase"
                    data-page-item
                >
                    {dateDisplay}
                </p>
                <div className="mt-3 h-px w-16 bg-wedding-red" data-page-item />

                <ol className="relative mt-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-8 bottom-8 left-1/2 w-px -translate-x-1/2 bg-wedding-red/25"
                    />

                    {items.map((item, index) => {
                        const contentOnRight = index % 2 === 0;

                        return (
                            <li
                                key={item.time}
                                data-page-item
                                className="relative mb-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 last:mb-0"
                            >
                                {contentOnRight ? (
                                    <div aria-hidden="true" />
                                ) : (
                                    <div className="pr-2 text-right">
                                        <p className="text-2xl leading-none font-medium italic">
                                            {item.time}
                                        </p>
                                        <p className="mt-1.5 text-[10px] leading-snug font-light tracking-[0.18em] uppercase">
                                            {item.title}
                                        </p>
                                    </div>
                                )}

                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)]">
                                    <TimelineIcon name={item.icon} />
                                </div>

                                {contentOnRight ? (
                                    <div className="pl-2 text-left">
                                        <p className="text-2xl leading-none font-medium italic">
                                            {item.time}
                                        </p>
                                        <p className="mt-1.5 text-[10px] leading-snug font-light tracking-[0.18em] uppercase">
                                            {item.title}
                                        </p>
                                    </div>
                                ) : (
                                    <div aria-hidden="true" />
                                )}
                            </li>
                        );
                    })}
                </ol>

                <div className="mt-12 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
