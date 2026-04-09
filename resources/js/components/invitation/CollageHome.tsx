import { BranchTopLeft, BranchTopRight, LeafSprig, Flourish } from './Botanicals';

interface CollageHomeProps {
    bride: string;
    groom: string;
    dateDisplay: string;
    ceremonyTime: string;
    rsvpDeadline: string;
    onNavigate: (page: 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery') => void;
}

function CardPortrait({
    children,
    footer,
    onClick,
    onKeyDown,
    interactive = false,
}: {
    children: React.ReactNode;
    footer?: React.ReactNode;
    onClick?: () => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    interactive?: boolean;
}) {
    return (
        <div
            className={`relative ${interactive ? 'inv-card-interactive' : ''}`}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <img
                src="/images/wedding/card-portrait.png"
                alt=""
                className="block w-full"
                draggable={false}
            />
            <div className="absolute inset-[8%] px-2 pt-2">{children}</div>
            {footer && (
                <div className="absolute inset-x-[8%] bottom-[8%] px-2 pb-2">
                    {footer}
                </div>
            )}
        </div>
    );
}

export default function CollageHome({
    bride,
    groom,
    dateDisplay,
    ceremonyTime,
    rsvpDeadline,
    onNavigate,
}: CollageHomeProps) {
    function handleKey(page: 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery') {
        return (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onNavigate(page);
            }
        };
    }

    return (
        <div className="inv-screen inv-bg relative overflow-y-auto px-3 py-6">
            <BranchTopLeft className="absolute top-4 left-2 opacity-60" />
            <BranchTopRight className="absolute top-[320px] right-1 opacity-50" />
            <LeafSprig className="absolute bottom-[180px] left-3 opacity-40" />

            <div className="mb-3 flex justify-center" data-collage-card>
                <div className="relative w-[200px]">
                    <img
                        src="/images/wedding/envelope-open-v2.png"
                        alt=""
                        className="block w-full"
                        draggable={false}
                    />
                    <div className="absolute top-[36%] right-[8%] left-[8%] flex flex-col items-center text-center">
                        <p
                            className="font-body text-[5.5px] font-bold tracking-[0.1em] uppercase"
                            style={{ color: '#e8961e' }}
                        >
                            Με χαρά σας προσκαλούμε
                        </p>
                        <p
                            className="font-body text-[5.5px] font-bold tracking-[0.1em] uppercase"
                            style={{ color: '#e8961e' }}
                        >
                            στον γάμο μας
                        </p>
                    </div>
                </div>
            </div>

            <div className="collage-container">
                <div className="collage-card-save" data-collage-card>
                    <CardPortrait
                        interactive
                        onClick={() => onNavigate('gallery')}
                        onKeyDown={handleKey('gallery')}
                        footer={
                            <p className="font-display text-sm font-semibold text-wedding-brown">
                                Ώρα: {ceremonyTime}
                            </p>
                        }
                    >
                        <p className="font-body text-[8px] font-light tracking-[0.25em] text-wedding-gold uppercase">
                            Save the Date
                        </p>
                        <div className="gold-line-left mt-1.5 w-8" />
                        <p className="mt-2 font-display text-lg leading-tight font-semibold text-wedding-brown">
                            {dateDisplay}
                        </p>
                    </CardPortrait>
                </div>

                <div className="collage-card-rsvp" data-collage-card>
                    <CardPortrait
                        interactive
                        onClick={() => onNavigate('rsvp')}
                        onKeyDown={handleKey('rsvp')}
                        footer={
                            <p className="font-body text-[9px] font-light text-wedding-brown-light">
                                {rsvpDeadline}
                            </p>
                        }
                    >
                        <p className="font-body text-[8px] font-light tracking-[0.25em] text-wedding-gold uppercase">
                            RSVP
                        </p>
                        <div className="gold-line-left mt-1.5 w-8" />
                        <p className="mt-2 font-display text-base leading-snug font-semibold text-wedding-brown">
                            Επιβεβαίωση παρουσίας
                        </p>
                    </CardPortrait>
                </div>

                <div className="collage-card-details" data-collage-card>
                    <CardPortrait
                        interactive
                        onClick={() => onNavigate('venue')}
                        onKeyDown={handleKey('venue')}
                        footer={
                            <p className="font-body text-[10px] font-light text-wedding-brown-light">
                                Τοποθεσίες, ώρες & πληροφορίες →
                            </p>
                        }
                    >
                        <p className="font-body text-[8px] font-light tracking-[0.25em] text-wedding-gold uppercase">
                            Τελετή & Δεξίωση
                        </p>
                        <div className="gold-line-left mt-1.5 w-8" />
                        <p className="mt-2 font-display text-base leading-snug font-semibold text-wedding-brown">
                            Λεπτομέρειες της ημέρας
                        </p>
                    </CardPortrait>
                </div>

                <div className="collage-card-timeline" data-collage-card>
                    <CardPortrait
                        interactive
                        onClick={() => onNavigate('timeline')}
                        onKeyDown={handleKey('timeline')}
                        footer={
                            <p className="font-body text-[10px] font-light text-wedding-brown-light">
                                Δείτε το πρόγραμμα →
                            </p>
                        }
                    >
                        <p className="font-body text-[8px] font-light tracking-[0.25em] text-wedding-gold uppercase">
                            Πρόγραμμα
                        </p>
                        <div className="gold-line-left mt-1.5 w-8" />
                        <p className="mt-2 font-display text-[15px] font-semibold text-wedding-brown">
                            Χρονοδιάγραμμα της ημέρας
                        </p>
                    </CardPortrait>
                </div>
            </div>

            <div className="mt-2 flex justify-center">
                <Flourish />
            </div>

            <div className="mt-2" data-collage-card>
                <div className="relative">
                    <img
                        src="/images/wedding/card-landscape.png"
                        alt=""
                        className="block w-full"
                        draggable={false}
                    />
                    <div className="absolute inset-[8%] flex flex-col items-center justify-center gap-0">
                        <span className="font-script text-2xl text-wedding-gold">
                            {bride}
                        </span>
                        <span className="font-display text-base font-light text-wedding-gold italic">
                            &amp;
                        </span>
                        <span className="font-script text-2xl text-wedding-gold">
                            {groom}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-3 flex justify-center" data-collage-card>
                <button
                    type="button"
                    className="inv-card-interactive relative"
                    onClick={() => onNavigate('faq')}
                    onKeyDown={handleKey('faq')}
                >
                    <img
                        src="/images/wedding/faq-circle.png"
                        alt="FAQ"
                        className="h-16 w-16"
                        draggable={false}
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-display text-[10px] font-semibold tracking-widest text-wedding-brown uppercase">
                        FAQ
                    </span>
                </button>
            </div>
        </div>
    );
}
