import axios from "axios";
import { qgBaseUrl } from "../app.config";
import store from "../store/store";
import Swal from 'sweetalert2'
import router from "../routes/router";

export const apiClient = axios.create({
    baseURL: qgBaseUrl,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

export const apiClient2 = axios.create({
    baseURL: qgBaseUrl,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "*",
    }
});



apiClient.interceptors.request.use(config => {
    const token2 = localStorage.getItem("token")
    config.headers.Authorization = token2;
    config.headers.mid = localStorage.getItem("orginazation");
    return config
})

apiClient.interceptors.response.use(response => {
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
              router.push({name:"Login"})
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
  
