import { useState } from 'react';
import type { WeddingGift } from '@/types';

interface GiftCardProps {
    gift: WeddingGift;
    variant?: 'full' | 'compact';
}

const formatIban = (iban: string): string => iban.replace(/(.{4})/g, '$1 ').trim();

export default function GiftCard({ gift, variant = 'full' }: GiftCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(gift.iban);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable — ignore */
        }
    };

    const showQuestion = variant === 'full';

    return (
        <div
            className={`border border-wedding-red/35 bg-wedding-red/[0.04] text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${
                variant === 'compact' ? 'px-5 py-5 lg:px-8 lg:py-7' : 'px-6 py-7 lg:px-10 lg:py-9'
            }`}
        >
            <p className="text-[10px] font-normal tracking-[0.25em] uppercase opacity-80 lg:text-xs">
                Δώρο γάμου
            </p>

            {showQuestion && (
                <p className="mt-2 text-lg leading-tight font-medium italic lg:text-2xl">
                    {gift.question}
                </p>
            )}

            <dl className="mt-4 space-y-3 text-sm lg:text-base">
                <div>
                    <dt className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-60 lg:text-[11px]">
                        Τράπεζα
                    </dt>
                    <dd className="mt-0.5 font-medium italic">{gift.bank}</dd>
                </div>

                <div>
                    <dt className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-60 lg:text-[11px]">
                        IBAN
                    </dt>
                    <dd className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <code className="font-mono text-[13px] tracking-wider select-all lg:text-[15px]">
                            {formatIban(gift.iban)}
                        </code>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="text-[10px] tracking-[0.15em] uppercase underline-offset-4 opacity-70 transition-opacity hover:opacity-100 hover:underline"
                        >
                            {copied ? 'Αντιγράφηκε' : 'Αντιγραφή'}
                        </button>
                    </dd>
                </div>

                <div>
                    <dt className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-60 lg:text-[11px]">
                        Αιτιολογία
                    </dt>
                    <dd className="mt-0.5 font-medium italic">«{gift.reason}»</dd>
                </div>
            </dl>
        </div>
    );
}
