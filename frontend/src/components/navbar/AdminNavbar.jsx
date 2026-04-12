import { NavLink } from "react-router-dom"
import { useLogout } from "../Logout"
import Navbar from "../Navbar"


const AdminNavbar = () => {
  const handleLogout = useLogout()
  return (
    <>
    <Navbar>

      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/admin/profile">Profile</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/admin/product">Products</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/admin/createProduct">Create Product</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/admin/brand">Brand</NavLink>
      <NavLink className="bg-red-500 p-3 rounded-2xl hover:bg-red-700" to = "/login" onClick={handleLogout}>Logout</NavLink>
    </Navbar>
    </>
  )
}

export default AdminNavbar
