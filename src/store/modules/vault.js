//import { mapState, mapActions } from 'vuex';
import vaultService from "../../service/vaultService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    vault_loading: false,
    vault_response: {},
    userInfo: {},
    vault_errors: null,
    vault_success: null,

}
export const getters = {
    getVaultResponse: state => {
        // console.log("getter getTok")
        return state.vault_response
    },


}
export const mutations = {
    updateVaultResponse: (state, payload) => {
        state.vault_response = payload
    },
    updateVaultLoading: (state, payload) => {
        state.vault_loading = payload
    },
    updateVaultError: (state, payload) => {
        state.vault_errors = payload
    },
    updateVaultSuccess: (state, payload) => {
        state.vault_success = payload
    },

}
export const actions = {
    vaultCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateVaultLoading", true)
        commit("updateVaultResponse", {});
        commit("updateVaultError", null);
        commit("updateVaultSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return vaultService.callVaultCreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateVaultResponse", responseData);
                    commit("updateVaultSuccess", responseData.responseMessage);
                    commit("updateVaultLoading", false);
                } else {
                    commit("updateVaultLoading", false);
                    commit("updateVaultError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateVaultLoading", false);
                commit("updateVaultError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    vaultRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateVaultLoading", true)
        commit("updateVaultResponse", {});
        commit("updateVaultError", null);
        commit("updateVaultSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return vaultService.callVaultReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateVaultResponse", responseData);
                    commit("updateVaultSuccess", responseData.responseMessage);
                    commit("updateVaultLoading", false);
                } else {
                    commit("updateVaultLoading", false);
                    commit("updateVaultError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateVaultLoading", false);
                commit("updateVaultError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    vaultChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateVaultLoading", true)
        commit("updateVaultResponse", {});
        commit("updateVaultError", null);
        commit("updateVaultSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return vaultService.callVaultCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateVaultResponse", responseData);
                    commit("updateVaultSuccess", responseData.responseMessage);
                    commit("updateVaultLoading", false);
                } else {
                    commit("updateVaultLoading", false);
                    commit("updateVaultError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateVaultLoading", false);
                commit("updateVaultError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateVaultCheckQueue: ({ commit, dispatch, rootState }, payload) => {
        commit("updateVaultLoading", true);
        commit("updateVaultError", null);
        commit("updateVaultSuccess", null);

        return vaultService.callVaultCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    vaultService.callVaultCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateVaultSuccess", responseData1.responseMessage);
                                commit("updateVaultResponse", responseData1);
                                //router.push('alternative');
                                commit("updateVaultLoading", false);

                            } else {
                                commit("updateVaultLoading", false);
                                commit("updateVaultError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateVaultLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateVaultLoading", false);
                    commit("updateVaultError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateVultLoading", false)
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