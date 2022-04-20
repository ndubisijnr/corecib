import { apiClient} from "./BaseService";

import axios from "axios";
import { qgBaseUrl } from "../app.config";
import store from "../store/store";

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

export default {
    callCreateDisputeApi(payload){
      return apiClient.post('/dispute/create', payload)
  
    },
    callReadDisputeApi(payload){
      return apiClient.post('/dispute/read', payload)

    },
    callReadSingleDisputeApi(payload){
      return apiClient.post('/dispute/read-by-id', payload)

    },
    callUpdateDisputeApi(payload){
      return apiClient.post('/dispute/update', payload)
  
    }

  }
  