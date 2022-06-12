import {apiClient} from "./BaseService";

export default {
    callReadCategoriesApi(payload) {
        return apiClient.appClient.post("/vas/category/read", payload);
    },
    callReadBillersApi(payload) {
        return apiClient.appClient.post("/vas/biller/read-by-category-code", payload);
    },
    callReadProductApi(payload){
        return apiClient.appClient.post("/vas/product/read-by-biller-code", payload)
    },
    callProductPaymentApi(payload){
        return apiClient.appClient.post("/vas/service/purchase", payload)
    },



};

