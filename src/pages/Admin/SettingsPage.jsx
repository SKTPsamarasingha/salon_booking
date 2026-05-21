import React, {useState} from 'react';
import {
    Store, Clock, Shield, Bell, CreditCard,
    Save, RefreshCw, Mail, Phone, MapPin,
    Lock, Check, Globe
} from 'lucide-react';

const SettingsPage = () => {
    const [activeSection, setActiveSection] = useState('salon');
    const [isSaving, setIsSaving] = useState(false);

    // Mock initial state for form controls
    const [salonName, setSalonName] = useState('Locks & Co.');
    const [currency, setCurrency] = useState('LKR');
    const [bookingInterval, setBookingInterval] = useState('30');
    const [allowCancellation, setAllowCancellation] = useState(true);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API request saving state
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    const navItems = [
        {id: 'salon', label: 'Salon Profile', icon: Store},
        {id: 'bookings', label: 'Booking Rules', icon: Clock},
        {id: 'security', label: 'Security & Access', icon: Shield},
        {id: 'notifications', label: 'Notifications', icon: Bell},
    ];

    return (
        <section className="w-full min-h-screen bg-[#f8f5f0] p-8 text-[#1a1714]">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#e8e3dc] pb-8 mb-10">
                    <div>
                        <p className="uppercase tracking-[0.3em] text-xs text-pink-300 mb-2 font-semibold">
                            Locks & Co.                        </p>
                        <h1 className="text-4xl font-serif text-[#1a1714]">
                            System Settings
                        </h1>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1a1714] text-white rounded-2xl hover:bg-black transition-all text-sm font-medium shadow-sm disabled:opacity-50"
                    >
                        {isSaving ? (
                            <RefreshCw size={16} className="animate-spin"/>
                        ) : (
                            <Save size={16}/>
                        )}
                        {isSaving ? 'Saving Changes...' : 'Save Configuration'}
                    </button>
                </div>

                {/* Settings Core Workspace */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Sidebar Tabs Sub Navigation */}
                    <div className="md:col-span-1 flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                                        activeSection === item.id
                                            ? 'bg-white text-[#1a1714] font-medium shadow-sm border border-[#e8e3dc]'
                                            : 'text-[#7a7068] hover:bg-[#faf9f7] hover:text-[#1a1714]'
                                    }`}
                                >
                                    <Icon size={16}
                                          className={activeSection === item.id ? 'text-pink-400' : 'text-[#b0a89e]'}/>
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Settings Panel Form Matrix */}
                    <div className="md:col-span-3 bg-white border border-[#e8e3dc] rounded-3xl p-6 md:p-8 shadow-sm">

                        {/* SECTION 1: SALON PROFILE */}
                        {activeSection === 'salon' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-serif text-[#1a1714] mb-1">Salon Identity & Contact</h3>
                                    <p className="text-xs text-[#7a7068] font-light">Public profile credentials rendered
                                        across external client catalogs.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Brand
                                            Moniker</label>
                                        <input
                                            type="text"
                                            value={salonName}
                                            onChange={(e) => setSalonName(e.target.value)}
                                            className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl px-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Active
                                            Operating Currency</label>
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl px-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300 cursor-pointer"
                                        >
                                            <option value="LKR">Sri Lankan Rupee (LKR)</option>
                                            <option value="USD">US Dollar ($)</option>
                                            <option value="EUR">Euro (€)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Physical
                                        Location Landmark Address</label>
                                    <div className="relative">
                                        <MapPin size={16} className="absolute left-4 top-3 text-[#b0a89e]"/>
                                        <input
                                            type="text"
                                            defaultValue="No 45, Kandy Road, Kadawatha, Sri Lanka"
                                            className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Roster
                                            Central Email</label>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-4 top-3 text-[#b0a89e]"/>
                                            <input
                                                type="email"
                                                defaultValue="concierge@satinandstone.com"
                                                className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Hotline
                                            Desk Telephone</label>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-4 top-3 text-[#b0a89e]"/>
                                            <input
                                                type="tel"
                                                defaultValue="+94 11 234 5678"
                                                className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 2: BOOKING RULES */}
                        {activeSection === 'bookings' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-serif text-[#1a1714] mb-1">Calendar & Booking
                                        Thresholds</h3>
                                    <p className="text-xs text-[#7a7068] font-light">Dictate auto-assignment intervals,
                                        cancellation locks, and calendar grid structures.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Default
                                            Time Slot Increment</label>
                                        <select
                                            value={bookingInterval}
                                            onChange={(e) => setBookingInterval(e.target.value)}
                                            className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl px-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300 cursor-pointer"
                                        >
                                            <option value="15">15 Minute Increments</option>
                                            <option value="30">30 Minute Increments</option>
                                            <option value="60">1 Hour Blocks</option>
                                        </select>
                                    </div>

                                    {/* Toggle Control Block */}
                                    <div
                                        className="flex items-center justify-between p-4 bg-[#f8f5f0] rounded-xl border border-[#eee7df]">
                                        <div>
                                            <p className="text-sm font-medium text-[#1a1714]">Allow Digital
                                                Self-Cancellation</p>
                                            <p className="text-xs text-[#7a7068] font-light">Enables clients to cancel
                                                online without manual admin override steps.</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setAllowCancellation(!allowCancellation)}
                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                                                allowCancellation ? 'bg-pink-400' : 'bg-[#b0a89e]'
                                            }`}
                                        >
                      <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              allowCancellation ? 'translate-x-5' : 'translate-x-0'
                          }`}/>
                                        </button>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Cancellation
                                            Time Guard Lockout</label>
                                        <select
                                            className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl px-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300 cursor-pointer">
                                            <option>Up to 12 hours before appointment slot</option>
                                            <option>Up to 24 hours before appointment slot</option>
                                            <option>Up to 48 hours before appointment slot</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 3: SECURITY & ACCESS */}
                        {activeSection === 'security' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-serif text-[#1a1714] mb-1">Administrative Password &
                                        Access</h3>
                                    <p className="text-xs text-[#7a7068] font-light">Update operational gateway tokens
                                        and restrict secure panel credentials.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">Current
                                            Secure Keyphrase</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-3 text-[#b0a89e]"/>
                                            <input
                                                type="password"
                                                placeholder="••••••••••••"
                                                className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label
                                            className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold">New
                                            Gateway Passphrase</label>
                                        <div className="relative">
                                            <Lock size={16} className="absolute left-4 top-3 text-[#b0a89e]"/>
                                            <input
                                                type="password"
                                                className="w-full bg-[#f8f5f0] border border-[#e8e3dc] rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none text-[#1a1714] focus:border-pink-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 4: NOTIFICATIONS */}
                        {activeSection === 'notifications' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-serif text-[#1a1714] mb-1">Automated Communications</h3>
                                    <p className="text-xs text-[#7a7068] font-light">Configure SMS dispatch triggers and
                                        client confirmation email sequences.</p>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        {
                                            title: 'Booking Request Instants',
                                            desc: 'Dispatches confirmation receipts immediately upon payment captures.'
                                        },
                                        {
                                            title: 'Stylist Roster Reminder Shifts',
                                            desc: 'Alerts master technicians when appointments are created or modified.'
                                        },
                                        {
                                            title: '24-Hour Automated Follow-up Care',
                                            desc: 'Sends digital feedback links to clients after service checkouts.'
                                        }
                                    ].map((item, index) => (
                                        <label key={index}
                                               className="flex items-start gap-3 p-4 bg-[#f8f5f0] border border-[#eee7df] rounded-xl cursor-pointer hover:bg-[#faf9f7] transition-all">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="w-4 h-4 rounded border-[#e8e3dc] text-pink-400 focus:ring-pink-300 mt-0.5 accent-pink-400"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-[#1a1714]">{item.title}</p>
                                                <p className="text-xs text-[#7a7068] font-light mt-0.5">{item.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default SettingsPage;
