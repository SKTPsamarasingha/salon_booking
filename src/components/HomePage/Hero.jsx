import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import gsap from "gsap";
import PrimaryBtn from "../common/PrimaryBtn.jsx";

const Hero = ({setIsOpen}) => {
    const compRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {ease: "power4.inOut"},
                onComplete: () => {
                    // Signal navbar to display its items once intro finishes
                    window.dispatchEvent(new Event("heroLoaded"));
                }
            });

            // 1. Initial State: Solid black screen. Reveal centered logo text.
            tl.fromTo(".intro-logo",
                {opacity: 0, scale: 0.85, y: 30},
                {opacity: 1, scale: 1, y: 0, duration: 1.5}
            )

                // 2. Fly centered text up to the navbar logo coordinates
                .to(".intro-logo", {
                    top: "1.5rem",
                    left: "1.5rem",
                    xPercent: 0,
                    yPercent: 0,
                    scale: 0.5, // Shrinks matching the navbar size
                    duration: 1.3,
                }, "+=0.3")

                // 3. Make the text disappear right after landing at the top left
                .to(".intro-logo", {
                    opacity: 0,
                    duration: 0.1,
                    ease: "power4.inOut"
                })

                // 4. Reveal the background cinematic image canvas instantly after text vanishes
                .fromTo(".hero-bg",
                    {scale: 1.15, opacity: 0},
                    {scale: 1, opacity: 1, duration: 1.8, ease: "power3.out"},
                    "-=0.1" // Small overlap for smooth flow
                )

                // 5. Reveal editorial salon text blocks sequentially
                .fromTo(".hero-reveal",
                    {y: 40, opacity: 0},
                    {y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out"},
                    "-=1.2"
                );

        }, compRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={compRef} className="relative w-full h-screen flex items-center overflow-hidden bg-black">

            {/* Absolute Centered Branding Animation Anchor */}
            <h1 className="intro-logo fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-[3rem] font-semibold font-italic text-white tracking-widest text-nowrap pointer-events-none origin-top-left">
                Locks & Co.
            </h1>


            {/* Background Cinematic Canvas (Initially hidden behind black bg) */}
            <div className="hero-bg absolute inset-0 z-0 w-full h-full opacity-0">
                <img className="w-full h-screen object-cover select-none" alt="Luxury salon look"
                     src="https://images.pexels.com/photos/8221039/pexels-photo-8221039.jpeg"/>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:from-black/60"/>
            </div>

            {/* Editorial Content Blocks */}
            <div
                className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start gap-6 text-white mt-16">

                <h2 className="hero-reveal opacity-0 text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide max-w-3xl leading-[1.1]">
                    Couture Hair. <br/>
                    <span
                        className="font-serif italic font-normal text-pink-200">Unrivaled Luxury.</span>
                </h2>
                <p className="hero-reveal opacity-0 text-sm sm:text-base text-gray/50 max-w-md font-light leading-relaxed tracking-wide">
                    Step into a private sanctuary where master colorists and editorial stylists curate looks tailored
                    exclusively to your identity.
                </p>
                <div className="hero-reveal opacity-0 flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto">
                    <PrimaryBtn  fn={()=>{setIsOpen(true)}} text={"Reserve Experience"}></PrimaryBtn>

                </div>
            </div>
        </section>
    );
};

export default Hero;
