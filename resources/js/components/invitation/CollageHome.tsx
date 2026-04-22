import type { ReactNode } from 'react';
import type { WeddingGift } from '@/types';
import GiftCard from './GiftCard';

interface CollageHomeProps {
    bride: string;
    groom: string;
    dateDisplay: string;
    ceremonyTime: string;
    gift: WeddingGift;
    onNavigate: (page: 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery') => void;
}

interface BoxProps {
    icon: ReactNode;
    label: string;
    title?: string;
    lines?: string[];
    onClick?: () => void;
    href?: string;
    rotation?: number;
    fullWidth?: boolean;
}

function Box({
    icon,
    label,
    title,
    lines,
    onClick,
    href,
    rotation = 0,
    fullWidth = false,
}: BoxProps) {
    const activate = href
        ? () => window.open(href, '_blank', 'noopener,noreferrer')
        : onClick;
    const interactive = activate !== undefined;

    return (
        <div
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={activate}
            onKeyDown={
                interactive && activate
                    ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              activate();
                          }
                      }
                    : undefined
            }
            data-collage-card
            style={{ transform: `rotate(${rotation}deg)` }}
            className={`relative flex ${fullWidth ? 'min-h-[150px] flex-row items-center gap-5 px-6 lg:min-h-[180px] lg:gap-8 lg:px-10' : 'aspect-[3/4] flex-col items-stretch px-4 lg:px-6'} border border-wedding-red/35 bg-wedding-red/[0.04] py-5 text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] lg:py-8 ${interactive ? 'cursor-pointer transition-colors hover:bg-wedding-red/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red' : ''}`}
        >
            {fullWidth ? (
                <>
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center lg:h-24 lg:w-24">
                        {icon}
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-[9px] font-normal tracking-[0.25em] uppercase opacity-80 lg:text-xs">
                            {label}
                        </p>
                        {title && (
                            <p className="mt-1 text-base leading-tight font-medium italic lg:mt-2 lg:text-2xl">
                                {title}
                            </p>
                        )}
                        {lines && lines.length > 0 && (
                            <div className="mt-1 space-y-0.5 text-xs font-light opacity-80 lg:mt-2 lg:text-sm">
                                {lines.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className="text-center text-[9px] font-normal tracking-[0.25em] uppercase opacity-80 lg:text-[11px]">
                        {label}
                    </p>
                    {title && (
                        <p className="mt-2 text-center text-[15px] leading-tight font-medium italic lg:mt-3 lg:text-xl">
                            {title}
                        </p>
                    )}

                    <div className="flex min-h-0 flex-1 items-center justify-center py-2 lg:py-4">
                        <div className="flex h-16 w-16 items-center justify-center lg:h-24 lg:w-24">
                            {icon}
                        </div>
                    </div>

                    {lines && lines.length > 0 && (
                        <div className="space-y-0.5 text-center text-[11px] font-light opacity-80 lg:text-sm">
                            {lines.map((line) => (
                                <p key={line}>{line}</p>
                            ))}
                        </div>
                    )}

                </>
            )}

            {interactive && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 bottom-2 text-wedding-red/70"
                >
                    <svg
                        viewBox="0 0 24 12"
                        width="22"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M1 6h21M17 1.5 22 6l-5 4.5" />
                    </svg>
                </span>
            )}
        </div>
    );
}

interface IconImageProps {
    src: string;
    alt?: string;
}

function IconImage({ src, alt = '' }: IconImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            draggable={false}
            className="h-full w-full object-contain"
        />
    );
}

function IconSvg({ children }: { children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 32 32"
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    );
}

const RingsIcon = <IconImage src="/images/wedding/icons/rings.png" />;
const DiningIcon = <IconImage src="/images/wedding/icons/dining.png" />;
const ChampagneIcon = <IconImage src="/images/wedding/icons/champagne.png" />;

const QuestionIcon = (
    <IconSvg>
        <circle cx="16" cy="16" r="12" />
        <path d="M12 12a4 4 0 0 1 8 0c0 3-4 3-4 6" />
        <circle cx="16" cy="23" r="0.5" fill="currentColor" />
    </IconSvg>
);

interface ImageCardProps {
    src: string;
    alt?: string;
    rotation?: number;
    aspect?: string;
    objectPosition?: string;
}

function ImageCard({
    src,
    alt = '',
    rotation = 0,
    aspect = 'aspect-[3/4]',
    objectPosition = 'object-center',
}: ImageCardProps) {
    return (
        <div
            data-collage-card
            style={{ transform: `rotate(${rotation}deg)` }}
            className={`${aspect} overflow-hidden shadow-[0_1px_2px_rgba(136,8,8,0.05)]`}
        >
            <img
                src={src}
                alt={alt}
                draggable={false}
                className={`h-full w-full object-cover ${objectPosition}`}
            />
        </div>
    );
}

export default function CollageHome({
    bride,
    groom,
    dateDisplay,
    ceremonyTime,
    gift,
    onNavigate,
}: CollageHomeProps) {
    return (
        <div className="inv-screen relative overflow-y-auto bg-wedding-cream-light px-4 py-8 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-md lg:max-w-3xl">
                <div className="mb-6 flex justify-center lg:mb-10" data-collage-card>
                    <img
                        src="/images/wedding/envelope-open-v2.webp"
                        alt=""
                        className="block w-[180px] lg:w-[280px] [filter:hue-rotate(-12deg)_saturate(1.5)_brightness(0.96)_contrast(1.05)]"
                        draggable={false}
                    />
                </div>

                <h1
                    className="mb-2 text-center text-3xl font-medium text-wedding-red italic lg:mb-3 lg:text-6xl"
                    data-collage-card
                >
                    {bride}
                    <span className="mx-2 text-2xl not-italic lg:mx-4 lg:text-5xl">&amp;</span>
                    {groom}
                </h1>

                <div
                    className="mx-auto mb-6 h-px w-24 bg-wedding-red lg:mb-12 lg:w-40"
                    data-collage-card
                />

                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                    {/* Row 1 — box + placeholder image */}
                    <Box
                        icon={RingsIcon}
                        label="Save the Date"
                        title={dateDisplay}
                        lines={[`Ώρα ${ceremonyTime}`, 'Δείτε τοποθεσίες']}
                        rotation={-0.9}
                        onClick={() => onNavigate('venue')}
                    />
                    <ImageCard
                        src="/images/wedding/couple/couple-01.jpg"
                        alt="Φώτης & Τίνη"
                        rotation={0.7}
                    />

                    {/* Row 2 — placeholder image + box */}
                    <ImageCard
                        src="/images/wedding/couple/couple-02.jpg"
                        alt="Φώτης & Τίνη στα Μετέωρα"
                        rotation={-0.5}
                    />
                    <Box
                        icon={ChampagneIcon}
                        label="Πρόγραμμα"
                        title="Λεπτομέρειες της ημέρας"
                        lines={['Δείτε το χρονοδιάγραμμα']}
                        rotation={0.8}
                        onClick={() => onNavigate('timeline')}
                    />

                    {/* Row 3 — box + placeholder image */}
                    <Box
                        icon={DiningIcon}
                        label="RSVP"
                        title="Επιβεβαίωση παρουσίας"
                        lines={['Θα παρευρεθώ']}
                        rotation={-0.7}
                        onClick={() => onNavigate('rsvp')}
                    />
                    <ImageCard
                        src="/images/wedding/couple/couple-03.jpg"
                        alt="Φώτης & Τίνη"
                        rotation={0.6}
                    />

                    <div className="col-span-2">
                        <Box
                            icon={QuestionIcon}
                            label="FAQ"
                            title="Συχνές ερωτήσεις"
                            lines={['Δείτε τις συχνές ερωτήσεις']}
                            rotation={-0.4}
                            fullWidth
                            onClick={() => onNavigate('faq')}
                        />
                    </div>

                    <div className="col-span-2" data-collage-card>
                        <GiftCard gift={gift} variant="compact" />
                    </div>
                </div>
            </div>
        </div>
    );
}
