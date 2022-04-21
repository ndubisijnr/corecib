import {apiClient} from "./BaseService";

export default {

    callCreateVirtualAccountApi(payload) {
        return apiClient.appClient.post("/virtual-account/create",payload);
    },

    callRetrieveVirtualAccountApi(payload) {
        return apiClient.appClient.post("/virtual-account/retrieve",payload);
    },

    callReadVirtualAccountApi(payload) {
        return apiClient.appClient.post("/virtual-account/read",payload);
    },

    callReadVirtualAccountTransactionListApi(payload) {
        return apiClient.appClient.post("/virtual-account/transaction-list",payload);
    },

    callGetChannelCodesApi(payload) {
        return apiClient.appClient.post("/virtual-account/channel-codes",payload);
    },

};
