import { apiClient} from "./BaseService";

export default {
    callCorporateAffairsEndPoint(payload){
        return apiClient.appClient.post('/kyc/cac',payload)
    },

    callTaxIdentificationEndPoint(payload){
        return apiClient.appClient.post('/kyc/tin', payload)
    },

    callBvnVerificationEndPoint(payload){
        return apiClient.appClient.post('/kyc/bvn', payload)
    },

    callNationalIdentityEndPoint(payload){
        return apiClient.appClient.post('/kyc/nin', payload)
    },

    callVoterCardVerificationEndPoint(payload){
        return apiClient.appClient.post('/kyc/voters-card', payload)
    },
    callDriverLicenceEndPoint(payload){
        return apiClient.appClient.post('/kyc/drivers-license', payload)
    },
}