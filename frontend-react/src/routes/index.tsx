//client-admin-host layouts 
import ClientLayout from "@/layouts/ClientLayout";
import AdminLayout from "@/layouts/AdminLayout";
import HostLayout from "@/layouts/HostLayout";

//client pages
import Home from "@/pages/client/Home";
import About from "@/pages/client/About";
import ApartmentDetails from "@/pages/client/ApartmentDetails";
import Apartments from "@/pages/client/Apartments";
import Contact from "@/pages/client/Contact";
import ClientProfile from "@/pages/common/Profile";

//admin pages 
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UsersManagement from "@/pages/admin/UsersManagement";
import SlidersManagement from "@/pages/admin/SlidersManagement";
import ContactsManagement from "@/pages/admin/ContactsManagement";
import ApartmentsManagement from "@/pages/admin/ApartmentsManagement";
import BookingsManagement from "@/pages/admin/BookingsManagement";


//host pages
import HostBookings from "@/pages/host/HostBookings";
import HostDashboard from "@/pages/host/HostDashboard";
import HostApartments from "@/pages/host/HostApartments";

//auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

//not found page
import NotFound from "@/pages/common/NotFound";
import ProtectedRoute from "@/components/common/ProtectedRoute";


const ROUTER = [
    //client routes
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "apartments",
                children: [
                    {
                        index: true,
                        element: <Apartments />
                    },
                    {
                        path: ":id",
                        element: <ApartmentDetails />
                    },
                ],
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "profile",
                element: <ProtectedRoute allowedRoles={["CLIENT","HOST","ADMIN"]}>
                    <ClientProfile />
                </ProtectedRoute>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    },

    //admin routes
    {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
        </ProtectedRoute>,
        children: [
            {
                index:true,
                element: <AdminDashboard />
            },
            {
                path: "users",
                element: <UsersManagement />
            },
            {
                path: "sliders",
                element: <SlidersManagement />
            },
            {
                path: "contacts",
                element: <ContactsManagement />
            },
            {
                path: "apartments",
                element: <ApartmentsManagement />
            },
            {
                path: "bookings",
                element: <BookingsManagement />
            },

        ]
    },

    //host routes
    {
        path: "host",
        element: <ProtectedRoute allowedRoles={["HOST"]}>
            <HostLayout />
        </ProtectedRoute>,
        children: [
            {
                index: true,
                element: <HostDashboard />
            },
            {
                path: "apartments",
                element: <HostApartments />
            },
            {
                path: "bookings",
                element: <HostBookings />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
]

export default ROUTER