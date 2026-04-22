import { useState } from 'react';
import type { WeddingGift } from '@/types';

interface GiftCardProps {
    gift: WeddingGift;
    variant?: 'full' | 'compact';
}

const GIFT_FONT_FAMILY =
    "'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

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
            style={{ fontFamily: GIFT_FONT_FAMILY }}
            className={`border border-wedding-red/35 bg-wedding-red/[0.04] text-wedding-red shadow-[0_1px_2px_rgba(136,8,8,0.05)] ${
                variant === 'compact' ? 'px-5 py-6 lg:px-8 lg:py-8' : 'px-6 py-8 lg:px-10 lg:py-10'
            }`}
        >
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-80 lg:text-xs">
                Δώρο γάμου
            </p>

            {showQuestion && (
                <p className="mt-2 text-lg leading-snug font-semibold lg:text-xl">
                    {gift.question}
                </p>
            )}

            <p className="mt-3 text-[13px] leading-relaxed font-normal opacity-85 lg:text-sm">
                {gift.intro}
            </p>

            <dl className="mt-5 space-y-4">
                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-70 lg:text-[11px]">
                        Τράπεζα
                    </dt>
                    <dd className="mt-1 text-base leading-snug font-semibold lg:text-lg">
                        {gift.bank}
                    </dd>
                </div>

                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-70 lg:text-[11px]">
                        IBAN
                    </dt>
                    <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <code
                            style={{
                                fontFamily:
                                    "'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace",
                            }}
                            className="text-[14px] font-semibold tracking-wider select-all lg:text-[15px]"
                        >
                            {formatIban(gift.iban)}
                        </code>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="text-[11px] font-semibold tracking-[0.15em] uppercase underline-offset-4 transition-opacity hover:underline"
                        >
                            {copied ? 'Αντιγράφηκε' : 'Αντιγραφή'}
                        </button>
                    </dd>
                </div>

                <div>
                    <dt className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-70 lg:text-[11px]">
                        Αιτιολογία
                    </dt>
                    <dd className="mt-1 text-base leading-snug font-semibold lg:text-lg">
                        «{gift.reason}»
                    </dd>
                </div>
            </dl>
        </div>
    );
}
