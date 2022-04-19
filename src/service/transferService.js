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
    callBalanceEnquiryApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("balanceEnquiry", payload);
    },
    callBankListApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("bankList", payload);
    },
    callReadProductApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("readProduct", payload);
    },
    callFundTransferApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("fundTransfer", payload);
    },
    callNameEnquiryApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("nameEnquiry", payload);
    },
    callFundTransferCheckerApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("fundTransferChecker", payload);
    },
    callCashTransactionApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("cashTransaction", payload);
    },
    callCashWithdrawalCheckerApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("cashWithdrawalChecker", payload);
    },
    callCashDepositCheckerApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("cashDepositChecker", payload);
    },
    callCashTransactionCheckerApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("cashTransactionChecker", payload);
    },

};