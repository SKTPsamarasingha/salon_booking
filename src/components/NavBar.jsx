import {navConfig} from "./../api/constant.js";
import {User, Gift, Menu, X} from 'lucide-react';
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
            className={`fixed top-0 left-0 z-40 w-full h-[5rem] text-black bg-black/10  backdrop-blur-sm transition-all duration-1000 ease-out transform ${
                isHeroLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}>
            <nav className='m-2 flex items-center justify-between'>
                {/* Permanent Logo Box (Shows along with the rest of the navbar components) */}
                <div className="w-fit h-[4rem]">
                    <Link to="/">
                        <h1 className='mt-4 ml-4 text-[1.7rem] font-semibold font-italic text-nowrap'>Locks & Co.</h1>
                    </Link>
                </div>
                {/* Links */}
                <div className=" hidden md:flex items-center w-[30rem] h-[4rem] ">
                    <ul className='flex items-center justify-around w-full'>
                        {navConfig?.map(({to, label}) => (
                            <li key={label} className="tracking-wide mt-2 group">
                                <Link to={to} className="relative block pb-1">
                                    {label}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Auth/CTA Actions */}
                <div className="w-[5rem] h-[4rem] flex items-center gap-3 justify-end ml-30">
                    <Link to="/signup" aria-label="Account">
                        <User/>
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="block md:hidden p-1 hover:bg-white/10 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-6 h-6"/>
                    </button>
                    <Gift className='hidden md:block'/>
                </div>

                {/* Mobile Drawer Menu */}
                <div
                    className={` fixed top-0 right-0 w-full h-screen bg-black text-white md:hidden transition-all duration-500 transform ${
                        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                    }`}>
                    <div className='flex justify-between items-center w-full px-6 h-[5rem]'>
                        <Link to="/" onClick={closeMenu}>
                            <h1 className='text-[1.5rem] font-semibold font-italic text-nowrap'>Locks & Co.</h1>
                        </Link>
                        <button onClick={closeMenu} className="p-1 hover:bg-white/10 rounded-md">
                            <X className="w-6 h-6"/>
                        </button>
                    </div>
                    <ul className="flex flex-col p-6 gap-6 text-lg font-medium">
                        {navConfig?.map(({to, label}) => (
                            <li key={label} className="border-b border-white/10 pb-3">
                                <Link to={to} onClick={closeMenu}
                                      className="block w-full text-gray-300 hover:text-white hover:pl-2 transition-all duration-200">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
