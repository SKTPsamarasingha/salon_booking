import { useEffect, useRef } from "react";
import gsap from "gsap";
import PrimaryBtn from "../common/PrimaryBtn.jsx";

const Hero = ({ setIsOpen }) => {
    const compRef = useRef(null);

    useEffect(() => {
        const hasAnimated = sessionStorage.getItem("hero-animation-done");

        // Skip intro animation after first load
        if (hasAnimated) {
            gsap.set(".intro-logo", { opacity: 0 });

            gsap.set(".hero-bg", {
                opacity: 1,
                scale: 1,
            });

            gsap.set(".hero-reveal", {
                opacity: 1,
                y: 0,
            });

            // Still notify navbar
            window.dispatchEvent(new Event("heroLoaded"));

            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power4.inOut" },

                onComplete: () => {
                    sessionStorage.setItem(
                        "hero-animation-done",
                        "true"
                    );

                    window.dispatchEvent(
                        new Event("heroLoaded")
                    );
                },
            });

            // Intro Logo
            tl.fromTo(
                ".intro-logo",
                {
                    opacity: 0,
                    scale: 0.85,
                    y: 30,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                }
            )

                // Move to navbar
                .to(".intro-logo", {
                    top: "1.5rem",
                    left: "1.5rem",
                    xPercent: 0,
                    yPercent: 0,
                    scale: 0.5,
                    duration: 1.3,
                }, "+=0.3")

                // Hide logo
                .to(".intro-logo", {
                    opacity: 0,
                    duration: 0.1,
                })

                // Reveal background
                .fromTo(
                    ".hero-bg",
                    {
                        scale: 1.15,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.8,
                        ease: "power3.out",
                    },
                    "-=0.1"
                )

                // Reveal content
                .fromTo(
                    ".hero-reveal",
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                    },
                    "-=1.2"
                );

        }, compRef);

        return () => ctx.revert();

    }, []);
    return (
        <section ref={compRef} className="relative w-full h-screen flex items-center overflow-hidden bg-black">

            {/* Absolute Centered Branding Animation Anchor */}
            <h1 className="intro-logo fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[3rem] font-semibold font-italic text-white tracking-widest text-nowrap pointer-events-none origin-top-left z-50">
                Locks & Co.
            </h1>

            {/* Background Cinematic Canvas (Initially hidden behind black bg) */}
            <div className="hero-bg absolute inset-0 z-0 w-full h-full opacity-0">
                <img
                    className="w-full h-screen object-cover select-none"
                    alt="Luxury salon interior"
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent md:from-black/65" />
            </div>

            {/* Editorial Content Blocks */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start gap-6 text-white mt-16">

                {/* Main Headline */}
                <h2 className="hero-reveal opacity-0 text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide max-w-3xl leading-[1.1]">
                    Where beauty is <br />
                    <span className="font-serif italic font-normal text-pink-200">
                        not a transformation,
                    </span>
                    <br />
                    but a revelation.
                </h2>

                {/* Subheadline */}
                <p className="hero-reveal opacity-0 text-sm sm:text-base text-gray-300/80 max-w-md font-light leading-relaxed tracking-wide">
                    Private appointments. Master stylists. All formulas sourced from Paris and Kyoto.
                    Every detail crafted exclusively for you.
                </p>

                {/* CTA Buttons */}
                <div className="hero-reveal opacity-0 flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto">
                    <PrimaryBtn fn={() => { setIsOpen(true) }} text="Book Your Visit" />
                    <button className="px-8 py-3 border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm">
                        Explore Services
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="hero-reveal opacity-0 flex flex-wrap items-center gap-8 mt-6 pt-6 border-t border-white/20">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-serif font-light text-white">12+</span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-gray-300/60">Years Mastery</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-serif font-light text-white">4K+</span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-gray-300/60">Happy Clients</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl font-serif font-light text-white">18</span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-gray-300/60">Expert Artists</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;