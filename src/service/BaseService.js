import axios from "axios";
import Swal from 'sweetalert2'
import router from "../router";
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
        // "Access-Control-Allow-Origin": "*",
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

appClient.interceptors.response.use(response => {
    if (response != null) {
      if (response.data != null) {
        if (response.data.responseCode === '115') {
            // localStorage.clear();
            // let timerInterval
          if (router.currentRoute.meta.layout !== "auth"){
              isTimedOut = true
              localStorage.clear()
              StoreUtils.dispatch(StoreUtils.actions.auth.logOut,{customerEmail: StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).customerEmail}).then()
              // Swal.fire({
              //   title: 'Session timed out',
              //   html: 'Please re-authenticate',
              //   icon:"info",
              // })
              //     .then((result) => {
              // })
        }
        }
      }
    }
    return response
});

export const apiClient = {
    appClient: appClient,
    appClient1: appClient1
}
  
