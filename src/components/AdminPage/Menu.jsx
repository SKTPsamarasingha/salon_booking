import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Scissors,
    Package,
    Settings,
    LogOut,
    ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export const Menu = () => {
    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={18} />,
            path: "/admin",
        },
        {
            name: "Appointments",
            icon: <CalendarDays size={18} />,
            path: "/admin/appointments",
        },
        {
            name: "Employees",
            icon: <Users size={18} />,
            path: "/admin/employees",
        },
        {
            name: "Services",
            icon: <Scissors size={18} />,
            path: "/admin/services",
        },
        {
            name: "Packages",
            icon: <Package size={18} />,
            path: "/admin/packages",
        },
        {
            name: "Settings",
            icon: <Settings size={18} />,
            path: "/admin/settings",
        },
    ];

    return (
        <aside className=" w-[280px] min-h-screen bg-[#1a1714] border-r border-[#2d2925] flex flex-col justify-between">

            {/* Top */}
            <div>

                {/* Logo */}
                <div className="px-8 py-8 border-b border-[#2d2925]">
                    <p className="uppercase tracking-[0.35em] text-[10px] text-pink-300 mb-2">
                        Lock & Co.
                    </p>

                    <h1 className="text-2xl font-serif text-white">
                        Admin Panel
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 flex flex-col gap-2">

                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 ${
                                    isActive
                                        ? "bg-pink-400 text-white"
                                        : "text-[#c8c1b8] hover:bg-[#26221e] hover:text-white"
                                }`
                            }
                        >

                            <div className="flex items-center gap-3">
                                {item.icon}

                                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>
                            </div>

                            <ChevronRight
                                size={16}
                                className="opacity-50 group-hover:translate-x-1 transition-transform"
                            />

                        </NavLink>
                    ))}

                </nav>
            </div>

            {/* Bottom User Section */}
            <div className="p-4 border-t border-[#2d2925]">

                <div className="bg-[#26221e] rounded-2xl p-4">

                    <div className="flex items-center gap-3 mb-4">

                        <div className="w-12 h-12 rounded-full bg-pink-300 flex items-center justify-center text-[#1a1714] font-semibold">
                            A
                        </div>

                        <div>
                            <p className="text-white text-sm font-medium">
                                Admin User
                            </p>

                            <p className="text-[#9f968d] text-xs">
                                salon@locks&co.com
                            </p>
                        </div>

                    </div>

                    {/* Logout */}
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#3a342f] text-[#d9d1c7] hover:bg-[#312c27] hover:text-white transition-all cursor-pointer">

                        <LogOut size={16} />

                        <span className="text-sm">
              Logout
            </span>

                    </button>

                </div>

            </div>
        </aside>
    );
};

export default Menu;