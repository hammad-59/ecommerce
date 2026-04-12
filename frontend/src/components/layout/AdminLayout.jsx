import { Outlet } from "react-router-dom"
import AdminNavbar from "../navbar/AdminNavbar"

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar/>
      <Outlet/>
    </>
  )
}

export default AdminLayout
