import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { logginUser } from '../store/reducers/userSlice';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
      const {name, value} = e.target
      setForm((prev) => (
        {
          ...prev, [name]: value
        }
      ))
  }

  const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);


  try {
    const resultAction = await dispatch(logginUser(form));

    if (logginUser.fulfilled.match(resultAction)) {
      const data = resultAction.payload.data;

      setAuth({
        accessToken: data.accessToken,
        user: data.user,
      });
      // console.log("this", data);

      if (data.user.role === "admin") {
          navigate("/admin")
      }else if(data.user.role === "user"){
        navigate("/user")
      }else{
        navigate("/")
      }

    } else {
      throw new Error("Login failed");
    }

  } catch (err) {
    setError("Login failed. Please check your credentials.");
    console.log(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg md:mt-3 mb-10 ">

    <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
      Welcome Back
    </h2>
    <p className="text-center text-gray-500 mb-6">
      Login to continue
    </p>

    {error && <p className="text-red-500 mb-4">{error}</p>}

    <form className="space-y-5">

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleOnChange}
          className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          name= "password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleOnChange}
          className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 active:scale-95 transition"
      >
        Login
      </button>

    </form>
  </div>
</div>
  );
};

export default Login;
