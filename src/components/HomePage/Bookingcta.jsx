import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PrimaryBtn from "../common/PrimaryBtn.jsx";


const BookingCTA = ({setIsOpen}) => {
    const sectionRef  = useRef(null);
    const bgRef       = useRef(null);
    const overlayRef  = useRef(null);
    const contentRef  = useRef(null);
    const tagRef      = useRef(null);
    const headingRef  = useRef(null);
    const subRef      = useRef(null);
    const btnRef      = useRef(null);
    const lineLeftRef = useRef(null);
    const lineRightRef= useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Background parallax
            gsap.to(bgRef.current, {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Overlay fades as you scroll into section
            gsap.fromTo(overlayRef.current,
                { opacity: 0.3 },
                {
                    opacity: 0.72,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "center center",
                        scrub: true,
                    },
                }
            );

            // Decorative lines draw in from center
            gsap.fromTo(lineLeftRef.current,
                { scaleX: 0, transformOrigin: "right center" },
                {
                    scaleX: 1, duration: 1.0, ease: "power3.inOut",
                    scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );
            gsap.fromTo(lineRightRef.current,
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1, duration: 1.0, ease: "power3.inOut",
                    scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

            // Tag
            gsap.fromTo(tagRef.current,
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2,
                    scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

            // Heading lines
            const lines = headingRef.current.querySelectorAll(".line");
            gsap.fromTo(lines,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.15, delay: 0.3,
                    scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

            // Sub + button
            gsap.fromTo([subRef.current, btnRef.current],
                { y: 24, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15, delay: 0.65,
                    scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden"
        >
            {/* Background image */}
            <div ref={bgRef} className="absolute inset-[-10%] z-0">
                <img
                    src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Dark overlay */}
            <div ref={overlayRef} className="absolute inset-0 bg-[#1a1714] z-10" />

            {/* Content */}
            <div ref={contentRef} className="relative z-20 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-8">

                {/* Decorative horizontal lines */}
                <div className="flex items-center gap-4 w-full max-w-xs">
                    <div ref={lineLeftRef} className="flex-1 h-px bg-pink-300/50" />
                    <div ref={tagRef} className="text-[10px] tracking-[0.35em] uppercase text-pink-300 font-light whitespace-nowrap">
                        Reserve Your Ritual
                    </div>
                    <div ref={lineRightRef} className="flex-1 h-px bg-pink-300/50" />
                </div>

                {/* Heading */}
                <h2 ref={headingRef} className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl text-[#f5f0eb] leading-[1.08]">
                    <span className="line block">Your most radiant</span>
                    <span className="line block italic text-pink-200">self awaits.</span>
                </h2>

                {/* Sub */}
                <p ref={subRef} className="text-[#a09488] font-light text-base max-w-md leading-relaxed">
                    Private appointments available seven days a week. Same-day bookings welcome — subject to availability.
                </p>

                {/* CTA button */}
                <div ref={btnRef}>
                    <PrimaryBtn fn={()=>setIsOpen(true)} text="Book Your Experience" />

                </div>

                {/* Hours */}
                <p className="text-[11px] tracking-widest uppercase text-[#6b6259]">
                    Mon – Sat &nbsp;·&nbsp; 9am – 8pm &nbsp;·&nbsp; Sun &nbsp;·&nbsp; 10am – 6pm
                </p>
            </div>
        </section>
    );
};

export default BookingCTA;