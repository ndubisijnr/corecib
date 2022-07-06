import WalletService from "../../service/WalletService"
import WalletRequest from "../../model/request/WalletRequest"
import WalletResponse from "../../model/reponse/WalletResponse"
import BaseResponse from "../../model/reponse/BaseResponse";
import createWalletResponse from "@/model/reponse/createWalletResponse";
import createWalletRequest from "@/model/request/CreateWallet";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const state = {
  loading: false,
  walletState:'first',
  retrieveLoading:false,
  walletTransactions: BaseResponse.list,
  allWalletTransactions: BaseResponse.list,
  balanceEnquiry: WalletResponse.balanceEnquiry,
  wallets: BaseResponse.list,
  wallet: WalletResponse.retrieveWallet,
  createdWallet:createWalletResponse,
  excelState:BaseResponse.list
}

export const getters = {}

export const mutations = {
  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateWallet: (state, payload) => {
    state.wallet = payload
  },

  updateCreatedWallet: (state, payload) => {
    state.createdWallet = payload
  },
  updateWalletTransactions: (state, payload) => {
    state.walletTransactions = payload
  },
  updateAllWalletTransactions: (state, payload) => {
    state.allWalletTransactions = payload
    for(let i =0;i < state.allWalletTransactions; i++){

    }
  },
  updateBalanceEnquiry: (state, payload) => {
    state.balanceEnquiry = payload
  },
  updateReadAllWallets: (state, payload) => {
    state.wallets = payload
  },

  updateRetrieveLoading: (state, payload) => {
    state.retrieveLoading = payload
  },

  updateWalletState:(state, payload) => {
    state.walletState = payload
  }

}

export const actions = {
  updateAllWalletTransactions: ({ commit, state }, payload = WalletRequest.readAllWalletTransaction) => {
    if (state.allWalletTransactions.data.length < 1) commit("updateLoading", true)
    return WalletService.callReadAllWalletTransactionApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateAllWalletTransactions", responseData)
        commit("updateWalletTransactions", responseData.data)
      }
    }).catch(error => {
      commit("updateLoading", false)
      console.log(error)
    })

  },

updateCreatedWallet: ({ commit, state }, payload = createWalletRequest.createWallet) => {
    commit("updateLoading", true)
    return WalletService.callWalletCreateApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateLoading", false)
        commit("updateCreatedWallet", responseData)
        Swal.fire({text:responseData.responseMessage, icon:"success"}).then({})
      }else{
        commit("updateLoading", false)
        Swal.fire({text:responseData.responseMessage, icon:"error"}).then({})
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

  updateReadAllWallets: ({ commit, state }, payload = WalletRequest.readWallet) => {
    if (state.wallets.data.length < 1) commit("updateLoading", true)
    return WalletService.callReadWalletApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateReadAllWallets", responseData)
      }
    }).catch(error => {
     console.log(error)
    })
  },

  updateWalletTransactions: ({ commit, state }, payload = WalletRequest.readAllWalletTransaction) => {
    commit("updateLoading", true)
    return WalletService.callReadWalletTransactionApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateLoading", false)
        commit("updateWalletTransactions", responseData.data)
        console.log(state.walletTransactions)
      }else{
        commit("updateLoading", false)
      }
    }).catch(error => {
      commit("updateLoading", false)
      console.log(error)
    })
  },

  updateWallet: ({ commit, state }, payload = WalletRequest.retrieveWallet) => {
    commit("updateRetrieveLoading", true)
    return WalletService.callRetrieveWalletApi(payload).then(response => {
      let responseData = response.data
      commit("updateRetrieveLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateWallet", responseData)
        commit("updateWalletState", 'second')
      }else{
        commit("updateRetrieveLoading", false)
        Swal.fire({text:responseData.responseMessage, icon:"error"})
      }
    }).catch(error => {
      commit("updateRetrieveLoading", false)
      Swal.fire({text:error, icon:"error"})

    })

  },
}


