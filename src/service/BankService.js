import { apiClient, apiClient3 } from "./BaseService";


export default {
    callImageUploadBankAPI(payload) {
        return apiClient3.post("uploadimage2s3", payload);

    },
    callBankUpdateLogoAPI(payload) {
        return apiClient.post("bankUpdateLogo", payload);

    },




};