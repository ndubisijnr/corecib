import ApikeyService from "../../service/ApikeyService";
import ApiKeyRequest from "../../model/request/ApiKeyRequest"
import ApiKeyReponse from "../../model/reponse/ApiKeyResponse";
import Swal from "sweetalert2";


export const state = {
  loading:false,
  apiKey: ApiKeyReponse.readByOrganisationId
}

export const getters = {
  UserToken: state => {
    // console.log("getter getTok")
    return localStorage.getItem('token')
  },


}

export const mutations = {
  updateLoading: (state, payload) => {
    state.token = payload
  },
  updateApikey: (state, payload) => {
    state.apiKey = payload
  }

}

export const actions = {

  updateApikey:({commit, dispatch, state}, payload = ApiKeyRequest.readApiKey) =>{
    if(state.apiKey.responseCode != "00") commit("updateLoading", true)
    return ApikeyService.callReadApiKeyOrgansation(payload).then(response => {
      let responseData = response.data
      commit("updateLoading",false)
      if(responseData.responseCode === "00"){
        commit("updateReadApikey", responseData)
      }
    })
      .catch(error => {
        console.log(error)
      })
  },

  create:({commit, dispatch, state}, payload = ApiKeyRequest.generateApiKey) =>{
    commit("updateLoading", true)
    return ApikeyService.callGenerateApiKey(payload).then(response => {
      let responseData = response.data
      commit("updateLoading",false)
      if(responseData.responseCode === "00"){
        Swal.fire({icon:'success'})
      }
    })
      .catch(error => {
        console.log(error)
      })
  },

}


export default {
  state,
  actions,
  mutations,
  getters
};

