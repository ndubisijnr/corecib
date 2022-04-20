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
// https://cors-anywhere.herokuapp.com


export default {
    callUpdateOrganistionByIdApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient.post("/organisation/update", payload);
    },
    callTransactionEnquiryApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient.post("/organisation/transaction-enquiry", payload);
    },
    callBalanceEnquiryApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient.post("/organisation/balance-enquiry", payload);
    },
    callReadOrganisationByIdApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient.post("/organisation/read-by-id", payload);
    },
    callReadUsersByOrganisationIdApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient.post("/organisation/read-users-by-organisation-id", payload);
    }
};

