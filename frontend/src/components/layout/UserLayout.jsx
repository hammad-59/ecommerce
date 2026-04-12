import UserNavbar from '../navbar/UserNavbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <UserNavbar/>
      <Outlet/>
    </>
  )
}

export default UserLayout
