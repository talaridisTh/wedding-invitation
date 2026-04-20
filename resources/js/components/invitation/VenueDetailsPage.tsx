import type { WeddingChurch, WeddingReception } from '@/types';
import BackLink from './BackLink';
import { LocationItem } from './LocationCard';

interface VenueDetailsPageProps {
    church: WeddingChurch;
    reception: WeddingReception;
    ceremonyTime: string;
    onBack: () => void;
}

export default function VenueDetailsPage({
    church,
    reception,
    ceremonyTime,
    onBack,
}: VenueDetailsPageProps) {
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

                <ol className="relative mt-10 lg:mt-16">
                    <div className="mb-16 lg:mb-24">
                        <LocationItem
                            image="/images/wedding/venue-church-art.png"
                            imageAlt="Εκκλησία"
                            label="Τελετή Γάμου"
                            title={church.name}
                            time={ceremonyTime}
                            address={church.arrival_note}
                            href={church.maps_url}
                        />
                    </div>

                    <LocationItem
                        image="/images/wedding/venue-party-art.png"
                        imageAlt="Γλέντι"
                        label="Δεξίωση"
                        title={reception.venue}
                        time={reception.peak_time}
                        address={reception.full_address}
                        note={reception.note}
                        href={reception.maps_url}
                    />
                </ol>

                <div className="mt-12 flex justify-center lg:mt-20" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
