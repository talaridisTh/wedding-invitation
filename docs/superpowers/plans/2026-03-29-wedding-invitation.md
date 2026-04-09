# Wedding Invitation Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive wedding invitation page with a CSS envelope that opens via GSAP animation, revealing a bento-style card layout with all wedding details.

**Architecture:** Single Inertia React page (`invitation.tsx`) manages open/closed state. The closed state renders a pure-CSS envelope component. On click, a GSAP timeline animates the envelope open and transitions to the invitation content — a bento grid of card components. All wedding data comes from the `wedding` prop (passed from `config/wedding.php`).

**Tech Stack:** React 19 + Inertia.js v2 + Tailwind CSS v4 + GSAP 3 (all already installed)

**Spec:** `docs/superpowers/specs/2026-03-29-wedding-invitation-design.md`

---

## File Structure

```
resources/js/
  types/wedding.ts                          — TypeScript types for the wedding prop
  pages/invitation.tsx                      — Main page: state, animation orchestration
  components/invitation/
    Envelope.tsx                            — Closed envelope (CSS 3D, monogram, click)
    EnvelopeOpen.tsx                        — Decorative open envelope header
    InvitationContent.tsx                   — Bento grid wrapper with all cards
    cards/
      SaveTheDateCard.tsx                   — Date & time
      ChurchCard.tsx                        — Church + Maps link
      ReceptionCard.tsx                     — Venue + Maps link
      MenuCard.tsx                          — Menu sections
      DressCodeCard.tsx                     — Dress code with color swatches
      RsvpCard.tsx                          — RSVP deadline & contact
```

---

## Task 1: TypeScript Types for Wedding Prop

**Files:**
- Create: `resources/js/types/wedding.ts`
- Modify: `resources/js/types/index.ts`

- [ ] **Step 1: Create wedding types**

Create `resources/js/types/wedding.ts`:

```typescript
export interface WeddingChurch {
    name: string;
    address: string;
    maps_url: string;
    arrival_note: string;
}

export interface WeddingReception {
    venue: string;
    address: string;
    full_address: string;
    peak_time: string;
    maps_url: string;
    note: string;
}

export interface WeddingMenu {
    starters: string[];
    main_courses: string[];
    desserts: string[];
}

export interface WeddingDressCodeColor {
    label: string;
    shades: string;
}

export interface WeddingDressCode {
    title: string;
    description: string;
    green: WeddingDressCodeColor;
    pink: WeddingDressCodeColor;
}

export interface WeddingRsvp {
    deadline: string;
    deadline_display: string;
    email: string;
    special_needs_note: string;
}

export interface WeddingMessages {
    envelope_title: string;
    envelope_subtitle: string;
    envelope_cta: string;
    welcome: string;
}

export interface WeddingTabs {
    details: string;
    location: string;
    menu: string;
    reception: string;
    dress_code: string;
    info: string;
}

export interface Wedding {
    bride: string;
    groom: string;
    date: string;
    date_display: string;
    ceremony_time: string;
    ceremony_time_display: string;
    church: WeddingChurch;
    reception: WeddingReception;
    menu: WeddingMenu;
    dress_code: WeddingDressCode;
    rsvp: WeddingRsvp;
    messages: WeddingMessages;
    tabs: WeddingTabs;
    hero_image: string;
}
```

- [ ] **Step 2: Export from index**

Modify `resources/js/types/index.ts` — add:

```typescript
export type * from './wedding';
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add resources/js/types/wedding.ts resources/js/types/index.ts
git commit -m "feat: add TypeScript types for wedding config prop"
```

---

## Task 2: Envelope Component (Pure CSS)

**Files:**
- Create: `resources/js/components/invitation/Envelope.tsx`

This is the core visual component — the closed envelope with 3D flap, monogram, and click interaction.

- [ ] **Step 1: Create Envelope component**

Create `resources/js/components/invitation/Envelope.tsx`:

```tsx
import { useRef } from 'react';

interface EnvelopeProps {
    bride: string;
    groom: string;
    dateDisplay: string;
    ctaText: string;
    onOpen: () => void;
}

export default function Envelope({ bride, groom, dateDisplay, ctaText, onOpen }: EnvelopeProps) {
    const envelopeRef = useRef<HTMLDivElement>(null);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
        }
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-wedding-cream-light px-4">
            {/* Couple names */}
            <h1 className="font-display mb-1 text-center text-3xl font-semibold italic text-wedding-brown sm:text-5xl">
                {bride} & {groom}
            </h1>
            <p className="font-body mb-8 text-lg font-light text-wedding-brown-medium sm:text-xl">
                {dateDisplay}
            </p>

            {/* Envelope */}
            <div
                ref={envelopeRef}
                role="button"
                tabIndex={0}
                onClick={onOpen}
                onKeyDown={handleKeyDown}
                className="group relative cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                aria-label={ctaText}
                style={{ perspective: '800px' }}
            >
                {/* Envelope body */}
                <div className="relative h-48 w-72 rounded-md bg-wedding-envelope shadow-lg sm:h-56 sm:w-80">
                    {/* Bottom fold triangles (decorative) */}
                    <div
                        className="absolute bottom-0 left-0 h-0 w-0"
                        style={{
                            borderLeft: '144px solid transparent',
                            borderRight: '144px solid transparent',
                            borderBottom: '96px solid #e8dccf',
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 hidden h-0 w-0 sm:block"
                        style={{
                            borderLeft: '160px solid transparent',
                            borderRight: '160px solid transparent',
                            borderBottom: '112px solid #e8dccf',
                        }}
                    />

                    {/* Flap (top triangle) */}
                    <div
                        className="absolute left-0 top-0 z-10 w-full"
                        style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'top center',
                        }}
                    >
                        {/* Flap front face */}
                        <div
                            className="h-0 w-full"
                            style={{
                                borderLeft: '144px solid transparent',
                                borderRight: '144px solid transparent',
                                borderTop: '80px solid #d9c4af',
                                backfaceVisibility: 'hidden',
                            }}
                        />
                    </div>

                    {/* Monogram */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <span className="font-display text-2xl font-bold text-wedding-gold sm:text-4xl">
                            Φ&Κ
                        </span>
                    </div>
                </div>
            </div>

            {/* CTA text */}
            <p className="font-body mt-6 animate-pulse text-sm font-light text-wedding-brown-light">
                {ctaText}
            </p>
        </div>
    );
}
```

- [ ] **Step 2: Verify it renders**

Temporarily update `resources/js/pages/invitation.tsx`:

```tsx
import type { Wedding } from '@/types';
import Envelope from '@/components/invitation/Envelope';

export default function InvitationPage({ wedding }: { wedding: Wedding }) {
    return (
        <Envelope
            bride={wedding.bride}
            groom={wedding.groom}
            dateDisplay={wedding.date_display}
            ctaText={wedding.messages.envelope_cta}
            onOpen={() => console.log('open')}
        />
    );
}
```

Run: `npm run build`
Expected: Build succeeds. Visit `https://fwtini.test` — envelope visible with names, date, monogram, CTA text.

- [ ] **Step 3: Commit**

```bash
git add resources/js/components/invitation/Envelope.tsx resources/js/pages/invitation.tsx
git commit -m "feat: add closed envelope component with CSS 3D flap and monogram"
```

---

## Task 3: Invitation Content Cards

**Files:**
- Create: `resources/js/components/invitation/cards/SaveTheDateCard.tsx`
- Create: `resources/js/components/invitation/cards/ChurchCard.tsx`
- Create: `resources/js/components/invitation/cards/ReceptionCard.tsx`
- Create: `resources/js/components/invitation/cards/MenuCard.tsx`
- Create: `resources/js/components/invitation/cards/DressCodeCard.tsx`
- Create: `resources/js/components/invitation/cards/RsvpCard.tsx`

Each card is a presentational component receiving typed props from the wedding config.

- [ ] **Step 1: Create SaveTheDateCard**

Create `resources/js/components/invitation/cards/SaveTheDateCard.tsx`:

```tsx
interface SaveTheDateCardProps {
    dateDisplay: string;
    ceremonyTime: string;
}

export default function SaveTheDateCard({ dateDisplay, ceremonyTime }: SaveTheDateCardProps) {
    return (
        <div className="col-span-2 rounded-xl border border-wedding-cream-dark bg-wedding-paper p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <p className="font-body text-sm font-light uppercase tracking-widest text-wedding-brown-light">
                Save the Date
            </p>
            <p className="font-display mt-2 text-2xl font-semibold text-wedding-brown">
                {dateDisplay}
            </p>
            <p className="font-body mt-1 text-base text-wedding-brown-medium">
                Ώρα τελετής: {ceremonyTime}
            </p>
        </div>
    );
}
```

- [ ] **Step 2: Create ChurchCard**

Create `resources/js/components/invitation/cards/ChurchCard.tsx`:

```tsx
interface ChurchCardProps {
    name: string;
    arrivalNote: string;
    mapsUrl: string;
}

export default function ChurchCard({ name, arrivalNote, mapsUrl }: ChurchCardProps) {
    return (
        <div className="rounded-xl border border-wedding-cream-dark bg-wedding-paper p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <p className="font-body text-sm font-light uppercase tracking-widest text-wedding-brown-light">
                Εκκλησία
            </p>
            <p className="font-display mt-2 text-xl font-semibold text-wedding-brown">
                {name}
            </p>
            <p className="font-body mt-1 text-sm text-wedding-brown-light">
                {arrivalNote}
            </p>
            <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body mt-3 inline-block cursor-pointer text-sm font-light text-wedding-gold underline underline-offset-2 transition-colors duration-200 hover:text-wedding-gold-light"
            >
                Δείτε στο χάρτη &rarr;
            </a>
        </div>
    );
}
```

- [ ] **Step 3: Create ReceptionCard**

Create `resources/js/components/invitation/cards/ReceptionCard.tsx`:

```tsx
interface ReceptionCardProps {
    venue: string;
    fullAddress: string;
    peakTime: string;
    mapsUrl: string;
    note: string;
}

export default function ReceptionCard({ venue, fullAddress, peakTime, mapsUrl, note }: ReceptionCardProps) {
    return (
        <div className="rounded-xl border border-wedding-cream-dark bg-wedding-paper p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <p className="font-body text-sm font-light uppercase tracking-widest text-wedding-brown-light">
                Δεξίωση
            </p>
            <p className="font-display mt-2 text-xl font-semibold text-wedding-brown">
                {venue}
            </p>
            <p className="font-body mt-1 text-sm text-wedding-brown-medium">
                {fullAddress}
            </p>
            <p className="font-body mt-1 text-sm text-wedding-brown-medium">
                Ώρα: {peakTime}
            </p>
            <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body mt-3 inline-block cursor-pointer text-sm font-light text-wedding-gold underline underline-offset-2 transition-colors duration-200 hover:text-wedding-gold-light"
            >
                Δείτε στο χάρτη &rarr;
            </a>
            <p className="font-body mt-3 text-xs italic text-wedding-brown-light">
                {note}
            </p>
        </div>
    );
}
```

- [ ] **Step 4: Create MenuCard**

Create `resources/js/components/invitation/cards/MenuCard.tsx`:

```tsx
interface MenuCardProps {
    starters: string[];
    mainCourses: string[];
    desserts: string[];
}

export default function MenuCard({ starters, mainCourses, desserts }: MenuCardProps) {
    return (
        <div className="col-span-2 rounded-xl border border-wedding-cream-dark bg-wedding-paper p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <p className="font-body text-sm font-light uppercase tracking-widest text-wedding-brown-light">
                Μενού
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                    <p className="font-display text-base font-semibold text-wedding-brown">Ορεκτικά</p>
                    <ul className="font-body mt-1 space-y-1 text-sm text-wedding-brown-medium">
                        {starters.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="font-display text-base font-semibold text-wedding-brown">Κυρίως</p>
                    <ul className="font-body mt-1 space-y-1 text-sm text-wedding-brown-medium">
                        {mainCourses.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="font-display text-base font-semibold text-wedding-brown">Επιδόρπια</p>
                    <ul className="font-body mt-1 space-y-1 text-sm text-wedding-brown-medium">
                        {desserts.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 5: Create DressCodeCard**

Create `resources/js/components/invitation/cards/DressCodeCard.tsx`:

```tsx
interface DressCodeCardProps {
    title: string;
    description: string;
    green: { label: string; shades: string };
    pink: { label: string; shades: string };
}

export default function DressCodeCard({ title, description, green, pink }: DressCodeCardProps) {
    return (
        <div className="col-span-2 rounded-xl border border-wedding-cream-dark bg-wedding-paper p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <p className="font-body text-sm font-light uppercase tracking-widest text-wedding-brown-light">
                Dress Code
            </p>
            <p className="font-display mt-2 text-xl font-semibold text-wedding-brown">
                {title}
            </p>
            <p className="font-body mt-1 text-sm text-wedding-brown-medium">
                {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-6">
                {/* Green shades */}
                <div>
                    <p className="font-body text-sm font-light text-wedding-brown">{green.label}</p>
                    <div className="mt-2 flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-wedding-green-dark shadow-sm" title="Σκούρο πράσινο" />
                        <div className="h-8 w-8 rounded-full bg-wedding-green shadow-sm" title="Πράσινο" />
                        <div className="h-8 w-8 rounded-full bg-wedding-green-light shadow-sm" title="Ανοιχτό πράσινο" />
                    </div>
                    <p className="font-body mt-1 text-xs text-wedding-brown-light">{green.shades}</p>
                </div>

                {/* Pink shades */}
                <div>
                    <p className="font-body text-sm font-light text-wedding-brown">{pink.label}</p>
                    <div className="mt-2 flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-wedding-pink-dark shadow-sm" title="Σκούρο ροζ" />
                        <div className="h-8 w-8 rounded-full bg-wedding-pink shadow-sm" title="Ροζ" />
                        <div className="h-8 w-8 rounded-full bg-wedding-pink-light shadow-sm" title="Ανοιχτό ροζ" />
                    </div>
                    <p className="font-body mt-1 text-xs text-wedding-brown-light">{pink.shades}</p>
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 6: Create RsvpCard**

Create `resources/js/components/invitation/cards/RsvpCard.tsx`:

```tsx
interface RsvpCardProps {
    deadlineDisplay: string;
    email: string;
    specialNeedsNote: string;
}

export default function RsvpCard({ deadlineDisplay, email, specialNeedsNote }: RsvpCardProps) {
    return (
        <div className="col-span-2 rounded-xl border border-wedding-cream-dark bg-wedding-paper p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
            <p className="font-body text-sm font-light uppercase tracking-widest text-wedding-brown-light">
                RSVP
            </p>
            <p className="font-display mt-2 text-xl font-semibold text-wedding-brown">
                {deadlineDisplay}
            </p>
            <a
                href={`mailto:${email}`}
                className="font-body mt-2 inline-block cursor-pointer text-sm text-wedding-gold underline underline-offset-2 transition-colors duration-200 hover:text-wedding-gold-light"
            >
                {email}
            </a>
            <p className="font-body mt-3 text-xs italic text-wedding-brown-light">
                {specialNeedsNote}
            </p>
        </div>
    );
}
```

- [ ] **Step 7: Commit**

```bash
git add resources/js/components/invitation/cards/
git commit -m "feat: add all invitation bento cards (date, church, reception, menu, dress code, rsvp)"
```

---

## Task 4: InvitationContent & EnvelopeOpen Components

**Files:**
- Create: `resources/js/components/invitation/EnvelopeOpen.tsx`
- Create: `resources/js/components/invitation/InvitationContent.tsx`

- [ ] **Step 1: Create EnvelopeOpen (decorative header)**

Create `resources/js/components/invitation/EnvelopeOpen.tsx`:

```tsx
interface EnvelopeOpenProps {
    welcomeMessage: string;
}

export default function EnvelopeOpen({ welcomeMessage }: EnvelopeOpenProps) {
    return (
        <div className="flex flex-col items-center pt-8 pb-4">
            {/* Decorative open envelope — smaller, non-interactive */}
            <div className="relative h-28 w-48">
                {/* Open flap (rotated back) */}
                <div
                    className="absolute left-0 top-0 w-full"
                    style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'top center',
                        transform: 'rotateX(180deg)',
                    }}
                >
                    <div
                        className="h-0 w-full"
                        style={{
                            borderLeft: '96px solid transparent',
                            borderRight: '96px solid transparent',
                            borderTop: '52px solid #d9c4af',
                            backfaceVisibility: 'hidden',
                        }}
                    />
                </div>

                {/* Envelope body */}
                <div className="absolute bottom-0 h-16 w-full rounded-b-md bg-wedding-envelope shadow-md" />

                {/* Monogram inside */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-wedding-gold">
                        Φ&Κ
                    </span>
                </div>
            </div>

            {/* Welcome message */}
            <p className="font-display mt-4 text-center text-2xl font-semibold italic text-wedding-brown sm:text-3xl">
                {welcomeMessage}
            </p>
        </div>
    );
}
```

- [ ] **Step 2: Create InvitationContent (bento grid wrapper)**

Create `resources/js/components/invitation/InvitationContent.tsx`:

```tsx
import type { Wedding } from '@/types';
import SaveTheDateCard from './cards/SaveTheDateCard';
import ChurchCard from './cards/ChurchCard';
import ReceptionCard from './cards/ReceptionCard';
import MenuCard from './cards/MenuCard';
import DressCodeCard from './cards/DressCodeCard';
import RsvpCard from './cards/RsvpCard';
import EnvelopeOpen from './EnvelopeOpen';

interface InvitationContentProps {
    wedding: Wedding;
}

export default function InvitationContent({ wedding }: InvitationContentProps) {
    return (
        <div className="min-h-svh bg-wedding-cream-light px-4 pb-12">
            <div className="mx-auto max-w-lg">
                <EnvelopeOpen welcomeMessage={wedding.messages.welcome} />

                <div className="invitation-cards mt-6 grid grid-cols-2 gap-4">
                    <SaveTheDateCard
                        dateDisplay={wedding.date_display}
                        ceremonyTime={wedding.ceremony_time_display}
                    />
                    <ChurchCard
                        name={wedding.church.name}
                        arrivalNote={wedding.church.arrival_note}
                        mapsUrl={wedding.church.maps_url}
                    />
                    <ReceptionCard
                        venue={wedding.reception.venue}
                        fullAddress={wedding.reception.full_address}
                        peakTime={wedding.reception.peak_time}
                        mapsUrl={wedding.reception.maps_url}
                        note={wedding.reception.note}
                    />
                    <MenuCard
                        starters={wedding.menu.starters}
                        mainCourses={wedding.menu.main_courses}
                        desserts={wedding.menu.desserts}
                    />
                    <DressCodeCard
                        title={wedding.dress_code.title}
                        description={wedding.dress_code.description}
                        green={wedding.dress_code.green}
                        pink={wedding.dress_code.pink}
                    />
                    <RsvpCard
                        deadlineDisplay={wedding.rsvp.deadline_display}
                        email={wedding.rsvp.email}
                        specialNeedsNote={wedding.rsvp.special_needs_note}
                    />
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add resources/js/components/invitation/EnvelopeOpen.tsx resources/js/components/invitation/InvitationContent.tsx
git commit -m "feat: add InvitationContent bento grid and EnvelopeOpen decorative header"
```

---

## Task 5: Main Page with GSAP Animation

**Files:**
- Modify: `resources/js/pages/invitation.tsx`

This ties everything together: state management, GSAP timeline, reduced-motion support.

- [ ] **Step 1: Implement the full invitation page**

Replace `resources/js/pages/invitation.tsx` with:

```tsx
import type { Wedding } from '@/types';
import Envelope from '@/components/invitation/Envelope';
import InvitationContent from '@/components/invitation/InvitationContent';
import { Head } from '@inertiajs/react';
import gsap from 'gsap';
import { useCallback, useRef, useState } from 'react';

export default function InvitationPage({ wedding }: { wedding: Wedding }) {
    const [isOpen, setIsOpen] = useState(false);
    const envelopeScreenRef = useRef<HTMLDivElement>(null);
    const contentScreenRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleOpen = useCallback(() => {
        if (isOpen) return;

        // Skip animation for reduced motion preference
        if (prefersReducedMotion) {
            setIsOpen(true);
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => setIsOpen(true),
        });

        // Step 1: Flap opens (rotateX on the flap element)
        tl.to('[data-envelope-flap]', {
            rotationX: 180,
            duration: 0.6,
            ease: 'power2.out',
        });

        // Step 2: Letter slides up
        tl.to('[data-envelope-monogram]', {
            yPercent: -80,
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.out',
        });

        // Step 3: Entire envelope screen fades out
        tl.to(envelopeScreenRef.current, {
            opacity: 0,
            scale: 0.85,
            duration: 0.5,
            ease: 'power2.in',
        });
    }, [isOpen, prefersReducedMotion]);

    return (
        <>
            <Head title={`${wedding.bride} & ${wedding.groom}`} />

            {!isOpen && (
                <div ref={envelopeScreenRef}>
                    <Envelope
                        bride={wedding.bride}
                        groom={wedding.groom}
                        dateDisplay={wedding.date_display}
                        ctaText={wedding.messages.envelope_cta}
                        onOpen={handleOpen}
                    />
                </div>
            )}

            {isOpen && (
                <div ref={contentScreenRef}>
                    <InvitationContent wedding={wedding} />
                </div>
            )}
        </>
    );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Builds successfully

- [ ] **Step 3: Verify in browser**

Visit `https://fwtini.test`:
1. Envelope visible with names, date, monogram
2. Click envelope → flap opens → monogram slides up → fade out → content appears
3. All 6 cards visible in bento layout
4. Maps links open in new tab
5. Color swatches visible in dress code card

- [ ] **Step 4: Commit**

```bash
git add resources/js/pages/invitation.tsx
git commit -m "feat: wire up invitation page with GSAP envelope animation and state management"
```

---

## Task 6: Card Entry Stagger Animation

**Files:**
- Modify: `resources/js/components/invitation/InvitationContent.tsx`

After the content mounts, cards should animate in with a staggered fade-in + slide-up.

- [ ] **Step 1: Add GSAP stagger animation on mount**

Modify `resources/js/components/invitation/InvitationContent.tsx` — add useEffect and useRef:

Add imports at top:

```tsx
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
```

Add inside the component, before the return:

```tsx
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.invitation-cards > *');

    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
    });
}, []);
```

Update the bento grid wrapper div to use the ref:

Change `<div className="invitation-cards mt-6 grid grid-cols-2 gap-4">` to:
```tsx
<div ref={containerRef}>
    {/* ...EnvelopeOpen stays outside... */}
    <div className="invitation-cards mt-6 grid grid-cols-2 gap-4">
```

And close the outer div after the grid.

The full return becomes:

```tsx
return (
    <div className="min-h-svh bg-wedding-cream-light px-4 pb-12">
        <div className="mx-auto max-w-lg" ref={containerRef}>
            <EnvelopeOpen welcomeMessage={wedding.messages.welcome} />

            <div className="invitation-cards mt-6 grid grid-cols-2 gap-4">
                {/* ...all cards unchanged... */}
            </div>
        </div>
    </div>
);
```

- [ ] **Step 2: Verify animation**

Visit `https://fwtini.test`, click envelope. Cards should fade in one by one with a slight upward slide.

- [ ] **Step 3: Commit**

```bash
git add resources/js/components/invitation/InvitationContent.tsx
git commit -m "feat: add staggered card entry animation with GSAP"
```

---

## Task 7: Feature Test

**Files:**
- Create: `tests/Feature/InvitationPageTest.php`

- [ ] **Step 1: Create test**

Run: `php artisan make:test InvitationPageTest --pest --no-interaction`

Replace content with:

```php
<?php

use Inertia\Testing\AssertableInertia;

it('renders the invitation page with wedding data', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('invitation')
        ->has('wedding')
        ->where('wedding.bride', config('wedding.bride'))
        ->where('wedding.groom', config('wedding.groom'))
        ->has('wedding.church')
        ->has('wedding.reception')
        ->has('wedding.menu')
        ->has('wedding.dress_code')
        ->has('wedding.rsvp')
        ->has('wedding.messages')
    );
});
```

- [ ] **Step 2: Run the test**

Run: `php artisan test --compact --filter=InvitationPageTest`
Expected: PASS (1 test)

- [ ] **Step 3: Commit**

```bash
git add tests/Feature/InvitationPageTest.php
git commit -m "test: add feature test for invitation page with wedding data"
```

---

## Task 8: Lint & Format

- [ ] **Step 1: Run PHP formatter**

Run: `vendor/bin/pint --dirty --format agent`
Fix any issues.

- [ ] **Step 2: Run TypeScript type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Run ESLint**

Run: `npx eslint resources/js/components/invitation/ resources/js/pages/invitation.tsx --fix`
Fix any issues.

- [ ] **Step 4: Run Prettier**

Run: `npx prettier --write resources/js/components/invitation/ resources/js/pages/invitation.tsx`

- [ ] **Step 5: Final build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit if any formatting changes**

```bash
git add -A
git commit -m "style: lint and format invitation components"
```
