import {useState} from 'react';
import {
    Search, Plus, Trash2, Edit3, Clock,
    BadgeDollarSign, Check, Sparkles
} from 'lucide-react';
import {packages} from "../../api/constant.js";

const PackageManagementPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPopular, setFilterPopular] = useState('all');

    // Filter Logic
    const filteredPackages = packages.filter((pkg) => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPopular = filterPopular === 'all' ||
            (filterPopular === 'popular' && pkg.popular) ||
            (filterPopular === 'standard' && !pkg.popular);

        return matchesSearch && matchesPopular;
    });

    return (
        <section className="w-full min-h-screen bg-[#f8f5f0] p-8 text-[#1a1714]">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-10">
                    <p className="uppercase tracking-[0.3em] text-xs text-pink-300 mb-3 font-semibold">
                        Satin & Stone
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-5xl font-serif text-[#1a1714] mb-3">
                                Package Management
                            </h1>
                            <p className="text-[#7a7068] max-w-2xl font-light">
                                Configure luxury beauty bundles, manage feature item inclusions, and track seasonal
                                promotional tiers.
                            </p>
                        </div>

                        {/* Create Trigger Button */}
                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-[#1a1714] text-white rounded-2xl hover:bg-black transition-all text-sm font-medium shadow-sm">
                            <Plus size={16}/> Add New Package
                        </button>
                    </div>
                </div>

                {/* Filters Controls Suite */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                    {/* Text Search Input */}
                    <div
                        className="md:col-span-2 bg-white border border-[#e8e3dc] rounded-2xl px-4 h-[58px] flex items-center gap-3 shadow-sm">
                        <Search size={18} className="text-[#b0a89e]"/>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search packages by title or subtitle..."
                            className="w-full bg-transparent outline-none text-sm text-[#1a1714] placeholder:text-[#b0a89e]"
                        />
                    </div>

                    {/* Popularity Drop Selector */}
                    <select
                        value={filterPopular}
                        onChange={(e) => setFilterPopular(e.target.value)}
                        className="bg-white border border-[#e8e3dc] rounded-2xl px-4 text-sm text-[#1a1714] shadow-sm outline-none cursor-pointer"
                    >
                        <option value="all">All Bundle Tiers</option>
                        <option value="popular">Popular Badged Only</option>
                        <option value="standard">Standard Packages</option>
                    </select>

                    {/* Quick Metrics Metric Box */}
                    <div
                        className="bg-[#faf9f7] border border-[#e8e3dc] rounded-2xl px-5 flex items-center justify-between shadow-sm">
                        <span
                            className="text-xs text-[#7a7068] tracking-wider uppercase font-medium">Active Bundles</span>
                        <span
                            className="text-2xl font-serif font-semibold text-pink-400">{filteredPackages.length}</span>
                    </div>
                </div>

                {/* Packages Dashboard Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg) => {
                        const IconComponent = pkg.icon || Sparkles;
                        return (
                            <div
                                key={pkg.id}
                                className={`group relative bg-white border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                                    pkg.popular ? 'border-pink-200 shadow-pink-50/10' : 'border-[#e8e3dc]'
                                }`}
                            >
                                <div>
                                    {/* Top Badge and Dynamic Custom Icon View Block */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className="p-2.5 bg-[#f8f5f0] border border-[#eee7df] rounded-xl text-pink-400 group-hover:scale-105 transition-transform duration-300">
                                            <IconComponent size={20}/>
                                        </div>
                                        {pkg.popular && (
                                            <span
                                                className="px-3 py-1 rounded-full bg-pink-400 text-white text-[9px] uppercase tracking-wider font-semibold">
                        Popular Tier
                      </span>
                                        )}
                                    </div>

                                    {/* Package Metadata Info */}
                                    <h3 className="text-2xl font-serif text-[#1a1714] mb-1 group-hover:text-pink-400 transition-colors duration-200">
                                        {pkg.title}
                                    </h3>
                                    <p className="text-xs text-[#7a7068] font-light mb-4">
                                        {pkg.subtitle}
                                    </p>

                                    {/* Core Metrics Summary Bar */}
                                    <div
                                        className="grid grid-cols-2 gap-3 bg-[#f8f5f0] border border-[#eee7df] rounded-xl p-3 mb-5">
                                        <div className="flex items-center gap-2 text-xs text-[#7a7068]">
                                            <Clock size={14} className="text-pink-400"/>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-wider text-[#b0a89e] font-semibold">Total
                                                    Duration</p>
                                                <p className="font-medium text-[#1a1714]">{pkg.duration}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-[#7a7068]">
                                            <BadgeDollarSign size={14} className="text-pink-400"/>
                                            <div>
                                                <p className="text-[9px] uppercase tracking-wider text-[#b0a89e] font-semibold">Bundle
                                                    Pricing</p>
                                                <p className="font-medium text-[#1a1714]">{pkg.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inclusive Inclusions Checklist Section */}
                                    <div className="mb-6">
                                        <p className="text-[10px] uppercase tracking-wider text-[#b0a89e] font-semibold mb-2.5">Included
                                            Inclusions ({pkg.features.length})</p>
                                        <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1">
                                            {pkg.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <Check size={12} className="text-pink-400 shrink-0"/>
                                                    <span
                                                        className="text-xs text-[#7a7068] font-light truncate">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Settings Action Menu Panel */}
                                <div
                                    className="mt-auto pt-4 border-t border-[#eee7df] flex items-center justify-between">
                  <span className="text-[10px] tracking-widest text-[#b0a89e] uppercase font-mono">
                    ID: {pkg.id}
                  </span>

                                    <div className="flex items-center gap-1">
                                        <button
                                            className="p-2 text-[#7a7068] hover:text-pink-400 hover:bg-pink-50 rounded-xl transition-all"
                                            title="Edit Bundle Rules">
                                            <Edit3 size={15}/>
                                        </button>
                                        <button
                                            className="p-2 text-[#7a7068] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            title="Delete Bundle Configuration">
                                            <Trash2 size={15}/>
                                        </button>
                                    </div>
                                </div>

                                {/* Subtle Interactive Underline Border Highlight */}
                                <div
                                    className="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-300 group-hover:w-full transition-all duration-300"/>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State Fallback Screen Node */}
                {filteredPackages.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-[#e8e3dc] rounded-3xl mt-6">
                        <p className="text-sm text-[#7a7068] font-light">No luxury beauty bundles match your current
                            search parameters.</p>
                    </div>
                )}

            </div>
        </section>
    );
};

export default PackageManagementPage;
