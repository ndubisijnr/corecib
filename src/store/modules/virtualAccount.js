import VirtualAccountService from "../../service/VirtualAccountService"
import VirtualAccountRequest from "../.../model/VirtualAccountRequest"

export const state = {
  loading: false,
  success: "",
  errors: "",
  virtualaccount:{}
}

export const getters = {}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateVirtualAccount: (state, payload) => {
    state.virtualaccount = payload
  },
 
  updateSuccess: (state, payload) => {
    state.success = payload
  },
  updateError: (state, payload) => {
    state.errors = payload
  },
}

export const actions = {

  readVirtualAcc: ({ commit, state, dispatch, rootState }, payload = new VirtualAccountRequest.readVirtualAccountRequest) => {
    commit("updateLoading", true)
    commit("updateSuccess", "")
    commit("updateError", "")
    commit("updateVirtualAccount", {})
    return VirtualAccountService.callVirtualAccountRead(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateVirtualAccount", responseData.data)
        commit("updateSuccess", responseData.responseMessage)
      }
      else {
        commit("updateLoading", false)
        commit("updateError", responseData.responseMessage)
      }
    })
      .catch(error => {
        commit("updateError", error)
      })

  },
  }


export default {
  state,
  actions,
  mutations,
  getters
};

