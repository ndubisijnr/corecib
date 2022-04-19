import router from "../../routes/router"
import WalletService from "../../service/WalletService"

export const state = {
  loading: false,
  success: "",
  errors: "",
  alltransactions: {},
  balance_enq: {},
  allwallet: {},
  walletretrieve: {},
  retrieveloading: false,
  wallettrans:{}
}

export const getters = {}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateRetrieveLoading: (state, payload) => {
    state.retrieveloading = payload
  },
  updateWalletretrieve: (state, payload) => {
    state.walletretrieve = payload
  },
  updateWalletTrans: (state, payload) => {
    state.wallettrans = payload
  },
  updateAllTransaction: (state, payload) => {
    state.alltransactions = payload
  },
  updateBalanceEnq: (state, payload) => {
    state.balance_enq = payload
  },
  updateSuccess: (state, payload) => {
    state.success = payload
  },
  updateError: (state, payload) => {
    state.errors = payload
  },
  updateWallet: (state, payload) => {
    state.allwallet = payload
  }
}

export const actions = {

  readAllTrans: ({ commit, state, dispatch, rootState }, payload) => {
    if (state.alltransactions.length > 1) {
      commit("updateLoading", false)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateAllTransaction", state.alltransactions)
      return WalletService.callReadAllTransactions(payload).then(response => {
        let responseData = response.data
        if (responseData.responseCode === "00") {
          commit("updateAllTransaction", responseData.data)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateError", responseData.responseMessage)
        }
      })
    } else {
      commit("updateLoading", true)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateAllTransaction", {})
      return WalletService.callReadAllTransactions(payload).then(response => {
        let responseData = response.data
        commit("updateLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateAllTransaction", responseData.data)
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
    }

  },
  readBalanceEnq: ({ commit, state, dispatch, rootState }, payload) => {
    if (state.balance_enq.length == 1) {
      commit("updateRetrieveLoading", false)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateBalanceEnq", state.balance_enq)
      return WalletService.callBalanceEnquiry(payload).then(response => {
        let responseData = response.data
        if (responseData.responseCode === "00") {
          commit("updateBalanceEnq", responseData)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateError", responseData.responseMessage)
        }
      })
    } else {
      commit("updateRetrieveLoading", true)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateBalanceEnq", {})
      return WalletService.callBalanceEnquiry(payload).then(response => {
        let responseData = response.data
        commit("updateRetrieveLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateBalanceEnq", responseData)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateRetrieveLoading", false)
          commit("updateError", responseData.responseMessage)
        }
      })
        .catch(error => {
          commit("updateError", error)
        })

    }
  },
  readWallet: ({ commit, state, dispatch, rootState }, payload) => {
    if (state.allwallet.length > 1) {
      commit("updateLoading", false)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateWallet", state.allwallet)
      return WalletService.callReadWallet(payload).then(response => {
        let responseData = response.data
        commit("updateLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateWallet", responseData.data)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateLoading", false)
          commit("updateError", responseData.responseMessage)
        }
      })
    } else {
      commit("updateLoading", true)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateWallet", {})
      return WalletService.callReadWallet(payload).then(response => {
        let responseData = response.data
        commit("updateLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateWallet", responseData.data)
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
    }
  },
  readWalletTrans: ({ commit, state, dispatch, rootState }, payload) => {
    if (state.allwallet.length > 1) {
      commit("updateRetrieveLoading", false)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateWalletTrans", state.wallettrans)
      return WalletService.callReadWalletTrans(payload).then(response => {
        let responseData = response.data
        commit("updateRetrieveLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateWalletTrans", responseData.data)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateRetrieveLoading", false)
          commit("updateError", responseData.responseMessage)
        }
      })
    } else {
      commit("updateRetrieveLoading", true)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateWalletTrans", {})
      return WalletService.callReadWallet(payload).then(response => {
        let responseData = response.data
        commit("updateRetrieveLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateWalletTrans", responseData.data)
          commit("updateSuccess", responseData.responseMessage)

        }
        else {
          commit("updateRetrieveLoading", false)
          commit("updateError", responseData.responseMessage)
        }
      })
        .catch(error => {
          commit("updateError", error)
        })
    }


  },
  retrieveWallet: ({ commit, state, dispatch, rootState }, payload) => {
    if (state.walletretrieve.length == 1) {
      commit("updateRetrieveLoading", false)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateWalletretrieve", state.walletretrieve)
      return WalletService.callWalletRetrieve(payload).then(response => {
        let responseData = response.data
        commit("updateRetrieveLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateWalletretrieve", responseData)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateRetrieveLoading", false)
          commit("updateError", responseData.responseMessage)
        }
      })
    } else {
      commit("updateRetrieveLoading", true)
      commit("updateSuccess", "")
      commit("updateError", "")
      commit("updateWalletretrieve", {})
      return WalletService.callWalletRetrieve(payload).then(response => {
        let responseData = response.data
        commit("updateRetrieveLoading", false)
        if (responseData.responseCode === "00") {
          commit("updateWalletretrieve", responseData)
          commit("updateSuccess", responseData.responseMessage)
        }
        else {
          commit("updateRetrieveLoading", false)
          commit("updateError", responseData.responseMessage)
        }
      })
        .catch(error => {
          commit("updateError", error)
        })
    }


  },
}


export default {
  state,
  actions,
  mutations,
  getters
};

