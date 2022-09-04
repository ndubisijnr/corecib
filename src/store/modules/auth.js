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
  token: null,
  loading: false,
  userInfo: AuthenticationResponse.login,
  screen: "register",
  passwordResetScreen: "email",
  readOrganisation: OrganisationResponse.readOrganisationById,
  balances:WalletResponse.readBalanceWallet,
  refferalstats:OrganisationResponse.refferalStatsResponse,
  isTimedOut:false
}

export const getters = {
  getUserInfo: state => { return state.userInfo },
  getToken: state => { return state.token },
  getUserToken: state => { return localStorage.token },
  getOrganizationId: state => { return localStorage.organisationId },
  getCurrentOrganization: state => {
    if (state.userInfo.organisations == null) return {}
    return state.userInfo.organisations.filter(it => it.organisationId.toString() === localStorage.organisationId).length < 1
      ? {}
      : state.userInfo.organisations.filter(it => it.organisationId.toString() === localStorage.organisationId)[0]
  },
  getOrginizationReferralLink: (state, getters) => {
    return getters.getCurrentOrganization.organisationReferralCode
  },
  getStage: (state, getters) => {
    return getters.getCurrentOrganization.organisationStage
  }
}

export const mutations = {
  updateLoading: (state, payload) => { state.loading = payload },
  updateTimedOut: (state, payload) => { state.isTimedOut = payload },
  updateToken: (state, payload) => { state.token = payload },
  updateUserInfo: (state, payload) => { state.userInfo = payload; },
  updateScreen: (state, payload) => { state.screen = payload; },
  updatePasswordResetScreen: (state, payload) => { state.passwordResetScreen = payload; },
  updateOrganisation: (state, payload) => { state.readOrganisation = payload },
  updateBalance:(state, payload) => {state.balances = payload},
  updateRefferalStats:(state, payload) => {state.refferalstats = payload}
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
            commit("updateToken", responseData.token);
            if (!localStorage.organisationId) localStorage.organisationId = responseData.organisations[0].organisationId
            else {
              if (responseData.organisations.filter(it => it.organisationId === localStorage.organisationId).length < 1)
                localStorage.organisationId = responseData.organisations[0].organisationId
            }
            commit("updateUserInfo", responseData);
          if(getters.getCurrentOrganization.organisationStatus == 'PENDING'){
            router.push({name:"Settings"}).then(() => {
              let model = BillsPaymentRequest.readCategories
              StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories, model)
            })
          }else{
            router.push({ name: "GetStarted" }).then(() => {
              let model = BillsPaymentRequest.readCategories
              StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories, model)
            })
          }
        }
        else Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => {
          commit("updateLoading", false)
        })
      }).catch((error) => {
        commit("updateLoading", false);
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
        localStorage.removeItem("organisationId")
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
  }
}