import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PrimaryBtn from "../common/PrimaryBtn.jsx";
import {SplitText} from "gsap/all";


const Hero = ({ setIsOpen }) => {
    const compRef = useRef(null);
    const [showIntroMarkup, setShowIntroMarkup] = useState(true);

    useEffect(() => {
        const hasAnimated = sessionStorage.getItem("hero-animation-done");

        if (hasAnimated) {
            setShowIntroMarkup(false);
            gsap.set(".hero-bg", { opacity: 1, scale: 1 });
            gsap.set(".hero-reveal", { opacity: 1, y: 0 });
            window.dispatchEvent(new Event("heroLoaded"));
            return;
        }

        const ctx = gsap.context(() => {
            // 1. Initialize SplitText on the clean h1 string node targeting lines, words, or chars
            // We use 'lines' or 'words' as containers to act as the natural "overflow-hidden" clipping masks
            const intro = new SplitText('.intro-logo', {
                type: "chars, words",
                charsClass: "overflow-hidden inline-block"
            });

            // 2. Safely apply your premium text-gradient class utility directly onto the newly split char arrays
            intro.chars.forEach(char => char.classList.add("text-gradient"));

            const tl = gsap.timeline({
                defaults: { ease: "power4.inOut" },
                onComplete: () => {
                    sessionStorage.setItem("hero-animation-done", "true");
                    window.dispatchEvent(new Event("heroLoaded"));

                    // Revert split typography transformations to keep standard responsive layout vectors clean
                    intro.revert();
                },
            });

            // 3. YOUR STEP: Reveal characters staggering sequentially out from their overflow baseline limits
            tl.from(intro.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06,
            })

                // 4. Zoom the completed typography block massively outwards past viewport edges
                .to(".intro-logo", {
                    scale: 6,
                    opacity: 0,
                    duration: 1.5,
                    ease: "power4.in",
                    onComplete: () => setShowIntroMarkup(false)
                }, "+=0.5")

                // 5. Short atmospheric freeze interval pause frame
                .to({}, { duration: 0.6 })

                // 6. Smooth cinematic backdrop reveal
                .fromTo(
                    ".hero-bg",
                    { scale: 1.15, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
                )

                // 7. Prompt navbar to gracefully drop into view
                .call(() => {
                    window.dispatchEvent(new Event("heroLoaded"));
                })

                // 8. Stagger final layout content descriptions into frame
                .fromTo(
                    ".hero-reveal",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
                    "+=0.2"
                );

        }, compRef);

        return () => ctx.revert(); // Safely dismantles context and prevents animation layout leaks
    }, []);
    return (
        <section ref={compRef} className="relative w-full h-screen flex items-center overflow-hidden bg-black">

            {/* Absolute Centered Branding Animation Anchor */}
            {showIntroMarkup && (
                /* FIXED: Reverted markup back to a clean text string layout structure.
                   SplitText seamlessly injects structural span partitions under the hood. */
                <h1
                    className="
                        intro-logo
                        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-full max-w-7xl px-4 text-nowrap pointer-events-none z-50 origin-center
                        text-[10vw] font-bold tracking-wider uppercase leading-none text-center font-heading
                    "
                >
                    LOCKS & CO.
                </h1>
            )}

            {/* Background Cinematic Canvas */}
            <div className="hero-bg absolute inset-0 z-0 w-full h-full opacity-0">
                <img
                    className="w-full h-screen object-cover select-none grayscale contrast-125"
                    alt="Luxury salon interior"
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent md:from-black/75"/>
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
