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

export type WeddingTimelineIcon =
    | 'rings'
    | 'cocktail'
    | 'couple'
    | 'cake'
    | 'dance'
    | 'party';

export interface WeddingTimelineItem {
    time: string;
    title: string;
    description?: string;
    icon?: WeddingTimelineIcon;
}

export interface WeddingFaqItem {
    question: string;
    answer: string;
}

export interface WeddingTable {
    number: number;
    group: string;
    guests: string[];
}

export interface WeddingGift {
    question: string;
    intro: string;
    bank: string;
    iban: string;
    reason: string;
    reason_note: string;
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
    timeline: WeddingTimelineItem[];
    faq: WeddingFaqItem[];
    tables: WeddingTable[];
    gift: WeddingGift;
}
