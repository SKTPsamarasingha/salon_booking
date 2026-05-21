import {useState} from "react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }

export function MiniCalendar({selected, onSelect, availableDates}) {
    const today = new Date();
    const [view, setView] = useState({year: today.getFullYear(), month: today.getMonth()});

    const days = getDaysInMonth(view.year, view.month);
    const firstDay = getFirstDay(view.year, view.month);
    const cells = Array(firstDay).fill(null).concat(Array.from({length: days}, (_, i) => i + 1));

    const toISO = (d) => {
        const y = view.year;
        const m = String(view.month + 1).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${y}-${m}-${dd}`;
    };

    const isPast = (d) => {
        const date = new Date(view.year, view.month, d);
        date.setHours(0, 0, 0, 0);
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return date.getTime() < t.getTime();
    };

    const isAvailable = (d) => availableDates ? availableDates.has(toISO(d)) : !isPast(d);

    // Fixed: Handles both single string selection and multiple date arrays/sets
    const isSel = (d) => {
        const isoStr = toISO(d);
        if (!selected) return false;
        if (Array.isArray(selected)) return selected.includes(isoStr);
        if (selected instanceof Set) return selected.has(isoStr);
        return selected === isoStr;
    };

    const prev = () => setView(v => v.month === 0 ? {year: v.year - 1, month: 11} : {...v, month: v.month - 1});
    const next = () => setView(v => v.month === 11 ? {year: v.year + 1, month: 0} : {...v, month: v.month + 1});

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <button onClick={prev} className="w-8 h-8 flex items-center justify-center text-[#7a7068] hover:text-[#1a1714] transition-colors cursor-pointer text-lg">‹ </button>
                <span className="font-serif text-base text-[#1a1714]">{monthNames[view.month]} {view.year}</span>
                <button onClick={next} className="w-8 h-8 flex items-center justify-center text-[#7a7068] hover:text-[#1a1714] transition-colors cursor-pointer text-lg">› </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-center text-[10px] tracking-widest text-[#b0a89e] uppercase py-1">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => (
                    <div key={i} className="aspect-square">
                        {d && (() => {
                            const avail = isAvailable(d);
                            const past = isPast(d);
                            const sel = isSel(d);
                            return (
                                <button
                                    disabled={!avail || past}
                                    onClick={() => onSelect(toISO(d))}
                                    title={!avail && !past ? "Artist unavailable" : undefined}
                                    className={`w-full h-full rounded-full text-sm transition-all duration-200 ${
                                        sel
                                            ? "bg-[#1a1714] text-white font-medium"
                                            : past
                                                ? "text-[#d4cdc6] cursor-not-allowed"
                                                : !avail
                                                    ? "text-[#d4cdc6] cursor-not-allowed line-through"
                                                    : "hover:bg-pink-50 text-[#1a1714] hover:text-pink-500 cursor-pointer"
                                    }`}
                                >
                                    {d}
                                </button>
                            );
                        })()}
                    </div>
                ))}
            </div>

            {availableDates && (
                <p className="text-[10px] text-[#b0a89e] mt-3 text-center">
                    Strikethrough dates = artist unavailable
                </p>
            )}
        </div>
    );
}
