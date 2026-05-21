import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: "12+", label: "Years of Mastery" },
    { value: "4K+", label: "Happy Clients" },
    { value: "18", label: "Expert Artists" },
    { value: "9", label: "Awards Won" },
];

const About = () => {
    const sectionRef   = useRef(null);
    const taglineRef   = useRef(null);
    const headingRef   = useRef(null);
    const bodyRef      = useRef(null);
    const imageRef     = useRef(null);
    const overlayRef   = useRef(null);
    const statsRef     = useRef([]);
    const accentRef    = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Image reveal: overlay slides away left
            gsap.fromTo(
                overlayRef.current,
                { scaleX: 1, transformOrigin: "right center" },
                {
                    scaleX: 0,
                    duration: 1.3,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Image subtle scale from inside
            gsap.fromTo(
                imageRef.current,
                { scale: 1.08 },
                {
                    scale: 1,
                    duration: 1.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Accent line draws down
            gsap.fromTo(
                accentRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Tagline
            gsap.fromTo(
                taglineRef.current,
                { x: -20, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: taglineRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Heading lines stagger
            const lines = headingRef.current.querySelectorAll(".line");
            gsap.fromTo(
                lines,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 82%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Body text
            gsap.fromTo(
                bodyRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: bodyRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Stats count up + fade in
            statsRef.current.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#1a1714] text-[#f5f0eb] overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* ── Left: Image ── */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <img
                        ref={imageRef}
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                        alt="Salon interior"
                        className="w-full h-full object-cover"
                    />
                    {/* Reveal overlay */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 bg-[#1a1714] z-10"
                    />
                    {/* Decorative corner */}
                    <div className="absolute bottom-6 right-6 w-16 h-16 border border-pink-300/40 z-20" />
                </div>

                {/* ── Right: Content ── */}
                <div className="flex flex-col gap-8">

                    {/* Accent line + tagline */}
                    <div className="flex items-center gap-4">
                        <div
                            ref={accentRef}
                            className="w-px h-12 bg-pink-300"
                        />
                        <span
                            ref={taglineRef}
                            className="text-[11px] tracking-[0.3em] uppercase text-pink-300 font-light"
                        >
                            Our Story
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 ref={headingRef} className="font-serif font-light text-4xl lg:text-5xl leading-[1.1] text-[#f5f0eb]">
                        <span className="line block">Where craft</span>
                        <span className="line block italic text-pink-200">meets beauty,</span>
                        <span className="line block">every detail matters.</span>
                    </h2>

                    {/* Body */}
                    <div ref={bodyRef} className="flex flex-col gap-4">
                        <p className="text-[#a09488] leading-relaxed font-light text-base">
                            Founded in 2012, our sanctuary was born from a simple belief — that beauty is not a transformation, but a revelation. We strip away the noise and let your most luminous self emerge.
                        </p>
                        <p className="text-[#a09488] leading-relaxed font-light text-base">
                            Every artist on our team trains for a minimum of two years under a master stylist before touching a client. We use only house-curated, toxin-free formulas sourced from artisan labs in Paris and Kyoto.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                ref={(el) => (statsRef.current[i] = el)}
                                className="flex flex-col gap-1"
                            >
                                <span className="font-serif text-3xl text-[#f5f0eb] font-light">{s.value}</span>
                                <span className="text-[11px] tracking-widest uppercase text-[#6b6259]">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;