import type { WeddingChurch, WeddingReception } from '@/types';
import BackLink from './BackLink';

interface VenueDetailsPageProps {
    church: WeddingChurch;
    reception: WeddingReception;
    ceremonyTime: string;
    onBack: () => void;
}

interface DirectionsLinkProps {
    label: string;
    href: string;
}

function DirectionsLink({ label, href }: DirectionsLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-3 border-b border-wedding-red/50 pb-1.5 text-base italic text-wedding-red transition-opacity hover:opacity-70 lg:text-xl"
        >
            {label}
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
        </a>
    );
}

export default function VenueDetailsPage({
    church,
    reception,
    ceremonyTime,
    onBack,
}: VenueDetailsPageProps) {
    // ceremonyTime is baked into the hero image; keep prop for future use
    void ceremonyTime;

    return (
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-md pt-10 lg:max-w-3xl lg:pt-20">
                <h2
                    className="text-3xl leading-tight font-medium italic lg:text-center lg:text-5xl"
                    data-page-item
                >
                    Τελετή &<br />
                    Δεξίωση
                </h2>
                <div
                    className="mt-3 h-px w-16 bg-wedding-red lg:mx-auto lg:mt-6 lg:w-32"
                    data-page-item
                />

                <div className="mt-10 lg:mt-14" data-page-item>
                    <img
                        src="/images/wedding/venue-card-art.webp"
                        alt="Τελετή στο Παρεκκλήσι Αγίου Νεομάρτυρος Γεωργίου εκ Κρήνης και Δεξίωση στην Πίστα Καρτ Λαγκαδά Volan"
                        draggable={false}
                        className="mx-auto w-full max-w-md lg:max-w-2xl"
                    />
                </div>

                <div
                    className="mt-12 flex flex-col items-center gap-6 lg:mt-16 lg:flex-row lg:justify-center lg:gap-16"
                    data-page-item
                >
                    <DirectionsLink
                        label="Οδηγίες Τελετής"
                        href={church.maps_url}
                    />
                    <DirectionsLink
                        label="Οδηγίες Δεξίωσης"
                        href={reception.maps_url}
                    />
                </div>

                <div className="mt-12 flex justify-center lg:mt-20" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
