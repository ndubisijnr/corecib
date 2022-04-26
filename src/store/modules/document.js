import DocumentService from "../../service/DocumentService";
import DocumentRequest from "../../model/request/DocumentRequest";
import DocumentResponse from "../../model/reponse/DocumentResponse";
import Swal from "sweetalert2";


export const state = {
  loading:false,
  document: DocumentResponse.readByOrganisationId
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
  updateDocument: (state, payload) => {
    state.document = payload
  }

}

export const actions = {


  readDocument:({commit,state}, payload = DocumentRequest.readDocument) =>{
    commit("updateLoading", true)
    return DocumentService.callReadDocumentApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if(responseData.responseCode === "00"){
        commit("updateLoading",false)
        console.log("Documents ....")
        commit("updateDocument", responseData)
      }
    }).catch(error => {
      console.log(error)
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
            Swal.fire({ text:responseData1.responseMessage, icon:'success'}).then(()=>{
              DocumentService.callReadDocumentApi({
                readAll:"YES"
              }).then(response2 => {
                let responseData2 = response2.data
                if(responseData2.responseCode === "00"){
                  commit("updateLoading",false)
                  commit("updateDocument", responseData2)
                }
              }).catch(error => {
                console.log(error)
              })
            })
          }else{
            Swal.fire({ text:responseData.responseMessage, icon:'error'}).then(()=>{
              commit("updateLoading",false)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      }
      else commit("updateLoading",false)
    }).catch(error => {
      console.log(error)
    })
  },
  updateDocument:({commit, dispatch, state}, payload = DocumentRequest.updateDocument) =>{
    commit("updateLoading", true)
    return DocumentService.callImageUploadApi(payload.fileUpload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        payload.document.documentUrl = responseData.url
        DocumentService.callUpdateDocumentApi(payload.document).then(response1 => {
          let responseData1 = response1.data
          commit("updateLoading",false)
          if(responseData1.responseCode === "00"){
            Swal.fire({ text:responseData1.responseMessage, icon:'success'}).then(()=>{
              DocumentService.callReadDocumentApi({
                readAll:"YES"
              }).then(response2 => {
                let responseData2 = response2.data
                if(responseData2.responseCode === "00"){
                  commit("updateLoading",false)
                  commit("updateDocument", responseData2)
                }
              }).catch(error => {
                console.log(error)
              })
            })
          }else{
            Swal.fire({ text:responseData.responseMessage, icon:'error'}).then(()=>{
              commit("updateLoading",false)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      }
      else commit("updateLoading",false)
    }).catch(error => {
      console.log(error)
    })
  }
}