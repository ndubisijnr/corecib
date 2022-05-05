import {apiClient} from "./BaseService";

export default {

    callWalletCreateApi(payload) {
        return apiClient.appClient.post("/wallet/create", payload);
    },

    callBalanceEnquiryApi(payload) {
        return apiClient.appClient.post("/wallet/balance-enquiry", payload);
    },

    callRetrieveWalletApi(payload) {
        return apiClient.appClient.post("/wallet/retrieve", payload);
    },

    callReadWalletApi(payload) {
        return apiClient.appClient.post("/wallet/read", payload);
    },

    callReadWalletTransactionApi(payload) {
        return apiClient.appClient.post("/wallet/read-wallet-transaction", payload);
    },

    callReadAllWalletTransactionApi(payload) {
        return apiClient.appClient.post("/wallet/read-all-transaction", payload);
    },
    callReadAllWalletandRefferalStatsApi(payload) {
        return apiClient.appClient.post("organisation/read-balances", payload);
    },
};
