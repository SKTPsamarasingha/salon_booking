import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";



const Team = ({team}) => {
    const sectionRef = useRef(null);
    const headerRef  = useRef(null);
    const cardsRef   = useRef([]);
    const [hovered, setHovered]  = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Header words
            const words = headerRef.current.querySelectorAll(".word");
            gsap.fromTo(words,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07,
                    scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
                }
            );

            // Cards stagger in
            cardsRef.current.forEach((el, i) => {
                const overlay = el.querySelector(".card-overlay");
                const img     = el.querySelector("img");

                gsap.fromTo(overlay,
                    { scaleY: 1, transformOrigin: "bottom center" },
                    {
                        scaleY: 0,
                        duration: 1.0,
                        ease: "power4.inOut",
                        delay: i * 0.1,
                        scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
                    }
                );

                gsap.fromTo(img,
                    { scale: 1.08 },
                    {
                        scale: 1,
                        duration: 1.3,
                        ease: "power3.out",
                        delay: i * 0.1,
                        scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
                    }
                );

                const meta = el.querySelector(".card-meta");
                gsap.fromTo(meta,
                    { y: 20, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        delay: i * 0.1 + 0.5,
                        scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#1a1714] py-24">
            <div className="w-full max-w-7xl mx-auto px-6">

                {/* Header */}
                <div ref={headerRef} className="mb-14">
                    <span className="word text-[11px] tracking-[0.3em] uppercase text-pink-300 font-light inline-block mb-4">
                        The Artists
                    </span>
                    <h2 className="font-serif font-light text-4xl lg:text-5xl text-[#f5f0eb] leading-tight">
                        {"Hands that".split(" ").map((w, i) => (
                            <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
                        ))}{" "}
                        <span className="word inline-block italic text-pink-200 mr-[0.28em]">create,</span>
                        <br />
                        {"minds that inspire.".split(" ").map((w, i) => (
                            <span key={i} className="word inline-block mr-[0.28em]">{w}</span>
                        ))}
                    </h2>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <div
                            key={member.id}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="group flex flex-col gap-0 cursor-pointer"
                            onMouseEnter={() => setHovered(member.id)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Image */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700"
                                    style={{ transform: hovered === member.id ? "scale(1.05)" : "scale(1)" }}
                                />

                                {/* Hover info */}
                                <div
                                    className="absolute inset-0 bg-[#1a1714]/80 flex flex-col justify-end p-5 transition-opacity duration-400"
                                    style={{ opacity: hovered === member.id ? 1 : 0 }}
                                >
                                    <p className="text-sm text-[#c4b9b0] font-light leading-relaxed">{member.bio}</p>
                                </div>

                                {/* Years badge */}
                                <div className="absolute top-4 right-4 bg-pink-300/90 text-[#1a1714] text-[10px] tracking-widest uppercase px-2 py-1 font-medium">
                                    {member.years}
                                </div>

                                {/* Reveal overlay */}
                                <div className="card-overlay absolute inset-0 bg-[#1a1714] z-10" />
                            </div>

                            {/* Meta */}
                            <div className="card-meta pt-4 flex flex-col gap-1 border-t border-white/10 mt-1">
                                <h3 className="font-serif text-lg text-[#f5f0eb] font-light">{member.name}</h3>
                                <span className="text-[11px] tracking-widest uppercase text-pink-300">{member.role}</span>
                                <span className="text-[11px] text-[#6b6259] mt-1">{member.specialty}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;