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
    callEodReadApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("eodRead", payload);
    },
    callEodReadSingleApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("eodReadSingle", payload);
    },
    callEodCreateApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("eodCreate", payload);
    },

    callEomReadApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("eomRead", payload);
    },
    callEomReadSingleApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("eomReadSingle", payload);
    },
    callEomCreateApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("eomCreate", payload);
    },
    callReportCheckerApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("reportChecker", payload);
    },
    callReportReadApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("reportRead", payload);
    },
    callReportReadColumnApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("reportReadColumn", payload);
    },
    callReportReadSingleApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("reportReadSingle", payload);
    },
    callReadTablesApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readTables", payload);
    },
    callReadDepartmentsApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readDepartments", payload);
    },
    callReportCreateApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("reportCreate", payload);
    },






};