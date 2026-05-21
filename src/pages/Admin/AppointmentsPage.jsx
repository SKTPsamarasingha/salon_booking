import {
    CalendarDays,
    Clock3,
    Search,
    CheckCircle2,
    XCircle,
    Trash2,
    Phone,
    Mail,
} from "lucide-react";
import {dummyBookings, services, employees} from "../../api/constant.js";


const AppointmentsPage = () => {
    return (
        <section className="w-full min-h-screen bg-[#f8f5f0] p-8">

            {/* Header */}
            <div className="mb-10">

                <p className="uppercase tracking-[0.3em] text-xs text-pink-300 mb-3">
                    Locks & Co. </p>

                <div className="flex items-center justify-between flex-wrap gap-4">

                    <div>
                        <h1 className="text-5xl font-serif text-[#1a1714] mb-3">
                            Appointments
                        </h1>

                        <p className="text-[#7a7068] max-w-2xl font-light">
                            View, manage, confirm, and organize customer appointments.
                        </p>
                    </div>

                    {/* New Appointment */}
                    <button
                        className="px-6 py-3 bg-[#1a1714] text-white rounded-2xl hover:bg-black transition-all text-sm">
                        + New Appointment
                    </button>

                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                {/* Search */}
                <div
                    className="md:col-span-2 bg-white border border-[#e8e3dc] rounded-2xl px-4 h-[58px] flex items-center gap-3 shadow-sm">

                    <Search size={18} className="text-[#b0a89e]"/>

                    <input
                        type="text"
                        placeholder="Search by customer name..."
                        className="w-full bg-transparent outline-none text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                    />

                </div>

                {/* Status */}
                <select
                    className="bg-white border border-[#e8e3dc] rounded-2xl px-4 text-sm text-[#1a1714] shadow-sm outline-none">

                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>

                </select>

                {/* Date */}
                <input
                    type="date"
                    className="bg-white border border-[#e8e3dc] rounded-2xl px-4 text-sm text-[#1a1714] shadow-sm outline-none"
                />

            </div>

            {/* Appointment Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {dummyBookings.map((booking) => {
                    const service = services.find(
                        (s) => s.id === booking.servicesID
                    );

                    const employee = employees.find(
                        (e) => e.id === booking.employeeID
                    );

                    return (
                        <div
                            key={booking.id}
                            className="bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                        >

                            {/* Top */}
                            <div className="flex items-start justify-between gap-4 mb-6">

                                <div>

                                    <p className="text-[10px] tracking-[0.25em] uppercase text-pink-300 mb-2">
                                        Appointment ID
                                    </p>

                                    <h2 className="text-2xl font-serif text-[#1a1714]">
                                        {booking.id}
                                    </h2>

                                </div>

                                {/* Status */}
                                <span
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize ${
                                        booking.status === "confirmed"
                                            ? "bg-green-50 text-green-700"
                                            : booking.status === "cancelled"
                                                ? "bg-red-50 text-red-700"
                                                : booking.status === "completed"
                                                    ? "bg-gray-100 text-gray-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                    }`}
                                >
                  {booking.status}
                </span>

                            </div>

                            {/* Customer */}
                            <div className="flex items-center gap-4 mb-6">

                                <div
                                    className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-[#1a1714] font-semibold text-lg">
                                    {booking.details.fullName.charAt(0)}
                                </div>

                                <div>

                                    <h3 className="text-lg text-[#1a1714] font-medium">
                                        {booking.details.fullName}
                                    </h3>

                                    <div className="flex flex-col gap-1 mt-1">

                                        <div className="flex items-center gap-2 text-sm text-[#7a7068]">
                                            <Mail size={14}/>
                                            {booking.details.email}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-[#7a7068]">
                                            <Phone size={14}/>
                                            {booking.details.phone}
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="h-px bg-[#eee7df] mb-6"/>

                            {/* Details */}
                            <div className="grid grid-cols-2 gap-5 mb-6">

                                {/* Service */}
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-2">
                                        Service
                                    </p>

                                    <p className="text-[#1a1714] font-medium">
                                        {service?.title}
                                    </p>
                                </div>

                                {/* Employee */}
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-2">
                                        Stylist
                                    </p>

                                    <p className="text-[#1a1714] font-medium">
                                        {employee?.name || "No preference"}
                                    </p>
                                </div>

                                {/* Date */}
                                <div className="flex items-start gap-3">

                                    <CalendarDays
                                        size={18}
                                        className="text-pink-400 mt-0.5"
                                    />

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1">
                                            Date
                                        </p>

                                        <p className="text-[#1a1714] font-medium">
                                            {booking.date}
                                        </p>
                                    </div>

                                </div>

                                {/* Time */}
                                <div className="flex items-start gap-3">

                                    <Clock3
                                        size={18}
                                        className="text-pink-400 mt-0.5"
                                    />

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-1">
                                            Time
                                        </p>

                                        <p className="text-[#1a1714] font-medium">
                                            {booking.time}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Notes */}
                            {booking.details.requests && (
                                <>
                                    <div className="h-px bg-[#eee7df] mb-5"/>

                                    <div className="mb-6">

                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0a89e] mb-2">
                                            Special Requests
                                        </p>

                                        <p className="text-sm text-[#7a7068] leading-relaxed">
                                            {booking.details.requests}
                                        </p>

                                    </div>
                                </>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 flex-wrap">

                                <button
                                    className="px-5 py-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-all text-sm flex items-center gap-2">

                                    <CheckCircle2 size={16}/>

                                    Confirm

                                </button>

                                <button
                                    className="px-5 py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all text-sm flex items-center gap-2">

                                    <XCircle size={16}/>

                                    Cancel

                                </button>

                                <button
                                    className="px-5 py-2.5 rounded-xl border border-[#e8e3dc] hover:bg-[#faf7f3] transition-all text-sm flex items-center gap-2">

                                    <Trash2 size={16}/>

                                    Delete

                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>
        </section>
    );
};

export default AppointmentsPage;