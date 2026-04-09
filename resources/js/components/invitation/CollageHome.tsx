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
    imageRight?: boolean;
}

function Box({
    icon,
    label,
    title,
    lines,
    onClick,
    rotation = 0,
    imageRight = false,
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
            className={`flex min-h-[150px] items-center gap-5 border border-wedding-red/35 bg-wedding-red/[0.04] px-5 py-5 text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${imageRight ? 'flex-row-reverse' : 'flex-row'} ${interactive ? 'cursor-pointer transition-colors hover:bg-wedding-red/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red' : ''}`}
        >
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center">
                {icon}
            </div>
            <div className={`flex-1 ${imageRight ? 'text-right' : 'text-left'}`}>
                <p className="text-[10px] font-normal tracking-[0.28em] uppercase opacity-80">
                    {label}
                </p>
                {title && (
                    <p className="mt-1.5 text-lg leading-tight font-medium italic">
                        {title}
                    </p>
                )}
                {lines && lines.length > 0 && (
                    <div className="mt-1.5 space-y-0.5 text-xs font-light opacity-80">
                        {lines.map((line) => (
                            <p key={line}>{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface IconImageProps {
    src: string;
    alt: string;
}

function IconImage({ src, alt }: IconImageProps) {
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

const RingsIcon = <IconImage src="/images/wedding/icons/rings.png" alt="" />;
const DiningIcon = <IconImage src="/images/wedding/icons/dining.png" alt="" />;
const ChampagneIcon = <IconImage src="/images/wedding/icons/champagne.png" alt="" />;

const QuestionIcon = (
    <IconSvg>
        <circle cx="16" cy="16" r="12" />
        <path d="M12 12a4 4 0 0 1 8 0c0 3-4 3-4 6" />
        <circle cx="16" cy="23" r="0.5" fill="currentColor" />
    </IconSvg>
);

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
                        className="block w-[180px]"
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

                <div className="flex flex-col gap-5">
                    <Box
                        icon={RingsIcon}
                        label="Save the Date"
                        title={dateDisplay}
                        lines={[`Ώρα ${ceremonyTime}`]}
                        rotation={-0.8}
                    />

                    <Box
                        icon={ChampagneIcon}
                        label="Πρόγραμμα"
                        title="Λεπτομέρειες της ημέρας"
                        lines={['Δείτε το χρονοδιάγραμμα']}
                        rotation={0.6}
                        imageRight
                        onClick={() => onNavigate('timeline')}
                    />

                    <Box
                        icon={DiningIcon}
                        label="RSVP"
                        title="Επιβεβαίωση παρουσίας"
                        lines={['Θα παρευρεθώ']}
                        rotation={-0.6}
                        onClick={() => onNavigate('rsvp')}
                    />

                    <Box
                        icon={QuestionIcon}
                        label="FAQ"
                        title="Συχνές ερωτήσεις"
                        lines={['Δείτε τις συχνές ερωτήσεις']}
                        rotation={0.5}
                        imageRight
                        onClick={() => onNavigate('faq')}
                    />
                </div>
            </div>
        </div>
    );
}
