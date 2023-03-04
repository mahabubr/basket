import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AddProduct from "../pages/AddProduct/AddProduct";
import HomeLayout from "../pages/Home/HomeLayout";
import ProductDetails from "../pages/Home/Products/ProductDetails/ProductDetails";
import Login from "../pages/LoginAndSignUp/Login";
import SignUp from "../pages/LoginAndSignUp/SignUp";
import UserPrivateRoute from "./PrivateRoute/UserPrivateRoute";

const route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element:
                    <UserPrivateRoute>
                        <HomeLayout />
                    </UserPrivateRoute>
            },
            {
                path: 'add-product',
                element:
                    <UserPrivateRoute>
                        <AddProduct />
                    </UserPrivateRoute>
            },
            {
                path: '/product/:id',
                element: <UserPrivateRoute>
                    <ProductDetails />
                </UserPrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])

export default route