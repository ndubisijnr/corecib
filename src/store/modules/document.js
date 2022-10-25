import DocumentService from "../../service/DocumentService";
import DocumentRequest from "../../model/request/DocumentRequest";
import DocumentResponse from "../../model/reponse/DocumentResponse";
import Swal from "sweetalert2";
import Toast from "../../../toastNotification";


export const state = {
  loading:false,
  document: DocumentResponse.readByOrganisationId,
  upload1:null,
  upload2:null,
  directorIdCard1: {},
  directorIdCard2: {},
  response: {}
}

export const getters = {
  getDocument: state => {
    return state.document
  }

}

export const mutations = {
  updateLoading: (state, payload) => {
    state.loading = payload
  },
  uploadStateDirectorIdCard1: (state, payload) => {
    state.upload1 = payload
  },
  uploadStateDirectorIdCard2: (state, payload) => {
    state.upload2 = payload
  },
  updateDocument: (state, payload) => {
    state.document = payload
  },
  updateResponse: (state, payload) => {
    state.response = payload
  },
  updateDirectorIdCard1: (state, payload) => {
    state.directorIdCard1 = payload
  },
  updateDirectorIdCard2: (state, payload) => {
    state.directorIdCard2 = payload
  }

}

export const actions = {


  readDocument:({commit,state}, payload = DocumentRequest.readDocument) =>{
    payload.readAll = "YES"
    commit("updateLoading", true)
    return DocumentService.callReadDocumentApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if(responseData.responseCode === "00"){
        commit("updateLoading",false)
        commit("updateDocument", responseData)
      }
    }).catch(error => {
      commit("updateLoading",false)
      Toast.fire({text:error,icon:"error"})
    })
  },

  uploadDocument:({commit, dispatch, state}, payload = DocumentRequest.createDocument) => {
    commit("updateLoading", true)
    return DocumentService.callImageUploadApi(payload).then(response => {
      let responseData = response.data
      if (payload.directorType === 1){
        if(responseData.responseCode == "00"){
          commit("updateLoading", false)
          commit("updateDirectorIdCard1", responseData)
          commit("uploadStateDirectorIdCard1", 'success')
          Toast.fire({text:responseData.responseMessage, icon:"success"})
          }
      }else{
        if(responseData.responseCode == "00"){
          commit("updateLoading", false)
          commit("updateDirectorIdCard2", responseData)
          commit("uploadStateDirectorIdCard2", 'success')
          Toast.fire({text:responseData.responseMessage, icon:"success"})

  }
      }
      if (responseData.responseCode !== "00"){
        commit("updateLoading", false)
        Toast.fire({text:"failed to upload file", icon:"error"})
      }
    }).catch(error => {
      commit("updateLoading", false)
      Toast.fire({text:error, icon:"error"})
    })
  },

  createDocument:({commit, dispatch, state}, payload = DocumentRequest.createDocument) =>{
    commit("updateLoading", true)
    return DocumentService.callImageUploadApi(payload.fileUpload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        payload.document.documentUrl = responseData.url
        DocumentService.callCreateDocumentApi(payload.document).then(response1 => {
          let responseData1 = response1.data
          commit("updateLoading",false)
          if(responseData1.responseCode === "00"){

              DocumentService.callReadDocumentApi({
                readAll:"YES"
              }).then(response2 => {
                let responseData2 = response2.data
                if(responseData2.responseCode === "00"){
                  commit("updateLoading",false)
                  commit("updateDocument", responseData2)
                  Swal.fire({ text:responseData2.responseMessage, icon:'success'}).then(()=>{})
                }
              }).catch(error => {
                commit("updateLoading",false)
                Toast.fire({text:error,icon:"error"})
              })

          }else{
            Toast.fire({ text:responseData1.responseMessage, icon:'error'}).then(()=>{
              commit("updateLoading",false)
            })
          }
        }).catch(error => {
          commit("updateLoading",false)
          Toast.fire({text:error,icon:"error"})
        })

      }
      else commit("updateLoading",false)
    }).catch(error => {
      commit("updateLoading",false)
      Toast.fire({text:error,icon:"error"})
    })
  },

  updateDocument:({commit, dispatch, state}, payload = DocumentRequest.updateDocument) =>{
    commit("updateLoading", true)
    return DocumentService.callImageUploadApi(payload.fileUpload?payload.fileUpload:payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        payload.document.documentUrl = responseData.url
        DocumentService.callUpdateDocumentApi(payload.document).then(response1 => {
          let responseData1 = response1.data
          commit("updateLoading",false)
          if(responseData1.responseCode === "00"){
              DocumentService.callReadDocumentApi({
                readAll:"YES"
              }).then(response2 => {
                let responseData2 = response2.data
                if(responseData2.responseCode === "00"){
                  commit("updateLoading",false)
                  commit("updateDocument", responseData2)
                  Swal.fire({ text:responseData1.responseMessage, icon:'success'}).then(()=>{})
                }
              }).catch(error => {
                commit("updateLoading",false)
                Toast.fire({text:error,icon:"error"})
              })
          }else{
            Swal.fire({ text:responseData1.responseMessage, icon:'error'}).then(()=>{
              commit("updateLoading",false)
            })
          }
        }).catch(error => {
          commit("updateLoading",false)
          Toast.fire({text:error,icon:"error"})
        })

      }
      else commit("updateLoading",false)
    }).catch(error => {
      commit("updateLoading",false)
      Toast.fire({text:error,icon:"error"})
    })
  }
}