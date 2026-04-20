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
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red">
            <div className="mx-auto max-w-md pt-10">
                <h2
                    className="text-3xl leading-tight font-medium italic"
                    data-page-item
                >
                    Τελετή &<br />
                    Δεξίωση
                </h2>
                <div className="mt-3 h-px w-16 bg-wedding-red" data-page-item />

                <div className="mt-10 border border-wedding-red/35 bg-wedding-red/[0.04] p-5 shadow-[0_1px_2px_rgba(136,8,8,0.05)]" data-page-item>
                    <p className="text-[10px] font-light tracking-[0.3em] uppercase">
                        Τελετή Γάμου
                    </p>
                    <p className="mt-3 text-xl font-medium italic">{church.name}</p>
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

                <div className="mt-6 border border-wedding-red/35 bg-wedding-red/[0.04] p-5 shadow-[0_1px_2px_rgba(136,8,8,0.05)]" data-page-item>
                    <p className="text-[10px] font-light tracking-[0.3em] uppercase">
                        Δεξίωση
                    </p>
                    <p className="mt-3 text-xl font-medium italic">{reception.venue}</p>
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

                <div className="mt-10 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
