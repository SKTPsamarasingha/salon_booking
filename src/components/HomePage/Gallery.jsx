import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ galleryItems }) => {
    const sectionRef  = useRef(null);
    const headerRef   = useRef(null);
    const itemsRef    = useRef([]);
    const [active, setActive] = useState(null);

    // Clear reference array on render to prevent stale nodes
    itemsRef.current = [];

    useEffect(() => {
        if (galleryItems.length === 0) return;

        const ctx = gsap.context(() => {
            // Header Animation
            const words = headerRef.current.querySelectorAll(".word");
            gsap.fromTo(words,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07,
                    scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
                }
            );

            // Gallery items reveal with randomized directions
            itemsRef.current.forEach((el, i) => {
                if (!el) return;

                const overlay = el.querySelector(".reveal-overlay");
                const img     = el.querySelector("img");
                const lbl     = el.querySelector(".item-label");

                const directions = [
                    { transformOrigin: "left center",   scaleX: 1, scaleY: 1, axis: "scaleX" },
                    { transformOrigin: "right center",  scaleX: 1, scaleY: 1, axis: "scaleX" },
                    { transformOrigin: "center top",    scaleX: 1, scaleY: 1, axis: "scaleY" },
                    { transformOrigin: "center bottom", scaleX: 1, scaleY: 1, axis: "scaleY" }
                ];

                const randomDir = directions[Math.floor(Math.random() * directions.length)];

                const initialVars = {
                    transformOrigin: randomDir.transformOrigin,
                    scaleX: randomDir.scaleX,
                    scaleY: randomDir.scaleY
                };

                const targetVars = {
                    duration: 1.2,
                    ease: "power4.inOut",
                    delay: i * 0.08,
                    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
                };

                targetVars[randomDir.axis] = 0;

                // 1. Dynamic Overlay Wipe
                gsap.fromTo(overlay, initialVars, targetVars);

                // 2. Image zoom entrance
                gsap.fromTo(img,
                    { scale: 1.12 },
                    {
                        scale: 1,
                        duration: 1.5,
                        ease: "power3.out",
                        delay: i * 0.08,
                        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
                    }
                );

                // 3. Text Label Reveal
                gsap.fromTo(lbl,
                    { y: 10, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        delay: i * 0.08 + 0.6,
                        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [galleryItems]);

    return (
        <section ref={sectionRef} className="w-full bg-[#faf9f7] py-24">
            <div className="w-full max-w-7xl mx-auto px-6">

                {/* Editorial Header */}
                <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <h2 className="font-serif font-light text-4xl lg:text-5xl text-[#1a1714] leading-tight">
                        {"Our work,".split(" ").map((w, i) => (
                            <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
                        ))}
                        <br />
                        {"our".split(" ").map((w, i) => (
                            <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
                        ))}{" "}
                        <span className="word inline-block italic text-pink-300 mr-[0.28em]">artistry.</span>
                    </h2>
                    <p className="word text-sm text-[#7a7068] max-w-xs font-light leading-relaxed">
                        Each look is crafted in private — no assembly line, no rushing.
                    </p>
                </div>

                {/* Optimized Layout Architecture for exactly 6 items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px] md:auto-rows-[280px]">
                    {galleryItems.slice(0, 6).map((item, i) => {
                        // Creates an elegant premium asymmetric mosaic layout flow automatically
                        const structureSpans = [
                            "lg:col-span-2 lg:row-span-2", // Card 1 (Large Feature Card)
                            "lg:col-span-1 lg:row-span-1", // Card 2 (Standard Box)
                            "lg:col-span-1 lg:row-span-2", // Card 3 (Vertical Tall Card)
                            "lg:col-span-1 lg:row-span-1", // Card 4 (Standard Box)
                            "lg:col-span-1 lg:row-span-1", // Card 5 (Standard Box)
                            "lg:col-span-2 lg:row-span-1", // Card 6 (Horizontal Wide Card)
                        ];

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                                className={`relative overflow-hidden cursor-pointer rounded-2xl border border-[#e8e3dc]/40 shadow-sm ${structureSpans[i] || ""}`}
                                onMouseEnter={() => setActive(item.id)}
                                onMouseLeave={() => setActive(null)}
                            >
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                    style={{ transform: active === item.id ? "scale(1.05)" : "scale(1)" }}
                                />

                                {/* Dark Minimal Vignette Layer on Hover */}
                                <div
                                    className="absolute inset-0 bg-[#1a1714]/40 transition-opacity duration-500 pointer-events-none"
                                    style={{ opacity: active === item.id ? 1 : 0 }}
                                />

                                {/* Luxury Title Metadata */}
                                <div
                                    className="item-label absolute bottom-5 left-5 z-10 pointer-events-none"
                                    style={{
                                        opacity: active === item.id ? 1 : 0,
                                        transform: active === item.id ? "translateY(0)" : "translateY(8px)",
                                        transition: "opacity 0.4s ease, transform 0.4s ease"
                                    }}
                                >
                                    <span className="text-[10px] tracking-[0.25em] uppercase text-pink-200 font-medium bg-[#1a1714]/30 backdrop-blur-xs px-3 py-1.5 rounded-md border border-white/10">
                                        {item.label}
                                    </span>
                                </div>

                                {/* Randomized Directional Concealer Card Mask */}
                                <div className="reveal-overlay absolute inset-0 bg-[#faf9f7] z-20 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
