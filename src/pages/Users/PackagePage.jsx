import { useEffect, useRef } from 'react';
import { Clock3, BadgeDollarSign, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Required for scroll synchronization
import { packages } from "../../api/constant.js";

// Ensure ScrollTrigger plugin is linked correctly inside the module scope
gsap.registerPlugin(ScrollTrigger);

const PackagesShort = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Clear references array on each render to prevent stale nodes
    cardsRef.current = [];

    useEffect(() => {
        // Only run animations if elements are actually present in the DOM
        if (cardsRef.current.length === 0) return;

        const ctx = gsap.context(() => {
            // 1. Header Text Load Sequence (Cloned exactly from ServicesPage)
            const headerTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
            headerTl
                .from('.packages-sub', { opacity: 0, y: -15, duration: 0.6 })
                .from('.packages-title', { opacity: 0, y: 25, duration: 0.8 }, '-=0.4')
                .from('.packages-desc', { opacity: 0, y: 15, duration: 0.6 }, '-=0.5');

            // 2. ScrollTrigger Grid Stagger Entry (Cloned exactly from ServicesPage)
            gsap.fromTo(cardsRef.current,
                {
                    opacity: 0,
                    y: 40 // Set exact vertical distance matching services entry point
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15, // Matched stagger timing delay metric
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.packages-grid', // Monitors the wrapper component container viewport overlap
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                    clearProps: "transform" // Clears transformation metrics without breaking internal opacity values
                }
            );

            // 3. Hover Micro-interactions scoped safely to the refs
            cardsRef.current.forEach((card) => {
                if (!card) return;
                const iconContainer = card.querySelector('.icon-wrap');
                const hoverTl = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: 'power2.out' } });

                if (iconContainer) {
                    hoverTl.to(iconContainer, { scale: 1.1, rotate: 8, color: '#f472b6' });
                }

                card.addEventListener('mouseenter', () => hoverTl.play());
                card.addEventListener('mouseleave', () => hoverTl.reverse());
            });
        }, containerRef);

        return () => ctx.revert(); // Safely teardown context on unmount or re-render
    }, []);

    return (
        <section ref={containerRef} className="w-full min-h-screen bg-[#f8f5f0] px-6 py-20 pb-32 text-[#1a1714] overflow-x-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Editorial Header (Structural Sync with ServicesPage) */}
                <div className="text-center mb-16">
                    {/*<p className="packages-sub uppercase tracking-[0.35em] text-[10px] text-pink-300 mb-4 font-semibold">*/}
                    {/*    Locks & Co.*/}
                    {/*</p>*/}

                    <h1 className="mt-10 services-title text-5xl md:text-6xl font-serif text-[#1a1714] mb-5">
                        Luxury Packages
                    </h1>


                    <p className="packages-desc max-w-xl mx-auto text-[#7a7068] font-light text-sm leading-relaxed">
                        Elevated beauty bundles curated for seamless relaxation.
                    </p>
                </div>

                {/* Shorter Cards Grid Layout (Linked target identifier class name tag) */}
                <div className="packages-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                    {packages.map((pkg, i) => {
                        const IconComponent = pkg.icon;
                        return (
                            <div
                                key={pkg.id}
                                ref={(el) => {
                                    if (el) cardsRef.current[i] = el;
                                }}
                                className={`group relative bg-white border rounded-2xl p-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:shadow-lg ${
                                    pkg.popular ? 'border-pink-300' : 'border-[#e8e3dc]'
                                }`}
                                style={{ opacity: 0 }} // Pre-hide to prevent sudden flash of unstyled content block
                            >
                                {/* Embedded Aesthetic Accent Blob */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#f4ece3] to-[#e8ddd0] rounded-bl-full opacity-40 pointer-events-none" />

                                {/* Card Top Layout */}
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="icon-wrap text-pink-400 p-2.5 bg-[#faf9f7] rounded-xl border border-[#eee7df]">
                                        <IconComponent size={22} />
                                    </div>
                                    {pkg.popular && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-pink-400 text-white text-[9px] uppercase tracking-wider font-medium shrink-0">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                {/* Identity */}
                                <div className="relative z-10 min-h-[56px]">
                                    <h3 className="text-xl font-serif mb-1 group-hover:text-pink-400 transition-colors line-clamp-2 leading-tight">
                                        {pkg.title}
                                    </h3>
                                    <p className="text-xs text-[#7a7068] font-light truncate">{pkg.subtitle}</p>
                                </div>

                                {/* Quick Metadata Info */}
                                <div className="flex items-center gap-4 text-xs text-[#7a7068] py-2 border-y border-[#eee7df] shrink-0">
                                    <div className="flex items-center gap-1">
                                        <Clock3 size={13} className="text-pink-300" />
                                        <span>{pkg.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1 font-medium text-[#1a1714]">
                                        <BadgeDollarSign size={13} className="text-pink-300" />
                                        <span>{pkg.price}</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex flex-col gap-2.5 my-1 flex-grow min-h-[110px]">
                                    {pkg.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 min-w-0">
                                            <Check size={11} className="text-pink-400 shrink-0" />
                                            <p className="text-xs text-[#7a7068] font-light truncate">{feature}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Direct CTA */}
                                <button className="w-full h-10 rounded-xl bg-[#1a1714] text-white hover:bg-pink-400 transition-all text-xs font-medium tracking-wide relative z-10 mt-auto shrink-0 cursor-pointer">
                                    Book Package
                                </button>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default PackagesShort;
