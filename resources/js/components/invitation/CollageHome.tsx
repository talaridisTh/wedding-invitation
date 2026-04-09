import type { ReactNode } from 'react';

interface CollageHomeProps {
    bride: string;
    groom: string;
    dateDisplay: string;
    ceremonyTime: string;
    church: {
        name: string;
        arrival_note: string;
    };
    reception: {
        venue: string;
        full_address: string;
        peak_time: string;
    };
    onNavigate: (page: 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery') => void;
}

interface BoxProps {
    icon: ReactNode;
    label: string;
    title: string;
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
            className={`flex ${fullWidth ? 'min-h-[170px] flex-row items-center gap-5 px-6' : 'aspect-[3/4] flex-col items-stretch px-4'} border border-wedding-red/35 bg-wedding-red/[0.04] py-5 text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${interactive ? 'cursor-pointer transition-colors hover:bg-wedding-red/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red' : ''}`}
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
                        <p className="mt-1 text-base leading-tight font-medium italic">
                            {title}
                        </p>
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
                    <p className="mt-2 text-center text-[15px] leading-tight font-medium italic">
                        {title}
                    </p>

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

const ChurchIcon = (
    <IconSvg>
        <path d="M16 3v6" />
        <path d="M13 6h6" />
        <path d="M16 9L6 15v13h20V15L16 9z" />
        <path d="M13 28v-6a3 3 0 0 1 6 0v6" />
        <path d="M10 18h2M20 18h2" />
    </IconSvg>
);

const CameraIcon = (
    <IconSvg>
        <path d="M5 9h4l2-3h10l2 3h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2z" />
        <circle cx="16" cy="17" r="5" />
    </IconSvg>
);

const QuestionIcon = (
    <IconSvg>
        <circle cx="16" cy="16" r="12" />
        <path d="M12 12a4 4 0 0 1 8 0c0 3-4 3-4 6" />
        <circle cx="16" cy="23" r="0.5" fill="currentColor" />
    </IconSvg>
);

const HeartIcon = (
    <IconSvg>
        <path d="M16 28s-11-7-11-15a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 8-11 15-11 15z" />
    </IconSvg>
);

export default function CollageHome({
    bride,
    groom,
    dateDisplay,
    ceremonyTime,
    church,
    reception,
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

                <div className="grid grid-cols-2 gap-4">
                    <Box
                        icon={RingsIcon}
                        label="Save the Date"
                        title={dateDisplay}
                        lines={[`Ώρα ${ceremonyTime}`]}
                        rotation={-1.2}
                    />

                    <Box
                        icon={ChurchIcon}
                        label="Τελετή"
                        title={church.name}
                        lines={[`Ώρα ${ceremonyTime}`]}
                        rotation={0.9}
                        onClick={() => onNavigate('venue')}
                    />

                    <Box
                        icon={DiningIcon}
                        label="Δεξίωση"
                        title={reception.venue}
                        lines={[reception.full_address, `Ώρα ${reception.peak_time}`]}
                        rotation={-0.6}
                        onClick={() => onNavigate('venue')}
                    />

                    <Box
                        icon={ChampagneIcon}
                        label="Πρόγραμμα"
                        title="Λεπτομέρειες της ημέρας"
                        lines={['Δείτε το χρονοδιάγραμμα']}
                        rotation={0.7}
                        onClick={() => onNavigate('timeline')}
                    />

                    <Box
                        icon={CameraIcon}
                        label="Φωτογραφίες"
                        title="Οι στιγμές μας"
                        rotation={-0.8}
                        onClick={() => onNavigate('gallery')}
                    />

                    <Box
                        icon={HeartIcon}
                        label="RSVP"
                        title="Επιβεβαίωση παρουσίας"
                        rotation={1.1}
                        onClick={() => onNavigate('rsvp')}
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
