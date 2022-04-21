import DisputeService from "../../service/DisputeService";
import DisputeRequest from "../../model/request/DisputeRequest";
import DisputeResponse from "../../model/reponse/DisputeResponse";

export const state = {
  loading: false,
  disputes: DisputeResponse.disputeRead
}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateDsputes: (state, payload) => {
    state.readispute = payload
  }
}

export const actions = {

  updateDsputes: ({ commit, state}, payload = DisputeRequest.disputeRead) => {
    if(state.disputes.data.length < 1) commit("updateLoading", true)
    return DisputeService.callReadDisputeApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateReaddispute", responseData.data)
      }
    }).catch(error => {
        console.log(error);
      })

  },

  createDispute: ({ commit }, payload = DisputeRequest.disputeCreate) => {
    commit("updateLoading", true)
    return DisputeService.callCreateDisputeApi(payload).then(response => {
      let responseData = response.data
      commit("updateLogLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateSuccess", responseData.responseMessage)
        Swal.fire({title:responseData.responseMessage,icon:'success'})
      }
      else {
        Swal.fire({title:responseData.responseMessage,icon:'error'})
      }
    })
      .catch(error => {
        commit("updateLogLoading", false)
        console.log(error)
      })

  },

}