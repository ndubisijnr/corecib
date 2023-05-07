import { apiClient } from "./BaseService";


export default {
    callReadBankList(payload){
        return apiClient.appClient.post('/transaction/bank-list', payload)
    },
    callNameEnquiry(payload){
        return apiClient.appClient.post('/transaction/name-enquiry', payload)
    },
    callPostSingleTransaction(payload){
        return apiClient.appClient.post('/transaction/post-single-transaction', payload)
    },
    callFundTransfer(payload){
        return apiClient.appClient.post('/transaction/fund-transfer', payload)
    },
    calReadTransactions(payload){
        return apiClient.appClient.post('/transaction/read', payload)
    },
    callTransactionStatusQuery(payload){
        return apiClient.appClient.post('/transaction/transaction-status-query', payload)
    }
}
