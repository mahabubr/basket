import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AddProduct from "../pages/AddProduct/AddProduct";
import Cart from "../pages/Cart/Cart";
import CheckOut from "../pages/CheckOut/CheckOut";
import CheckOutAll from "../pages/Home/CheckOutAll/CheckOutAll";
import HomeLayout from "../pages/Home/HomeLayout";
import ProductDetails from "../pages/Home/Products/ProductDetails/ProductDetails";
import Login from "../pages/LoginAndSignUp/Login";
import SignUp from "../pages/LoginAndSignUp/SignUp";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import Wishlist from "../pages/Wishlist/Wishlist";
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
            },
            {
                path: '/cart',
                element: <UserPrivateRoute>
                    <Cart />
                </UserPrivateRoute>
            },
            {
                path: '/wishlist',
                element: <UserPrivateRoute>
                    <Wishlist />
                </UserPrivateRoute>
            },
            {
                path: '/checkout/:id',
                element: <UserPrivateRoute>
                    <CheckOut />
                </UserPrivateRoute>
            },
            {
                path: '/checkout-all',
                element: <UserPrivateRoute>
                    <CheckOutAll />
                </UserPrivateRoute>
            },
            {
                path: '/order-history',
                element: <UserPrivateRoute>
                    <OrderHistory />
                </UserPrivateRoute>
            },
            {
                path: '/order-details',
                element: <UserPrivateRoute>
                    <OrderDetails />
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