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

    callRefferalStatsApi(payload){
        return apiClient.appClient.post('/organisation/referral-stats', payload)
    },
    callReadOrganisationByUserIdApi(payload){
        return apiClient.appClient.post('/organisation/read-organisations-by-user-id', payload)
    },
    callAddOrganisationApi(payload){
        return apiClient.appClient.post('/organisation/add', payload)
    },
    callInviteCustomerApi(payload) {
        return apiClient.appClient.post("/customer/invite", payload);
    },
    callReadRolesApi(payload) {
        return apiClient.appClient.post("/role/read", payload);
    },
    callReadInvite(payload) {
        return apiClient.appClient.post("/customer/read-invite-by-organisation-id", payload);
    },
    callUpdateOrganisationUserApi(payload) {
        return apiClient.appClient.post("/customer/update-status", payload);
    },

};


