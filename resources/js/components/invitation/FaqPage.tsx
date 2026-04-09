import type { WeddingFaqItem } from '@/types';
import BackLink from './BackLink';

interface FaqPageProps {
    items: WeddingFaqItem[];
    onBack: () => void;
}

export default function FaqPage({ items, onBack }: FaqPageProps) {
    return (
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red">
            <div className="mx-auto max-w-md pt-10">
                <h2 className="text-3xl font-medium italic" data-page-item>
                    Συχνές ερωτήσεις
                </h2>
                <div className="mt-3 h-px w-16 bg-wedding-red" data-page-item />

                <div className="mt-10 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.question}
                            className="border-2 border-wedding-red p-5"
                            data-page-item
                        >
                            <p className="text-lg font-medium italic">
                                {item.question}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed font-light">
                                {item.answer}
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
