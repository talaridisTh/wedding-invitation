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
                variant === 'compact' ? 'px-5 py-6 lg:px-8 lg:py-8' : 'px-6 py-8 lg:px-10 lg:py-10'
            }`}
        >
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase lg:text-xs">
                Δώρο γάμου
            </p>

            {showQuestion && (
                <p className="mt-3 text-xl leading-tight font-medium lg:text-2xl">
                    {gift.question}
                </p>
            )}

            <dl className="mt-5 space-y-4">
                <div>
                    <dt className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-75 lg:text-[11px]">
                        Τράπεζα
                    </dt>
                    <dd className="mt-1 text-base font-medium lg:text-lg">
                        {gift.bank}
                    </dd>
                </div>

                <div>
                    <dt className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-75 lg:text-[11px]">
                        IBAN
                    </dt>
                    <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <code className="font-mono text-[15px] font-medium tracking-wider select-all lg:text-base">
                            {formatIban(gift.iban)}
                        </code>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="text-[11px] font-medium tracking-[0.15em] uppercase underline-offset-4 transition-opacity hover:underline"
                        >
                            {copied ? 'Αντιγράφηκε' : 'Αντιγραφή'}
                        </button>
                    </dd>
                </div>

                <div>
                    <dt className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-75 lg:text-[11px]">
                        Αιτιολογία
                    </dt>
                    <dd className="mt-1 text-base font-medium lg:text-lg">
                        «{gift.reason}»
                    </dd>
                </div>
            </dl>
        </div>
    );
}
