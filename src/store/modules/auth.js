import AuthService from "../../service/AuthService";
import router from "../../routes/router";
import EnrollmentRequest from "@/model/request/enrollmentRequest";
import EnrollmentResponse from "@/model/reponse/enrollmentResponse";
import OrganizationService from "../../service/OrganizationService";
import ApikeyService from "../../service/ApikeyService";
import Swal from "sweetalert2";

export const state = {
  token: null,
  resendOpt: false,
  loading: false,
  apiKey: {},
  otp: "",
  enrollForm: "first",
  response: new EnrollmentResponse().enrollmentDataResponse(),
  userInfo: {},
  organisation: {},
  errors: null,
  success: null,
  userOrganisations: [],
  nan: "old",
  switchmode: false

}
export const getters = {
  getResponse: state => {
    // console.log("getter getTok")
    return state.response
  },
  getUserInfo: state => {
    // console.log("getter getTok")
    return state.userInfo
  },
  getTok: state => {
    // console.log("getter getTok")
    return state.token
  },
  getApi: state => {
    // console.log("getter getTok")
    return state.readApikey
  },
  getUserToken: state => {
    // console.log("getter getTok")
    return localStorage.getItem('token')
  },
  organizationId: state => {
    return state.userInfo
  }
}
export const mutations = {
  updateResponse: (state, payload) => {
    state.response = payload
  },
  updateNan: (state, payload) => {
    state.nan = payload
  },
  updateApiKey: (state, paylaod) => {
    state.apiKey = paylaod
  },
  updateSwitchmode: (state, payload) => {
    state.switchmode = payload
  },
  updateOtp: (state, payload) => {
    state.otp = payload
  },
  updateUserOrganisations: (state, payload) => {
    state.userOrganisations = payload
  },
  updateAuthLoading: (state, payload) => {
    state.loading = payload
  },

  updateResendOtp: (state, payload) => {
    state.payload = payload
  },

  updateOrganisation: (state, payload) => {
    state.organisation = payload
  },
  updateAuthToken: (state, payload) => {
    // console.log("mutation updateAuthToken ==>>", payload)
    state.token = payload
  },
  updateEnrollForm: (state, payload) => {
    // console.log("mutation updateAuthToken ==>>", payload)
    state.enrollForm = payload
  },
  updateUserInfo: (state, payload) => {
    console.log("Userree");
    state.userInfo = payload;
  },
  updateError: (state, payload) => {
    state.errors = payload
  },
  updateSuccess: (state, payload) => {
    state.success = payload
  },

}
export const actions = {

  switchMode: ({ commit }, paylaod) => {
    if (paylaod == false) {
      commit("updateSwitchmode", true)
      console.log('true')
    } else {
      commit("updateSwitchmode", false)
      console.log('false')
    }
  },

  completeEnrollment: ({ commit, dispatch, rootState, state }, payload) => {
    commit("updateAuthLoading", true)
    commit("updateResponse", {});
    commit("updateError", null);

    return AuthService.callCompleteEnrollmentApi(payload).then(response => {
      let responseData = response.data;
      if (responseData.responseCode === "00") {
        commit("updateAuthLoading", false)
        commit("updateResponse", payload)
        commit("updateSuccess", responseData.responseMessage)
        Swal.fire({
          title:responseData.responseMessage,
          icon:'success',
        }).then(() => {
          router.push({name:"Dashboard layout"})
         
        })
      }
      else {
        commit("updateAuthLoading", false)
        commit("updateError", responseData.responseMessage)
      }
    }).catch((error) => {
      commit("updateAuthLoading", false);
      commit("updateError", error);
      // throw error;
      // return Promise.reject(error)
    });
  },


  resendOtp: ({ commit, dispatch, rootState, state }, payload) => {
    commit("updateSuccess", null);
    commit("updateError", null);
    commit("updateAuthLoading", true)
    return AuthService.callResendOtpApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAuthLoading", false)
        commit("updateSuccess", responseData.responseMessage)
        commit("updateEnrollForm", "second")
      }
      else {
        commit("updateError", responseData.responseMessage)
        commit("updateAuthLoading", false)
      }
    }).catch((error) => {
      commit("updateAuthLoading", false);
      commit("updateError", error);
      // throw error;
      // return Promise.reject(error)
    });

  },
  initialEnrollment: ({ commit, dispatch, rootState, state }, payload = new EnrollmentRequest().enrollmentRequest()) => {
    commit("updateAuthLoading", true)
    commit("updateResponse", {});
    commit("updateError", null);
    return AuthService.callInitiateEnrollmentApi(payload).then(response => {
      let responseData = response.data;
      if (responseData.responseCode === "00") {
        commit("updateAuthLoading", false)
        commit("updateEnrollForm", 'second')
        commit("updateResponse", payload)
        commit("updateSuccess", responseData.responseMessage)
      } else {
        commit("updateAuthLoading", false)
        commit("updateError", responseData.responseMessage)
      }

    })
      .catch((error) => {
        commit("updateAuthLoading", false);
        commit("updateError", error);
        // throw error;
        // return Promise.reject(error)
      });
  },
  logon: ({ commit, dispatch, rootState }, payload) => {
    commit("updateAuthLoading", true)
    commit("updateError", null);
    commit("updateSuccess", null);
    // console.log(payload.username);
    return AuthService.callLogonApi(payload)
      .then(response => {
        let responseData = response.data;
        if (responseData.responseCode === "00") {
          localStorage.token = responseData.token;
          localStorage.orginazation = responseData.organisations[0].organisationId
          localStorage.username = responseData.customerFirstName;
          commit("updateUserOrganisations", responseData.organisations);
          commit("updateAuthToken", responseData.token);
          commit("updateUserInfo", responseData);
          router.push({ name: "GetStarted" })

          let paylaod2 = {
            apikeyOrganisationId: responseData.customerId
          }
          commit("updateSuccess", responseData.responseMessage);
          return ApikeyService.callReadApiKey(paylaod2).then(response2 => {
            commit("updateApiKey", response2.data.data)
            commit("updateAuthLoading", false);
          }).then(() => {
          })

        } 
        else {
          commit("updateAuthLoading", false);
          commit("updateError", responseData.responseMessage);
          console.log(responseData.responseMessage);
          //swal('Error!', responseData.responseMessage, 'error').then();
        }

      })
      .catch((error) => {
        commit("updateAuthLoading", false);
        commit("updateError", error);
        console.log(error)
      });
  },

  revalidateUser: ({ commit, dispatch, rootState }, payload) => {
    return AuthService.callRevalidateApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        commit("updateAuthLoading",)
        commit("updateUserInfo", responseData)
      }
    }).catch(error => {
      commit("updateError", error)
    })
  },
  logOut: ({ commit, dispatch, rootState }, payload) => {
    commit("updateAuthLoading", true)
    //commit("updateResponse", {});
    commit("updateError", null);
    commit("updateSuccess", null);
    console.log(payload);
    //console.log(payload.username);
    return AuthService.callLogOutApi(payload)
      .then(response => {
        let responseData = response.data;
        commit("updateResponse", responseData);
        if (responseData.responseCode === "00") {
          localStorage.token = '';
          localStorage.username = '';
          commit("updateAuthToken", '');
          commit("updateUserInfo", {});
          // eslint-disable-next-line no-undef
          //store.dispatch("bankList", { request: "banklist" }, { root: true })
          /*   // eslint-disable-next-line no-unused-vars
             .then(res => {*/
          //dispatch("bankList", { request: "banklist" }, { root: false });
          commit("updateAuthLoading", false);
          console.log(responseData.responseMessage);
          //commit("updateAuthLoading", false);
          commit("updateSuccess", responseData.responseMessage);
          //router.push('alternative');
          router.push({ name: "Login" });

        } else {
          commit("updateAuthLoading", false);
          commit("updateError", responseData.responseMessage);
          console.log(responseData.responseMessage);
          //swal('Error!', responseData.responseMessage, 'error').then();
        }

      })
      .catch((error) => {
        commit("updateAuthLoading", false);
        commit("updateError", error);
        // throw error;
        // return Promise.reject(error)
      });
  },

  initiatePasswordRest: ({ commit, dispatch, rootState }, payload) => {
    commit("updateAuthLoading", true)
    commit("updateError", null);
    commit("updateSuccess", null);
    return AuthService.callInitiatePasswordResetApi(payload).then(response => {
      let responseData = response.data;
      if (responseData.responseCode === "00") {
        commit("updateAuthLoading", false)
        commit("updateSuccess", responseData.responseMessage)
        commit("updateEnrollForm", 'second')
      }
      else {
        commit("updateAuthLoading", false)
        commit("updateError", responseData.responseMessage)
      }
    })
      .catch((error) => {
        commit("updateAuthLoading", false);
        commit("updateError", error);
        // throw error;
        // return Promise.reject(error)
      });
  },
  completePasswordRest: ({ commit, dispatch, rootState }, payload) => {
    commit("updateAuthLoading", true)
    commit("updateError", null);
    commit("updateSuccess", null);
    return AuthService.callCompletePasswordResetApi(payload).then(response => {
      let responseData = response.data;
      if (responseData.responseCode === "00") {
        commit("updateAuthLoading", false)
        commit("updateSuccess", responseData.responseMessage)
        setTimeout(() => {
          router.push({ name: "Login" })
        }, 2000)
      }
      else {
        commit("updateAuthLoading", false)
        commit("updateError", responseData.responseMessage)
      }
    })
      .catch((error) => {
        commit("updateAuthLoading", false);
        commit("updateError", error);
        // throw error;
        // return Promise.reject(error)
      });
  },

  switchOrganisation: ({ commit, dispatch, rootState }, paylaod) => {
    commit("updateAuthLoading", true);
    commit("updateError", null);
    commit("updateSuccess", null);
    return OrganizationService.callReadOrganisationByIdApi(paylaod).then(response => {
      let responseData = response.data
      if (responseData.responseCode == "00") {
        commit("updateAuthLoading", false);
        commit("updateNan", "new");
        commit("updateOrganisation", responseData)
        commit("updateSuccess", responseData.responseMessage);
      }
      else {
        commit("updateAuthLoading", false);
        commit("updateError", responseData.responseMessage);
        console.log(state.errors)
      }
    }).catch((error) => {
      commit("updateAuthLoading", false);
      commit("updateError", error);
      // throw error;
      // return Promise.reject(error)
    });
  },
}

export default {
  state,
  actions,
  mutations,
  getters
};
