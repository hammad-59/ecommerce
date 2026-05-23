
import { useSelector } from "react-redux";
import { useLogout } from "../Logout";
import Navbar from "../Navbar"
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { IoCartSharp } from "react-icons/io5";

const UserNavbar = () => {
    const handleLogout = useLogout()
   const { totalLength } = useSelector((state) => state.carts);

    return (
    <>
        <Navbar>
            <NavLink className={({isActive}) => isActive ? "border-b-2 pb-2 border-white" : "transition-all duration-80 pb-2 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/user/profile">Profile</NavLink>
            <NavLink className={({isActive}) => isActive ? "border-b-2 pb-2 border-white" : "transition-all duration-80 pb-2 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/user/product">Products</NavLink>


            <NavLink className={({isActive}) => isActive ? "border-b-2 pb-2 border-white" : "transition-all duration-80 pb-2 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/user/userOrders">Orders</NavLink>

            <NavLink className={({isActive}) => isActive ? "border-b-2 pb-2 border-white" : "transition-all duration-80 pb-2 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/user/cart"><div className="flex justify-center items-center gap-2 bg-black text-white px-2 py-1 rounded-md"><p className="text-2xl"><IoCartSharp/></p> <span>{totalLength || 0}</span></div></NavLink>
             <NavLink className="bg-red-500 p-3 rounded-2xl hover:bg-red-700" to = "/login" onClick={handleLogout}>Logout</NavLink>
        </Navbar>

    </>
  )
}

export default UserNavbar
