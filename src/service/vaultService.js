import axios from "axios";
import { qgBaseUrl } from "../app.config";
import store from "../store/store";
// import store from "@/store/store";

const apiClient = axios.create({
    baseURL: qgBaseUrl,
    withCredentials: false,
    headers: {
        //Accept: "application/json",
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

const apiClient2 = axios.create({
    baseURL: qgBaseUrl,
    withCredentials: false,
    headers: {
        //Accept: "application/json",
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
    }
});
// https://cors-anywhere.herokuapp.com


apiClient.interceptors.request.use(config => {
    // console.log("Axios Interceptor Config ==>", config);
    const token = store.getters.getToken;
    const tok = store.getters.getUserToken; //["auth/getUserToken"];
    //console.log(token);
    console.log("////////////////////");
    // console.log(token);
    // console.log(tok)
    // console.log("INTERCEPTOR TOKEN", token)
    // console.log("INTERCEPTOR  TOK ==>", tok)
    //config.headers.Authorization = (token == null) ? tok : token;
    config.headers.Authorization = token;
    return config
})

export default {
    callVaultCreateApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("vaultCreate", payload);
    },
    callVaultReadApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("vaultRead", payload);
    },
    callVaultCheckerApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("vaultChecker", payload);
    },

};