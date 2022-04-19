//import { mapState, mapActions } from 'vuex';
import AccountService from "../../service/AccountService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    account_loading: false,
    account_response: {},
    single_account: {},
    account_errors: null,
    account_success: null,
    account_errors1: null,
    account_success1: null,

}
export const getters = {
    getAccountResponse: state => {
        // console.log("getter getTok")
        return state.account_response
    },

}
export const mutations = {
    updateAccountResponse: (state, payload) => {
        state.account_response = payload
    },
    updateSingleAccountResponse: (state, payload) => {
        state.single_account = payload
    },
    updateAccountLoading: (state, payload) => {
        state.account_loading = payload
    },
    updateAccountError: (state, payload) => {
        state.account_errors = payload
    },
    updateAccountSuccess: (state, payload) => {
        state.account_success = payload
    },
    updateAccountError1: (state, payload) => {
        state.account_errors1 = payload
    },
    updateAccountSuccess1: (state, payload) => {
        state.account_success1 = payload
    },

}
export const actions = {
    accountRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateAccountResponse", {});
        commit("updateAccountError", null);
        commit("updateAccountSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callAccountReadAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    commit("updateAccountResponse", responseData);
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    accountChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateAccountResponse", {});
        commit("updateAccountError", null);
        commit("updateAccountSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callAccountCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    commit("updateAccountResponse", responseData);
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    accountCheckerType: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateAccountResponse", {});
        commit("updateAccountError1", null);
        commit("updateAccountSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callAccountCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    //commit("updateAccountResponse", responseData);
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess1", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    accountCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateAccountResponse", {});
        commit("updateAccountError", null);
        commit("updateAccountSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callAccountCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateAccountResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    commit("updateAccountResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    accountReadSingle: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
        commit("updateSingleAccountResponse", {});
        commit("updateAccountError", null);
        //commit("updateAccountSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callAccountReadSingleAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateAccountResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    commit("updateSingleAccountResponse", responseData);
                    //commit("updateAuthLoading", false);
                    //commit("updateAccountSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    createTerminal: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateAccountResponse", {});
        commit("updateAccountError", null);
        commit("updateAccountSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callCreateTerminalAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateAccountResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    // commit("updateAccountResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    accountUpdate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateSingleAccountResponse", {});
        commit("updateAccountError1", null);
        commit("updateAccountSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callAccountUpdateAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateAccountResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateSingleAccountResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess1", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    accountStatementRequest: ({ commit, dispatch, rootState }, payload) => {
        commit("updateAccountLoading", true)
            //commit("updateSingleAccountResponse", {});
        commit("updateAccountError", null);
        commit("updateAccountSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return AccountService.callRequestStatementAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateAccountResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateSingleAccountResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateAccountSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateAccountLoading", false);
                } else {
                    commit("updateAccountLoading", false);
                    commit("updateAccountError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateAccountLoading", false);
                commit("updateAccountError", error);
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