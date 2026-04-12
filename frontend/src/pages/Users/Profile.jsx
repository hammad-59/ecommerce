import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentUser,
  updateAccountDetails,
  changePassword
} from '../../store/reducers/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.users);

  const [profileForm, setProfileForm] = useState({
    username: '',
    email: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Profile Validation
  const validateProfile = () => {
    let newErrors = {};

    if (!profileForm.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!profileForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Password Validation
  const validatePassword = () => {
    let newErrors = {};

    if (!passwordForm.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (!validateProfile()) return;

    dispatch(updateAccountDetails(profileForm));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    dispatch(changePassword(passwordForm));

    setPasswordForm({
      oldPassword: '',
      newPassword: ''
    });
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">

      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">

          <h2 className="text-xl font-semibold">Update Profile</h2>

          <form onSubmit={handleProfileSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={profileForm.username}
                onChange={handleProfileChange}
                className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>

          </form>
        </div>

        {/* Password Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-5">

          <h2 className="text-xl font-semibold">Change Password</h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">{errors.oldPassword}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full mt-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Change Password
            </button>

          </form>
        </div>

      </div>

      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

    </div>
  );
};

export default Profile;