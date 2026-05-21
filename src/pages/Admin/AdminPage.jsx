import React, {useState} from 'react';
import {
    CalendarDays, Users, Gem, Activity,
    ArrowUpRight, Clock, CheckCircle2, AlertCircle,
    TrendingUp, Scissors, UserCheck
} from 'lucide-react';
import {dummyBookings, services, employees, packages} from "../../api/constant.js";

export const AdminPage = () => {
    // 1. Core Analytics Calculation (Derived safely from your constant data structures)
    const totalBookingsCount = dummyBookings?.length || 0;
    const activeStylistsCount = employees?.length || 0;
    const pendingBookings = dummyBookings?.filter(b => b.status === 'pending') || [];

    // Quick status distribution metric summary array
    const summaryMetrics = [
        {
            label: "Total Reservations",
            value: totalBookingsCount,
            icon: CalendarDays,
            change: "+12% this week",
            color: "text-blue-500"
        },
        {
            label: "Active Roster Team",
            value: activeStylistsCount,
            icon: Users,
            change: "Full attendance",
            color: "text-emerald-500"
        },
        {
            label: "Pending Approvals",
            value: pendingBookings.length,
            icon: Activity,
            change: "Requires action",
            color: pendingBookings.length > 0 ? "text-amber-500" : "text-[#b0a89e]"
        }
    ];

    return (
        <section className="w-full min-h-screen bg-[#f8f5f0] p-6 md:p-8 text-[#1a1714]">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Welcome Banner Header Node */}
                <div
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#e8e3dc] pb-6">
                    <div>
                        <p className="uppercase tracking-[0.3em] text-xs text-pink-300 mb-2 font-semibold">
                            Locks & Co. // Control Terminal
                        </p>
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1a1714]">
                            Welcome Back, Admin
                        </h1>
                        <p className="text-sm text-[#7a7068] font-light mt-1">
                            Here is an overview of today's floor activity, salon service updates, and scheduling flows.
                        </p>
                    </div>

                    <div
                        className="text-left md:text-right bg-white px-5 py-3 rounded-2xl border border-[#e8e3dc] shadow-sm shrink-0">
                        <p className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Terminal
                            Location</p>
                        <p className="text-sm font-medium text-[#1a1714]">Kadawatha Main Suite</p>
                    </div>
                </div>

                {/* 1. Quick Stats High Level Metrics Deck */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {summaryMetrics.map((metric, i) => {
                        const Icon = metric.icon;
                        return (
                            <div key={i}
                                 className="bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="text-xs text-[#7a7068] tracking-wider uppercase font-medium">{metric.label}</span>
                                    <div className={`p-2 bg-[#f8f5f0] rounded-xl ${metric.color}`}>
                                        <Icon size={18}/>
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-serif font-normal">{metric.value}</span>
                                    <span
                                        className="text-[11px] font-medium text-[#7a7068] tracking-wide">{metric.change}</span>
                                </div>
                                <div
                                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-pink-300 group-hover:w-full transition-all duration-300"/>
                            </div>
                        );
                    })}
                </div>

                {/* 2. Main Workspace Split Layout Dashboard Block */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* Column A: Live Agenda Queue List Layout (2/3 Grid Area width) */}
                    <div
                        className="xl:col-span-2 bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f8f5f0]">
                                <div>
                                    <h2 className="text-xl font-serif font-medium">Recent Appointment Logs</h2>
                                    <p className="text-xs text-[#7a7068] font-light mt-0.5">Chronological summary
                                        tracking immediate salon timeline actions.</p>
                                </div>
                                <button
                                    className="flex items-center gap-1 text-xs tracking-wider text-pink-400 font-medium hover:text-pink-500 transition-colors uppercase">
                                    Full Tracker <ArrowUpRight size={14}/>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {dummyBookings?.slice(0, 4).map((booking) => {
                                    const matchingSvc = services?.find(s => s.id === booking.servicesID);
                                    const matchingEmp = employees?.find(e => e.id === booking.employeeID);

                                    return (
                                        <div key={booking.id}
                                             className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#faf9f7] border border-[#e8e3dc] rounded-2xl gap-3 hover:bg-white hover:border-pink-200 transition-all duration-200">
                                            <div className="flex items-center gap-3.5">
                                                <div
                                                    className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center font-serif text-sm font-semibold shrink-0">
                                                    {booking.details?.fullName?.charAt(0) || "C"}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-[#1a1714] leading-tight">{booking.details?.fullName}</h4>
                                                    <p className="text-xs text-[#7a7068] font-light mt-0.5">
                                                        {matchingSvc?.title || "Custom Treatment"} · <span
                                                        className="italic">Stylist: {matchingEmp?.name || "Roster Pool"}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#eee7df]">
                                                <div className="flex items-center gap-1.5 text-xs text-[#7a7068]">
                                                    <Clock size={13} className="text-pink-300"/>
                                                    <span>{booking.duration || "Standard"}</span>
                                                </div>
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                                                        booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                                                            booking.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                          {booking.status}
                        </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Summary Notice banner edge link */}
                        <div
                            className="mt-6 p-3 bg-[#f8f5f0] border border-[#eee7df] rounded-xl flex items-center gap-2 text-xs text-[#7a7068] font-light">
                            <AlertCircle size={14} className="text-pink-400 shrink-0"/>
                            <span>You have <strong>{pendingBookings.length} pending service vouchers</strong> awaiting scheduling verification.</span>
                        </div>
                    </div>

                    {/* Column B: Operational Showcase Metric Panel Side widget */}
                    <div className="space-y-6">

                        {/* Quick Catalog Action Grid Panel */}
                        <div className="bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm space-y-4">
                            <div>
                                <h3 className="text-lg font-serif font-medium">Internal Shortcuts</h3>
                                <p className="text-xs text-[#7a7068] font-light mt-0.5">Direct system entry channels for
                                    updates.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    className="p-3 bg-[#f8f5f0] border border-[#eee7df] rounded-xl hover:bg-white hover:border-pink-200 transition-all cursor-pointer">
                                    <Scissors size={16} className="text-pink-400 mb-1"/>
                                    <p className="text-xs font-medium text-[#1a1714]">Edit Catalog Menu</p>
                                </div>
                                <div
                                    className="p-3 bg-[#f8f5f0] border border-[#eee7df] rounded-xl hover:bg-white hover:border-pink-200 transition-all cursor-pointer">
                                    <UserCheck size={16} className="text-pink-400 mb-1"/>
                                    <p className="text-xs font-medium text-[#1a1714]">Staff Rosters</p>
                                </div>
                            </div>
                        </div>

                        {/* Popular Bundles Distribution Block */}
                        <div
                            className="bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#f8f5f0]">
                                    <TrendingUp size={16} className="text-pink-400"/>
                                    <h3 className="text-base font-serif font-medium">Premium Bundle Tiers</h3>
                                </div>

                                <div className="space-y-3">
                                    {(packages || []).slice(0, 3).map((pkg, idx) => (
                                        <div key={pkg.id || idx} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-pink-300 shrink-0"/>
                                                <span className="text-[#1a1714] font-medium truncate">{pkg.title}</span>
                                            </div>
                                            <span
                                                className="text-[#7a7068] bg-[#f8f5f0] px-2 py-0.5 rounded-md text-[10px] font-medium shrink-0">
                        {pkg.price}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default AdminPage;
