import '../../css/invitation.css';
import { Head } from '@inertiajs/react';
import gsap from 'gsap';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import CollageHome from '@/components/invitation/CollageHome';
import FaqPage from '@/components/invitation/FaqPage';
import GalleryPage from '@/components/invitation/GalleryPage';
import IntroScreen from '@/components/invitation/IntroScreen';
import RsvpPage from '@/components/invitation/RsvpPage';
import TimelinePage from '@/components/invitation/TimelinePage';
import VenueDetailsPage from '@/components/invitation/VenueDetailsPage';
import type { Wedding } from '@/types';

type Screen = 'intro' | 'collage' | 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery';

const HASH_TO_SCREEN: Record<string, Screen> = {
    '': 'intro',
    '#collage': 'collage',
    '#venue': 'venue',
    '#timeline': 'timeline',
    '#faq': 'faq',
    '#rsvp': 'rsvp',
    '#gallery': 'gallery',
};

const hashFor = (target: Screen): string => (target === 'intro' ? '' : `#${target}`);

const screenFromHash = (hash: string): Screen => HASH_TO_SCREEN[hash] ?? 'intro';

const REDUCED_MOTION =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function InvitationPage({ wedding }: { wedding: Wedding }) {
    const [screen, setScreen] = useState<Screen>(() => {
        if (typeof window === 'undefined') {
            return 'intro';
        }

        return screenFromHash(window.location.hash);
    });
    const introRef = useRef<HTMLDivElement>(null);
    const collageRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    // ── Browser back/forward sync ────────────────────────────
    useEffect(() => {
        const handlePopState = (): void => {
            setScreen(screenFromHash(window.location.hash));
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const pushScreen = useCallback((target: Screen): void => {
        const nextHash = hashFor(target);
        const currentHash = window.location.hash;

        if (currentHash !== nextHash) {
            const nextUrl = nextHash || window.location.pathname + window.location.search;

            window.history.pushState({ screen: target }, '', nextUrl);
        }

        setScreen(target);
    }, []);

    // ── Intro → Collage ──────────────────────────────────────
    const handleOpenEnvelope = useCallback(() => {
        if (REDUCED_MOTION) {
            pushScreen('collage');
            return;
        }

        const tl = gsap.timeline();

        tl.to(introRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
        });

        tl.call(() => pushScreen('collage'), undefined, '+=0.1');
    }, [pushScreen]);

    // ── Collage enter animation ──────────────────────────────
    // Runs synchronously before paint so there is no flash of visible cards.
    // Only fades opacity (NOT transform) so CSS rotations on the cards stay.
    useLayoutEffect(() => {
        if (screen !== 'collage' || collageRef.current === null) {
            return;
        }

        const cards = collageRef.current.querySelectorAll<HTMLElement>('[data-collage-card]');

        if (cards.length === 0) {
            return;
        }

        if (REDUCED_MOTION) {
            gsap.set(cards, { clearProps: 'opacity' });

            return;
        }

        gsap.set(cards, { opacity: 0 });

        const anim = gsap.to(cards, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
        });

        return () => {
            anim.kill();
        };
    }, [screen]);

    // ── Collage → Sub-page ───────────────────────────────────
    const navigateToPage = useCallback(
        (page: 'venue' | 'timeline' | 'faq' | 'rsvp' | 'gallery') => {
            if (REDUCED_MOTION) {
                pushScreen(page);
                return;
            }

            const tl = gsap.timeline();

            tl.to(collageRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            });

            tl.call(() => pushScreen(page), undefined, '+=0.08');
        },
        [pushScreen],
    );

    // ── Sub-page enter animation ─────────────────────────────
    // Sub-pages have no CSS rotation baked in, so we can safely animate y.
    useLayoutEffect(() => {
        const isSubPage =
            screen === 'venue' ||
            screen === 'timeline' ||
            screen === 'faq' ||
            screen === 'rsvp' ||
            screen === 'gallery';

        if (!isSubPage || pageRef.current === null) {
            return;
        }

        const items = pageRef.current.querySelectorAll<HTMLElement>('[data-page-item]');

        if (items.length === 0) {
            return;
        }

        if (REDUCED_MOTION) {
            gsap.set(items, { clearProps: 'opacity,y' });

            return;
        }

        gsap.set(items, { opacity: 0, y: 18 });

        const anim = gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
        });

        return () => {
            anim.kill();
        };
    }, [screen]);

    // ── Sub-page → Collage (back) ────────────────────────────
    // Delegates to history.back() so the URL stays in sync and the mobile
    // browser's native back gesture lands on the same screen as this button.
    const navigateBack = useCallback(() => {
        if (REDUCED_MOTION) {
            window.history.back();
            return;
        }

        const tl = gsap.timeline();

        tl.to(pageRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
        });

        tl.call(() => window.history.back(), undefined, '+=0.08');
    }, []);

    return (
        <>
            <Head title={`${wedding.bride} & ${wedding.groom}`} />

            {screen === 'intro' && (
                <div ref={introRef}>
                    <IntroScreen
                        bride={wedding.bride}
                        groom={wedding.groom}
                        dateDisplay={wedding.date_display}
                        ctaText={wedding.messages.envelope_cta}
                        onOpen={handleOpenEnvelope}
                    />
                </div>
            )}

            {screen === 'collage' && (
                <div ref={collageRef}>
                    <CollageHome
                        bride={wedding.bride}
                        groom={wedding.groom}
                        dateDisplay={wedding.date_display}
                        ceremonyTime={wedding.ceremony_time_display}
                        onNavigate={navigateToPage}
                    />
                </div>
            )}

            {screen === 'venue' && (
                <div ref={pageRef}>
                    <VenueDetailsPage
                        church={wedding.church}
                        reception={wedding.reception}
                        ceremonyTime={wedding.ceremony_time_display}
                        onBack={navigateBack}
                    />
                </div>
            )}

            {screen === 'timeline' && (
                <div ref={pageRef}>
                    <TimelinePage
                        dateDisplay={wedding.date_display}
                        items={wedding.timeline}
                        onBack={navigateBack}
                    />
                </div>
            )}

            {screen === 'faq' && (
                <div ref={pageRef}>
                    <FaqPage items={wedding.faq} onBack={navigateBack} />
                </div>
            )}

            {screen === 'rsvp' && (
                <div ref={pageRef}>
                    <RsvpPage
                        deadlineDisplay={wedding.rsvp.deadline_display}
                        onBack={navigateBack}
                    />
                </div>
            )}

            {screen === 'gallery' && (
                <div ref={pageRef}>
                    <GalleryPage
                        dateDisplay={wedding.date_display}
                        onBack={navigateBack}
                    />
                </div>
            )}
        </>
    );
}
