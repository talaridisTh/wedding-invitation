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

                <ol className="relative mt-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-6 bottom-6 left-6 w-px bg-wedding-red/25"
                    />

                    {items.map((item, index) => (
                        <li
                            key={item.question}
                            data-page-item
                            className="relative mb-10 pl-20 last:mb-0"
                        >
                            <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)]">
                                <span className="text-base font-medium italic">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            <p className="text-lg leading-snug font-medium italic">
                                {item.question}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed font-light opacity-80">
                                {item.answer}
                            </p>
                        </li>
                    ))}
                </ol>

                <div className="mt-12 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
