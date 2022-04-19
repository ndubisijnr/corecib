//import { mapState, mapActions } from 'vuex';
import InternalAccountService from "../../service/InternalAccountService";
import RoleService from "../../service/RoleService";
import swal from 'sweetalert2'
import router from "../../routes/router";

export const state = {
    token: null,
    internal_acc_loading: false,
    internal_acc_response: {},
    internal_acc_res: {},
    internal_acc_role: {},
    internal_acc_errors: null,
    internal_acc_success: null,
    internal_acc_errors1: null,
    internal_acc_success1: null,


}
export const getters = {
    getInternalAccResponse: state => {
        // console.log("getter getTok")
        return state.internal_acc_response
    },

}
export const mutations = {
    updateInternalAccResponse: (state, payload) => {
        state.internal_acc_response = payload
    },
    updateInternalAccRes: (state, payload) => {
        state.internal_acc_res = payload
    },
    updateInternalAccRole: (state, payload) => {
        state.internal_acc_role = payload
    },
    updateInternalAccLoading: (state, payload) => {
        state.internal_acc_loading = payload
    },
    updateInternalAccError: (state, payload) => {
        state.internal_acc_errors = payload
    },
    updateInternalAccSuccess: (state, payload) => {
        state.internal_acc_success = payload
    },

    updateInternalAccError1: (state, payload) => {
        state.internal_acc_errors1 = payload
    },
    updateInternalAccSuccess1: (state, payload) => {
        state.internal_acc_success1 = payload
    },

}
export const actions = {
    internalAccountRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateInternalAccLoading", true)
        commit("updateInternalAccResponse", {});
        commit("updateInternalAccError", null);
        commit("updateInternalAccSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return InternalAccountService.callInternalAccountReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateInternalAccResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateInternalAccSuccess", responseData.responseMessage);
                    //commit("updateInternalAccResponse", responseData);
                    //router.push('alternative');
                    commit("updateInternalAccLoading", false);
                } else {
                    commit("updateInternalAccLoading", false);
                    commit("updateInternalAccError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateInternalAccLoading", false);
                commit("updateInternalAccError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    internalAccountChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateInternalAccLoading", true)
        commit("updateInternalAccResponse", {});
        commit("updateInternalAccError", null);
        commit("updateInternalAccSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return InternalAccountService.callInternalAccountCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateInternalAccResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateInternalAccSuccess", responseData.responseMessage);
                    //commit("updateInternalAccResponse", responseData);
                    //router.push('alternative');
                    commit("updateInternalAccLoading", false);
                } else {
                    commit("updateInternalAccLoading", false);
                    commit("updateInternalAccError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateInternalAccLoading", false);
                commit("updateInternalAccError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    internalAccountCheckerType: ({ commit, dispatch, rootState }, payload) => {
        commit("updateInternalAccLoading", true)
            //commit("updateInternalAccResponse", {});
        commit("updateInternalAccError1", null);
        commit("updateInternalAccSuccess1", null);
        console.log(payload);
        //await dispatch('actionA')
        //console.log(payload.username);
        return InternalAccountService.callInternalAccountCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateInternalAccSuccess1", responseData.responseMessage);
                    //commit("updateInternalAccResponse", responseData);
                    //setTimeout(() => dispatch("internalAccountChecker", payload.checkerAll, { root: false }), 5000);

                    console.log(`{>>>>><<<<<<<<<internalAccountCheckerType ${responseData.responseMessage}`);
                    //commit("updateAuthLoading", false);

                    //commit("updateInternalAccResponse", responseData);
                    //router.push('alternative');
                    //commit("updateInternalAccLoading", false);
                } else {
                    commit("updateInternalAccLoading", false);
                    commit("updateInternalAccError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateInternalAccLoading", false);
                commit("updateInternalAccError1", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    async checkers({ commit, dispatch, rootState }, payload) {
        await dispatch("internalAccountChecker", payload.checkerAll, { root: false }); // wait for `actionA` to finish
        await dispatch("internalAccountCheckerType", payload, { root: false });
        //commit('gotOtherData', await getOtherData())
    },

    internalAccountCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateInternalAccLoading", true)
        commit("updateInternalAccResponse", {});
        commit("updateInternalAccError", null);
        commit("updateInternalAccSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return InternalAccountService.callInternalAccountCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateInternalAccResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateInternalAccSuccess", responseData.responseMessage);
                    //commit("updateInternalAccResponse", responseData);
                    //router.push('alternative');
                    commit("updateInternalAccLoading", false);
                } else {
                    commit("updateInternalAccLoading", false);
                    commit("updateInternalAccError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateInternalAccLoading", false);
                commit("updateInternalAccError", error);
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