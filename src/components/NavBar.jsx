import {navConfig} from "./../api/constant.js";
import {User, Gift, Menu, X} from "lucide-react";
import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHeroLoaded, setIsHeroLoaded] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    useEffect(() => {
        if (!isHomePage) {
            setIsHeroLoaded(true);
            return;
        }
        const fallbackTimer = setTimeout(() => {
            setIsHeroLoaded(true);
        }, 800);

        const handleHeroLoad = () => {
            clearTimeout(fallbackTimer);
            setIsHeroLoaded(true);
        };

        window.addEventListener("heroLoaded", handleHeroLoad);
        return () => {
            window.removeEventListener("heroLoaded", handleHeroLoad);
            clearTimeout(fallbackTimer);
        };
    }, [isHomePage]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header
            className={`fixed top-0 left-0 z-40 w-full h-[4.8rem] backdrop-blur-sm transition-all duration-1000 ease-out transform ${
                isHeroLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}
        >
            {/* Blended Desktop Navigation Area */}
            <nav className="m-2 flex items-center justify-between text-white mix-blend-difference">
                {/* Logo */}
                <div className="w-fit h-[4rem]">
                    <Link to="/">
                        <h1 className="mt-4 ml-4 text-[1.7rem] font-semibold font-italic text-nowrap">
                            Locks & Co.
                        </h1>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center w-[30rem] h-[4rem]">
                    <ul className="flex items-center justify-around w-full">
                        {navConfig?.map(({to, label}) => (
                            <li key={label} className="tracking-wide mt-2 group">
                                {/* CHANGED: Subtle white glow only triggers on hover */}
                                <Link
                                    to={to}
                                    className="relative block pb-1 transition-all duration-300 "
                                >
                                    {label}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-[2px] bg-pink-500 group-hover:w-full transition-all duration-300"></div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desktop Actions & Mobile Trigger */}
                <div className="w-[10rem] h-[4rem] flex items-center justify-end gap-4">
                    {/* CHANGED: Soft blue text and icon glow only on hover */}
                    <Link className="flex gap-1 items-center group/login" to="/signup" aria-label="Account">
            <span
                className="hidden md:block text-white transition-all duration-300 group-hover/login:drop-shadow-[0_0_4px_rgba(96,165,250,0.5)]">
              Login
            </span>
                        <User
                            className="text-white transition-all duration-300 group-hover/login:text-blue-400 group-hover/login:drop-shadow-[0_0_4px_rgba(96,165,250,0.5)]"/>
                    </Link>

                    {/* CHANGED: Soft pink icon glow and white text glow only on hover */}
                    <Link className="gap-2 hidden md:flex items-center group/gift" to="/signup" aria-label="Account">
            <span
                className="text-white transition-all duration-300 group-hover/gift:drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]">
              Gifts
            </span>
                        <Gift
                            className="text-white transition-all duration-300 group-hover/gift:text-pink-400 group-hover/gift:drop-shadow-[0_0_4px_rgba(247,114,180,0.5)]"/>
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="block md:hidden p-1 hover:bg-white/10 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 h-6"/>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Menu */}
            <div
                className={`fixed top-0 right-0 z-50 w-full h-screen bg-black text-white md:hidden transition-all duration-500 transform ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex justify-between items-center w-full px-6 h-[5rem]">
                    <Link to="/" onClick={closeMenu}>
                        <h1 className="text-[1.5rem] font-semibold font-italic text-nowrap">
                            Locks & Co.
                        </h1>
                    </Link>
                    <button onClick={closeMenu} className="p-1 hover:bg-white/10 rounded-md">
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                <ul className="flex flex-col p-6 gap-6 text-lg font-medium">
                    {navConfig?.map(({to, label}) => (
                        <li key={label} className="border-b border-white/10 pb-3">
                            <Link
                                to={to}
                                onClick={closeMenu}
                                className="block w-full text-gray-300 hover:text-white hover:pl-2 transition-all duration-200"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default NavBar;
