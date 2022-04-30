import { apiClient} from "./BaseService";

export default {

    callCreateDisputeApi(payload) {
        return apiClient.appClient.post("/dispute/create",payload);
    },

    callReadDisputeApi(payload) {
        return apiClient.appClient.post("/dispute/read",payload);
        
    },

    callReadSingleDisputeApi(payload) {
        return apiClient.appClient.post("/dispute/read-by-id",payload);
    },
    callReadDisputeByOrgApi(payload) {
        return apiClient.appClient.post("/dispute/read-by-organisation-id",payload);
    },

    callUpdateDisputeApi(payload) {
        return apiClient.appClient.post("/dispute/update",payload);
    },

    callTransactionStatusQuerApi(payload){
        return apiClient.appClient.post("/virtual-account/transaction-status-query",payload)
    }

};