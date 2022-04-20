import { apiClient } from "./BaseService";


export default {
  callReadApiKey(payload){
    return apiClient.post('api-Key/read', payload)
  }
}
