import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

// TODO: Prevent users from running any requests (except GET) when subscription expires.

axios.interceptors.request.use(
    config => {
        const token = store.state.User.token || Cookies.get("token");

        if (token) {
            store.dispatch("User/setToken", token);
            config.headers = {
                Authorization: token
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

window.axios = axios;

export default axios;
