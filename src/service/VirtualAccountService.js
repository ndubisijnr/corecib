import {apiClient} from "./BaseService";

export default {

    callCreateVirtualAccountApi(payload) {
        return apiClient.appClient.post("/virtual-account/create",payload);
    },

    callRetrieveVirtualAccountApi(payload) {
        return apiClient.appClient.post("/virtual-account/retrieve",payload);
    },

    callReadVirtualAccountApi(payload) {
        return apiClient.appClient.post("/virtual-account/read-by-organisation-id",payload);
    },

    callReadVirtualAccountTransactionApi(payload) {
        return apiClient.appClient.post("/virtual-account/read-transaction",payload);
    },

    callGetChannelCodesApi(payload) {
        return apiClient.appClient.post("/virtual-account/channel-codes",payload);
    },


    callReadBankList(payload){
        return apiClient.appClient.post("/transaction/bank-list",payload)
    },

    callUpdateVirtualAccount(payload){
        return apiClient.appClient.post("/virtual-account/update",payload)
    }


};
