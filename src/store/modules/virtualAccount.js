import VirtualAccountService from "../../service/VirtualAccountService"
import BaseResponse from "../../model/reponse/BaseResponse"
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";

export const state = {
  loading: false,
  virtualAccount: BaseResponse.list,
  virtualaccounttransaction:{}

}

export const getters = {}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateVirtualAccount: (state, payload) => {
    state.virtualAccount = payload
  },
  updateVirtualaccountTransactions:(state,payload) => {
    state.virtualaccounttransaction = payload
  }

}

export const actions = {

  updateVirtualAccount: ({ commit, state }, payload = VirtualAccountRequest.readVirtualAccount) => {
    if (state.virtualAccount.data.length < 1) commit("updateLoading", true)
    return VirtualAccountService.callReadVirtualAccountApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateVirtualAccount", responseData)
      }
    })
      .catch(error => {
        console.log(error)
      })

  },

  updateVirtualaccountTransactions: ({commit, state}, payload = VirtualAccountRequest.readVirtualAccountTransactions) =>{
    commit("updateLoading", true)
    return VirtualAccountService.callReadVirtualAccountTransactionApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateVirtualaccountTransactions", responseData)
      }
    }) .catch(error => {
      console.log(error)
    })
  }
}


