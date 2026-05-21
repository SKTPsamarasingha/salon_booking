import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {infoLinks, navConfig} from "../api/constant.js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

// Explicitly register the scroll utility engine
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%", // Animation fires when the footer enters the viewport
                    toggleActions: "play none none reverse", // Rewinds elegantly if the user scrolls back up
                }
            });

            // 1. Reveal footer base content layer structure
            tl.fromTo(".footer-content-layer",
                {opacity: 0},
                {opacity: 1, duration: 0.4}
            )
                // 2. Push title text up smoothly from its bounding mask window
                .fromTo(".footer-main-heading",
                    {y: "100%", opacity: 0},
                    {y: "0%", opacity: 1, duration: 1.2, ease: "power4.out"}
                )
                // 3. Staggered reveal across structural elements (Header tags, info copy, text lists)
                .fromTo(".footer-fade-item",
                    {y: 20, opacity: 0},
                    {y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out"},
                    "-=0.6" // Commences animation halfway through the main title reveal
                );

        }, footerRef);

        return () => ctx.revert(); // Clean up thread states securely on router unmounts
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full bg-black text-white pt-16 pb-8 px-6 md:px-12 selection:bg-white selection:text-black overflow-hidden"
        >
            {/* Main Content Wrapper Layer */}
            <div className="footer-content-layer opacity-0 flex flex-col gap-12 max-w-7xl mx-auto relative z-20">

                {/* Massive Full-Width Logo Typography Display Box Mask */}
                <div className="w-full select-none overflow-hidden border-b border-white/10 pb-4">
                    <div className="overflow-hidden block w-full">
                        <h1 className="footer-main-heading opacity-0 text-[12vw] font-bold tracking-wider uppercase leading-none text-center font-heading origin-bottom">
                            LOCKS & CO.
                        </h1>
                    </div>
                </div>

                {/* Dynamic Grid Column Links & Newsletters */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-start">

                    {/* Column 1: Newsletter Form Block */}
                    <div className="md:col-span-5 flex flex-col gap-4 max-w-sm">
                        <h3 className="footer-fade-item opacity-0 text-sm font-semibold tracking-wider uppercase">Sign
                            up now</h3>
                        <p className="footer-fade-item opacity-0 text-xs text-gray-400 font-light">
                            Notifications you won't want to ignore. Stay updated on modern collections.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()}
                              className="footer-fade-item opacity-0 relative flex items-center mt-2 border-b border-white/30 focus-within:border-white transition-colors py-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none pr-16 font-light"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-0 text-xs font-medium tracking-wide hover:text-gray-300 transition-colors uppercase"
                            >
                                Sign up
                            </button>
                        </form>
                    </div>

                    {/* Spacer Block */}
                    <div className="hidden md:block md:col-span-1"/>

                    {/* Column 2: Navigation Categories */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h3 className="footer-fade-item opacity-0 text-xs font-semibold tracking-wider text-gray-500 uppercase">Explore</h3>
                        <ul className="flex flex-col gap-2.5">
                            {navConfig?.map(({label, to}) => (
                                <li key={label} className="footer-fade-item opacity-0">
                                    <Link to={to}
                                          className="text-xs font-light text-gray-300 hover:text-white transition-colors block w-fit">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Corporate/Information Metrics */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h3 className="footer-fade-item opacity-0 text-xs font-semibold tracking-wider text-gray-500 uppercase">Information</h3>
                        <ul className="flex flex-col gap-2.5">
                            {infoLinks?.map(({label, to}) => (
                                <li key={label} className="footer-fade-item opacity-0">
                                    <Link to={to}
                                          className="text-xs font-light text-gray-300 hover:text-white transition-colors block w-fit">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Layout Row Base Footer Elements */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 mt-4">

                    {/* Core Slogan Label */}
                    <p className="footer-fade-item opacity-0 text-[10px] font-medium tracking-[0.3em] uppercase text-gray-300 italic select-none">
                        BE BETTER EVERYDAY
                    </p>

                    {/* Rights & Attributions Block */}
                    <p className="footer-fade-item opacity-0 text-[9px] font-light text-gray-500 tracking-wider">
                        &copy; {new Date().getFullYear()} Locks & Co. Powered by Octagon
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
