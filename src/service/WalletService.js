import { apiClient } from "./BaseService";

export default {
    callReadAllTransactions(payload){
      return apiClient.post('wallet/read-all-transaction', payload)
    },
    callBalanceEnquiry(payload){
      return apiClient.post('wallet/balance-enquiry', payload)
    },
    callReadWallet(payload){
      return apiClient.post('wallet/read', payload)
    },
    callWalletRetrieve(payload){
      return apiClient.post('wallet/retrieve', payload)
    },
    callReadWalletTrans(payload){
      return apiClient.post('wallet/read-wallet-transaction', payload)
    },
  }