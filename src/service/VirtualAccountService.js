import apiClient from "./BaseService";
import apiClient1 from "./BaseService";

export default {

    callCreateVirtualAccountApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/virtual-account/create",payload);
    },

    callRetrieveVirtualAccountApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/virtual-account/retrieve",payload);
    },

    callReadVirtualAccountApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/virtual-account/read",payload);
    },

    callReadVirtualAccountTransactionListApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient1.appClient.post("/virtual-account/transaction-list",payload);
    },

    callGetChannelCodesApi(payload) {
        // console.log("Service Payload ==>>", payload)
        payload.orgId = localStorage.orgID;
        if (localStorage._countryId != null)
            payload.countryId = localStorage._countryId;
        return apiClient.appClient.post("/virtual-account/channel-codes",payload);
    },

};
