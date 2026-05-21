import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
    Search, Plus, Trash2, Edit3, Clock,
    DollarSign, Tag, Layers, CheckCircle2
} from 'lucide-react';
import { services } from "../../api/constant.js"; // Adjust based on your folder structure

const ServiceManagementPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Clear tracking index for animation cycles on render iterations
    cardsRef.current = [];

    // Extract unique tags across all services for the filter dropdown dynamically
    const allUniqueTags = ['All', ...new Set(services.flatMap(s => s.tags || []).map(t => t.charAt(0).toUpperCase() + t.slice(1)))];

    // Filter Logic
    const filteredServices = services.filter((service) => {
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = selectedTag === 'All' ||
            service.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());

        return matchesSearch && matchesTag;
    });



    return (
        <section ref={containerRef} className="w-full min-h-screen bg-[#f8f5f0] p-8 text-[#1a1714]">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-10">
                    <p className="svc-header-sub uppercase tracking-[0.3em] text-xs text-pink-300 mb-3 font-semibold">
                        Satin & Stone
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="svc-header-title text-5xl font-serif text-[#1a1714] mb-3">
                                Service Management
                            </h1>
                            <p className="svc-header-desc text-[#7a7068] max-w-2xl font-light">
                                Configure your catalog menu pricing structures, baseline intervals, and category system identifiers.
                            </p>
                        </div>

                        {/* Create Trigger Button */}
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#1a1714] text-white rounded-2xl hover:bg-black transition-all text-sm font-medium shadow-sm">
                            <Plus size={16} /> Add New Service
                        </button>
                    </div>
                </div>

                {/* Dashboard Filter Operations Suite */}
                <div className="svc-controls grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                    {/* Dynamic Input Text Query Field */}
                    <div className="md:col-span-2 bg-white border border-[#e8e3dc] rounded-2xl px-4 h-[58px] flex items-center gap-3 shadow-sm">
                        <Search size={18} className="text-[#b0a89e]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search services by title or context keywords..."
                            className="w-full bg-transparent outline-none text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                        />
                    </div>

                    {/* Dynamic Catalog Category Tag Selection */}
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="bg-white border border-[#e8e3dc] rounded-2xl px-4 text-sm text-[#1a1714] shadow-sm outline-none cursor-pointer capitalize"
                    >
                        {allUniqueTags.map((tag) => (
                            <option key={tag} value={tag}>{tag === 'All' ? 'All Catalog Tracks' : `${tag} Offerings`}</option>
                        ))}
                    </select>

                    {/* Metrics Counter Card Module */}
                    <div className="bg-[#faf9f7] border border-[#e8e3dc] rounded-2xl px-5 flex items-center justify-between shadow-sm">
                        <span className="text-xs text-[#7a7068] tracking-wider uppercase font-medium">Catalog Items</span>
                        <span className="text-2xl font-serif font-semibold text-pink-400">{filteredServices.length}</span>
                    </div>
                </div>

                {/* Grid Matrix Layer */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredServices.map((service, i) => (
                        <div
                            key={service.id}
                            ref={(el) => { if (el) cardsRef.current[i] = el; }}
                            className="group relative bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                        >
                            <div>
                                {/* Structural Tracking Index & Symbol Identifiers Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                    <span className="font-serif text-xs tracking-widest text-[#b0a89e]">
                      ITEM MODULE // {service.number}
                    </span>
                                    </div>
                                    <span className="text-pink-300 text-sm font-semibold opacity-70 group-hover:rotate-180 group-hover:scale-120 transition-transform duration-500">
                    {service.icon || "✦"}
                  </span>
                                </div>

                                {/* Identity Module */}
                                <h3 className="font-serif text-2xl font-normal tracking-wide text-[#1a1a1a] leading-tight mb-2 group-hover:text-pink-400 transition-colors">
                                    {service.title}
                                </h3>

                                {/* Narrative Statement */}
                                <p className="text-xs md:text-sm text-[#7a7068] leading-relaxed font-light mb-5 min-h-[60px]">
                                    {service.description}
                                </p>

                                {/* System Operational Parameters Metadata Box */}
                                <div className="grid grid-cols-2 gap-3 bg-[#f8f5f0] border border-[#eee7df] rounded-xl p-3 mb-5">
                                    <div className="flex items-center gap-2 text-xs text-[#7a7068]">
                                        <Clock size={14} className="text-pink-400 shrink-0" />
                                        <div>
                                            <p className="text-[9px] uppercase tracking-wider text-[#b0a89e] font-semibold">Standard Booking</p>
                                            <p className="font-medium text-[#1a1714]">{service.duration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-[#7a7068]">
                                        <DollarSign size={14} className="text-pink-400 shrink-0" />
                                        <div>
                                            <p className="text-[9px] uppercase tracking-wider text-[#b0a89e] font-semibold">Base Price Setup</p>
                                            <p className="font-medium text-[#1a1714]">{service.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Roster Controls & Tags Footer Interface Nodes */}
                            <div className="mt-auto">
                                <div className="flex items-center justify-between pt-4 border-t border-[#eee7df]">
                                    <div className="flex flex-wrap gap-1">
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[9px] tracking-wider uppercase px-2.5 py-0.5 border border-[#e8e3dc] text-[#7a7068] bg-[#faf9f7] rounded-full font-medium"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    {/* Operational Controls Block Layer */}
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 text-[#7a7068] hover:text-pink-400 hover:bg-pink-50 rounded-xl transition-all" title="Edit Catalog Properties">
                                            <Edit3 size={15} />
                                        </button>
                                        <button className="p-2 text-[#7a7068] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Deactivate Item Route">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Edge Interactive Frame Indicator Strip line */}
                            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-300 group-hover:w-full transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* Empty Fallback Display Layout View Block */}
                {filteredServices.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-[#e8e3dc] rounded-3xl mt-6">
                        <p className="text-sm text-[#7a7068] font-light">No salon services match your current filter parameters.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default ServiceManagementPage;
