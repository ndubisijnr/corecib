import WalletService from "../../service/WalletService"
import WalletRequest from "../../model/request/WalletRequest"
import WalletResponse from "../../model/reponse/WalletResponse"
import BaseResponse from "../../model/reponse/BaseResponse";

export const state = {
  loading: false,
  walletTransactions: BaseResponse.list,
  allWalletTransactions: BaseResponse.list,
  balanceEnquiry: WalletResponse.balanceEnquiry,
  wallets: BaseResponse.list,
  wallet: WalletResponse.retrieveWallet,
}

export const getters = {}

export const mutations = {
  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateWallet: (state, payload) => {
    state.wallet = payload
  },
  updateWalletTransactions: (state, payload) => {
    state.walletTransactions = payload
  },
  updateAllWalletTransactions: (state, payload) => {
    state.allWalletTransactions = payload
  },
  updateBalanceEnquiry: (state, payload) => {
    state.balanceEnquiry = payload
  },
  updateWallets: (state, payload) => {
    state.wallets = payload
  }
}

export const actions = {

  updateAllWalletTransactions: ({ commit, state }, payload = WalletRequest.readAllWalletTransaction) => {
    if (state.allWalletTransactions.data.length > 1) commit("updateLoading", true)
    return WalletService.callReadAllWalletTransactionApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateAllTransaction", responseData.data)
      }
    }).catch(error => {
      commit("updateLoading", false)
      console.log(error)
    })

  },

  updateBalanceEnquiry: ({ commit, state }, payload = WalletRequest.balanceEnquiry) => {
    commit("updateLoading", true)
    return WalletService.callBalanceEnquiryApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateBalanceEnquiry", responseData)
      }
    }).catch(error => {
      commit("updateLoading", false)
      console.log(error)
    })

  },

  updateWallets: ({ commit, state }, payload = WalletRequest.readWallet) => {
    if (state.wallets.data.length < 1) commit("updateLoading", true)
    return WalletService.callReadWalletApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateWallets", responseData)
      }
    }).catch(error => {
      commit("updateLoading", false)
      commit("updateError", error)
    })
  },

  updateWalletTransactions: ({ commit, state }, payload = WalletRequest.readAllWalletTransaction) => {
    if (state.wallets.data.length < 1) commit("updateLoading", true)
    return WalletService.callReadWalletTransactionApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateWalletTransactions", responseData)
      }
    }).catch(error => {
      commit("updateLoading", false)
      console.log(error)
    })
  },

  updateWallet: ({ commit, state }, payload = WalletRequest.retrieveWallet) => {
    commit("updateLoading", true)
    return WalletService.callRetrieveWalletApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateWallet", responseData)
      }
    }).catch(error => {
      commit("updateLoading", true)
      console.log(error)
    })

  },
}


