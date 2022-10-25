import {apiClient} from "./BaseService";

export default {
    callReadPreferenceApi(payload){
        return apiClient.appClient.post('/preference/read', payload)
    },
    callCreatePreferenceApi(payload){
        return apiClient.appClient.post('/preference/create', payload)
    },
    callReadPreferenceByIdApi(payload){
        return apiClient.appClient.post('/preference/read-by-id', payload)
    },
    callReadPreferenceByOrganisationApi(payload){
        return apiClient.appClient.post('/preference/read-by-organisation-id', payload)
    },
    callUpdatePreferenceApi(payload){
        return apiClient.appClient.post('/preference/update', payload)
    },
    callUpdatePreferenceStatusApi(payload){
        return apiClient.appClient.post('/preference/update-status', payload)
    }
}