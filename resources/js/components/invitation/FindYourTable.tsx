import type { WeddingTable } from '@/types';

interface FindYourTableProps {
    tables: WeddingTable[];
}

export default function FindYourTable({ tables }: FindYourTableProps) {
    return (
        <section data-page-item>
            <p className="text-center text-[10px] font-light tracking-[0.3em] uppercase lg:text-xs">
                Κατανομή Καλεσμένων
            </p>
            <h3 className="mt-2 text-center text-2xl leading-tight font-medium italic lg:mt-3 lg:text-3xl">
                Τραπέζια
            </h3>
            <div className="mx-auto mt-3 h-px w-12 bg-wedding-red lg:mt-5 lg:w-24" />

            <div className="mt-10 space-y-10 text-left lg:mt-14 lg:space-y-14">
                {tables.map((table) => (
                    <div
                        key={table.number}
                        className="relative pl-20 lg:pl-28"
                    >
                        <div className="absolute top-0 left-0 flex h-14 w-14 flex-col items-center justify-center text-center lg:h-20 lg:w-20">
                            <span className="text-[9px] font-light tracking-[0.3em] uppercase opacity-70 lg:text-[10px]">
                                Τραπέζι
                            </span>
                            <span className="text-3xl leading-none font-medium italic lg:text-5xl">
                                {table.number}
                            </span>
                        </div>

                        {table.group && (
                            <p className="text-[10px] font-light tracking-[0.3em] uppercase opacity-70 lg:text-xs">
                                {table.group}
                            </p>
                        )}
                        <ul
                            className={`space-y-1 text-sm font-light lg:text-base ${table.group ? 'mt-2 lg:mt-3' : ''}`}
                        >
                            {table.guests.map((guest, idx) => (
                                <li
                                    key={`${guest}-${idx}`}
                                    className="italic"
                                >
                                    {guest}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
