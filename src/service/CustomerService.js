import { apiClient } from "./BaseService";


export default {
  callCreateCustomerApi(payload){
    return apiClient.appClient.post('customer/create', payload)
  },
  callInviteCustomerApi(payload){
    return apiClient.appClient.post('customer/invite', payload)
  },
  callValidateLinkApi(payload){
    return apiClient.appClient.post('customer/validate-invite', payload)
  },
  callUpdateCustomerApi(payload){
    return apiClient.appClient.post('customer/update-status', payload)
  }
}
