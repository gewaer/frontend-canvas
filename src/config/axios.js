import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

axios.interceptors.request.use(
    config => {
        if (store.state.User.token) {
            config.headers = {
                Authorization: store.state.User.token.token
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

window.axios = axios;

export default axios;
