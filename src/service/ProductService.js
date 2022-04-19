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
    //console.log(token);
    //console.log(tok)
    // console.log("INTERCEPTOR TOKEN", token)
    // console.log("INTERCEPTOR  TOK ==>", tok)
    //config.headers.Authorization = (token == null) ? tok : token;
    config.headers.Authorization = (token == null) ? tok : token;
    return config
})

export default {
    callProductReadAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readProduct", payload);
    },
    callGLLevel2ReadAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("glLevel2Read", payload);
    },
    callReadProductAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readProduct", payload);
    },
    callReadProductTemplateAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readProductTemplate", payload);
    },
    callReadProductFormAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readProductForm", payload);
    },
    callCreateProductAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("createProduct", payload);
    },
    callUpdateProductAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("updateProduct", payload);
    },
    callCreateAccountingEntryAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("createAccountingEntry", payload);
    },
    callReadAccountingEntryAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readAccountingEntry", payload);
    },
    callReadSlabsAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readSlabs", payload);
    },
    callReadSingleSlabAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readSingleSlab", payload);
    },
    callReadSingleAccountingEntryAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readSingleAccountingEntry", payload);
    },
    callSubmitEntriesAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("submitEntries", payload);
    },


};