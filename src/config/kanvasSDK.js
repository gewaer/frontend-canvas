import KanvasSDK from "client-sdk";
import store from "@/store";

const kanvasSDK = new KanvasSDK({
    appKey: process.env.VUE_APPKEY,
    endpoint: process.env.VUE_APP_BASE_API_URL,
    domain: process.env.VUE_APP_DOMAIN,
    cookies: true
})

kanvasSDK.auth.on("loggedIn", (token) => {
    store.dispatch("User/setToken", token);
})

kanvasSDK.auth.on("loggedOut", () => {
    store.dispatch("User/setToken", null);
})

window.kanvasSDK = kanvasSDK;

export default kanvasSDK;

