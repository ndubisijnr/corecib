import axios from "axios";
import Swal from 'sweetalert2'
import router from "../router";
import StoreUtils from "../util/baseUtils/StoreUtils";

export const appClient = axios.create({
    baseURL: window.__env.api.baseUrl,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

appClient.interceptors.request.use(config => {
    config.headers.Authorization = StoreUtils.rootGetters(StoreUtils.getters.auth.getUserToken)
        ? StoreUtils.rootGetters(StoreUtils.getters.auth.getUserToken)
        : StoreUtils.rootGetters(StoreUtils.getters.auth.getToken);
    // console.log(config.headers.Authorization)
    config.headers.mid = localStorage.organisationId;
    return config
})

appClient.interceptors.response.use(response => {
    if (response != null) {
      if (response.data != null) {
        if (response.data.responseCode === '115') {
          localStorage.clear();
          let timerInterval
          Swal.fire({
            title: 'Session timed out',
            html: 'Please re-authenticate',
            icon:"info",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
              router.push({name:"Logon"})
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
        }
      }
    }
    return response
});

export const apiClient = {
    appClient: appClient
}
  
