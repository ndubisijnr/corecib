import AuthService from "../../service/AuthService";
import router from "../../routes/router";
import AuthenticationRequest from "../../model/request/AuthRequest";
import OrganizationService from "../../service/OrganizationService";
import ApikeyService from "../../service/ApikeyService";
import Swal from "sweetalert2";
import AuthenticationResponse from "../../model/reponse/AuthenticationResponse";

export const state = {
  token: null,
  loading: false,
  userInfo: AuthenticationResponse.login,
  screen: "register",
  passwordResetScreen: "email",
  stage: "dev"
}
export const getters = {
  getUserInfo: state => { return state.userInfo },
  getToken: state => { return state.token },
  getUserToken: state => { return localStorage.getItem('token') },
  getOrganizationId: state => { return localStorage.getItem('organizationId') }
}
export const mutations = {
  updateStage: (state, payload) => { state.stage = payload },
  updateLoading: (state, payload) => { state.loading = payload },
  updateToken: (state, payload) => { state.token = payload },
  updateUserInfo: (state, payload) => { state.userInfo = payload; },
  updateScreen: (state, payload) => { state.screen = payload; },
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
            .then(() => {  router.push({name:"Dashboard layout"}) })
      } else {
        Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  logon: ({ commit }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    return AuthService.callLogonApi(payload)
      .then(response => {
        commit("updateLoading", false)
        let responseData = response.data;
        if (responseData.responseCode === "00") {
          localStorage.token = responseData.token;
          commit("updateToken", responseData.token);
          if (!localStorage.orginazationId) localStorage.orginazationId = responseData.organisations[0].organisationId
          else{
            if (responseData.organisations.filter(it => it.orginazationId === localStorage.orginazationId).length < 1)
              localStorage.orginazationId = responseData.organisations[0].organisationId
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
    commit("updateLoading", true)
    return AuthService.callRevalidateApi(payload).then(response => {
      let responseData = response.data
      commit("updateLoading", false)
      if (responseData.responseCode === "00") commit("updateUserInfo", responseData)
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

  initiatePasswordReset: ({ commit, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    return AuthService.callInitiatePasswordResetApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        commit("updateSuccess", responseData.responseMessage)
        commit("passwordResetScreen", 'otp')
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
        router.push({ name: "Login" }).then(()=>{})
      }
      else {
        Swal.fire({ text:responseData.responseMessage, icon:'error',}).then(()=>{})
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  switchOrganisation: ({ commit }, paylaod) => {
    localStorage.organisationId = paylaod.organisationId
    location.reload()
  },
}