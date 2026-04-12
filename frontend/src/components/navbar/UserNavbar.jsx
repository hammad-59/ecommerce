
import { useLogout } from "../Logout";
import Navbar from "../Navbar"
import { NavLink } from 'react-router-dom';


const UserNavbar = () => {
    const handleLogout = useLogout()
    return (
    <>
        <Navbar>
            <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/user/profile">Profile</NavLink>
            <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/user/product">Products</NavLink>
             <NavLink className="bg-red-500 p-3 rounded-2xl hover:bg-red-700" to = "/login" onClick={handleLogout}>Logout</NavLink>
        </Navbar>

    </>
  )
}

export default UserNavbar
