import DisputeService from "../../service/DisputeService";


export const state = {
  token: null,
  loading: false,
  log_loading:false,
  success: "",
  error: "",
  readispute: {},
}

export const getters = {
  UserToken: state => {
    // console.log("getter getTok")
    return localStorage.getItem('token')
  },


}

export const mutations = {

  updateToken: (state, payload) => {
    state.token = payload
  },
  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateLogLoading: (state, payload) => {
    state.log_loading = payload
  },
  updateReaddispute: (state, payload) => {
    state.readispute = payload
  },
  updateSuccess: (state, payload) => {
    state.success = payload
  },
  updateError: (state, payload) => {
    state.errors = payload
  },
}

export const actions = {

  readDispute: ({ commit, state, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    commit("updateSuccess", "")
    commit("updateError", "")
    commit("updateReaddispute", {})
    return DisputeService.callReadDisputeApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateReaddispute", responseData.data)
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

  createDispute: ({ commit, state, dispatch, rootState }, payload) => {
    commit("updateLogLoading", true)
    commit("updateSuccess", "")
    commit("updateError", "")
    return DisputeService.callCreateDisputeApi(payload).then(response => {
      let responseData = response.data
      commit("updateLogLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateSuccess", responseData.responseMessage)
        console.log(responseData.responseMessage)
      }
      else {
        commit("updateLogLoading", false)
        commit("updateError", responseData.responseMessage)
        console.log(responseData.responseMessage)
      }
    })
      .catch(error => {
        commit("updateError", error)
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

