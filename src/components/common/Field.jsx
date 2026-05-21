export function Field({label, required, error, children}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] tracking-widest uppercase text-[#7a7068]">
                {label} {required && <span className="text-pink-300">*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

export function Row({label, value, sub}) {
    if (!value) return null;
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-[11px] tracking-widest uppercase text-[#b0a89e] shrink-0 mt-0.5">{label}</span>
            <div className="text-right">
                <p className="text-sm text-[#1a1714] font-light">{value}</p>
                {sub && <p className="text-xs text-[#b0a89e]">{sub}</p>}
            </div>
        </div>
    );
}
