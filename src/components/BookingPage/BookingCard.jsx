import { Clock } from "lucide-react";
import { cancelBooking } from "../../api/bookingStorage.js";

const BookingCard = ({
                         booking,
                         services,
                         employees,
                         setIsRescheduleOpen,
                         handleRescheduleBooking
                     }) => {
    const service = services.find((s) => s.id === booking.servicesID);
    const employee = employees.find((e) => e.id === booking.employeeID);

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
            className={`group relative w-full max-w-sm bg-[#ffffff] border border-[#e2ded9] hover:border-[#1a1714] transition-all duration-700 ease-out p-6 flex flex-col gap-6 tracking-wide ${booking.status === 'cancelled' ? 'opacity-70' : ''}`}>

            {/* Minimalist Top Bar Meta */}
            <div className="flex items-center justify-between w-full select-none border-b border-[#f4f1ed] pb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#a29890] uppercase">
                    Slot {booking.id}
                </span>
                <span
                    className={`font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border rounded-sm transition-colors duration-500 ${statusThemes[booking.status] || "text-neutral-600 bg-neutral-50"}`}>
                    {booking.status}
                </span>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col space-y-4">
                <div>
                    {/* Decorative Top Accent */}
                    <div className="flex items-center gap-2 mb-2 select-none">
                        <span
                            className="text-xs text-pink-300 font-serif italic scale-90 group-hover:scale-110 group-hover:text-pink-400 transition-all duration-500">
                            {service?.icon || "✦"}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.25em] text-[#b3a9a0] uppercase">
                            Ritual Selection
                        </span>
                    </div>

                    {/* Scaled Down Title */}
                    <h3 className="font-serif text-xl font-light text-[#1a1714] leading-snug tracking-tight group-hover:text-pink-400/90 transition-colors duration-500">
                        {service?.title || "Bespoke Treatment"}
                    </h3>

                    {/* Price & Duration */}
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[#7a7068] mt-1.5 tracking-[0.1em]">
                        <span>{service?.duration || "Consultation Required"}</span>
                        <span className="text-[#dcd9d4] select-none">|</span>
                        <span className="text-[#1a1714] font-medium">{service?.price || "TBD"}</span>
                    </div>
                </div>

                {/* Compact Custom Guest Note */}
                {booking.details?.requests && (
                    <div className="relative border-l border-[#e8e4df] pl-3 py-0.5">
                        <p className="text-[11px] leading-relaxed text-[#7a7068] font-light italic font-serif">
                            “{booking.details.requests}”
                        </p>
                    </div>
                )}
            </div>

            {/* Compact Horizontal Date & Time Row */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-[#f4f1ed] py-4">
                <div className="space-y-0.5">
                    <span className="block font-mono text-[9px] tracking-[0.2em] text-[#b3a9a0] uppercase select-none">
                        Date
                    </span>
                    <p className="text-xs font-serif font-light text-[#1a1714]">
                        {booking.date}
                    </p>
                </div>
                <div className="space-y-0.5">
                    <span className="block font-mono text-[9px] tracking-[0.2em] text-[#b3a9a0] uppercase select-none">
                        Time Slot
                    </span>
                    <p className="text-xs font-serif font-light text-[#1a1714] flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#b3a9a0] stroke-[1.2]"/>
                        {booking.time}
                    </p>
                </div>
            </div>

            {/* Bottom Segment: Specialist & Actions Row */}
            <div className="flex items-center justify-between pt-2">
                {/* Artist Assignment Segment */}
                <div className="flex items-center gap-2.5">
                    {employee && (
                        <>
                            <div className="relative w-8 h-8 rounded-full overflow-hidden grayscale contrast-[1.15] brightness-[0.95] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out border border-[#eae6e1] shrink-0">
                                <img
                                    src={employee.img}
                                    alt={employee.name}
                                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="block font-mono text-[8px] tracking-[0.15em] text-[#b3a9a0] uppercase select-none">
                                    Specialist
                                </span>
                                <p className="text-[11px] font-serif font-light text-[#1a1714]">
                                    {employee.name}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Luxury Micro Actions */}
                <div className="flex items-center gap-4">
                    {booking.status !== "cancelled" ? (
                        <>
                            <button
                                onClick={() => reschedule(booking.id)}
                                className="group/btn relative font-mono text-[10px] tracking-[0.1em] text-[#1a1714] uppercase overflow-hidden pb-0.5 cursor-pointer">
                                <span>Reschedule</span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1a1714] transition-transform duration-500 origin-left group-hover/btn:scale-x-0"/>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-pink-400 transition-transform duration-500 origin-right scale-x-0 group-hover/btn:scale-x-100"/>
                            </button>
                            <button
                                onClick={() => cancel(booking.id)}
                                className="font-mono text-[10px] tracking-[0.1em] text-[#a29890] hover:text-rose-600 uppercase pb-0.5 transition-colors duration-300 cursor-pointer">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <span className="font-mono text-[9px] tracking-[0.1em] text-[#a29890] uppercase select-none italic">
                            Terminated
                        </span>
                    )}
                </div>
            </div>

        </div>
    );
};

export default BookingCard;
