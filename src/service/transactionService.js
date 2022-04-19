import { apiClient } from "./BaseService";

export default {
    callQueryTransactionApi(payload){
      return apiClient.post('virtual-account/transaction-status-query', payload)
  
    },

  }