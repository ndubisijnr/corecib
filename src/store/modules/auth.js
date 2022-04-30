import AuthService from "../../service/AuthService";
import router from "../../router";
import AuthenticationRequest from "../../model/request/AuthRequest";
import Swal from "sweetalert2";
import OrganisationRequest from "../../model/request/OrganisationRequest";
import OrganizationService from "../../service/OrganizationService";
import AuthenticationResponse from "../../model/reponse/AuthenticationResponse";

export const state = {
  token: null,
  loading: false,
  userInfo: AuthenticationResponse.login,
  screen: "register",
  passwordResetScreen: "email",
  Orginisation:{}
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
  updateToken: (state, payload) => { state.token = payload },
  updateUserInfo: (state, payload) => { state.userInfo = payload; },
  updateScreen: (state, payload) => { state.screen = payload; },
  updatePasswordResetScreen: (state, payload) => { state.passwordResetScreen = payload; },
  updateOrganisation:(state, payload) => {state.organisation = payload}
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
        Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
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
        Swal.fire({ text: responseData.responseMessage, icon: 'success', })
          .then(() => { router.push({ name: "GetStarted" }) })
      } else {
        Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  logon: ({ commit, state }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    return AuthService.callLogonApi(payload)
      .then(response => {
        let responseData = response.data;
        if (responseData.responseCode === "00") {
          commit("updateLoading", false)
          localStorage.token = responseData.token;
          commit("updateToken", responseData.token);
          console.log(state.token)
          if (!localStorage.organisationId) localStorage.organisationId = responseData.organisations[0].organisationId
          else {
            if (responseData.organisations.filter(it => it.organisationId === localStorage.organisationId).length < 1)
              localStorage.organisationId = responseData.organisations[0].organisationId
          }
          commit("updateUserInfo", responseData);
          router.push({ name: "GetStarted" }).then(() => { })
        }
        else Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => {     
                commit("updateLoading", false)
      })
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
        if (router.currentRoute.meta.layout === 'auth') router.push({name:"GetStarted"}).then(()=>{})
        commit("updateUserInfo", responseData)
      }
    }).catch(error => { commit("updateLoading", false); console.log(error) })
  },

  logOut: ({ commit, dispatch, rootState }, payload) => {
    commit("updateLoading", true)
    return AuthService.callLogOutApi(payload)
      .then(() => {
        commit("updateLoading", false)
        localStorage.clear()
        commit("updateAuthToken", null);
        commit("updateUserInfo", null);
        commit("updateLoading", false);
        window.location = "/"
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
      else Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
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
        router.push({ name: "Logon" }).then(() => { })
      }
      else {
        Swal.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });
  },

  updateStage: ({ commit, state }, paylaod = OrganisationRequest.switchStage) => {
    commit('updateLoading', true)
    return OrganizationService.callOrganisationStageApi(paylaod).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateLoading", false)
        commit("updateStage", responseData.data[0].organisationStage)
        window.location.reload()
      }
    }).catch((error) => {
      commit("updateLoading", false);
      console.log(error)
    });

  },

  updateOrganisation:({commit}, payload = OrganisationRequest.updateOrganisation) => {
    commit('updateLoading', true)
    return OrganizationService.callUpdateOrganisationApi(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode == "00"){
        commit("updateLoading", false)
        commit("updateOrginasation", responseData)
        Swal.fire({ text: responseData.responseMessage, icon: 'success', })
      }else{
        commit("updateLoading", false)
        Swal.fire({ text: responseData.responseMessage, icon: 'error', })
      }
    }).catch((error) => {
      commit("updateLoading", false)
      Swal.fire({ text: error, icon: 'error', })

    })

  }
}