import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBrand from "./pages/Admin/CreateBrand";
import CreateProduct from "./pages/Admin/CreateProduct";
import ProductList from "./pages/Admin/ProductList";
import AdminLayout from "./components/layout/AdminLayout";
import SingleProduct from "./pages/Admin/SingleProduct";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Users/Profile";
import PublicLayout from "./components/layout/PublicLayout";
import About from "./pages/About";
import ViewProduct from "./pages/ViewProduct"
import UserLayout from "./components/layout/UserLayout";
import Contact from "./components/Contact";
import Cart from "./pages/Users/Cart";
import Checkout from "./pages/Users/Checkout";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import AllOrders from "./pages/Admin/AllOrders";
import UserOrders from "./pages/Users/UserOrders";


const stripePromise = loadStripe("pk_test_51TUVvLDMrNUSHmhmqFD0awzPI12ZzQEIlE6qTPO86QPO3YLDmgT87MggT1XR4yD5VEoxLS02Sy3mCovBOgqgSCBF00v8OaKFXZ")

function App() {

  const router = createBrowserRouter([
    
    // 🔓 Public Routes
    {
      path: "/",
      element: <PublicLayout/>,
      children: [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/product",
      element: <ProductList/>
    },
    {
      path: "/contact",
      element: <Contact/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
      path: "singleProduct/:id",
      element: <ViewProduct/>
    },
      ]
    },


    //User Routes

    {
      path: "/user",
      element:(
        <ProtectedRoute role = "user">
          <UserLayout/>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="profile" replace />
        },
        {
           path: "profile",
          element: <Profile/>
        },
        {
          path: "product",
          element: <ProductList />
        },
         {
          path: "singleProduct/:id",
          element: <ViewProduct/>
        },
         {
          path: "cart",
          element: <Cart/>
        },
         {
          path: "checkout",
          element:(
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          )
        },
        {
          path: "userOrders",
          element: <UserOrders/>
        },
      ]
    },

    // 🔐 Admin Routes
    {
      path: "/admin",
      element: (
        <ProtectedRoute role = "admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="profile" replace />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "brand",
          element: <CreateBrand />
        },
        {
          path: "createProduct",
          element: <CreateProduct />
        },
        {
          path: "product",
          element: <ProductList />
        },
        {
          path: "singleProduct/:id",
          element: <SingleProduct />
        },
        {
          path: "allorders",
          element: <AllOrders />
        },
    
      ]
    },
  ])

  return <RouterProvider router={router} />
}

export default App;