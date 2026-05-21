import {Outlet} from "react-router-dom";
import Menu from "../components/AdminPage/Menu.jsx";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#f8f5f0]">

            {/* Sidebar */}
            <Menu/>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <Outlet/>
            </main>

        </div>
    );
};

export default AdminLayout;