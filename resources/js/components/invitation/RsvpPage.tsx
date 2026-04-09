import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/RsvpController';
import BackLink from './BackLink';
import { BranchTopRight, LeafSprig } from './Botanicals';

interface RsvpPageProps {
    deadlineDisplay: string;
    onBack: () => void;
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
        <div
            className="inv-screen relative px-6 pt-0 pb-12"
            style={{
                backgroundImage: 'url(/images/wedding/page-background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'var(--inv-bg)',
            }}
        >
            <div className="page-accent-bar" />

            <BranchTopRight className="absolute top-8 right-4 opacity-50" />
            <LeafSprig className="absolute bottom-20 left-4 rotate-12 opacity-40" />

            <div className="mx-auto max-w-md pt-10">
                <p
                    className="font-body text-[10px] font-light tracking-[0.3em] text-wedding-gold uppercase"
                    data-page-item
                >
                    RSVP
                </p>

                <h2
                    className="mt-2 font-display text-3xl leading-tight font-semibold text-wedding-brown"
                    data-page-item
                >
                    Επιβεβαίωση
                    <br />
                    Παρουσίας
                </h2>
                <div className="gold-line-left mt-3 w-16" data-page-item />

                <p
                    className="mt-6 font-body text-sm leading-relaxed font-light text-wedding-brown-light"
                    data-page-item
                >
                    {deadlineDisplay}
                </p>

                {confirmedName === null ? (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            submitRsvp();
                        }}
                        className="mt-8"
                        data-page-item
                        noValidate
                    >
                        <label
                            htmlFor="rsvp-name"
                            className="block font-body text-xs font-light tracking-[0.2em] text-wedding-brown-medium uppercase"
                        >
                            Όνομα
                        </label>
                        <input
                            id="rsvp-name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            autoComplete="name"
                            required
                            minLength={2}
                            maxLength={120}
                            placeholder="π.χ. Γιώργος Παπαδόπουλος"
                            className="mt-2 w-full border-0 border-b border-wedding-gold/40 bg-transparent px-1 py-2 font-display text-lg text-wedding-brown placeholder:text-wedding-brown-light/50 focus:border-wedding-gold focus:outline-none"
                        />
                        {errors.name && (
                            <p className="mt-2 font-body text-xs text-red-700">
                                {errors.name}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-8 w-full rounded-sm border border-wedding-gold bg-wedding-gold/10 px-6 py-3 font-body text-xs tracking-[0.2em] text-wedding-brown uppercase transition-colors hover:bg-wedding-gold/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Αποστολή...' : 'Θα παρευρεθώ'}
                        </button>
                    </form>
                ) : (
                    <div className="mt-10" data-page-item>
                        <p className="font-display text-xl font-semibold text-wedding-brown">
                            Ευχαριστούμε, {confirmedName}!
                        </p>
                        <p className="mt-3 font-body text-sm leading-relaxed font-light text-wedding-brown-medium">
                            Η επιβεβαίωσή σας καταχωρήθηκε. Ανυπομονούμε να σας
                            δούμε στην ημέρα μας.
                        </p>
                    </div>
                )}

                <div className="my-10" data-page-item>
                    <img
                        src="/images/wedding/gold-divider.png"
                        alt=""
                        className="w-full"
                        draggable={false}
                    />
                </div>

                <div className="flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
