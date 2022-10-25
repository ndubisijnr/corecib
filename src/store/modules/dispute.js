import DisputeService from "../../service/DisputeService";
import DisputeRequest from "../../model/request/DisputeRequest";
import DisputeResponse from "../../model/reponse/DisputeResponse";
import Swal from "sweetalert2";

export const state = {
  loading: false,
  loading2:false,
  success:false,
  status:'false',
  disputes: DisputeResponse.disputeRead,
  transactionsquery:{}
}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateLoading2: (state, payload) => {
    state.loading2 = payload
  },
  updateSuccess: (state, payload) => {
    state.success = payload
  },
  updateStatus:(state, payload) => {
     state.status = payload
  },
  updateDisputes: (state, payload) => {
    state.disputes = payload
  },
  updateTransactionQuery:(state,payload) => {
    state.transactionsquery = payload
  }
}

export const actions = {

  updateDisputes: ({ commit, state}, payload = DisputeRequest.disputeRead) => {
    payload.disputeId = localStorage.organisationId
    if(state.disputes.data.length < 1) commit("updateLoading", true)
    return DisputeService.callReadDisputeByOrgApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateDisputes", responseData)
      }
    }).catch(error => {
        console.log(error);
      })

  },

  createDispute: ({ commit,state }, payload = DisputeRequest.disputeCreate) => {
    commit("updateLoading2", true)
    return DisputeService.callCreateDisputeApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateLoading2", false)
        Swal.fire({title: responseData.responseMessage, icon: 'success'}).then(()=>{
          commit("updateStatus", 'read')
        })
      }
      else {
        commit("updateLoading2", false)
        commit("updateStatus", 'true')
        Swal.fire({title:responseData.responseMessage,icon:'error'}).then(()=>{})
      }
    })
      .catch(error => {
        commit("updateLoading2", false)
        console.log(error)
      })

  },

  updateTransactionQuery: ({commit}, payload = DisputeRequest.transactionStatusQuery) => {
    commit("updateLoading2", true)
    return DisputeService.callTransactionStatusQuerApi(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateLoading2", false)
        commit("updateStatus", 'true')
        commit("updateTransactionQuery", responseData)
      }else{
        commit("updateLoading2", false)
        commit("updateSuccess", responseData.responseCode)
        commit("updateStatus", 'false')
        Swal.fire({title: responseData.responseMessage, icon: 'error'}).then(()=>{})
      }
    }).catch(error => {
      commit("updateLoading2", false)
      console.log(error)
    })
  }

}