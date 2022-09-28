import AuthService from "../../service/AuthService";
import router from "../../router";
import AuthenticationRequest from "../../model/request/AuthRequest";
import Swal from "sweetalert2";
import OrganisationRequest from "../../model/request/OrganisationRequest";
import OrganizationService from "../../service/OrganizationService";
import AuthenticationResponse from "../../model/reponse/AuthenticationResponse";
import WalletRequest from "../../model/request/WalletRequest";
import WalletResponse from "../../model/reponse/WalletResponse";
import WalletService from "../../service/WalletService";
import OrganisationResponse from "../../model/reponse/OrganisationResponse";
import StoreUtils from "@/util/baseUtils/StoreUtils";
import BillsPaymentRequest from "@/model/request/BillsPaymentRequest";
import AccountPayoutService from "../../service/AccountPayoutService";
import AccountPayoutResponse from "../../model/reponse/AccountPayoutResponse";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";


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
  form:false,
  userEditForm:false,
  token: null,
  loading: false,
  userInfo: AuthenticationResponse.login,
  addedBanks:AccountPayoutResponse.readPayoutAccountByOrganisationId,
  screen: "register",
  allOrganisations:null,
  passwordResetScreen: "email",
  readOrganisation: OrganisationResponse.readOrganisationById,
  balances:WalletResponse.readBalanceWallet,
  refferalstats:OrganisationResponse.refferalStatsResponse,
  isTimedOut:false,
  readOnlyAddedBanks:{},
  readOrganisationByUserId:{},
  currentOrganisation:[],
  allCustomers:null,
  organisationRoles:null,
  allInvites:null,
  singleOrganisationUser:null
}

export const getters = {
  getUserInfo: state => { return state.userInfo },
  getCustomerId: state => {return state.userInfo.customerId},
  getToken: state => { return state.token },
  getUserToken: state => { return localStorage.token },
  getOrganizationId: state => { return localStorage.organisationId },
  getCurrentOrganization: state => {
    if (state.allOrganisations == null) return {}
    return state.allOrganisations.filter(it => it.organisationId.toString() === localStorage.organisationId).length < 1
        ? {}
        : state.allOrganisations.filter(it => it.organisationId.toString() === localStorage.organisationId)[0]
  },
  getOrginizationReferralLink: (state, getters) => {
    return getters.getCurrentOrganization.organisationReferralCode
  },
  getStage: (state, getters) => {
    return getters.getCurrentOrganization.organisationStage
  }
}

export const mutations = {
  updateSingleOrganisationUser: (state, payload) => {state.singleOrganisationUser = payload},
  updateForm: (state, payload) => {state.form = payload},
  updateUserEditForm: (state, payload) => {state.userEditForm = payload},
  updateLoading: (state, payload) => { state.loading = payload },
  updateTimedOut: (state, payload) => { state.isTimedOut = payload },
  updateToken: (state, payload) => { state.token = payload },
  updateUserInfo: (state, payload) => { state.userInfo = payload; },
  updateScreen: (state, payload) => { state.screen = payload; },
  updatePasswordResetScreen: (state, payload) => { state.passwordResetScreen = payload; },
  updateOrganisation: (state, payload) => { state.readOrganisation = payload },
  updateBalance:(state, payload) => {state.balances = payload},
  updateRefferalStats:(state, payload) => {state.refferalstats = payload},
  updateAddedBanks: (state, payload) => {state.addedBanks = payload},
  updatereadAddedBanks: (state, payload) => {state.readOnlyAddedBanks = payload},
  updateAllOrganisation:(state, payload) => {state.readOrganisationByUserId = payload},
  updateAllOrganisationList:(state, payload) => {state.allOrganisations = payload},
  updateCurrentOrganisation:(state, payload) => {state.currentOrganisation = payload},
  updateAllCustomer:(state, payload) => {state.allCustomers = payload},
  updateOrganisationRoles:(state, payload) =>{state.organisationRoles = payload},
  updateAllInvites:(state, payload) => {state.allInvites = payload}
}

export const actions = {
  initialEnrollment: ({ commit }, payload = AuthenticationRequest.initiateEnrollment) => {
    commit("updateLoading", true)
    return AuthService.callInitiateEnrollmentApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateScreen", 'otp')
      }
      else {
        Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  completeEnrollment: ({ commit }, payload = AuthenticationRequest.completeEnrollment) => {
    commit("updateLoading", true)
    return AuthService.callCompleteEnrollmentApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        Swal.fire({ text: responseData.responseMessage, icon: 'success', })
          .then(() => { router.push({ name: "Logon" }) })
      } else {
        Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  logon: ({ commit, state, dispatch,getters }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    return AuthService.callLogonApi(payload)
      .then(response => {
        let responseData = response.data;
        if (responseData.responseCode === "00") {
            commit("updateLoading", false)
            localStorage.token = responseData.token;
            localStorage.customerId = responseData.customerId
            commit("updateToken", responseData.token);
            commit("updateUserInfo", responseData);
            StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationByUserId)
        }
        else Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => {
          commit("updateLoading", false)
        })
      }).catch((error) => {
        commit("updateLoading", false);
        Toast.fire({text:error, icon:"error"})
      });
  },

  resendOtp: ({ commit, dispatch, rootState, state }, payload) => {
    commit("updateLoading", true)
    return AuthService.callResendOtpApi(payload).then(response => {
      commit("updateLoading", false)
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  revalidateUser: ({ commit, dispatch, rootState }, payload) => {
    // commit("updateLoading", true)
    return AuthService.callRevalidateApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        if (router.currentRoute.meta.layout === 'auth') router.push({ name: "GetStarted" }).then(() => { })
        commit("updateUserInfo", responseData)
        commit("updateAllOrganisationList",responseData.organisations)
      }else if(responseData.responseCode === "115"){
        commit("updateTimedOut",true)
      }
    }).catch(error => { commit("updateLoading", false); console.log(error) })
  },

  changePassword:({commit}, paylaod = AuthenticationRequest.changePassword) =>{
    commit("updateLoading", true)
    return AuthService.callChangePasswordApi(paylaod).then((response)=>{
      let responseData = response.data
      if(responseData.responseCode == "00"){
        commit("updateLoading", false)
        Toast.fire({text:responseData.responseMessage, icon:"success"})
      }else{
        commit("updateLoading", false)
        Toast.fire({text:responseData.responseMessage, icon:"error"})
      }
    })

  },

  logOut: ({ commit, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    return AuthService.callLogOutApi(payload)
      .then(() => {
        commit("updateLoading", false)
        localStorage.removeItem("token")
        localStorage.clear()
        commit("updateAuthToken", null);
        commit("updateUserInfo", null);
        commit("updateLoading", false);
        window.location = "/"
      })
      .catch((error) => {
        commit("updateLoading", false);
      });
  },

  initiatePasswordReset: ({ commit }, payload) => {
    commit("updateLoading", true)
    return AuthService.callInitiatePasswordResetApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updatePasswordResetScreen", 'otp')
      }
      else Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  completePasswordReset: ({ commit, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    return AuthService.callCompletePasswordResetApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        Toast.fire({text:responseData.responseMessage, icon:"success"})
        router.push({ name: "Logon" }).then(() => { })
      }
      else {
        Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
      // console.log(error)
    });
  },

  updateStage: ({ commit, state }, paylaod = OrganisationRequest.switchStage) => {
    commit('updateLoading', true)
    return OrganizationService.callOrganisationStageApi(paylaod).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateStage", responseData.data[0].organisationStage)
        window.location.reload()
        commit("updateLoading", false)
      } else if (responseData.responseCode === "115") {
        commit("updateTimedOut", true)
      }
    })
      .catch((error) => {
        commit("updateLoading", false);
        // console.log(error)
      });

  },

  updateOrganisation: ({ commit }, payload) => {
    commit('updateLoading', true)
    return OrganizationService.callUpdateOrganisationApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode == "00") {
        commit("updateLoading", false)
        commit("updateOrginasation", responseData)
        Toast.fire({ text: responseData.responseMessage, icon: 'success', }).then(()=>{})
      }else if (responseData.responseCode === "115") {
        commit("updateTimedOut", true)
      }
      else {
        commit("updateLoading", false)
        Toast.fire({ text: responseData.responseMessage, icon: 'error', })
      }
    }).catch((error) => {
      commit("updateLoading", false)
      Toast.fire({ text: error, icon: 'error', })

    })

  },

  readRefferalState: ({commit}, paylaod={}) => {
    commit("updateLoading", true)
    return OrganizationService.callRefferalStatsApi(paylaod).then(response => {
      let responseData = response.data
      if(responseData.responseCode == "00"){
        commit("updateLoading", false)
        commit("updateRefferalStats", responseData)
      }else if (responseData.responseCode === "115") {
        commit("updateTimedOut", true)
      }
    })
  },

  readDashboardStats:({commit}, payload)=>{
    commit("updateLoading", true)
    return WalletService.callReadAllWalletandRefferalStatsApi(payload = WalletRequest.readBalance).then((response2) =>{
      let responseData2 = response2.data
      if (responseData2.responseCode == "00"){
        commit("updateLoading", false)
        commit("updateBalance",responseData2)
      }else if (responseData2.responseCode === "115") {
        commit("updateTimedOut", true)
      }
    })
  },

  readOrganisationById:({commit}, payload={organisationId:localStorage.organisationId}) => {
    commit("updateLoading", true)
    return OrganizationService.callReadOrganisationByIdApi(payload).then((response) => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateLoading", false)
        commit("updateOrganisation", responseData)
        // console.log(responseData)
      }else if (responseData.responseCode === "115") {
        commit("updateTimedOut", true)
      }
      else{
         commit("updateLoading", false)
      }
    }).catch(() => {
       commit("updateLoading", false)
    })
  },

  addOrganisation: ({commit}, payload = OrganisationRequest.addOrganisation) => {
    commit("updateLoading", true)
    return OrganizationService.callAddOrganisationApi(payload).then(response => {
      commit("updateLoading", false)
      let responseData = response.data
      if(responseData.responseCode === "00"){
        Toast.fire({text:responseData.responseMessage, icon:'success'}).then()
        location.reload()
      }else{
        Toast.fire({text:responseData.responseMessage, icon:'error'}).then()
      }
    }).catch(e => {
      commit("updateLoading", false)
      Toast.fire({title:e, icon:'error'}).then()

    })
  },

  readOrganisationByUserId: ({commit,state}, payload = OrganisationRequest.readOrganisationByUserId)=> {
    payload.customerId = localStorage.customerId
    return OrganizationService.callReadOrganisationByUserIdApi(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00") {
        commit("updateAllOrganisationList", responseData.data)
        commit("updateCurrentOrganisation", responseData.data[0])
        if (!localStorage.organisationId) localStorage.organisationId = state.currentOrganisation.organisationId
        else {
          if (state.allOrganisations.filter(it => it.organisationId) === localStorage.organisationId){
            localStorage.organisationId = localStorage.organisationId
          }
        }
        if(state.currentOrganisation.organisationStatus === 'PENDING'){
          router.push({name:"Settings"}).then(() => {
            let model = BillsPaymentRequest.readCategories
            StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories, model)
            AccountPayoutRequest.readAccountPayoutById.accountOrganisationId = localStorage.organisationId
            return AccountPayoutService.callreadAddedBanksApi(payload = AccountPayoutRequest.readAccountPayoutById).then(response => {
              let responseData3 = response.data
              commit("updateAddedBanks", responseData3)
              commit("updatereadAddedBanks",responseData3)
            })
          })
        }else{
          router.push({ name: "GetStarted" }).then(() => {
            let model = BillsPaymentRequest.readCategories
            StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories, model)
            AccountPayoutRequest.readAccountPayoutById.accountOrganisationId = localStorage.organisationId
            return AccountPayoutService.callreadAddedBanksApi(payload = AccountPayoutRequest.readAccountPayoutById).then(response => {
              let responseData3 = response.data
              commit("updateAddedBanks", responseData3)
              commit("updatereadAddedBanks",responseData3)
            })
          })
        }

      }
      else{
        Toast.fire({text:`${responseData.responseMessage}`, icon:'error'})
      }
    }).catch(e => {
      Toast.fire({title:e, icon:'error'})
    })
  },

  inviteCustomer: ({commit, dispatch}, payload = OrganisationRequest.inviteCustomer) => {
    commit("updateLoading", true)
    payload.customerOrganisationId = localStorage.organisationId
    return OrganizationService.callInviteCustomerApi(payload).then(response => {
      commit("updateLoading", false)
      let responseData = response.data
      if(responseData.responseCode === "00"){
        Toast.fire({text:`You have invited ${payload.customerEmail}`, icon:"success"})
        Object.keys(OrganisationRequest.inviteCustomer).forEach(key => {
          OrganisationRequest.inviteCustomer[key] = null
        })
        StoreUtils.dispatch(StoreUtils.actions.auth.readAllInvites)
      }else{
        Swal.fire({text:responseData.responseMessage, icon:"error"})
        Object.keys(OrganisationRequest.inviteCustomer).forEach(key => {
          OrganisationRequest.inviteCustomer[key] = null
        })
      }
    }).catch(e => {
      commit("updateLoading", false)
      Toast.fire({text:e, icon:"error"})
    })
  },

  readCustomerByOrganisation:({commit}, payload=OrganisationRequest.readUsersByOrganisationId)=> {
    payload.organisationId = localStorage.organisationId
    commit("updateLoading", true)
    return OrganizationService.callReadUsersByOrganisationIdApi(payload).then(response => {
      commit("updateLoading", false)
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateAllCustomer", responseData)
      }else{
        Toast.fire({text:responseData.responseMessage, icon:'error'})
      }
    }).catch(e => {
      commit("updateLoading", false)
      Toast.fire({text:e, icon:"error"})
    })
  },

  readOrganisationRoles:({commit,state}, payload = OrganisationRequest.readOrganisationRoles)=> {
    return OrganizationService.callReadRolesApi(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateOrganisationRoles",responseData.data)
      }
    })
  },

  readAllInvites:({commit}, payload=OrganisationRequest.readInvite) => {
    payload.inviteOrganisationId = localStorage.organisationId
    commit("updateLoading", true)
    return OrganizationService.callReadInvite(payload).then(response => {
      commit("updateLoading", false)
      let responseData = response.data
      commit("updateAllInvites", responseData.data)
    })
  },

  updateUser:({commit}, payload = OrganisationRequest.updateOrganisationUser) => {
    payload.customerOrganisationId = localStorage.organisationId
    commit("updateLoading", true)
    return OrganizationService.callUpdateOrganisationUserApi(payload).then(response => {
      commit("updateLoading", false)
      let responseData = response.data
      if(responseData.responseCode === "00"){
        StoreUtils.dispatch(StoreUtils.actions.auth.readCustomerByOrganisation)
        commit("updateUserEditForm", false)
        Object.keys(OrganisationRequest.updateOrganisationUser).forEach(key => {
          OrganisationRequest.updateOrganisationUser[key] = null
        })
      }else{
        Toast.fire({text:responseData.responseMessage, icon:"error"}).then()
        Object.keys(OrganisationRequest.updateOrganisationUser).forEach(key => {
          OrganisationRequest.updateOrganisationUser[key] = null
        })
      }
    }).catch(e => {
      commit("updateLoading", false)
      Toast.fire({text:e, icon:"error"}).then()

    })

  }
}

