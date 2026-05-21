import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


const Testimonials = ({testimonials}) => {
    const sectionRef  = useRef(null);
    const headerRef   = useRef(null);
    const [active, setActive] = useState(0);
    const quoteRef    = useRef(null);
    const cardsRef    = useRef([]);
    const lineRef     = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Header
            const words = headerRef.current.querySelectorAll(".word");
            gsap.fromTo(words,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07,
                    scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
                }
            );

            // Cards
            gsap.fromTo(cardsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
                    scrollTrigger: { trigger: cardsRef.current[0], start: "top 82%", toggleActions: "play none none none" },
                }
            );

            // Decorative line draws
            gsap.fromTo(lineRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1, duration: 1.2, ease: "power3.inOut",
                    scrollTrigger: { trigger: lineRef.current, start: "top 90%", toggleActions: "play none none none" },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate quote swap
    const handleSelect = (i) => {
        gsap.to(quoteRef.current, {
            opacity: 0, y: 10, duration: 0.25, ease: "power2.in",
            onComplete: () => {
                setActive(i);
                gsap.fromTo(quoteRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    };

    const t = testimonials[active];

    return (
        <section ref={sectionRef} className="w-full bg-[#faf9f7] py-24 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6">

                {/* Header */}
                <div ref={headerRef} className="mb-16">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-pink-300 font-light inline-block mb-4">
                        Client Stories
                    </span>
                    <h2 className="font-serif font-light text-4xl lg:text-5xl text-[#1a1714] leading-tight">
                        {"What our".split(" ").map((w, i) => (
                            <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
                        ))}{" "}
                        <span className="word inline-block italic text-pink-300 mr-[0.28em]">guests</span>
                        <br />
                        {"are saying.".split(" ").map((w, i) => (
                            <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
                        ))}
                    </h2>
                </div>

                <div ref={lineRef} className="w-full h-px bg-[#e8e3dc] mb-16" />

                {/* Main layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">

                    {/* Active quote */}
                    <div ref={quoteRef}>
                        <div className="font-serif text-5xl text-pink-200 leading-none mb-6 select-none">"</div>
                        <blockquote className="font-serif text-xl lg:text-2xl text-[#1a1714] font-light leading-relaxed mb-10 max-w-2xl">
                            {t.quote}
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[11px] font-medium text-pink-400 tracking-widest">
                                {t.initials}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#1a1714]">{t.name}</p>
                                <p className="text-xs text-[#7a7068] tracking-wide">{t.title}</p>
                            </div>
                        </div>
                    </div>

                    {/* Selector cards */}
                    <div className="flex flex-col gap-3">
                        {testimonials.map((item, i) => (
                            <button
                                key={item.id}
                                ref={(el) => (cardsRef.current[i] = el)}
                                onClick={() => handleSelect(i)}
                                className={`text-left px-5 py-4 border transition-all duration-300 cursor-pointer ${
                                    active === i
                                        ? "border-pink-200 bg-pink-50"
                                        : "border-[#e8e3dc] bg-transparent hover:bg-white"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium tracking-widest shrink-0 ${
                                        active === i ? "bg-pink-300 text-white" : "bg-[#e8e3dc] text-[#7a7068]"
                                    }`}>
                                        {item.initials}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${active === i ? "text-[#1a1714]" : "text-[#7a7068]"}`}>
                                            {item.name}
                                        </p>
                                        <p className="text-[11px] text-[#b0a89e] tracking-wide">{item.title}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;