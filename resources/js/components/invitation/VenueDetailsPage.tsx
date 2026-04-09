import type { WeddingChurch, WeddingReception } from '@/types';
import BackLink from './BackLink';
import { LeafSprig, BranchTopRight } from './Botanicals';

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
                <h2
                    className="font-display text-3xl leading-tight font-semibold text-wedding-brown"
                    data-page-item
                >
                    Τελετή &<br />
                    Δεξίωση
                </h2>
                <div className="gold-line-left mt-3 w-16" data-page-item />

                <div className="mt-10" data-page-item>
                    <p className="font-body text-[10px] font-light tracking-[0.3em] text-wedding-gold uppercase">
                        Τελετή Γάμου
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-wedding-brown">
                        {church.name}
                    </p>
                    <p className="mt-2 font-body text-sm font-light text-wedding-brown-medium">
                        Ώρα: {ceremonyTime}
                    </p>
                    <p className="mt-1 font-body text-sm font-light text-wedding-brown-light">
                        {church.arrival_note}
                    </p>
                    <a
                        href={church.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block font-body text-sm font-light text-wedding-gold"
                    >
                        Χάρτης →
                    </a>
                </div>

                <div className="my-8" data-page-item>
                    <img
                        src="/images/wedding/gold-divider.png"
                        alt=""
                        className="w-full"
                        draggable={false}
                    />
                </div>

                <div data-page-item>
                    <p className="font-body text-[10px] font-light tracking-[0.3em] text-wedding-gold uppercase">
                        Δεξίωση
                    </p>
                    <p className="mt-3 font-display text-xl font-semibold text-wedding-brown">
                        {reception.venue}
                    </p>
                    <p className="mt-2 font-body text-sm font-light text-wedding-brown-medium">
                        {reception.full_address}
                    </p>
                    <p className="mt-1 font-body text-sm font-light text-wedding-brown-medium">
                        Ώρα: {reception.peak_time}
                    </p>
                    <a
                        href={reception.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block font-body text-sm font-light text-wedding-gold"
                    >
                        Χάρτης →
                    </a>
                    <p className="mt-4 font-body text-xs text-wedding-brown-light italic">
                        {reception.note}
                    </p>
                </div>

                <div className="my-8" data-page-item>
                    <img
                        src="/images/wedding/gold-divider.png"
                        alt=""
                        className="w-full"
                        draggable={false}
                    />
                </div>

                <div className="mt-6 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>
        </div>
    );
}
