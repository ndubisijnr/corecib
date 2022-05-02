import AccountPayoutRequest from "../../model/request/AccountPayoutRequest"
import AccountPayoutResponse from "../../model/reponse/AccountPayoutResponse"
import AccountPayoutService from "../../service/AccountPayoutService"
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


export const state = {
  accloading: false,
  addedBanks:AccountPayoutResponse.readPayoutAccountByOrganisationId,
  readOnlyAddedBanks:AccountPayoutResponse.readPayoutAccountByOrganisationId
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

}

export const actions = {

    readAddedBanks: ({ commit, state }, payload = AccountPayoutRequest.readAccountPayoutById) => {
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
                console.log(error)
            })

    },


  createAddedBanks: ({ commit, state }, payload = AccountPayoutRequest.createAccountPayout) => {
    commit("updateAccLoading", true)
    return AccountPayoutService.callcreateAddedBanksApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAccLoading", false)
        commit("updateAddedBanks", responseData)
        commit("updatereadAddedBanks",responseData)
        Toast.fire({ text: responseData.responseMessage, icon: 'success', }).then(() => {
          Object.keys(state.addedBanks).forEach(key => {
            state.addedBanks[key] = null;
          });
         })
      }else{
        commit("updateAccLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { 

        })
      }
    })
      .catch(error => {
        commit("updateAccLoading", false)
        console.log(error)
      })

  },


  editAddedBanks: ({ commit, state }, payload = AccountPayoutRequest.updateAccountPayout) => {
  commit("updateAccLoading", true)
    return AccountPayoutService.calleditAddedBanksApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAccLoading", false)
        commit("updateAddedBanks", responseData)
        commit("updatereadAddedBanks",responseData)
        Toast.fire({ text: responseData.responseMessage, icon: 'success', }).then(() => { 
          Object.keys(state.addedBanks).forEach(key => {
            state.addedBanks[key] = null;
          });
        })

      }else{
        commit("updateAccLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    })
      .catch(error => {
        console.log(error)
      })

  },


}


