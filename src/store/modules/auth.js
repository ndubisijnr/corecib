import AuthService from "../../service/AuthService";
import CustomerService from "../../service/CustomerService";
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
import GetStarted from "../../views/dashboard/GetStarted";


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});


export const state = {
  form:false,
  isSwitching:false,
  userEditForm:false,
  token: null,
  loading: false,
  showBalance:false,
  loginLoading:false,
  userInfo: AuthenticationResponse.login,
  addedBanks:AccountPayoutResponse.readPayoutAccountByOrganisationId,
  screen: "register",
  allOrganisations:[],
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
  singleOrganisationUser:null,
  reminderForm:false,
  darkMode:'false',
  searchLoading:false

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
  updateDarkMode: (state, payload) => {state.darkMode = payload},
  updateReminderForm: (state, payload) => {state.reminderForm = payload},
  updateShowBalance:(state,payload) => {state.showBalance = payload},
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
  updateAllInvites:(state, payload) => {state.allInvites = payload},
  updateIsSwitching:(state, payload) => {state.isSwitching = payload},
  updateLoginLoading:(state,payload) => {state.loginLoading = payload},
  updateSearchLoading:(state,payload) => {state.searchLoading = payload}

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
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
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
        Toast.fire({ text: responseData.responseMessage, icon: 'success', })
          .then(() => { router.push({ name: "Logon" }) })
      } else {
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  createCustomer: ({ commit }, payload = AuthenticationRequest.createCustomerRequest) => {
    // console.log("Action")
    // console.log(payload)
    commit("updateLoading", true)
    return CustomerService.callCreateCustomerApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        Toast.fire({ text: "You have successfully accepted the invite from your organisation", icon: 'success', })
          .then(() => { router.push({ name: "Logon" }) })
      } else {
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
      }
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  validateLink: ({ commit }, payload = AuthenticationRequest.validateCustomerLinkRequest) => {
    // console.log("Action")
    // console.log(payload)
    commit("updateLoading", true)
    return CustomerService.callValidateLinkApi(payload).then(response => {
      let responseData = response.data;
      commit("updateLoading", false)
      if (responseData.responseCode === "00") {
        Toast.fire({ text: responseData.responseMessage, icon: 'success', })
          .then(() => { router.push({ name: "Logon" }) })
      }else if (responseData.responseCode === "01") {
         router.push({ name: "SignUpUser" });
      } else {
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => {
          router.push({ name: "Logon" })
        })
      }
    }).catch((error) => {
      commit("updateLoading", false);
    });
  },

  logon: ({ commit, state, dispatch,getters }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    payload.source = "WEB"
    return AuthService.callLogonApi(payload).then(response => {
        commit("updateLoading", false)
        let responseData = response.data;
        if (responseData.responseCode === "00") {
            localStorage.token = responseData.token;
            localStorage.customerId = responseData.customerId
            commit("updateToken", responseData.token);
            commit("updateUserInfo", responseData);
            StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationByUserId)
        }
        else Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => {
          commit("updateLoading", false)
        })
      }).catch((error) => {
        commit("updateLoading", false);
        Toast.fire({text:error, icon:"error"})
      });
  },

  resetTerminalPin: ({ commit, state, dispatch,getters }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    return AuthService.callResetTerminalPinApi(payload).then(response => {
        commit("updateLoading", false)
        let responseData = response.data;
        if (responseData.responseCode === "00") {
            console.log(responseData)
            Toast.fire({ text: responseData.responseMessage, icon: 'sucess', })
        }
        else {
          commit("updateLoading", false)
          Toast.fire({ text: responseData.responseMessage, icon: 'error', })
        }
      }).catch((error) => {
        commit("updateLoading", false);
        Toast.fire({text:error, icon:"error"})
      });
  },

  terminalLogout: ({ commit, state, dispatch,getters }, payload = AuthenticationRequest.login) => {
    commit("updateLoading", true)
    return AuthService.callTerminalLogOutApi(payload).then(response => {
        commit("updateLoading", false)
        let responseData = response.data;
        if (responseData.responseCode === "00") {
            console.log(responseData)
            Toast.fire({ text: responseData.responseMessage, icon: 'sucess', })

        }
        else Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => {
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
    commit("updateLoginLoading", true)
    return AuthService.callRevalidateApi(payload).then(response => {
      let responseData = response.data
      if (responseData.responseCode === "00") {
        if (router.currentRoute.meta.layout === 'auth') router.push({ name: "GetStarted" }).then(() => { })

            commit("updateUserInfo", responseData)
            commit("updateAllOrganisationList",responseData.organisations)

            StoreUtils.dispatch(StoreUtils.actions.preference.readPreferenceById).then()

            StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories)

            //read invites
            StoreUtils.dispatch(StoreUtils.actions.auth.readAllInvites).then()

            StoreUtils.dispatch(StoreUtils.actions.kycVerification.readAllKyc)


            //read Roles
            StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationRoles).then()

            StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions).then();

            StoreUtils.dispatch(StoreUtils.actions.auth.readDashboardStats).then()

            StoreUtils.dispatch(StoreUtils.actions.dispute.updateDisputes).then();

            StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets).then();


            StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualAccount);


            //clear console
            //Call in read documents actions
            StoreUtils.dispatch(StoreUtils.actions.document.readDocument).then();

            //Call in banks payout account//
            StoreUtils.dispatch(StoreUtils.actions.accountPayout.readAddedBanks).then();

            StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateReadBankList).then();

            StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationById).then()

            StoreUtils.dispatch(StoreUtils.actions.auth.readCustomerByOrganisation).then(() => {
              commit("updateLoginLoading", false)

            })

      }else if(responseData.responseCode === "115"){
        commit("updateTimedOut",true)
        commit("updateLoginLoading", false)
        StoreUtils.dispatch(StoreUtils.actions.auth.logOut)

      }
    }).catch(error => {commit("updateLoginLoading", false); console.log(error) })
  },

  changePassword:({commit}, payload) =>{
    commit("updateLoading", true)
    return AuthService.callChangePasswordApi(payload).then((response)=>{
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
        localStorage.removeItem('customerId')
        // localStorage.clear()
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
      else Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
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
        Toast.fire({ text: responseData.responseMessage, icon: 'error', }).then(() => { })
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
      commit("updateLoading", false)
      let responseData = response.data
      if(responseData.responseCode == "00"){
        commit("updateRefferalStats", responseData)
      }else {
        console.log(responseData.responseMessage)
      }
    }).catch(e => {
      console.log(e)
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
    commit("updateIsSwitching", false)
    return OrganizationService.callReadOrganisationByIdApi(payload).then((response) => {
      commit("updateIsSwitching", false)
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
        if(router.currentRoute.name !== "GetStarted"){
          router.push({name:"GetStarted"}).then(() => {
            location.reload()
          })
        }else{
          location.reload()
        }

      }else{
        Toast.fire({text:responseData.responseMessage, icon:'error'}).then()
      }
    }).catch(e => {
      commit("updateLoading", false)
      Toast.fire({title:e, icon:'error'}).then()

    })
  },

  readOrganisationByUserId: ({commit,state}, payload = OrganisationRequest.readOrganisationByUserId)=> {
    commit("updateLoginLoading", true)
    payload.customerId = localStorage.customerId
    return OrganizationService.callReadOrganisationByUserIdApi(payload).then(response => {
      let responseData = response.data
      if(responseData.responseCode === "00") {
        commit("updateAllOrganisationList", responseData.data)
        commit("updateCurrentOrganisation", responseData.data[0])
        // if user have organisation
        if(state.allOrganisations.length > 0){
          if (!localStorage.organisationId){
              localStorage.organisationId = state.currentOrganisation.organisationId
          }
          else {
            // console.log(state.allOrganisations.find(it => it.organisationId ) === localStorage.organisationId)
            }
            // if (state.allOrganisations.filter(it => it.organisationId) !== localStorage.organisationId){
            //   console.log(localStorage.organisationId)
            //   console.log(state.allOrganisations.filter(it => it.organisationId === localStorage.organisationId))
            //   // localStorage.organisationId = state.currentOrganisation.organisationId
            // }else{
            //   localStorage.organisationId = state.allOrganisations.filter(it => it.organisationId)
            //   console.log(state.allOrganisations.map(item => item.organisationId).filter(it => it.organisationId))
            //   console.log('hello')
            // }
          } else{
          router.push({name:"AddNewBusiness"}).then(() => {
            commit("updateForm", true)
          })
        }

          StoreUtils.dispatch(StoreUtils.actions.auth.readDashboardStats)


          //read transactions
          StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions)

          StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateReadBankList);

          //read virtualAccount
          StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualAccount);


          //read wallets
          StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets).then(() => {
            commit("updateLoginLoading", false)
          })

          //read dashboardStats

          StoreUtils.dispatch(StoreUtils.actions.accountPayout.readPayout)


          StoreUtils.dispatch(StoreUtils.actions.preference.readPreferenceById)

          //read invites
          StoreUtils.dispatch(StoreUtils.actions.auth.readAllInvites).then()

          StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories)

          //read Roles
          StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationRoles).then()

          //read disputes
          StoreUtils.dispatch(StoreUtils.actions.dispute.updateDisputes);

          //read kyc
          StoreUtils.dispatch(StoreUtils.actions.kycVerification.readAllKyc).then()


        //Call in read documents actions
          StoreUtils.dispatch(StoreUtils.actions.document.readDocument).then();


          //Call in banks payout account//
          StoreUtils.dispatch(StoreUtils.actions.accountPayout.readAddedBanks).then();

          //Call in banks list//
          StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateReadBankList).then();


          StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationById).then()


          StoreUtils.dispatch(StoreUtils.actions.auth.readCustomerByOrganisation).then()


        router.push({name:"GetStarted"}).then(() => {
          if(state.currentOrganisation.organisationStatus === 'PENDING'){
            commit("updateReminderForm", true)
          }
        })
      }
      // if user does not have any organisation

      else{
        Toast.fire({text:`${responseData.responseMessage}`, icon:'error'})
      }
    }).catch(e => {
      Toast.fire({text:e, icon:'error'})
      console.log(e)
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
        Toast.fire({text:responseData.responseMessage, icon:"error"})
        Object.keys(OrganisationRequest.inviteCustomer).forEach(key => {
          OrganisationRequest.inviteCustomer[key] = null
        })
      }
    }).catch(e => {
      commit("updateLoading", false)
      Toast.fire({text:e, icon:"error"})
    })
  },

  readCustomerByOrganisation:({commit, state}, payload=OrganisationRequest.readUsersByOrganisationId)=> {
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
      }else{
        Toast.fire({text:`${responseData.responseMessage} in reading organisation roles`, icon:'error'})
      }
    })
  },

  readAllInvites:({commit}, payload=OrganisationRequest.readInvite) => {
    payload.inviteOrganisationId = localStorage.organisationId
    commit("updateLoading", true)
    return OrganizationService.callReadInvite(payload).then(response => {
      commit("updateLoading", false)
      let responseData = response.data
      if(responseData.responseCode === "00"){
        commit("updateAllInvites", responseData.data)
      }else{
        commit("updateAllInvites",[])
      }
    }).catch(e => {
        commit("updateLoading", false)
        console.log(e)
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
        Toast.fire({text:responseData.responseMessage, icon:'success'})
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

