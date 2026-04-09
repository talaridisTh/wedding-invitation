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
}

function Box({ icon, label, title, lines, onClick }: BoxProps) {
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
            className={`flex flex-col items-center border-2 border-wedding-red bg-transparent px-4 py-6 text-center text-wedding-red ${interactive ? 'cursor-pointer transition-colors hover:bg-wedding-red/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red' : ''}`}
        >
            <p className="text-[10px] font-normal tracking-[0.3em] uppercase">
                {label}
            </p>
            <div className="mt-3 flex h-24 w-24 items-center justify-center">
                {icon}
            </div>
            <p className="mt-3 text-base leading-snug font-medium italic">
                {title}
            </p>
            {lines && lines.length > 0 && (
                <div className="mt-2 space-y-0.5 text-xs font-light">
                    {lines.map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </div>
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

                <div className="grid grid-cols-2 gap-3">
                    <Box
                        icon={RingsIcon}
                        label="Save the Date"
                        title={dateDisplay}
                        lines={[`Ώρα ${ceremonyTime}`]}
                    />

                    <Box
                        icon={ChurchIcon}
                        label="Τελετή"
                        title={church.name}
                        lines={[`Ώρα ${ceremonyTime}`, church.arrival_note]}
                        onClick={() => onNavigate('venue')}
                    />

                    <Box
                        icon={DiningIcon}
                        label="Δεξίωση"
                        title={reception.venue}
                        lines={[reception.full_address, `Ώρα ${reception.peak_time}`]}
                        onClick={() => onNavigate('venue')}
                    />

                    <Box
                        icon={ChampagneIcon}
                        label="Πρόγραμμα"
                        title="Λεπτομέρειες της ημέρας"
                        lines={['Δείτε το χρονοδιάγραμμα']}
                        onClick={() => onNavigate('timeline')}
                    />

                    <Box
                        icon={CameraIcon}
                        label="Φωτογραφίες"
                        title="Οι στιγμές μας"
                        onClick={() => onNavigate('gallery')}
                    />

                    <Box
                        icon={HeartIcon}
                        label="RSVP"
                        title="Επιβεβαίωση παρουσίας"
                        onClick={() => onNavigate('rsvp')}
                    />

                    <div className="col-span-2">
                        <Box
                            icon={QuestionIcon}
                            label="FAQ"
                            title="Συχνές ερωτήσεις"
                            onClick={() => onNavigate('faq')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
