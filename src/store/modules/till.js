//import { mapState, mapActions } from 'vuex';
import tillService from "../../service/tillService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    till_loading: false,
    till_response: {},
    userInfo: {},
    till_errors: null,
    till_success: null,

}
export const getters = {
    getTillResponse: state => {
        // console.log("getter getTok")
        return state.till_response
    },


}
export const mutations = {
    updateTillResponse: (state, payload) => {
        state.till_response = payload
    },
    updateTillLoading: (state, payload) => {
        state.till_loading = payload
    },
    updateTillError: (state, payload) => {
        state.till_errors = payload
    },
    updateTillSuccess: (state, payload) => {
        state.till_success = payload
    },

}
export const actions = {
    tillCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTillLoading", true)
        commit("updateTillResponse", {});
        commit("updateTillError", null);
        commit("updateTillSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return tillService.callTillCreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTillResponse", responseData);
                    commit("updateTillSuccess", responseData.responseMessage);
                    commit("updateTillLoading", false);
                } else {
                    commit("updateTillLoading", false);
                    commit("updateTillError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTillLoading", false);
                commit("updateTillError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    tillRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTillLoading", true)
        commit("updateTillResponse", {});
        commit("updateTillError", null);
        commit("updateTillSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return tillService.callTillReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTillResponse", responseData);
                    commit("updateTillSuccess", responseData.responseMessage);
                    commit("updateTillLoading", false);
                } else {
                    commit("updateTillLoading", false);
                    commit("updateTillError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTillLoading", false);
                commit("updateTillError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    tillChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTillLoading", true)
        commit("updateTillResponse", {});
        commit("updateTillError", null);
        commit("updateTillSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return tillService.callTillCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTillResponse", responseData);
                    commit("updateTillSuccess", responseData.responseMessage);
                    commit("updateTillLoading", false);
                } else {
                    commit("updateTillLoading", false);
                    commit("updateTillError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTillLoading", false);
                commit("updateTillError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateTillCheckQueue: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTillLoading", true);
        commit("updateTillError", null);
        commit("updateTillSuccess", null);

        return tillService.callTillCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    tillService.callTillCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTillSuccess", responseData1.responseMessage);
                                commit("updateTillResponse", responseData1);
                                //router.push('alternative');
                                commit("updateTillLoading", false);

                            } else {
                                commit("updateTillLoading", false);
                                commit("updateTillError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTillLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTillLoading", false);
                    commit("updateTillError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTillLoading", false)
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