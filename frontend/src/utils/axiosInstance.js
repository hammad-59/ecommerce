// utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "/axiosInstance/v1",
//   withCredentials: true,
// });

// export default axiosInstance;







import axios from "axios"
import store from "../store/store";
import { setAccessToken, logout } from "../store/reducers/userSlice";

 const axiosInstance = axios.create({
    baseURL: "/api/v1",
    withCredentials: true
})




axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().users.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);




axiosInstance.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const res = await axiosInstance.post("/users/refresh-token");

                const accessToken = res.data.data.accessToken;
                console.log(accessToken);
                console.log(originalRequest);
                

                store.dispatch(setAccessToken(accessToken));

                originalRequest.headers.Authorization =
                    `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);

            } catch (err) {

                store.dispatch(logout());
                window.location.href = "/"
                return Promise.reject(err);
            }

        }

        return Promise.reject(error);

    }
);


export default axiosInstance