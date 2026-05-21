import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


const Gallery = ({galleryItems}) => {
    const sectionRef  = useRef(null);
    const headerRef   = useRef(null);
    const itemsRef    = useRef([]);
    const [active, setActive] = useState(null);

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

            // Gallery items reveal with stagger
            itemsRef.current.forEach((el, i) => {
                const overlay = el.querySelector(".reveal-overlay");
                const img     = el.querySelector("img");
                const lbl     = el.querySelector(".item-label");

                // Overlay wipe
                gsap.fromTo(overlay,
                    { scaleX: 1, transformOrigin: "right center" },
                    {
                        scaleX: 0,
                        duration: 1.1,
                        ease: "power4.inOut",
                        delay: i * 0.08,
                        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
                    }
                );

                // Image scale in from slightly zoomed
                gsap.fromTo(img,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        duration: 1.4,
                        ease: "power3.out",
                        delay: i * 0.08,
                        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
                    }
                );

                // Label
                gsap.fromTo(lbl,
                    { y: 10, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        delay: i * 0.08 + 0.6,
                        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#faf9f7] py-24">
            <div className="w-full max-w-7xl mx-auto px-6">

                {/* Header */}
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

                {/* Masonry-style grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3 h-[600px] md:h-[700px]">
                    {galleryItems.map((item, i) => (
                        <div
                            key={item.id}
                            ref={(el) => (itemsRef.current[i] = el)}
                            className={`relative overflow-hidden cursor-pointer ${item.span}`}
                            onMouseEnter={() => setActive(item.id)}
                            onMouseLeave={() => setActive(null)}
                        >
                            <img
                                src={item.src}
                                alt={item.label}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                style={{ transform: active === item.id ? "scale(1.05)" : "scale(1)" }}
                            />

                            {/* Hover overlay */}
                            <div
                                className="absolute inset-0 bg-[#1a1714]/50 transition-opacity duration-400"
                                style={{ opacity: active === item.id ? 1 : 0 }}
                            />

                            {/* Label */}
                            <div
                                className="item-label absolute bottom-4 left-4 z-10"
                                style={{ opacity: active === item.id ? 1 : 0, transition: "opacity 0.3s ease" }}
                            >
                                <span className="text-[11px] tracking-[0.25em] uppercase text-pink-200 font-light">
                                    {item.label}
                                </span>
                            </div>

                            {/* Reveal overlay */}
                            <div className="reveal-overlay absolute inset-0 bg-[#faf9f7] z-20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;