import WalletService from "../../service/WalletService"
import WalletRequest from "../../model/request/WalletRequest"
import WalletResponse from "../../model/reponse/WalletResponse"

export const state = {
  loading: false,
  walletTransactions: WalletResponse.readAllWalletTransaction,
  balanceEnquiry: WalletResponse.balanceEnquiry,
  wallets: WalletResponse.readWallet,
  retrievewallet: WalletResponse.retrieveWallet,
  wallettransactions: WalletResponse.readWalletTransaction
}

export const getters = {}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },

  updateRetrieveWallet: (state, payload) => {
    state.retrievewallet = payload
  },
  updateWalletTransactions: (state, payload) => {
    state.wallettransactions = payload
  },
  updateAllWaletTransaction: (state, payload) => {
    state.walletTransactions = payload
  },
  updateBalanceEnquiry: (state, payload) => {
    state.balanceEnquiry = payload
  },
  updateWallet: (state, payload) => {
    state.allWallet = payload
  }
}

export const actions = {

  updateAllWaletTransaction: ({ commit, state }, payload = WalletRequest.readAllWalletTransaction) => {
    if (state.walletTransactions.data.length > 1) commit("updateLoading", false)
    return WalletService.callReadAllTransactions(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAllTransaction", responseData.data)
      }
    }).catch(error => {
      console.log(error)
    })

  },

  updateBalanceEnquiry: ({ commit, state }, payload = WalletRequest.balanceEnquiry) => {
    if (state.balanceEnquiry.responsecode != "00") commit("updateLoading", true)
    return WalletService.callBalanceEnquiry(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateBalanceEnq", responseData)
      }
    }).catch(error => {
      console.log(error)
    })

  },

  updateWallet: ({ commit, state }, payload = WalletRequest.readWallet) => {
    if (state.allWallet.data.length < 1) commit("updateLoading", true)
    return WalletService.callReadWallet(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateWallet", responseData.data)
        commit("updateSuccess", responseData.responseMessage)
      }
    }).catch(error => {
      commit("updateError", error)
    })
  },


  updateWalletTransactions: ({ commit, state }, payload = WalletRequest.readAllWalletTransaction) => {
    if (state.wallets.length < 1) commit("updateLoading", true)
    return WalletService.callReadWalletTrans(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateWalletTrans", responseData.data)
      }

    }).catch(error => {
      commit("updateError", error)
    })
  },

  updateRetrieveWallet: ({ commit, state }, payload = WalletRequest.retrieveWallet) => {
    if (state.walletretrieve.length < 1) commit("updateRetrieveLoading", true)
    return WalletService.callWalletRetrieve(payload).then(response => {
      let responseData = response.data
      commit("updateRetrieveLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateWalletretrieve", responseData)
      }
    }).catch(error => {
      console.log(error)
    })

  },
}


