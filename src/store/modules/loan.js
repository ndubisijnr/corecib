//import { mapState, mapActions } from 'vuex';
import loanService from "../../service/loanService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    loan_loading: false,
    loan_response: {},
    loan_response1: {},
    userInfo: {},
    loan_errors: null,
    loan_success: null,
    loan_success1: null,

}
export const getters = {
    getLoanResponse: state => {
        // console.log("getter getTok")
        return state.loan_response
    },


}
export const mutations = {
    updateLoanResponse: (state, payload) => {
        state.loan_response = payload
    },
    updateLoanResponse1: (state, payload) => {
        state.loan_response1 = payload
    },
    updateLoanLoading: (state, payload) => {
        state.loan_loading = payload
    },
    updateLoanError: (state, payload) => {
        state.loan_errors = payload
    },
    updateLoanSuccess: (state, payload) => {
        state.loan_success = payload
    },
    updateLoanSuccess1: (state, payload) => {
        state.loan_success1 = payload
    },

}
export const actions = {
    loanCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoanLoading", true)
        commit("updateLoanResponse", {});
        commit("updateLoanError", null);
        commit("updateLoanSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return loanService.callLoanCreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateLoanResponse", responseData);
                    commit("updateLoanSuccess", responseData.responseMessage);
                    commit("updateLoanLoading", false);
                } else {
                    commit("updateLoanLoading", false);
                    commit("updateLoanError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateLoanLoading", false);
                commit("updateLoanError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    loanRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoanLoading", true)
        commit("updateLoanResponse", {});
        commit("updateLoanError", null);
        commit("updateLoanSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return loanService.callLoanReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateLoanResponse", responseData);
                    commit("updateLoanSuccess", responseData.responseMessage);
                    commit("updateLoanLoading", false);
                } else {
                    commit("updateLoading", false);
                    commit("updateError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateLoading", false);
                commit("updateError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    loanAmortization: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoanLoading", true)
            //commit("updateLoanResponse", {});
        commit("updateLoanError", null);
        commit("updateLoanSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return loanService.callLoanAmortizationApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateLoanResponse1", responseData);
                    commit("updateLoanSuccess", responseData.responseMessage);
                    commit("updateLoanLoading", false);
                    router.push({ name: "AmortizationSchedule" });
                } else {
                    commit("updateLoanLoading", false);
                    commit("updateLoanError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateLoanLoading", false);
                commit("updateLoanError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    loanUpdateStatus: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoanLoading", true)
            //commit("updateLoanResponse", {});
        commit("updateLoanError", null);
        commit("updateLoanSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return loanService.callLoanUpdateStatusApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateLoanResponse1", responseData);
                    commit("updateLoanSuccess1", responseData.responseMessage);
                    commit("updateLoanLoading", false);
                    //router.push({ name: "AmortizationSchedule" });
                } else {
                    commit("updateLoanLoading", false);
                    commit("updateLoanError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateLoanLoading", false);
                commit("updateLoanError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    loanUpdateStatusApprove: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoanLoading", true);
        commit("updateLoanError", null);
        commit("updateLoanSuccess", null);

        return loanService.callLoanUpdateStatusApi(payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    loanService.callLoanReadApi({
                            loanBankCode: payload.loanBankCode
                        })
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateLoanSuccess", responseData1.responseMessage);
                                commit("updateLoanResponse", responseData1);
                                //router.push('alternative');
                                commit("updateLoanLoading", false);

                            } else {
                                commit("updateLoanLoading", false);
                                commit("updateLoanError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateLoanLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateLoanLoading", false);
                    commit("updateLoanError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateLoanLoading", false)
                alert(error)
                    // throw error;
            });

    },
}

export default {
    state,
    actions,
    mutations,
    getters
};