import { LeafSprig } from './Botanicals';

interface IntroScreenProps {
    bride: string;
    groom: string;
    dateDisplay: string;
    ctaText: string;
    onOpen: () => void;
}

export default function IntroScreen({
    bride,
    groom,
    dateDisplay,
    ctaText,
    onOpen,
}: IntroScreenProps) {
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpen();
        }
    }

    return (
        <div className="inv-screen inv-bg relative flex flex-col items-center justify-center px-6">
            <LeafSprig className="absolute top-12 right-6 opacity-50" />
            <LeafSprig className="absolute bottom-16 left-6 rotate-180 opacity-40" />

            <div className="text-center">
                <p className="font-script text-5xl text-wedding-brown sm:text-6xl">
                    {bride}
                </p>
                <p className="my-1 font-display text-xl font-light text-wedding-gold italic sm:text-2xl">
                    &amp;
                </p>
                <p className="font-script text-5xl text-wedding-brown sm:text-6xl">
                    {groom}
                </p>
            </div>

            <p className="mt-4 text-center font-display text-xs font-light tracking-[0.2em] text-wedding-brown-medium uppercase">
                {dateDisplay}
            </p>

            <div
                role="button"
                tabIndex={0}
                onClick={onOpen}
                onKeyDown={handleKeyDown}
                className="inv-card-interactive mt-12"
                aria-label={ctaText}
            >
                <img
                    src="/images/wedding/envelope-closed.png"
                    alt="Προσκλητήριο γάμου"
                    className="w-60 sm:w-72"
                    draggable={false}
                />
            </div>

            <p className="pulse-fade mt-8 font-script text-base text-wedding-brown-light">
                {ctaText}
            </p>
        </div>
    );
}
