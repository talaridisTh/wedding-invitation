import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/RsvpController';
import BackLink from './BackLink';
import { BranchTopRight, LeafSprig } from './Botanicals';

interface RsvpPageProps {
    deadlineDisplay: string;
    onBack: () => void;
}

function EnvelopeIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="7" y="13" width="34" height="22" rx="1" />
            <path d="M7 15 l17 12 l17 -12" />
            <path d="M20 24 q4 -4 8 0" />
        </svg>
    );
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <circle cx="24" cy="24" r="18" />
            <path d="M15 24 l7 7 l13 -14" />
        </svg>
    );
}

export default function RsvpPage({ deadlineDisplay, onBack }: RsvpPageProps) {
    const [confirmedName, setConfirmedName] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const submitRsvp = () => {
        const submittedName = data.name.trim();

        post(store().url, {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmedName(submittedName);
                reset();
            },
        });
    };

    return (
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-md pt-10 lg:max-w-xl lg:pt-20">
                <p
                    className="text-[10px] font-light tracking-[0.3em] uppercase lg:text-center lg:text-xs"
                    data-page-item
                >
                    RSVP
                </p>

                <h2
                    className="mt-2 text-3xl leading-tight font-medium italic lg:text-center lg:text-5xl"
                    data-page-item
                >
                    Επιβεβαίωση
                    <br />
                    Παρουσίας
                </h2>
                <div className="mt-3 h-px w-16 bg-wedding-red lg:mx-auto lg:mt-6 lg:w-32" data-page-item />

                {confirmedName === null ? (
                    <>
                        <div
                            className="mt-10 flex justify-center"
                            data-page-item
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)] lg:h-28 lg:w-28">
                                <EnvelopeIcon className="h-9 w-9 lg:h-12 lg:w-12" />
                            </div>
                        </div>

                        <p
                            className="mt-6 text-center text-sm leading-relaxed font-light"
                            data-page-item
                        >
                            {deadlineDisplay}
                        </p>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                submitRsvp();
                            }}
                            className="mt-10"
                            data-page-item
                            noValidate
                        >
                            <label
                                htmlFor="rsvp-name"
                                className="block text-center text-[10px] font-light tracking-[0.3em] uppercase"
                            >
                                Όνομα
                            </label>
                            <input
                                id="rsvp-name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                autoComplete="name"
                                required
                                minLength={2}
                                maxLength={120}
                                placeholder="π.χ. Γιώργος Παπαδόπουλος"
                                className="mt-3 w-full border-0 border-b border-wedding-red/50 bg-transparent px-1 py-2 text-center text-lg italic text-wedding-red placeholder:text-wedding-red/40 placeholder:not-italic focus:border-wedding-red focus:outline-none lg:mt-4 lg:py-3 lg:text-2xl"
                            />
                            {errors.name && (
                                <p className="mt-2 text-center text-xs italic">
                                    {errors.name}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="group mt-10 flex w-full items-center justify-center py-3 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="inline-flex items-baseline gap-3 border-b border-wedding-red/60 pb-1.5 text-xl italic text-wedding-red lg:text-2xl">
                                    {processing
                                        ? 'Αποστολή...'
                                        : 'Θα παρευρεθώ'}
                                    {!processing && (
                                        <svg
                                            viewBox="0 0 24 12"
                                            width="22"
                                            height="11"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                            className="transition-transform group-hover:translate-x-1"
                                        >
                                            <path d="M1 6h21M17 1.5 22 6l-5 4.5" />
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="mt-12 flex flex-col items-center text-center" data-page-item>
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-wedding-red/35 bg-wedding-cream-light shadow-[0_1px_2px_rgba(136,8,8,0.05)]">
                            <CheckIcon className="h-10 w-10 lg:h-14 lg:w-14" />
                        </div>
                        <p className="mt-6 text-2xl leading-tight font-medium italic lg:mt-8 lg:text-4xl">
                            Ευχαριστούμε,
                            <br />
                            {confirmedName}!
                        </p>
                        <p className="mt-4 text-sm leading-relaxed font-light opacity-80 lg:mt-6 lg:text-base">
                            Η επιβεβαίωσή σας καταχωρήθηκε.
                            <br />
                            Ανυπομονούμε να σας δούμε στην ημέρα μας.
                        </p>
                    </div>
                )}

                <div className="mt-12 flex justify-center lg:mt-20" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
