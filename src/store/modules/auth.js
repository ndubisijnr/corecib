import AuthService from "../../service/AuthService";
import router from "../../router";
import AuthenticationRequest from "../../model/request/AuthRequest";
import Swal from "sweetalert2";
import BaseResponse from "../../model/reponse/BaseResponse";
import OrganisationRequest from "../../model/request/OrganisationRequest";
import OrganizationService from "../../service/OrganizationService";

export const state = {
  token: null,
  loading: false,
  userInfo: BaseResponse.list,
  screen: "register",
  passwordResetScreen: "email",
  stage: null
}
export const getters = {
  getUserInfo: state => { return state.userInfo },
  getToken: state => { return state.token },
  getUserToken: state => { return localStorage.token },
  getOrganizationId: state => { return localStorage.organisationId },
  getCurrentOrganization: state => {
    console.log(state.userInfo.organisations)
    console.log(localStorage.organisationId)
    if (state.userInfo.organisations == null) return {}
    return state.userInfo.organisations.filter(it => it.organisationId.toString() === localStorage.organisationId).length < 1
        ? {}
        : state.userInfo.organisations.filter(it => it.organisationId.toString() === localStorage.organisationId)[0]
  },
  getStage: (state, getters) => {
    return getters.getCurrentOrganization.organisationStage
  }
}
export const mutations = {
  updateStage: (state, payload) => { state.stage = payload },
  updateLoading: (state, payload) => { state.loading = payload },
  updateToken: (state, payload) => { state.token = payload },
  updateUserInfo: (state, payload) => { state.userInfo = payload; },
  updateScreen: (state, payload) => { state.screen = payload; },
  updateStage:(state, payload) => {state.stage = payload},
  updatePasswordResetScreen: (state, payload) => { state.passwordResetScreen = payload; },
}
export const actions = {
  initialEnrollment: ({ commit }, payload = AuthenticationRequest.initiateEnrollment) => {
    commit("updateLoading", true)
    return AuthService.callInitiateEnrollmentApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateScreen", 'otp')
      } else {
        Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  completeEnrollment: ({ commit }, payload = AuthenticationRequest.completeEnrollment) => {
    commit("updateLoading", true)
    return AuthService.callCompleteEnrollmentApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        Swal.fire({ text:responseData.responseMessage, icon:'success',})
            .then(() => {  router.push({name:"GetStarted"}) })
      } else {
        Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  logon: ({ commit, dispatch, rootState }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    return AuthService.callLogonApi(payload)
      .then(response => {
        commit("updateLoading", false)
        let responseData = response.data;
        if (responseData.responseCode === "00") {
          localStorage.token = responseData.token;
          commit("updateToken", responseData.token);
          if (!localStorage.organisationId) localStorage.organisationId = responseData.organisations[0].organisationId
          else{
            if (responseData.organisations.filter(it => it.organisationId === localStorage.organisationId).length < 1)
              localStorage.organisationId = responseData.organisations[0].organisationId
          }
          commit("updateUserInfo", responseData);
          router.push({name: "GetStarted"}).then(()=>{})
         }
        else Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
      }).catch((error) => {
        commit("updateLoading", false);
        console.log(error)
      });
  },

  resendOtp: ({ commit, dispatch, rootState, state }, payload) => {
    commit("updateLoading", true)
    return AuthService.callResendOtpApi(payload).then(response => {
      commit("updateLoading", false)
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  revalidateUser: ({ commit, dispatch, rootState }, payload) => {
    // commit("updateLoading", true)
    return AuthService.callRevalidateApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        if (this.$route.meta.layout === 'auth') router.push({name:"GetStarted"}).then(()=>{})
        commit("updateUserInfo", responseData)
      }
    }).catch(error => { commit("updateLoading", false); console.log(error)  })
  },

  logOut: ({ commit, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    return AuthService.callLogOutApi(payload)
      .then(() => {
        commit("updateLoading", false)
        localStorage.token = null;
        commit("updateAuthToken", null);
        commit("updateUserInfo", null);
        commit("updateLoading", false);
        router.push({ name: "Login" }).then(()=>{})
      })
      .catch((error) => {
        commit("updateLoading", false);
        console.log(error)
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
      else Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error);
    });
  },

  completePasswordReset: ({ commit, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    return AuthService.callCompletePasswordResetApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        router.push({ name: "Logon" }).then(()=>{})
      }
      else {
        Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  updateStage: ({commit,state}, paylaod = OrganisationRequest.switchStage) => {
    commit('updateLoading',true)
    return OrganizationService.callOrganisationStageApi(paylaod).then(response => {
      let responseData = response.data
      if(responseData.responseCode == "00"){
        commit("updateLoading", false)
        commit("updateStage", responseData.data[0].organisationStage)
        console.log(state.stage)
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
   
  },
}