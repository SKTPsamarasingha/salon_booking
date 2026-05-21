import {Calendar, Clock, ArrowRight} from "lucide-react";
import {cancelBooking} from "../../api/bookingStorage.js";

const BookingCard = ({
                         booking,
                         services,
                         employees,
                         setIsRescheduleOpen,
                         handleRescheduleBooking
                     }) => {
    const service = services.find((s) => s.id === booking.servicesID);
    const employee = employees.find((e) => e.id === booking.employeeID);
    // Dynamic sophisticated statuses
    const statusThemes = {
        confirmed: "text-emerald-700 bg-emerald-50/50 border-emerald-100",
        pending: "text-amber-700 bg-amber-50/50 border-amber-100",
        cancelled: "text-neutral-400 bg-neutral-50 border-neutral-100 line-through decoration-neutral-300"
    };

    const cancel = (id) => {
        cancelBooking(id)
    }

    const reschedule = (id) => {
        handleRescheduleBooking(id)
        setIsRescheduleOpen(true)
    }

    return (
        <div
            className={`group relative w-[40rem] bg-[#ffffff] border border-[#e2ded9] hover:border-[#1a1714] transition-all duration-700 ease-out p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch justify-between tracking-wide ${booking.status === 'cancelled' ? 'opacity-70' : ''}`}>

            {/* Minimalist Top Bar Meta */}
            <div className="absolute top-6 left-6 md:left-10 flex items-center gap-4 select-none">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#a29890] uppercase">
                    Slot {booking.id}
                </span>
                <span
                    className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border rounded-sm transition-colors duration-500 ${statusThemes[booking.status] || "text-neutral-600 bg-neutral-50"}`}>
                    {booking.status}
                </span>
            </div>

            {/* Left Content Domain */}
            <div className="flex-1 flex flex-col justify-between pt-6 space-y-8">
                <div>
                    {/* Decorative Top Accent */}
                    <div className="flex items-center gap-2 mb-3 select-none">
                        <span
                            className="text-sm text-pink-300 font-serif italic scale-90 group-hover:scale-110 group-hover:text-pink-400 transition-all duration-500">
                            {service?.icon || "✦"}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.25em] text-[#b3a9a0] uppercase">
                            Ritual Selection
                        </span>
                    </div>

                    {/* Editorial Main Title */}
                    <h3 className="font-serif text-3xl lg:text-4xl font-light text-[#1a1714] leading-[1.15] tracking-tight group-hover:text-pink-400/90 transition-colors duration-500">
                        {service?.title || "Bespoke Treatment"}
                    </h3>

                    {/* Price & Duration Grid Minimalist Line */}
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#7a7068] mt-2 tracking-[0.1em]">
                        <span>{service?.duration || "Consultation Required"}</span>
                        <span className="text-[#dcd9d4] select-none">|</span>
                        <span className="text-[#1a1714] font-medium">{service?.price || "TBD"}</span>
                    </div>
                </div>

                {/* Refined Custom Guest Note */}
                {booking.details?.requests && (
                    <div className="relative border-l border-[#e8e4df] pl-4 py-0.5 max-w-xl">
                        <p className="text-xs leading-relaxed text-[#7a7068] font-light italic font-serif">
                            “{booking.details.requests}”
                        </p>
                    </div>
                )}

                {/* Luxury Micro Actions */}
                <div className="flex items-center gap-8 pt-2">
                    {booking.status !== "cancelled" ? (
                        <>
                            <button
                                onClick={() => reschedule(booking.id)}

                                className="group/btn relative font-mono text-[11px] tracking-[0.15em] text-[#1a1714] uppercase overflow-hidden pb-1 cursor-pointer">
                                <span>Reschedule</span>
                                <span
                                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1a1714] transition-transform duration-500 origin-left group-hover/btn:scale-x-0"/>
                                <span
                                    className="absolute bottom-0 left-0 w-full h-[1px] bg-pink-400 transition-transform duration-500 origin-right scale-x-0 group-hover/btn:scale-x-100"/>
                            </button>
                            <button
                                onClick={() => cancel(booking.id)}

                                className="font-mono text-[11px] tracking-[0.15em] text-[#a29890] hover:text-rose-600 uppercase pb-1 transition-colors duration-300 cursor-pointer">
                                Cancel Session
                            </button>
                        </>
                    ) : (
                        <span
                            className="font-mono text-[10px] tracking-[0.15em] text-[#a29890] uppercase select-none italic">
                            Reservation Terminated
                        </span>
                    )}
                </div>
            </div>

            {/* Right Side Info Panels */}
            <div
                className="md:w-56 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-[#f4f1ed] pt-6 md:pt-6 md:pl-8 shrink-0 space-y-6 md:space-y-0">

                {/* Date & Time Dynamic Box */}
                <div className="w-full md:text-right space-y-4">
                    <div className="space-y-0.5">
                        <span
                            className="block font-mono text-[9px] tracking-[0.2em] text-[#b3a9a0] uppercase select-none">
                            Date
                        </span>
                        <p className="text-base font-serif font-light text-[#1a1714]">
                            {booking.date}
                        </p>
                    </div>
                    <div className="space-y-0.5">
                        <span
                            className="block font-mono text-[9px] tracking-[0.2em] text-[#b3a9a0] uppercase select-none">
                            Time Slot
                        </span>
                        <p className="text-base font-serif font-light text-[#1a1714] flex items-center md:justify-end gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#b3a9a0] stroke-[1.2]"/>
                            {booking.time}
                        </p>
                    </div>
                </div>

                {/* Artist Assignment Segment */}
                <div
                    className="w-full pt-4 border-t border-[#fcfbfa] flex md:flex-col items-center md:items-end gap-3.5">
                    {employee ? (
                        <>
                            {/* Sophisticated Smooth Image Frame */}
                            <div
                                className="relative w-11 h-11 rounded-full overflow-hidden grayscale contrast-[1.15] brightness-[0.95] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out border border-[#eae6e1] shrink-0">
                                <img
                                    src={employee.img}
                                    alt={employee.name}
                                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div
                                    className="absolute inset-0 bg-pink-900/5 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"/>
                            </div>
                            <div className="text-left md:text-right">
                                <span
                                    className="block font-mono text-[9px] tracking-[0.2em] text-[#b3a9a0] uppercase select-none">Artist</span>
                                <p className="text-sm font-serif text-[#1a1714] font-normal leading-tight">{employee.name}</p>
                                <p className="text-[11px] text-[#7a7068] font-light mt-0.5">{employee.role}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* High-End Minimalist Preference Placeholder */}
                            <div
                                className="w-11 h-11 rounded-full flex items-center justify-center bg-[#faf9f7] border border-dashed border-[#b3a9a0] text-[#a29890] transition-colors duration-500 group-hover:bg-pink-50/40 shrink-0 select-none">
                                <span className="font-serif italic text-base">✦</span>
                            </div>
                            <div className="text-left md:text-right">
                                <span
                                    className="block font-mono text-[9px] tracking-[0.2em] text-[#b3a9a0] uppercase select-none">Artist</span>
                                <p className="text-sm font-serif text-[#1a1714] font-normal leading-tight">No
                                    Preference</p>
                                <p className="text-[11px] text-[#7a7068] font-light mt-0.5 italic">Any Available
                                    Specialist</p>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BookingCard;
