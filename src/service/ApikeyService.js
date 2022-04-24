import { apiClient } from "./BaseService";


export default {
  callReadApiKeyOrgansation(payload){
    return apiClient.appClient.post('api-key/read-by-organisation-id', payload)
  },
  callGenerateApiKey(payload){
    return apiClient.appClient.post('api-key/create', payload)
  },
  callRegenerateApiKey(payload){
    return apiClient.appClient.post('api-key/create', payload)
  },
  callUpdateWebhookCallback(payload){
    return apiClient.appClient.post('api-key/update-webhook-callback', payload)
  }
}
