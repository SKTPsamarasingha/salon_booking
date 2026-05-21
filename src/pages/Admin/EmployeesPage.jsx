import React, {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {
    Search, Plus, Trash2, Edit3, UserCheck,
    Award, Briefcase, Star
} from 'lucide-react';
import {employees} from "../../api/constant.js"; // Adjust based on your folder tree

const EmployeePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Reset tracking index for animation on render iterations
    cardsRef.current = [];

    // 1. Filter Logic based on states
    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'All' || emp.tags.includes(selectedTag.toLowerCase());
        return matchesSearch && matchesTag;
    });


    return (
        <section ref={containerRef} className="w-full min-h-screen bg-[#f8f5f0] p-8 text-[#1a1714]">
            <div className="max-w-7xl mx-auto">

                {/* Header Layout */}
                <div className="mb-10">
                    <p className="emp-header-sub uppercase tracking-[0.3em] text-xs text-pink-300 mb-3 font-semibold">
                        Satin & Stone
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="emp-header-title text-5xl font-serif text-[#1a1714] mb-3">
                                Team Management
                            </h1>
                            <p className="emp-header-desc text-[#7a7068] max-w-2xl font-light">
                                Monitor stylist credentials, specialties, performance tags, and roster schedules.
                            </p>
                        </div>

                        {/* New Stylist Trigger */}
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-[#1a1714] text-white rounded-2xl hover:bg-black transition-all text-sm font-medium shadow-sm">
                            <Plus size={16}/> Add Team Member
                        </button>
                    </div>
                </div>

                {/* Dynamic Filters Control Unit */}
                <div className="emp-controls grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                    {/* Search bar inputs */}
                    <div
                        className="md:col-span-2 bg-white border border-[#e8e3dc] rounded-2xl px-4 h-[58px] flex items-center gap-3 shadow-sm">
                        <Search size={18} className="text-[#b0a89e]"/>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by stylist name or role..."
                            className="w-full bg-transparent outline-none text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                        />
                    </div>

                    {/* Specialty tag drop selector */}
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="bg-white border border-[#e8e3dc] rounded-2xl px-4 text-sm text-[#1a1714] shadow-sm outline-none cursor-pointer"
                    >
                        <option value="All">All Focus Areas</option>
                        <option value="Hair">Hair Artistry</option>
                        <option value="Bridal">Bridal Suite</option>
                        <option value="Skin">Skin Rituals</option>
                    </select>

                    {/* Quick Stats Metric Summary Card */}
                    <div
                        className="bg-[#faf9f7] border border-[#e8e3dc] rounded-2xl px-5 flex items-center justify-between shadow-sm">
                        <span
                            className="text-xs text-[#7a7068] tracking-wider uppercase font-medium">Active Roster</span>
                        <span
                            className="text-2xl font-serif font-semibold text-pink-400">{filteredEmployees.length}</span>
                    </div>
                </div>

                {/* Employee Cards Matrix Display Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredEmployees.map((emp, i) => (
                        <div
                            key={emp.id}
                            ref={(el) => {
                                if (el) cardsRef.current[i] = el;
                            }}
                            className="group relative bg-white border border-[#e8e3dc] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                        >
                            <div>
                                {/* Visual Header Grid Panel */}
                                <div className="flex items-center gap-4 mb-5">
                                    <div
                                        className="relative w-20 h-20 rounded-full overflow-hidden border border-[#eee7df] bg-[#faf9f7] shrink-0">
                                        <img
                                            src={emp.img}
                                            alt={emp.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="flex items-center gap-1.5 text-[10px] tracking-widest text-pink-400 uppercase font-bold mb-1">
                                            <Briefcase size={12}/>
                                            <span>{emp.years} Experience</span>
                                        </div>
                                        <h2 className="text-2xl font-serif text-[#1a1714] leading-tight truncate">
                                            {emp.name}
                                        </h2>
                                        <p className="text-xs text-[#7a7068] font-medium mt-0.5">
                                            {emp.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Bio Summary Section Container */}
                                <p className="text-xs md:text-sm text-[#7a7068] font-light leading-relaxed mb-4">
                                    {emp.bio}
                                </p>

                                {/* Focus Skill Meta Block Area */}
                                <div
                                    className="bg-[#f8f5f0] border border-[#eee7df] rounded-xl p-3.5 flex items-start gap-2.5 mb-5">
                                    <Award size={15} className="text-pink-400 shrink-0 mt-0.5"/>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold mb-0.5">Core
                                            Signature</p>
                                        <p className="text-xs font-medium text-[#1a1714] leading-tight">{emp.specialty}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Tag Lines Footer Node Layer */}
                            <div className="mt-auto">
                                <div className="flex items-center justify-between pt-4 border-t border-[#eee7df]">
                                    <div className="flex flex-wrap gap-1.5">
                                        {emp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[9px] tracking-widest uppercase px-2.5 py-0.5 border border-[#e8e3dc] text-[#7a7068] bg-[#faf9f7] rounded-full font-medium"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    {/* Actions Interaction Area Box Layer */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            className="p-2 text-[#7a7068] hover:text-pink-400 hover:bg-pink-50 rounded-xl transition-all"
                                            title="Edit Roster File">
                                            <Edit3 size={15}/>
                                        </button>
                                        <button
                                            className="p-2 text-[#7a7068] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            title="Archive Profile">
                                            <Trash2 size={15}/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Aesthetic Luxury Frame Bottom Slide Bar Border */}
                            <div
                                className="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-300 group-hover:w-full transition-all duration-500"/>
                        </div>
                    ))}
                </div>

                {/* Empty Fallback View UI Block */}
                {filteredEmployees.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-[#e8e3dc] rounded-3xl mt-6">
                        <p className="text-sm text-[#7a7068] font-light">No team profiles match your filter
                            criteria.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default EmployeePage;
