import {useState, useEffect} from "react";
import {X, Calendar, Clock, ArrowLeft} from "lucide-react";

const RescheduleModal = ({isOpen, onClose, booking, employees, onConfirm}) => {
    // Sync inner step state to match your workflow (Step 2: Date, Step 3: Time)
    const [step, setStep] = useState(2);
    const [formData, setFormData] = useState({date: "", time: ""});
    const [errors, setErrors] = useState({});

    // Reset form states when modal opens/closes
    useEffect(() => {
        if (booking) {
            setFormData({
                date: booking.date || "",
                time: booking.time || ""
            });
            setStep(2);
            setErrors({});
        }
    }, [booking, isOpen]);

    if (!isOpen || !booking) return null;

    // Hardcoded dummy slots and available dates matching your dataset theme
    const dummyAvailableDates = ["2026-06-12", "2026-06-13", "2026-06-14", "2026-06-15"];
    const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

    // Format ISO string into luxury friendly string display
    const friendlyDate = formData.date
        ? new Date(formData.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : "No date selected";

    const handleNext = () => {
        if (step === 2) {
            if (!formData.date) return setErrors({date: "Please choose a session date."});
            setStep(3);
        } else if (step === 3) {
            if (!formData.time) return setErrors({time: "Please choose a session time slot."});
            onConfirm(booking.id, formData.date, formData.time);
            onClose();
        }
    };

    const handleBack = () => {
        if (step === 3) setStep(2);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Elegant Backdrop Filter overlay */}
            <div
                className="absolute inset-0 bg-[#1a1714]/40 backdrop-blur-md transition-opacity duration-500 animate-fade-in"
                onClick={onClose}
            />

            {/* Premium Modular Box Container */}
            <div
                className="relative w-full max-w-xl bg-white border border-[#e2ded9] shadow-2xl p-6 md:p-10 flex flex-col justify-between tracking-wide animate-slide-up transform transition-all duration-500 z-10">

                {/* Header Row */}
                <div className="flex items-start justify-between border-b border-[#f4f1ed] pb-5 mb-6">
                    <div>
                        <span className="font-mono text-[9px] tracking-[0.25em] text-[#b3a9a0] uppercase block mb-1">
                            Modification Suite
                        </span>
                        <h2 className="font-serif text-2xl font-light text-[#1a1714]">
                            Reschedule Appointment
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-[#a29890] hover:text-[#1a1714] transition-colors duration-300 cursor-pointer"
                    >
                        <X className="w-5 h-5 stroke-[1.2]"/>
                    </button>
                </div>

                {/* Main Dynamic Workflow Slot Layout */}
                <div className="min-h-[280px] flex flex-col justify-center">

                    {/* STEP 2: Select Date Grid Panel */}
                    {step === 2 && (
                        <div className="flex flex-col gap-4 transition-all duration-500">
                            {booking.employeeID && (
                                <div
                                    className="flex items-center gap-3 px-4 py-3 bg-[#faf9f7] border border-[#e8e4df] rounded-sm">
                                    {(() => {
                                        const currentArtist = employees?.find(e => e.id === booking.employeeID);
                                        if (!currentArtist) return null;
                                        return (
                                            <>
                                                <img
                                                    src={currentArtist.img}
                                                    alt={currentArtist.name}
                                                    className="w-8 h-8 rounded-full object-cover grayscale contrast-125"
                                                />
                                                <p className="text-xs text-[#7a7068] font-light">
                                                    Showing available dates for <span
                                                    className="text-[#1a1714] font-normal font-serif italic">{currentArtist.name}</span>
                                                </p>
                                            </>
                                        );
                                    })()}
                                </div>
                            )}

                            {/* Luxury MiniCalendar Placeholder layout box wrapper */}
                            <div className="border border-[#e2ded9] p-4 bg-[#faf9f7]/50 rounded-sm">
                                <p className="font-mono text-[9px] text-[#a29890] tracking-widest uppercase mb-4">Calendar
                                    Registry</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {dummyAvailableDates.map((dateStr) => (
                                        <button
                                            key={dateStr}
                                            onClick={() => {
                                                setFormData(prev => ({...prev, date: dateStr}));
                                                setErrors({});
                                            }}
                                            className={`py-3 px-4 text-xs font-mono border rounded-sm transition-all duration-300 ${formData.date === dateStr ? 'border-[#1a1714] bg-[#1a1714] text-white' : 'border-[#e2ded9] bg-white text-[#7a7068] hover:border-[#1a1714]'}`}
                                        >
                                            {dateStr}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {errors.date &&
                                <p className="text-xs text-rose-500 font-mono tracking-wider mt-1">{errors.date}</p>}
                        </div>
                    )}

                    {/* STEP 3: Select Time Grid Panel */}
                    {step === 3 && (
                        <div className="flex flex-col gap-5 transition-all duration-500">
                            <div>
                                <p className="text-[10px] tracking-[0.25em] uppercase text-[#b0a89e] mb-1">Selected
                                    Date</p>
                                <p className="font-serif text-base text-[#1a1714] italic">{friendlyDate}</p>
                            </div>

                            {slots.length === 0 ? (
                                <div className="py-10 text-center border border-dashed border-[#e8e3dc] bg-[#faf9f6]">
                                    <p className="text-sm text-[#7a7068] font-light">No slots available for this
                                        date.</p>
                                    <button
                                        onClick={handleBack}
                                        type="button"
                                        className="mt-4 text-xs font-mono tracking-wider text-pink-400 underline cursor-pointer hover:text-[#1a1714]"
                                    >
                                        ← Choose a different date
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#b0a89e] mb-3">Available
                                        times — {slots.length} remaining</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {slots.map((t, idx) => {
                                            const isSelected = formData.time === t;
                                            return (
                                                <button
                                                    key={`${t}-${idx}`}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({...prev, time: t}));
                                                        setErrors({});
                                                    }}
                                                    className={`py-2.5 text-xs font-mono border transition-all duration-300 cursor-pointer tabular-nums text-center ${isSelected ? "border-[#1a1714] bg-[#1a1714] text-white font-medium shadow-sm" : "border-[#e8e3dc] text-[#7a7068] hover:border-[#1a1714] bg-white"}`}
                                                >
                                                    {t}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.time &&
                                        <p className="text-xs text-rose-500 font-mono tracking-wider mt-2">{errors.time}</p>}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Controls Action Suite */}
                <div className="flex items-center justify-between border-t border-[#f4f1ed] pt-6 mt-6">
                    {step === 3 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-[#a29890] hover:text-[#1a1714] uppercase transition-colors duration-300 cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5"/> Back
                        </button>
                    ) : (
                        <div/>
                    )}

                    <button
                        onClick={handleNext}
                        className="font-mono text-[11px] tracking-[0.15em] bg-[#1a1714] text-white hover:bg-pink-400 uppercase py-3 px-8 transition-colors duration-500 cursor-pointer"
                    >
                        {step === 2 ? "Select Slot" : "Confirm Changes"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RescheduleModal;
