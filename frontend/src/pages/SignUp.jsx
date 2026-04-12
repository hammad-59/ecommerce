import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleUser = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!userDetails.username.trim()) {
      newErrors.username = "Username is required";
    } else if (userDetails.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!userDetails.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!userDetails.password) {
      newErrors.password = "Password is required";
    } else if (userDetails.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await dispatch(signUp(userDetails));

    if (signUp.fulfilled.match(res)) {
      setUserDetails({
        username: "",
        email: "",
        password: "",
      });

      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleOnSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleUser}
              className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleUser}
              className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleUser}
              className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 active:scale-95 transition flex items-center justify-center"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default SignUp;