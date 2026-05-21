const STEPS = ["Service", "Artist", "Date", "Time", "Details", "Confirm"];


export default function StepIndicator({current}) {
    return (
        <div className="mt-5 ml-30 flex items-center gap-0 mb-8">
            {STEPS.map((s, i) => (
                <div key={s} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-300 ${
                                i < current ? "bg-pink-300 text-white" :
                                    i === current ? "bg-[#1a1714] text-white ring-2 ring-pink-300" :
                                        "bg-[#f0ebe4] text-[#b0a89e]"
                            }`}>
                            {i < current ? "✓" : i + 1}
                        </div>
                        <span className={`text-[9px] tracking-widest uppercase hidden sm:block ${
                            i === current ? "text-[#1a1714]" : "text-[#b0a89e]"
                        }`}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div
                            className={`h-px w-6 sm:w-8 mx-1 transition-all duration-300 ${i < current ? "bg-pink-300" : "bg-[#e8e3dc]"}`}/>
                    )}
                </div>
            ))}
        </div>
    );
}