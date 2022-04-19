import transactionService from "../../service/transactionService"

export const state = {
  token: null,
  log_loading: false,
  querysuccess: "",
  queryerrors: "",
  transactionquery: {},
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

  updateLogLoading: (state, payload) => {
    state.log_loading = payload
  },
  updateTransactionquery: (state, payload) => {
    state.transactionquery = payload
  },
  updateSuccess: (state, payload) => {
    state.querysuccess = payload
  },
  updateError: (state, payload) => {
    state.queryerrors = payload
  },
}

export const actions = {

  queryId: ({ commit, state, dispatch, rootState }, payload) => {
    commit("updateLogLoading", true)
    commit("updateSuccess", "")
    commit("updateError", "")
    commit("updateTransactionquery", {})
    return transactionService.callQueryTransactionApi(payload).then(response => {
      let responseData = response.data
      commit("updateLogLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateTransactionquery", responseData)
        commit("updateSuccess", responseData.responseMessage)
        console.log(state.transactionquery)
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

