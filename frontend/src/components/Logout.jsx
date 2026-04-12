import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { logoutUser } from "../store/reducers/userSlice"

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap()
    setAuth(null)
    navigate("/login")
  }

  return handleLogout
}