import { apiClient} from "./BaseService";

export default {
    callUpdateOrganisationByIdApi(payload) {
        return apiClient.appClient.post("/organisation/update",payload);
    },

    callTransactionEnquiryApi(payload) {
        return apiClient.appClient.post("/organisation/transaction-enquiry",payload);
    },

    callBalanceEnquiryApi(payload) {
        return apiClient.appClient.post("/organisation/balance-enquiry",payload);
    },

    callReadOrganisationByIdApi(payload) {
        return apiClient.appClient.post("/organisation/read-by-id",payload);
    },

    callReadUsersByOrganisationIdApi(payload) {
        return apiClient.appClient.post("/organisation/read-users-by-organisation-id",payload);
    },

    callOrganisationStageApi(payload) {
        return apiClient.appClient.post("/organisation/update/stage",payload);
    },

    callUpdateOrganisationApi(payload) {
        return apiClient.appClient.post("/organisation/update",payload);
    },

};


