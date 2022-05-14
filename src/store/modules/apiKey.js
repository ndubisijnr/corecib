import ApikeyService from "../../service/ApikeyService";
import ApiKeyRequest from "../../model/request/ApiKeyRequest"
import ApiKeyReponse from "../../model/reponse/ApiKeyResponse";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const state = {
  loading:false,
  apiKey: ApiKeyReponse.readByOrganisationId
}

export const mutations = {
  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateApikey: (state, payload) => {
    state.apiKey = payload
  }

}

export const actions = {

  updateApikey:({commit,state}, payload = ApiKeyRequest.readApiKey) =>{
    if(state.apiKey.responseCode !== "00") commit("updateLoading", true)
    return ApikeyService.callReadApiKeyOrgansation(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateLoading",false)
        commit("updateApikey", responseData)
      }
    }).catch(error => {
        console.log(error)
      })
  },

  create:({commit, dispatch, state}, payload = ApiKeyRequest.generateApiKey) =>{
    commit("updateLoading", true)
    return ApikeyService.callGenerateApiKey(payload).then(response => {
      let responseData = response.data
      commit("updateLoading",false)
      if(responseData.responseCode === "00"){
        Toast.fire({text:responseData.responseMessage, icon:'success'})
      }else{
        Toast.fire({text:responseData.responseMessage, icon:'error'})
      }
    }).catch(error => {
        console.log(error)
      })
  },
  regenerateApiKey:({commit, dispatch, state}, payload = ApiKeyRequest.regenerateApiKey) =>{
    console.log("REGENERATE APIKEY")
    commit("updateLoading", true)
    return ApikeyService.callRegenerateApiKey(payload).then(response => {
      let responseData = response.data
      commit("updateLoading",false)
      if(responseData.responseCode === "00"){
        Toast.fire({ text:responseData.responseMessage, icon:'success'}).then(()=>{
          ApikeyService.callReadApiKeyOrgansation({
            apikeyOrganisationId:payload.organisationId
          }).then(response1 => {
            let responseData1 = response1.data
            if(responseData1.responseCode === "00"){
              commit("updateLoading",false)
              commit("updateApikey", responseData1)
            }
          }).catch(error => {
            console.log(error)
          })
        })
      }else{
        Toast.fire({ text:responseData.responseMessage, icon:'error'}).then(()=>{})
      }
    }).catch(error => {
        console.log(error)
      })
  },
  updateWebhookCallback:({commit, dispatch, state}, payload = ApiKeyRequest.updateWebHook) =>{
  commit("updateLoading", true)
  return ApikeyService.callUpdateWebhookCallback(payload).then(response => {
    let responseData = response.data
    commit("updateLoading",false)
    if(responseData.responseCode === "00"){
      Toast.fire({ text:responseData.responseMessage, icon:'success'}).then(()=>{})
    }else{
      Toast.fire({ text:responseData.responseMessage, icon:'error'}).then(()=>{})
    }
  }).catch(error => {
    console.log(error)
  })
},

}