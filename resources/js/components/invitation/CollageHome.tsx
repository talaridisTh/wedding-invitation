import type { ReactNode } from 'react';

interface CollageHomeProps {
    bride: string;
    groom: string;
    dateDisplay: string;
    ceremonyTime: string;
    onNavigate: (page: 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery') => void;
}

interface BoxProps {
    icon: ReactNode;
    label: string;
    title?: string;
    lines?: string[];
    onClick?: () => void;
    rotation?: number;
    fullWidth?: boolean;
}

function Box({
    icon,
    label,
    title,
    lines,
    onClick,
    rotation = 0,
    fullWidth = false,
}: BoxProps) {
    const interactive = onClick !== undefined;

    return (
        <div
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={onClick}
            onKeyDown={
                interactive
                    ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              onClick();
                          }
                      }
                    : undefined
            }
            data-collage-card
            style={{ transform: `rotate(${rotation}deg)` }}
            className={`relative flex ${fullWidth ? 'min-h-[150px] flex-row items-center gap-5 px-6' : 'aspect-[3/4] flex-col items-stretch px-4'} border border-wedding-red/35 bg-wedding-red/[0.04] py-5 text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${interactive ? 'cursor-pointer transition-colors hover:bg-wedding-red/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red' : ''}`}
        >
            {fullWidth ? (
                <>
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
                        {icon}
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-[9px] font-normal tracking-[0.25em] uppercase opacity-80">
                            {label}
                        </p>
                        {title && (
                            <p className="mt-1 text-base leading-tight font-medium italic">
                                {title}
                            </p>
                        )}
                        {lines && lines.length > 0 && (
                            <div className="mt-1 space-y-0.5 text-xs font-light opacity-80">
                                {lines.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className="text-center text-[9px] font-normal tracking-[0.25em] uppercase opacity-80">
                        {label}
                    </p>
                    {title && (
                        <p className="mt-2 text-center text-[15px] leading-tight font-medium italic">
                            {title}
                        </p>
                    )}

                    <div className="flex min-h-0 flex-1 items-center justify-center py-2">
                        <div className="flex h-16 w-16 items-center justify-center">
                            {icon}
                        </div>
                    </div>

                    {lines && lines.length > 0 && (
                        <div className="space-y-0.5 text-center text-[11px] font-light opacity-80">
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
}

function ImageCard({ src, alt = '', rotation = 0 }: ImageCardProps) {
    return (
        <div
            data-collage-card
            style={{ transform: `rotate(${rotation}deg)` }}
            className="aspect-[3/4] overflow-hidden shadow-[0_1px_2px_rgba(136,8,8,0.05)]"
        >
            <img
                src={src}
                alt={alt}
                draggable={false}
                className="h-full w-full object-cover"
            />
        </div>
    );
}

export default function CollageHome({
    bride,
    groom,
    dateDisplay,
    ceremonyTime,
    onNavigate,
}: CollageHomeProps) {
    return (
        <div className="inv-screen relative overflow-y-auto bg-wedding-cream-light px-4 py-8">
            <div className="mx-auto max-w-md">
                <div className="mb-6 flex justify-center" data-collage-card>
                    <img
                        src="/images/wedding/envelope-open-v2.png"
                        alt=""
                        className="block w-[180px] [filter:hue-rotate(-12deg)_saturate(1.5)_brightness(0.96)_contrast(1.05)]"
                        draggable={false}
                    />
                </div>

                <h1
                    className="mb-2 text-center text-3xl font-medium text-wedding-red italic"
                    data-collage-card
                >
                    {bride}
                    <span className="mx-2 text-2xl not-italic">&amp;</span>
                    {groom}
                </h1>

                <div
                    className="mx-auto mb-6 h-px w-24 bg-wedding-red"
                    data-collage-card
                />

                <div className="grid grid-cols-2 gap-4">
                    {/* Row 1 — box + placeholder image */}
                    <Box
                        icon={RingsIcon}
                        label="Save the Date"
                        title={dateDisplay}
                        lines={[`Ώρα ${ceremonyTime}`]}
                        rotation={-0.9}
                    />
                    <ImageCard
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&q=80"
                        alt="Wedding rings"
                        rotation={0.7}
                    />

                    {/* Row 2 — placeholder image + box */}
                    <ImageCard
                        src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop&q=80"
                        alt="Wedding aisle"
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
                        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop&q=80"
                        alt="Bridal flowers"
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
                </div>
            </div>
        </div>
    );
}
