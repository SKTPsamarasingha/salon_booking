import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import PageLoader from "../components/common/PageLoader.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminPage from "../pages/Admin/AdminPage.jsx";
import AppointmentsPage from "../pages/Admin/AppointmentsPage.jsx";
import EmployeePage from "../pages/Admin/EmployeesPage.jsx";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import PackagePage from "../pages/Users/PackagePage.jsx";
import ServicesPage from "../pages/Users/ServicesPage.jsx";
import ServiceManagementPage from "../pages/Admin/ServiceManagementPage.jsx";
import PackageManagementPage from "../pages/Admin/PackageManagementPage.jsx";
import SettingsPage from "../pages/Admin/SettingsPage.jsx";

const HomePage = lazy(() => import("../pages/Users/HomePage.jsx"));
const BookingPage = lazy(() => import("../pages/Users/BookingPage.jsx"));

const AllRoutes = () => {
    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/appointment" element={<BookingPage/>}/>
                    <Route path="/packages" element={<PackagePage/>}/>
                    <Route path="/services" element={<ServicesPage/>}/>

                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Route>

                <Route element={<AdminLayout/>}>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/admin/appointments" element={<AppointmentsPage/>}/>
                    <Route path="/admin/employees" element={<EmployeePage/>}/>
                    <Route path="/admin/services" element={<ServiceManagementPage/>}/>
                    <Route path="/admin/packages" element={<PackageManagementPage/>}/>
                    <Route path="/admin/settings" element={<SettingsPage/>}/>

                </Route>
            </Routes>
        </Suspense>
    );
};

export default AllRoutes;
