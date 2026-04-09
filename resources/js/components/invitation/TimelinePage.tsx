import type { WeddingTimelineItem } from '@/types';
import BackLink from './BackLink';

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

                <div className="mt-10 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.time}
                            className="border-2 border-wedding-red p-5"
                            data-page-item
                        >
                            <div className="flex items-baseline gap-4">
                                <p className="text-lg font-medium">{item.time}</p>
                                <p className="text-lg font-medium italic">
                                    {item.title}
                                </p>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed font-light">
                                {item.description}
                            </p>
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
