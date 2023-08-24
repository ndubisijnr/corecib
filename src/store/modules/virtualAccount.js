import VirtualAccountService from "../../service/VirtualAccountService"
import BaseResponse from "../../model/reponse/BaseResponse"
import VirtualAccountResponse from "../../model/reponse/VirtualAccountResponse";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";
import swal from "sweetalert2";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import Swal from "sweetalert2";

export const state = {
  loading: false,
  virtualAccount: BaseResponse.list,
  virtualaccounttransaction:null,
  bankList:{},
  virtualAccountCreateResponse:VirtualAccountResponse.createVirtualAccount,
  virtualAccountEditPayload:null

}

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const getters = {}

export const mutations = {

  updateLoading: (state, payload) => {
    state.loading = payload
  },
  updateVirtualAccountCreate:(state, payload) => {
    state.virtualAccountCreateResponse = payload
  },
  updateVirtualAccount: (state, payload) => {
    state.virtualAccount = payload
  },
  updateVirtualAccountEditPayload: (state, payload) => {
    state.virtualAccountEditPayload = payload
  },
  updateBankList: (state, payload) => {
    state.bankList = payload
  },
  updateVirtualaccountTransactions:(state,payload) => {
    state.virtualaccounttransaction = payload
  }

}

export const actions = {

  updateVirtualAccount: ({ commit, state }, payload = VirtualAccountRequest.readVirtualAccount) => {
    commit("updateLoading", true)
    return VirtualAccountService.callReadVirtualAccountApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateVirtualAccount", responseData)
      }
    })
      .catch(error => {
        commit("updateLoading", false)
        console.log(error)
      })

  },


  editVirtualAccount: ({ commit, state }, payload = VirtualAccountRequest.editVirtualAccount) => {
    commit("updateLoading", true)
    return VirtualAccountService.callUpdateVirtualAccount(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        Toast.fire({text: responseData.responseMessage, icon: 'success'}).then()
        StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualAccount).then()
      }else{
        Toast.fire({text:responseData.responseMessage, icon:'error'})
      }
    }).catch(error => {
        commit("updateLoading", false)
        console.log(error)
      })

  },

  updateVirtualAccountCreate:({commit}, payload = VirtualAccountRequest.createVirtualAccount) => {
    commit("updateLoading", true)
    return VirtualAccountService.callCreateVirtualAccountApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateLoading", false)
        commit("updateVirtualAccountCreate", responseData)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions).then();
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets).then()
        Toast.fire({text:responseData.responseMessage, icon:'success'})
      }else{
        commit("updateLoading", false)
        Toast.fire({text:responseData.responseMessage, icon:'error'})
      }
    }).catch(error => {
      swal.fire({text:error, icon:'error'})
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
      commit("updateLoading", false)
      console.log(error)
    })
  },

  updateReadBankList: ({commit, state}, payload) => {
    commit("updateLoading", true)
    return VirtualAccountService.callReadBankList(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode == "00"){
        commit("updateBankList", responseData.data)
        commit("updateLoading", false)
      }else{
        commit("updateLoading", false)
      }
    }).catch(e => {
      commit("updateLoading", false)
      console.log(e)
    })
  }

}


