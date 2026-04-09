import type { WeddingFaqItem } from '@/types';
import BackLink from './BackLink';
import { BranchLight, LeafSprigLight } from './Botanicals';

interface FaqPageProps {
    items: WeddingFaqItem[];
    onBack: () => void;
}

export default function FaqPage({ items, onBack }: FaqPageProps) {
    return (
        <div className="inv-screen inv-bg-dark faq-dark relative px-6 pt-0 pb-12">
            <div className="page-accent-bar-light" />

            <BranchLight className="absolute top-8 right-4" />
            <LeafSprigLight className="absolute bottom-20 left-4 rotate-12" />

            <div className="mx-auto max-w-md pt-10">
                <h2
                    className="font-display text-3xl font-semibold"
                    data-page-item
                >
                    FAQ
                </h2>
                <div
                    className="mt-3 h-px w-16 bg-wedding-gold/40"
                    data-page-item
                />

                <div className="mt-10 space-y-0">
                    {items.map((item, index) => (
                        <div key={item.question}>
                            <div className="py-6" data-page-item>
                                <p className="font-display text-lg font-semibold">
                                    {item.question}
                                </p>
                                <p className="mt-2 font-body text-sm leading-relaxed font-light opacity-70">
                                    {item.answer}
                                </p>
                            </div>
                            {index < items.length - 1 && (
                                <div
                                    className="faq-line h-px w-full"
                                    data-page-item
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} light />
                </div>
            </div>
        </div>
    );
}
