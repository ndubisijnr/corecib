import { apiClient } from "./BaseService";

export default {
    callReadDisputeApi(payload){
      return apiClient.post('dispute/read', payload)
  
    },
    callCreateDisputeApi(payload){
      return apiClient.post('dispute/create', payload)
  
    }

  }
  