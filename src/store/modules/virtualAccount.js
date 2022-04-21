import VirtualAccountService from "../../service/VirtualAccountService"
import VirtualAccountRequest from "../.../model/VirtualAccountRequest"
import VirtualAccountResponse from "../../model/reponse/VirtualAccountResponse"

export const state = {
  loading: false,
  virtualaccount: VirtualAccountResponse.retrieveVirtualAccount
}

export const getters = {}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateVirtualAccount: (state, payload) => {
    state.virtualaccount = payload
  },

}

export const actions = {

  updateVirtualAccount: ({ commit, state }, payload = VirtualAccountRequest.readVirtualAccountRequest) => {
    if (state.virtualaccount.data.length < 1) commit("updateLoading", true)
    return VirtualAccountService.callVirtualAccountRead(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateVirtualAccount", responseData.data)
      }
    })
      .catch(error => {
        console.log(error)
      })

  },
}


