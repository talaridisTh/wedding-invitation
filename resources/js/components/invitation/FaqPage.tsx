import { useState } from 'react';
import type { WeddingFaqItem, WeddingGift } from '@/types';
import BackLink from './BackLink';

interface FaqPageProps {
    items: WeddingFaqItem[];
    gift: WeddingGift;
    onBack: () => void;
}

export default function FaqPage({ items, gift, onBack }: FaqPageProps) {
    // items are baked into the hero illustration; prop kept for future use
    void items;

    const [copied, setCopied] = useState(false);

    const handleCopyIban = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(gift.iban);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable — ignore */
        }
    };

    return (
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-md pt-10 lg:max-w-2xl lg:pt-16">
                <div className="relative" data-page-item>
                    <img
                        src="/images/wedding/faq-art-v2.webp"
                        alt="Συχνές ερωτήσεις"
                        draggable={false}
                        className="mx-auto w-full"
                    />

                    {/*
                        Hotspot για το «Αντιγραφή» oval που είναι μέσα στην
                        εικόνα. Τα ποσοστά είναι σχετικά με το image container —
                        κλιμακώνονται σωστά σε όλα τα μεγέθη οθόνης.
                    */}
                    <button
                        type="button"
                        onClick={handleCopyIban}
                        aria-label={
                            copied
                                ? 'Ο IBAN αντιγράφηκε'
                                : 'Αντιγραφή IBAN στο πρόχειρο'
                        }
                        className="group absolute left-[18%] top-[88.5%] h-[3.5%] w-[26%] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wedding-red"
                    >
                        <span className="sr-only">
                            {copied ? 'Ο IBAN αντιγράφηκε' : 'Αντιγραφή IBAN'}
                        </span>
                    </button>

                    {copied && (
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-[94%] -translate-x-1/2 whitespace-nowrap rounded-full bg-wedding-red px-3 py-1 text-[11px] font-medium tracking-[0.15em] uppercase text-wedding-cream-light shadow-lg"
                        >
                            Αντιγράφηκε
                        </div>
                    )}
                </div>

                {/*
                    Previous numbered-badge FAQ layout — κρατημένο για backup.
                    <h2 className="text-3xl font-medium italic lg:text-center lg:text-5xl" data-page-item>
                        Συχνές ερωτήσεις
                    </h2>
                    <div className="mt-3 h-px w-16 bg-wedding-red lg:mx-auto lg:mt-6 lg:w-32" data-page-item />

                    <ol className="relative mt-10 lg:mt-16">
                        <div aria-hidden="true" className="pointer-events-none absolute top-6 bottom-6 left-6 w-px bg-wedding-red/25" />
                        {items.map((item, index) => (
                            <li key={item.question} data-page-item className="relative mb-10 pl-20 last:mb-0 lg:mb-14 lg:pl-28">
                                <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)] lg:h-16 lg:w-16">
                                    <span className="text-base font-medium italic lg:text-xl">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className="text-lg leading-snug font-medium italic lg:text-2xl">
                                    {item.question}
                                </p>
                                <p className="mt-3 text-sm leading-relaxed font-light opacity-80 lg:mt-4 lg:text-base">
                                    {item.answer}
                                </p>
                            </li>
                        ))}
                    </ol>
                */}

                <div className="mt-12 flex justify-center lg:mt-20" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
