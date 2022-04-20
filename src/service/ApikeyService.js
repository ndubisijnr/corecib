import { apiClient } from "./BaseService";


export default {
  callReadApiKeyOrgansation(payload){
    return apiClient.post('api-key/read-by-organisation-id', payload)
  },
  callGenerateApiKey(payload){
    return apiClient.post('api-key/create', payload)
  }
}
