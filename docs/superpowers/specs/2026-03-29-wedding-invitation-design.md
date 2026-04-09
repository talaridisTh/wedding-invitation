# Wedding Invitation Page — Design Spec

## Overview

Digital wedding invitation for Fotini & Konstantinos-Ilias (5 June 2026). Single-page React (Inertia.js) application with an interactive envelope opening animation that reveals the invitation details in a bento-style card layout.

## Data Source

All wedding data comes from `config/wedding.php` and is passed to the React page via `InvitationController` as the `wedding` prop.

## Tech Stack

- **Framework:** Laravel 12 + Inertia.js v2 + React 19
- **Styling:** Tailwind CSS v4 (wedding theme already defined in `resources/css/app.css`)
- **Animation:** GSAP 3 (already installed)
- **Fonts:** Cormorant Garamond (display) + Josefin Sans (body) — already configured
- **Colors:** Existing `wedding-*` palette — no changes needed

## Screen 1: Closed Envelope

Full-screen, mobile-first page.

### Layout

- Background: `wedding-cream-light` (#faf5ee)
- Centered vertically and horizontally
- Above envelope: couple names in `font-display` (Cormorant Garamond), italic
- Below names: date "5 Ιουνίου 2026"
- Center: CSS-only envelope (no images)
- Below envelope: "Κάντε κλικ για να ανοίξετε" with subtle pulse animation

### Envelope Construction (Pure CSS)

- Envelope body: `wedding-envelope` (#ecd9c6) rectangle with slight border-radius
- Triangular flap (top): CSS `clip-path` or border-trick, same color family slightly darker
- Side triangles (decorative bottom folds): lighter shade
- Gold monogram "Φ&Κ" centered on envelope: `wedding-gold` (#c9a962), `font-display`
- The flap uses `transform-style: preserve-3d` and `backface-visibility: hidden` for the 3D flip
- Flap has a front face (visible when closed) and back face (visible when open)

### Interaction

- Entire envelope area is clickable (`cursor-pointer`)
- Hover: subtle shadow increase + slight scale(1.02), 200ms transition

## Envelope Opening Animation (GSAP Timeline)

Triggered on click. Uses `gsap.timeline()`.

### Sequence

| Step | Target | Animation | Duration | Ease |
|------|--------|-----------|----------|------|
| 1 | Flap | `rotationX: 180` (transform-origin: top) | 0.6s | power2.out |
| 2 | Letter | `yPercent: -80` (slides up from envelope) | 0.8s | power2.out |
| 3 | Envelope + names | `opacity: 0, scale: 0.8` | 0.5s | power2.in |
| 4 | Content sections | `opacity: 1, y: 0` (staggered) | 0.6s | power2.out |

### Accessibility

- Check `prefers-reduced-motion`: if enabled, skip all animations and show content immediately
- Envelope click also works with Enter/Space key (add `role="button"` + `tabIndex={0}` + `onKeyDown`)

## Screen 2: Open Invitation (Bento Layout)

After animation completes, the envelope screen is replaced by the invitation content.

### Header Area

- Decorative open envelope at top (CSS, smaller scale, flap open) — purely visual
- Inside envelope area: "Είστε Προσκεκλημένοι!" in `font-display`
- Gold monogram "Φ&Κ" below

### Bento Grid

Responsive grid: 2 columns on mobile (with some cards spanning full width), adaptive on larger screens.

Each card:
- Background: `wedding-paper` (#fffbf7)
- Border: 1px `wedding-cream-dark`
- Soft shadow: `shadow-md` with warm tone
- Border-radius: `rounded-xl`
- Padding: comfortable (p-6)
- `cursor-pointer` where interactive (maps links, RSVP)
- Hover: subtle shadow increase, 200ms transition

### Cards

| Card | Content | Spans |
|------|---------|-------|
| **Save the Date** | Day of week, date, time | Full width |
| **Εκκλησία** | Church name + "Δείτε στο χάρτη" link (Google Maps) | 1 col |
| **Δεξίωση** | Venue name + address + Maps link + fun note about shoes | 1 col |
| **Μενού** | Starters / Main / Desserts in organized sections | Full width |
| **Dress Code** | Green & Pink shades description + color swatch circles using `wedding-green-*` and `wedding-pink-*` | Full width |
| **RSVP** | Deadline message + contact email + special needs note | Full width |

### Card Entry Animation

Cards appear with staggered fade-in + slide-up (`y: 30 → 0, opacity: 0 → 1`), 0.1s stagger between cards.

## Component Structure

```
resources/js/pages/invitation.tsx        — Main page component, state management (open/closed)
resources/js/components/invitation/
  Envelope.tsx                           — Closed envelope with flap, monogram, click handler
  EnvelopeOpen.tsx                       — Decorative open envelope header
  InvitationContent.tsx                  — Bento grid wrapper
  cards/
    SaveTheDateCard.tsx                  — Date & time card
    ChurchCard.tsx                       — Church location card
    ReceptionCard.tsx                    — Reception venue card
    MenuCard.tsx                         — Menu card
    DressCodeCard.tsx                    — Dress code with color swatches
    RsvpCard.tsx                         — RSVP card
```

## Typography Usage

| Element | Font | Weight | Size (mobile → desktop) |
|---------|------|--------|-------------------------|
| Couple names | Cormorant Garamond | 600 | text-3xl → text-5xl |
| Date | Josefin Sans | 300 | text-lg → text-xl |
| "Κάντε κλικ..." | Josefin Sans | 300 | text-sm |
| Section headers | Cormorant Garamond | 600 | text-xl → text-2xl |
| Body text | Josefin Sans | 400 | text-base |
| Monogram "Φ&Κ" | Cormorant Garamond | 700 | text-2xl → text-4xl |

## Color Usage

All colors from existing `wedding-*` theme:

| Use | Token |
|-----|-------|
| Page background | `wedding-cream-light` |
| Envelope body | `wedding-envelope` |
| Envelope flap | `wedding-cream-dark` |
| Card background | `wedding-paper` |
| Accents / monogram / borders | `wedding-gold` |
| Headings | `wedding-brown` |
| Body text | `wedding-brown-medium` |
| Muted text | `wedding-brown-light` |
| Dress code greens | `wedding-green-dark`, `wedding-green`, `wedding-green-light` |
| Dress code pinks | `wedding-pink-dark`, `wedding-pink`, `wedding-pink-light` |

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < 640px (mobile) | 2-col grid, some cards full-width |
| 640-1024px (tablet) | 2-col grid, more breathing room |
| > 1024px (desktop) | Max-width container (max-w-lg), centered — this is a mobile-first invitation |

The invitation is designed primarily for mobile viewing (shared via messaging apps), so the desktop version simply centers a constrained-width layout.

## No External Dependencies

No new packages needed. Everything uses:
- GSAP (already in package.json)
- Tailwind CSS v4 (already configured with wedding theme)
- Existing fonts (already in app.css)
