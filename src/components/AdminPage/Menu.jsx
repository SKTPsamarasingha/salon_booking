import { LayoutDashboard, CalendarDays, Users, Scissors, Package, Settings, LogOut, ChevronRight, Menu as MenuIcon, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const Menu = ({ onClose, isCollapsed, onToggleCollapse }) => {
    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
        { name: 'Appointments', icon: <CalendarDays size={18} />, path: '/admin/appointments' },
        { name: 'Employees', icon: <Users size={18} />, path: '/admin/employees' },
        { name: 'Services', icon: <Scissors size={18} />, path: '/admin/services' },
        { name: 'Packages', icon: <Package size={18} />, path: '/admin/packages' },
        { name: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
    ];

    return (
        <aside className={`h-full min-h-screen bg-[#1a1714] border-r border-[#2d2925] flex flex-col justify-between relative transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`}>
            {/* Top Section */}
            <div>
                {/* Logo and Collapse Button */}
                <div className={`px-6 py-8 border-b border-[#2d2925] flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <div className="transition-opacity duration-200">
                            <p className="uppercase tracking-[0.35em] text-[10px] text-pink-300 mb-2">Lock & Co.</p>
                            <h1 className="text-2xl font-serif text-white whitespace-nowrap">Admin Panel</h1>
                        </div>
                    )}

                    {/* Desktop Collapse Controller Trigger */}
                    <button
                        onClick={onToggleCollapse}
                        className="hidden xl:flex text-[#9f968d] hover:text-white p-2 rounded-xl bg-[#26221e] border border-[#3a342f] hover:bg-[#312c27] transition-all cursor-pointer"
                    >
                        {isCollapsed ? <MenuIcon size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Navigation links */}
                <nav className="px-3 py-6 flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `group flex items-center px-4 py-3 rounded-2xl transition-all duration-200 ${
                                    isCollapsed ? 'justify-center' : 'justify-between'
                                } ${
                                    isActive
                                        ? 'bg-pink-400 text-white'
                                        : 'text-[#c8c1b8] hover:bg-[#26221e] hover:text-white'
                                }`
                            }
                            title={isCollapsed ? item.name : undefined} // Native tooltip on collapse icon hover
                        >
                            <div className="flex items-center gap-3">
                                <span className="shrink-0">{item.icon}</span>
                                {!isCollapsed && (
                                    <span className="text-sm font-medium tracking-wide whitespace-nowrap transition-opacity duration-200">
                    {item.name}
                  </span>
                                )}
                            </div>
                            {!isCollapsed && (
                                <ChevronRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom User Profile Section */}
            <div className="p-3 border-t border-[#2d2925]">
                <div className={`bg-[#26221e] rounded-2xl transition-all duration-300 ${isCollapsed ? 'p-2 text-center' : 'p-4'}`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center mb-2' : 'mb-4'}`}>
                        <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-[#1a1714] font-semibold shrink-0">
                            A
                        </div>
                        {!isCollapsed && (
                            <div className="transition-opacity duration-200 overflow-hidden">
                                <p className="text-white text-sm font-medium truncate">Admin User</p>
                                <p className="text-[#9f968d] text-xs truncate max-w-[140px]">salon@locks&co.com</p>
                            </div>
                        )}
                    </div>

                    {/* Logout */}
                    <button className={`flex items-center justify-center gap-2 rounded-xl border border-[#3a342f] text-[#d9d1c7] hover:bg-[#312c27] hover:text-white transition-all cursor-pointer ${isCollapsed ? 'w-10 h-10 p-0 mx-auto' : 'w-full px-4 py-3 text-sm'}`} title="Logout">
                        <LogOut size={16} />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Menu;
