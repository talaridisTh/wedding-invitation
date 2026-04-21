import { useMemo, useState } from 'react';
import type { WeddingTable } from '@/types';

interface FindYourTableProps {
    tables: WeddingTable[];
}

interface IndexEntry {
    key: string;
    display: string;
    table: WeddingTable;
}

function normalize(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');
}

function buildIndex(tables: WeddingTable[]): IndexEntry[] {
    const entries: IndexEntry[] = [];
    for (const table of tables) {
        for (const guest of table.guests) {
            entries.push({
                key: normalize(guest),
                display: guest,
                table,
            });
        }
    }

    return entries;
}

export default function FindYourTable({ tables }: FindYourTableProps) {
    const [query, setQuery] = useState('');
    const index = useMemo(() => buildIndex(tables), [tables]);

    const normalizedQuery = normalize(query);
    const hasQuery = normalizedQuery.length >= 2;

    const matches = hasQuery
        ? index
              .filter((entry) => entry.key.includes(normalizedQuery))
              .slice(0, 6)
        : [];

    const exactMatch = hasQuery
        ? index.find((entry) => entry.key === normalizedQuery)
        : undefined;

    return (
        <section className="text-center" data-page-item>
            <p className="text-[10px] font-light tracking-[0.3em] uppercase lg:text-xs">
                Βρείτε το τραπέζι σας
            </p>
            <h3 className="mt-2 text-2xl leading-tight font-medium italic lg:mt-3 lg:text-3xl">
                Το τραπέζι σας
            </h3>
            <div className="mx-auto mt-3 h-px w-12 bg-wedding-red lg:mt-5 lg:w-24" />

            <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="Γράψτε το όνομά σας..."
                className="mt-6 w-full border-0 border-b border-wedding-red/50 bg-transparent px-1 py-2 text-center text-lg italic text-wedding-red placeholder:text-wedding-red/40 placeholder:not-italic focus:border-wedding-red focus:outline-none lg:mt-8 lg:py-3 lg:text-xl"
            />

            <div className="mt-6 min-h-[5rem] lg:mt-8">
                {!hasQuery && (
                    <p className="text-xs font-light italic opacity-60 lg:text-sm">
                        Ξεκινήστε να γράφετε το μικρό ή το επώνυμό σας
                    </p>
                )}

                {hasQuery && matches.length === 0 && (
                    <p className="text-sm italic opacity-80 lg:text-base">
                        Δεν βρέθηκε κανένα όνομα — ελέγξτε την ορθογραφία
                    </p>
                )}

                {hasQuery && exactMatch && (
                    <div>
                        <p className="text-lg leading-snug italic lg:text-xl">
                            {exactMatch.display}
                        </p>
                        <p className="mt-3 text-[10px] font-light tracking-[0.3em] uppercase lg:mt-4 lg:text-xs">
                            Τραπέζι
                        </p>
                        <p className="mt-1 text-5xl leading-none font-medium italic lg:text-6xl">
                            {exactMatch.table.number}
                        </p>
                        {exactMatch.table.group && (
                            <p className="mt-2 text-xs font-light italic opacity-70 lg:text-sm">
                                {exactMatch.table.group}
                            </p>
                        )}
                    </div>
                )}

                {hasQuery && !exactMatch && matches.length > 0 && (
                    <div>
                        <p className="text-xs font-light italic opacity-70 lg:text-sm">
                            Μήπως εννοείτε;
                        </p>
                        <ul className="mt-3 space-y-2 lg:mt-4 lg:space-y-3">
                            {matches.map((entry) => (
                                <li key={`${entry.key}-${entry.table.number}`}>
                                    <button
                                        type="button"
                                        onClick={() => setQuery(entry.display)}
                                        className="group inline-flex items-baseline gap-3 italic text-wedding-red transition-opacity hover:opacity-70"
                                    >
                                        <span className="border-b border-wedding-red/50 pb-0.5 text-base lg:text-lg">
                                            {entry.display}
                                        </span>
                                        <span className="text-sm font-light opacity-70 lg:text-base">
                                            Τραπέζι {entry.table.number}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
