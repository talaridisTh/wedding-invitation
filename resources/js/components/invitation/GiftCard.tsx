import { useState } from 'react';
import type { WeddingGift } from '@/types';

interface GiftCardProps {
    gift: WeddingGift;
    variant?: 'full' | 'compact';
}

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

    return (
        <div
            className={`border border-wedding-red/35 bg-wedding-red/[0.04] text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${
                variant === 'compact' ? 'px-5 py-5 lg:px-8 lg:py-7' : 'px-6 py-7 lg:px-10 lg:py-10'
            }`}
        >
            <p className="text-[10px] font-normal tracking-[0.25em] uppercase opacity-80 lg:text-xs">
                Δώρο γάμου
            </p>

            <p
                className={`mt-2 leading-tight font-medium italic ${
                    variant === 'compact'
                        ? 'text-base lg:text-xl'
                        : 'text-lg lg:text-2xl'
                }`}
            >
                {gift.question}
            </p>

            <p
                className={`mt-3 leading-relaxed font-light opacity-85 ${
                    variant === 'compact'
                        ? 'text-[12px] lg:text-sm'
                        : 'text-sm lg:text-base'
                }`}
            >
                {gift.intro}
            </p>

            <dl className="mt-4 space-y-2 text-sm lg:text-base">
                <div className="flex items-baseline gap-2">
                    <dt className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70 lg:text-xs">
                        Τράπεζα
                    </dt>
                    <dd className="font-medium italic">{gift.bank}</dd>
                </div>

                <div>
                    <dt className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70 lg:text-xs">
                        IBAN
                    </dt>
                    <dd className="mt-1 flex flex-wrap items-center gap-2">
                        <code className="font-mono text-[13px] tracking-wider select-all lg:text-sm">
                            {gift.iban}
                        </code>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1 border border-wedding-red/40 px-2 py-1 text-[10px] tracking-[0.15em] uppercase transition-colors hover:bg-wedding-red/10"
                        >
                            {copied ? 'Αντιγράφηκε' : 'Αντιγραφή'}
                        </button>
                    </dd>
                </div>

                <div>
                    <dt className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70 lg:text-xs">
                        Αιτιολογία
                    </dt>
                    <dd className="mt-1 font-medium italic">«{gift.reason}»</dd>
                </div>
            </dl>

            <p className="mt-4 text-[11px] leading-relaxed font-light opacity-70 lg:text-xs">
                {gift.reason_note}
            </p>
        </div>
    );
}
