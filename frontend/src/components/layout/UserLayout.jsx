import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCart } from "../../store/reducers/cartSlice"
import UserNavbar from "../navbar/UserNavbar"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  )
}

export default UserLayout