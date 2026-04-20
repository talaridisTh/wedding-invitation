import type { WeddingChurch, WeddingReception } from '@/types';
import BackLink from './BackLink';

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
            <div className="mx-auto max-w-md pt-10 lg:max-w-4xl lg:pt-20">
                <h2
                    className="text-3xl leading-tight font-medium italic lg:text-center lg:text-5xl"
                    data-page-item
                >
                    Τελετή &<br />
                    Δεξίωση
                </h2>
                <div className="mt-3 h-px w-16 bg-wedding-red lg:mx-auto lg:mt-6 lg:w-32" data-page-item />

                <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="border border-wedding-red/35 bg-wedding-red/[0.04] p-5 shadow-[0_1px_2px_rgba(136,8,8,0.05)] lg:p-8" data-page-item>
                    <p className="text-[10px] font-light tracking-[0.3em] uppercase lg:text-xs">
                        Τελετή Γάμου
                    </p>
                    <p className="mt-3 text-xl font-medium italic lg:mt-4 lg:text-2xl">{church.name}</p>
                    <p className="mt-2 text-sm font-light">Ώρα: {ceremonyTime}</p>
                    <p className="mt-1 text-sm font-light">{church.arrival_note}</p>
                    <a
                        href={church.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium underline"
                    >
                        Χάρτης →
                    </a>
                </div>

                <div className="mt-6 border border-wedding-red/35 bg-wedding-red/[0.04] p-5 shadow-[0_1px_2px_rgba(136,8,8,0.05)] lg:mt-0 lg:p-8" data-page-item>
                    <p className="text-[10px] font-light tracking-[0.3em] uppercase lg:text-xs">
                        Δεξίωση
                    </p>
                    <p className="mt-3 text-xl font-medium italic lg:mt-4 lg:text-2xl">{reception.venue}</p>
                    <p className="mt-2 text-sm font-light">{reception.full_address}</p>
                    <p className="mt-1 text-sm font-light">
                        Ώρα: {reception.peak_time}
                    </p>
                    <a
                        href={reception.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium underline"
                    >
                        Χάρτης →
                    </a>
                    <p className="mt-4 text-xs font-light italic">{reception.note}</p>
                </div>
                </div>

                <div className="mt-10 flex justify-center lg:mt-20" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
