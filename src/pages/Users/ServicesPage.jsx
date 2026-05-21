import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [{
    id: 1,
    number: "01",
    title: "Hair Artistry",
    description: "From precision cuts to transformative color, our master stylists sculpt and tone every strand to perfection.",
    tags: ["Cut & Style", "Balayage", "Keratin"],
    duration: "60–120 min",
    price: "From $85",
    icon: "✦"
}, {
    id: 2,
    number: "02",
    title: "Skin Rituals",
    description: "Bespoke facials and advanced skin therapies designed to restore luminosity and reveal your most radiant complexion.",
    tags: ["Hydrafacial", "Peels", "LED Therapy"],
    duration: "45–90 min",
    price: "From $110",
    icon: "◈"
}, {
    id: 3,
    number: "03",
    title: "Nail Couture",
    description: "Meticulous manicures and pedicures elevated with hand-picked lacquers, gel art, and long-lasting finishes.",
    tags: ["Gel", "Nail Art", "Spa Pedicure"],
    duration: "45–75 min",
    price: "From $55",
    icon: "◇"
}, {
    id: 4,
    number: "04",
    title: "Body Sanctuary",
    description: "Indulgent body treatments — wraps, scrubs, and massages — that melt away tension and leave skin silken.",
    tags: ["Wraps", "Scrubs", "Massage"],
    duration: "60–120 min",
    price: "From $130",
    icon: "◉"
}, {
    id: 5,
    number: "05",
    title: "Bridal Suite",
    description: "A curated full-day experience for the bride and her party — flawless hair, makeup, and pampering from dawn to aisle.",
    tags: ["Bridal Hair", "Makeup", "Trial Day"],
    duration: "Full day",
    price: "From $380",
    icon: "◎"
}, {
    id: 6,
    number: "06",
    title: "Lash & Brow",
    description: "Frame your gaze with expert lash extensions, lifts, and precision brow shaping tailored to your facial architecture.",
    tags: ["Extensions", "Lash Lift", "Brow Tint"],
    duration: "30–90 min",
    price: "From $65",
    icon: "✦"
},];

const ServicesPage = () => {
    const [hovered, setHovered] = useState(null);
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    // Reset cards references array on render
    cardsRef.current = [];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Header Text Load Sequence
            const headerTl = gsap.timeline({defaults: {ease: 'power4.out'}});
            headerTl
                .from('.services-sub', {opacity: 0, y: -15, duration: 0.6})
                .from('.services-title', {opacity: 0, y: 25, duration: 0.8}, '-=0.4')
                .from('.services-desc', {opacity: 0, y: 15, duration: 0.6}, '-=0.5');

            // 2. ScrollTrigger Grid Stagger Entry
            gsap.from(cardsRef.current, {
                opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
                    trigger: '.services-grid', start: 'top 85%', toggleActions: 'play none none none',
                },
            });
        }, containerRef);

        return () => ctx.revert(); // GSAP memory cleanup
    }, []);

    return (<section ref={containerRef} className="w-full min-h-screen bg-[#f8f5f0] px-6 py-20 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">

            {/* Editorial Header */}
            <div className="text-center mb-16">
                <p className="services-sub uppercase tracking-[0.35em] text-[10px] text-pink-300 mb-4 font-semibold">
                    Lock & co.
                </p>
                <h1 className="services-title text-5xl md:text-6xl font-serif text-[#1a1714] mb-5">
                    A la Carte Menu
                </h1>
                <p className="services-desc max-w-2xl mx-auto text-[#7a7068] font-light leading-relaxed">
                    Finely tailored individual wellness experiences targeted to refresh, realign, and elevate your
                    personal care routine.
                </p>
            </div>

            {/* Services Grid Layout */}
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((service, i) => (<div
                    key={service.id}
                    ref={(el) => {
                        if (el) cardsRef.current[i] = el;
                    }}
                    onMouseEnter={() => setHovered(service.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative bg-[#faf9f7] border border-[#e8e3dc] p-8 flex flex-col gap-5 group cursor-pointer transition-colors duration-300 hover:bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                    {/* Structural Identifier Layer (Number & Symbol Accent) */}
                    <div className="flex items-center justify-between">
                <span className="font-serif text-xs tracking-widest text-[#b0a89e]">
                  SERIES // {service.number}
                </span>
                        <span
                            className="text-pink-300 text-sm opacity-60 group-hover:rotate-180 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-normal tracking-wide text-[#1a1a1a] leading-snug group-hover:text-pink-400 transition-colors duration-300">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#7a7068] leading-relaxed font-light">
                        {service.description}
                    </p>

                    {/* Micro Tags Area */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {service.tags.map((tag) => (<span
                            key={tag}
                            className="text-[10px] tracking-wider uppercase px-3 py-1 border border-[#e8e3dc] text-[#7a7068] rounded-full bg-white/40 group-hover:bg-[#f8f5f0] transition-colors duration-300"
                        >
                    {tag}
                  </span>))}
                    </div>

                    {/* Card Footer Metadata */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#e8e3dc]">
                <span className="text-xs text-[#b0a89e] tracking-wide font-light">
                  {service.duration}
                </span>
                        <span className="text-sm font-medium text-[#1a1a1a] font-serif italic">
                  {service.price}
                </span>
                    </div>

                    {/* Premium Interactive Accent Base Line Indicator */}
                    <div
                        className={`absolute bottom-0 left-0 h-[3px] bg-pink-300 transition-all duration-500 ${hovered === service.id ? "w-full" : "w-0"}`}
                    />
                </div>))}
            </div>

        </div>
    </section>);
};

export default ServicesPage;
