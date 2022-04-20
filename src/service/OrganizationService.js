import { apiClient} from "./BaseService";

import axios from "axios";
import { qgBaseUrl } from "../app.config";
import apiClient from "./BaseService";
import apiClient1 from "./BaseService";


export default {

    callUpdateOrganistionByIdApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/organisation/update",payload);
    },

    callTransactionEnquiryApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/organisation/transaction-enquiry",payload);
    },

    callBalanceEnquiryApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/organisation/balance-enquiry",payload);
    },

    callReadOrganisationByIdApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/organisation/read-by-id",payload);
    },

    callReadUsersByOrganisationIdApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient.appClient.post("/organisation/read-users-by-organisation-id",payload);
    },

};


