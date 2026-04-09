import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/RsvpController';
import BackLink from './BackLink';

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
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red">
            <div className="mx-auto max-w-md pt-10">
                <p
                    className="text-[10px] font-light tracking-[0.3em] uppercase"
                    data-page-item
                >
                    RSVP
                </p>

                <h2
                    className="mt-2 text-3xl leading-tight font-medium italic"
                    data-page-item
                >
                    Επιβεβαίωση
                    <br />
                    Παρουσίας
                </h2>
                <div className="mt-3 h-px w-16 bg-wedding-red" data-page-item />

                <p className="mt-6 text-sm leading-relaxed font-light" data-page-item>
                    {deadlineDisplay}
                </p>

                {confirmedName === null ? (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            submitRsvp();
                        }}
                        className="mt-8 border-2 border-wedding-red p-5"
                        data-page-item
                        noValidate
                    >
                        <label
                            htmlFor="rsvp-name"
                            className="block text-xs font-light tracking-[0.2em] uppercase"
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
                            className="mt-2 w-full border-0 border-b border-wedding-red bg-transparent px-1 py-2 text-lg text-wedding-red placeholder:text-wedding-red/40 focus:outline-none"
                        />
                        {errors.name && (
                            <p className="mt-2 text-xs italic">{errors.name}</p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 w-full border-2 border-wedding-red px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-wedding-red/5 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Αποστολή...' : 'Θα παρευρεθώ'}
                        </button>
                    </form>
                ) : (
                    <div className="mt-10 border-2 border-wedding-red p-5" data-page-item>
                        <p className="text-xl font-medium italic">
                            Ευχαριστούμε, {confirmedName}!
                        </p>
                        <p className="mt-3 text-sm leading-relaxed font-light">
                            Η επιβεβαίωσή σας καταχωρήθηκε. Ανυπομονούμε να σας
                            δούμε στην ημέρα μας.
                        </p>
                    </div>
                )}

                <div className="mt-10 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
