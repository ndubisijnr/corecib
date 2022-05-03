import { apiClient} from "./BaseService";

export default {
    callreadAddedBanksApi(payload) {
        return apiClient.appClient.post("/account-payout/read-by-organisation-id",payload);
    },

    callcreateAddedBanksApi(payload) {
        return apiClient.appClient.post("/account-payout/create",payload);
    },

    calleditAddedBanksApi(payload) {
        return apiClient.appClient.post("/account-payout/update",payload);
    },

    callPayoutApi(payload) {
        return apiClient.appClient.post("/payout/create",payload)
    },
    callReadPayoutApi(payload) {
        return apiClient.appClient.post("/payout/read",payload)
    }


};


