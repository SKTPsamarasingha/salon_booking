import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

// Core UI shell components remain static to prevent visual layout flicker
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import PageLoader from '../components/common/PageLoader.jsx';
import ScrollToTop from "../components/common/ScrollToTop.jsx";

// Lazy loaded User Pages
const HomePage = lazy(() => import('../pages/Users/HomePage.jsx'));
const BookingPage = lazy(() => import('../pages/Users/BookingPage.jsx'));
const PackagePage = lazy(() => import('../pages/Users/PackagePage.jsx'));
const ServicesPage = lazy(() => import('../pages/Users/ServicesPage.jsx'));

// Lazy loaded Auth Pages
const SignIn = lazy(() => import('../pages/auth/SignIn.jsx'));
const SignUp = lazy(() => import('../pages/auth/SignUp.jsx'));

// Lazy loaded Admin Pages
const AdminPage = lazy(() => import('../pages/Admin/AdminPage.jsx'));
const AppointmentsPage = lazy(() => import('../pages/Admin/AppointmentsPage.jsx'));
const EmployeePage = lazy(() => import('../pages/Admin/EmployeesPage.jsx'));
const ServiceManagementPage = lazy(() => import('../pages/Admin/ServiceManagementPage.jsx'));
const PackageManagementPage = lazy(() => import('../pages/Admin/PackageManagementPage.jsx'));
const SettingsPage = lazy(() => import('../pages/Admin/SettingsPage.jsx'));

const AllRoutes = () => {
    return (
        <Suspense fallback={<PageLoader/>}>
            <ScrollToTop/>

            <Routes>
                {/* Public / User Routes */}
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/appointment" element={<BookingPage/>}/>
                    <Route path="/packages" element={<PackagePage/>}/>
                    <Route path="/services" element={<ServicesPage/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                </Route>

                {/* Admin Dashboard Routes */}
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
