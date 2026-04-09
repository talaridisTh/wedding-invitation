import type { WeddingTimelineItem } from '@/types';
import BackLink from './BackLink';
import { BranchTopLeft, LeafSprig } from './Botanicals';

interface TimelinePageProps {
    dateDisplay: string;
    items: WeddingTimelineItem[];
    onBack: () => void;
}

export default function TimelinePage({
    dateDisplay,
    items,
    onBack,
}: TimelinePageProps) {
    return (
        <div
            className="inv-screen relative px-6 pt-0 pb-12"
            style={{
                backgroundImage: 'url(/images/wedding/page-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'var(--inv-bg)',
            }}
        >
            <div className="page-accent-bar" />

            <BranchTopLeft className="absolute top-8 left-4 opacity-50" />
            <LeafSprig className="absolute bottom-24 right-5 -rotate-12 opacity-40" />

            <div className="mx-auto max-w-md pt-10">
                <h2
                    className="font-display text-3xl font-semibold text-wedding-brown"
                    data-page-item
                >
                    Πρόγραμμα
                </h2>
                <p
                    className="mt-2 font-body text-sm font-light tracking-[0.2em] text-wedding-brown-light uppercase"
                    data-page-item
                >
                    {dateDisplay}
                </p>
                <div className="gold-line-left mt-3 w-16" data-page-item />

                <div className="mt-10 space-y-0">
                    {items.map((item, index) => (
                        <div key={item.time}>
                            <div className="flex gap-6 py-6" data-page-item>
                                <div className="w-16 flex-shrink-0">
                                    <p className="font-display text-lg font-semibold text-wedding-gold">
                                        {item.time}
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="font-display text-lg font-semibold text-wedding-brown">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 font-body text-sm leading-relaxed font-light text-wedding-brown-medium">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            {index < items.length - 1 && (
                                <div data-page-item>
                                    <img
                                        src="/images/wedding/gold-divider.png"
                                        alt=""
                                        className="w-full"
                                        draggable={false}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
