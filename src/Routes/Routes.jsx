import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/HomePage/Home/Home";
import Coverage from "../pages/CoveragePage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthPage/Login/Login";
import Register from "../pages/AuthPage/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/RiderPage/Rider";
import SendParcel from "../pages/SendParcelPage/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/DashboardPage/MyParcels/MyParcels";
import Payment from "../pages/DashboardPage/Payment/Payment";
import PaymentSuccess from "../pages/DashboardPage/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/DashboardPage/Payment/PaymentCancelled";
import PaymentHistory from "../pages/DashboardPage/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/DashboardPage/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/DashboardPage/UsersManagement/UsersManagement";

 
 export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home

            },
            {
                path: "rider",
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            },
            {
                path: "send-parcel",
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            },
            {
                path: "coverage",
                Component: Coverage,
                loader: () => fetch('/warehouses.json').then(res=> res.json())
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels

            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path:'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'approve-riders',
                Component: ApproveRiders
            },
            {
                path: 'users-management',
                Component: UsersManagement
            }
        ]
    }
 ]);