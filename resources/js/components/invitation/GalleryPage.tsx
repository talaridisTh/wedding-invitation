import { useEffect, useState } from 'react';
import BackLink from './BackLink';

interface GalleryPhoto {
    src: string;
    alt: string;
    rotation: number;
}

const photos: GalleryPhoto[] = [
    {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        alt: 'Wedding rings on bouquet',
        rotation: -1.5,
    },
    {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        alt: 'Wedding ceremony aisle',
        rotation: 1.2,
    },
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        alt: 'Bridal flowers',
        rotation: -0.8,
    },
    {
        src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
        alt: 'Wedding arch',
        rotation: 1.5,
    },
    {
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
        alt: 'Bridal bouquet close-up',
        rotation: -1.2,
    },
    {
        src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
        alt: 'Couple walking',
        rotation: 0.9,
    },
];

interface GalleryPageProps {
    dateDisplay: string;
    onBack: () => void;
}

export default function GalleryPage({ dateDisplay, onBack }: GalleryPageProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveIndex(null);

                return;
            }

            if (event.key === 'ArrowRight') {
                setActiveIndex((current) => {
                    if (current === null) {
                        return current;
                    }

                    return (current + 1) % photos.length;
                });

                return;
            }

            if (event.key === 'ArrowLeft') {
                setActiveIndex((current) => {
                    if (current === null) {
                        return current;
                    }

                    return (current - 1 + photos.length) % photos.length;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex]);

    const activePhoto = activeIndex === null ? null : photos[activeIndex];

    return (
        <div className="inv-screen relative bg-wedding-cream-light px-6 pt-0 pb-12 text-wedding-red lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-md pt-10 lg:max-w-5xl lg:pt-20">
                <p
                    className="text-[10px] font-light tracking-[0.3em] uppercase"
                    data-page-item
                >
                    Save the Date
                </p>

                <h2
                    className="mt-2 text-3xl leading-tight font-medium italic lg:text-center lg:text-5xl"
                    data-page-item
                >
                    {dateDisplay}
                </h2>
                <div className="mt-3 h-px w-16 bg-wedding-red lg:mx-auto lg:mt-6 lg:w-32" data-page-item />

                <p
                    className="mt-6 text-sm leading-relaxed font-light italic"
                    data-page-item
                >
                    Μερικές στιγμές από το ταξίδι μας...
                </p>

                <div className="mt-10 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-3 lg:gap-6">
                    {photos.map((photo, index) => (
                        <button
                            key={photo.src}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            data-page-item
                            className="block overflow-hidden shadow-[0_1px_3px_rgba(136,8,8,0.08)] transition-opacity hover:opacity-90"
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                loading="lazy"
                                draggable={false}
                                className="block aspect-[3/4] w-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                <div className="mt-10 flex justify-center" data-page-item>
                    <BackLink onClick={onBack} />
                </div>
            </div>

            {activePhoto !== null && activeIndex !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Μεγέθυνση φωτογραφίας"
                    onClick={() => setActiveIndex(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 py-10 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex(null);
                        }}
                        aria-label="Κλείσιμο"
                        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex(
                                (activeIndex - 1 + photos.length) % photos.length,
                            );
                        }}
                        aria-label="Προηγούμενη φωτογραφία"
                        className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex((activeIndex + 1) % photos.length);
                        }}
                        aria-label="Επόμενη φωτογραφία"
                        className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>

                    <img
                        src={activePhoto.src.replace('w=800', 'w=1600')}
                        alt={activePhoto.alt}
                        onClick={(event) => event.stopPropagation()}
                        className="max-h-full max-w-full rounded-sm object-contain shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
}
