import { apiClient } from "./BaseService";

export default {
    callVirtualAccountRead(payload){
      return apiClient.post('virtual-account/read', payload)
  
    },

  }