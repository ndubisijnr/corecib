import axios from "axios";
import StoreUtils from "../util/baseUtils/StoreUtils";

export let isTimedOut = false

export const appClient = axios.create({
    baseURL: window.__env.api.baseUrl,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});
export const appClient1 = axios.create({
    baseURL: window.__env.api.imageUpload,
    withCredentials: false,
    headers: {
         //Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


appClient.interceptors.request.use(config => {
    config.headers.Authorization = StoreUtils.rootGetters(StoreUtils.getters.auth.getUserToken)
        ? StoreUtils.rootGetters(StoreUtils.getters.auth.getUserToken)
        : StoreUtils.rootGetters(StoreUtils.getters.auth.getToken);
        // console.log(config.headers.Authorization)
    !localStorage.organisationId ?
    config.headers.mid = localStorage.customerId
    :
    config.headers.mid = localStorage.organisationId
    return config
})


export const apiClient = {
    appClient: appClient,
    appClient1: appClient1
}
  
