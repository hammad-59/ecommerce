import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

// 🔁 refresh queue (IMPORTANT)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ App load → refresh token
  useEffect(() => {
    const checkAuth = async () => {
       await new Promise(res => setTimeout(res, 500)); // 50ms delay for cookies
      try {
        const res = await axiosInstance.post(
          "/users/refresh-token"
        );

        setAuth({
          accessToken: res.data.data.accessToken,
          user: res.data.data.userInfo
        });
      } catch (err) {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 2️⃣ REQUEST interceptor → attach access token
  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (auth?.accessToken) {
          config.headers.Authorization =
            `Bearer ${auth.accessToken}`;
        }
        return config;
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
    };
  }, [auth]);

  // 3️⃣ RESPONSE interceptor → auto refresh (QUEUE SAFE)
  useEffect(() => {
    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          if (isRefreshing) {
            // wait in queue
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then((token) => {
              originalRequest.headers.Authorization =
                `Bearer ${token}`;
              return axiosInstance(originalRequest);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const res = await axiosInstance.post(
              "/users/refresh-token"
            );

            const newAccessToken = res.data.data.accessToken;

            setAuth(prev => ({
              ...prev,
              accessToken: newAccessToken,
            }));

            processQueue(null, newAccessToken);

            originalRequest.headers.Authorization =
              `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
          } catch (err) {
            processQueue(err, null);
            setAuth(null);
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
