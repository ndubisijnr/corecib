import axios from "axios";
import { qgBaseUrl, imageUpload } from "../app.config";
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

const apiClient3 = axios.create({
    baseURL: imageUpload,
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
    //console.log(token);
    //console.log(tok)
    // console.log("INTERCEPTOR TOKEN", token)
    // console.log("INTERCEPTOR  TOK ==>", tok)
    //config.headers.Authorization = (token == null) ? tok : token;
    config.headers.Authorization = token;
    return config
})

export default {
    callCustomerReadAPI(payload) {
        return apiClient.post("customerRead", payload);
    },
    callCustomerReadSingleAPI(payload) {
        return apiClient.post("customerReadSingle", payload);
    },
    callCustomerCreateAPI(payload) {
        return apiClient.post("customerCreate", payload);

    },
    callCustomerUpdateAPI(payload) {
        return apiClient.post("customerUpdate", payload);

    },
    callImageUploadAPI(payload) {
        return apiClient3.post("uploadimage2s3", payload);

    },
    callCustomerCheckerAPI(payload) {
        return apiClient.post("customerChecker", payload);

    },
    callUploadCustomersAPI(payload) {
        return apiClient.post("uploadCustomers", payload);

    },



};