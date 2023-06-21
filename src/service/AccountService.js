import { apiClient} from "./BaseService";

export default {
    callCreateAccount(payload) {
        return apiClient.appClient.post("/account/create",payload);
    },

    callReadAccount(payload){
        return apiClient.appClient.post("/account/read-by-business-account", payload);
    }

};
