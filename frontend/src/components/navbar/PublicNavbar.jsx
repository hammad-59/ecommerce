
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
const PublicNavbar = () => {

  return (
    <>
    <Navbar>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/">Home</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/product">Products</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/contact">Contact</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/signup">Sign up</NavLink>
      <NavLink className={({isActive}) => isActive ? "border-b-2 pb-1 border-white" : "transition-all duration-80 pb-1 hover:border-b-2 hover:opacity-100 hover:translate"} to = "/login">Login</NavLink>
    </Navbar>
   </>
  )
}

export default PublicNavbar
