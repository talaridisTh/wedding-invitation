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
        <div className="inv-screen relative flex flex-col items-center justify-center bg-wedding-cream-light px-6 text-wedding-red">
            <div className="text-center">
                <p className="text-5xl font-medium italic sm:text-6xl">{bride}</p>
                <p className="my-1 text-xl font-light sm:text-2xl">&amp;</p>
                <p className="text-5xl font-medium italic sm:text-6xl">{groom}</p>
            </div>

            <p className="mt-4 text-center text-xs font-light tracking-[0.2em] uppercase">
                {dateDisplay}
            </p>

            <div
                role="button"
                tabIndex={0}
                onClick={onOpen}
                onKeyDown={handleKeyDown}
                className="mt-12 cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wedding-red"
                aria-label={ctaText}
            >
                <img
                    src="/images/wedding/envelope-closed.png"
                    alt="Προσκλητήριο γάμου"
                    className="w-60 sm:w-72"
                    draggable={false}
                />
            </div>

            <p className="pulse-fade mt-8 text-base italic">{ctaText}</p>
        </div>
    );
}
