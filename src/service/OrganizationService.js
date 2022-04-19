import { apiClient} from "./BaseService";



export default {
  callReadOrganisationByIdApi(payload){
    return apiClient.post('/organisation/read-by-id', payload)
  }
}
