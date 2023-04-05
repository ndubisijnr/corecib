import {apiClient} from "./BaseService";

export default {

    callReadTransactionsApi(payload) {
        return apiClient.appClient.post("/transaction/read-by-organisation-id",payload);
    },


};
