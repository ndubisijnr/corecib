import { apiClient } from "./BaseService";


export default {
  callImageUploadApi(payload){
    return apiClient.appClient1.post('/uploadimage2s3', payload)
  },
  callCreateDocumentApi(payload){
    return apiClient.appClient.post('document/create', payload)
  },
  callReadDocumentApi(payload){
    return apiClient.appClient.post('document/read', payload)
  },
  callUpdateDocumentApi(payload){
    return apiClient.appClient.post('document/update', payload)
  }
}
