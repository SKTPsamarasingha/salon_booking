import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";
import Menu from "../components/AdminPage/Menu.jsx";

const AdminLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDesktopCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="flex min-h-screen bg-[#f8f5f0]">

            {/* Mobile Header Top Bar (Hidden on Desktop) */}
            <div className="xl:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1714] flex items-center justify-between px-6 z-40 border-b border-[#2d2925]">
                <div className="flex flex-col">
                    <span className="uppercase tracking-[0.2em] text-[8px] text-pink-300">Lock & Co.</span>
                    <span className="text-white font-serif text-sm font-medium">Admin Panel</span>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="text-[#c8c1b8] hover:text-white p-2 rounded-xl bg-[#26221e] border border-[#3a342f] transition-all cursor-pointer"
                >
                    {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                </button>
            </div>

            {/* Mobile Backdrop Blur Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 xl:hidden transition-opacity backdrop-blur-sm"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar Component Container Drawer Wrapper */}
            <div className={`
                fixed inset-y-0 left-0 z-50 transform xl:relative xl:transform-none transition-all duration-300 ease-in-out
                ${isMenuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
                ${isCollapsed ? "xl:w-[80px]" : "xl:w-[280px]"}
            `}>
                <Menu
                    onClose={() => setIsMenuOpen(false)}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={toggleDesktopCollapse}
                />
            </div>

            {/* Main Content Pane */}
            <main className="flex-1 overflow-y-auto pt-16 xl:pt-0 transition-all duration-300">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;
