import AccountPayoutRequest from "../../model/request/AccountPayoutRequest"
import AccountPayoutResponse from "../../model/reponse/AccountPayoutResponse"
import AccountPayoutService from "../../service/AccountPayoutService"
import Swal from "sweetalert2";
import StoreUtils from "../../util/baseUtils/StoreUtils";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


export const state = {
  accloading: false,
  addbankloading:false,
  addedBanks:AccountPayoutResponse.readPayoutAccountByOrganisationId,
  readOnlyAddedBanks:AccountPayoutResponse.readPayoutAccountByOrganisationId,
  allpayouts:[]
}

export const getters = {}

export const mutations = {

  updateAddedBanks: (state, payload) => {
    state.addedBanks = payload
  },
  updatereadAddedBanks: (state, payload) => {
    state.readOnlyAddedBanks = payload
  },
  updateAccLoading: (state, payload) => {
    state.accloading = payload
  },

  updateAddBankLoading: (state, payload) => {
    state.addbankloading = payload
  },
  updateAllPayouts: (state, payload) => {
    state.allpayouts = payload
  },

}

export const actions = {

    readAddedBanks: ({ commit, state }, payload = AccountPayoutRequest.readAccountPayoutById) => {
         payload.accountOrganisationId = localStorage.organisationId
          commit("updateAccLoading", true)
            return AccountPayoutService.callreadAddedBanksApi(payload).then(response => {
            let responseData = response.data
            commit("updateAccLoading", false)
            if (responseData.responseCode === "00") {
                commit("updateAddedBanks", responseData)
                commit("updatereadAddedBanks",responseData)
            }
            })
            .catch(error => {
                commit("updateAccLoading", false)
                console.log(error)
            })

    },


  createAddedBanks: ({ commit, state }, payload = AccountPayoutRequest.createAccountPayout) => {
    commit("updateAddBankLoading", true)
    return AccountPayoutService.callcreateAddedBanksApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAddBankLoading", false)
        commit("updateAddedBanks", responseData)
        commit("updatereadAddedBanks",responseData)
        Toast.fire({ text: responseData.responseMessage, icon: 'success', }).then(() => {})
      }else{
        commit("updateAddBankLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { 

        })
      }
    })
      .catch(error => {
        commit("updateAddBankLoading", false)
        console.log(error)
      })

  },


  editAddedBanks: ({ commit, state }, payload = AccountPayoutRequest.updateAccountPayout) => {
  commit("updateAddBankLoading", true)
    return AccountPayoutService.calleditAddedBanksApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAddBankLoading", false)
        commit("updateAddedBanks", responseData)
        commit("updatereadAddedBanks",responseData)
        Toast.fire({ text: responseData.responseMessage, icon: 'success', })
      }else{
        commit("updateAddBankLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    })
      .catch(error => {
          commit("updateAddBankLoading", false)
          console.log(error)
      })

  },

   requestPayout: ({commit}, payload = AccountPayoutRequest.createPayout) => {
     commit("updateAccLoading", true)
     return AccountPayoutService.callPayoutApi(payload).then(response => {
       let responseData = response.data
       if(responseData.responseCode == "00"){
        commit("updateAccLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'success', })
        StoreUtils.dispatch(StoreUtils.actions.accountPayout.readPayout).then()
       }else{
        commit("updateAccLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'error', })
       }
     }) .catch(error => {
      console.log(error)
    })
    
   },

   readPayout: ({commit,state}, payload = AccountPayoutRequest.readPayout) => {
    if(state.allpayouts.length < 1) commit("updateAccLoading", true)
    return AccountPayoutService.callReadPayoutApi(payload).then(response => {
      commit("updateAccLoading", false)
      let responseData = response.data
      if(responseData.responseCode == "00"){
       commit("updateAllPayouts",responseData.data)
      }else{
       Toast.fire({ text: responseData.responseMessage, icon: 'error', })
      }
    }) .catch(error => {
        commit("updateAccLoading", false)
        Toast.fire({ text: error, icon: 'error', })

    })
   
  }


}


