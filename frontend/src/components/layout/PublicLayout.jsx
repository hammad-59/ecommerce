import { Outlet } from "react-router-dom"
import PublicNavbar from "../navbar/PublicNavbar"



const PublicLayout = () => {
  return (
    <>
      <PublicNavbar/>
      <Outlet/>
    </>
  )
}

export default PublicLayout
