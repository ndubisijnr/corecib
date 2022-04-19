import CheckerService from "../../service/CheckerService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    checker_loading: false,
    checker_response: {},
    checker_response1: {},
    userInfo: {},
    checker_errors: null,
    checker_success: null,

}
export const getters = {
    getCheckerResponse: state => {
        // console.log("getter getTok")
        return state.checker_response
    },


}
export const mutations = {
    updateCheckerResponse: (state, payload) => {
        state.checker_response = payload
    },
    updateCheckerResponse1: (state, payload) => {
        state.checker_response1 = payload
    },
    updateCheckerLoading: (state, payload) => {
        state.checker_loading = payload
    },
    updateCheckerError: (state, payload) => {
        state.checker_errors = payload
    },
    updateCheckerSuccess: (state, payload) => {
        state.checker_success = payload
    },


}
export const actions = {

    readCheckerQueue: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCheckerLoading", true)
            //commit("updateCheckerResponse", {});
        commit("updateCheckerError", null);
        commit("updateCheckerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CheckerService.callReadCheckerQueueApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateCheckerResponse", responseData);
                    commit("updateCheckerSuccess", responseData.responseMessage);
                    commit("updateCheckerLoading", false);
                } else {
                    commit("updateCheckerLoading", false);
                    commit("updateCheckerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCheckerLoading", false);
                commit("updateCheckerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    authorizeCheckerQueue: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCheckerLoading", true);
        commit("updateCheckerError", null);
        commit("updateCheckerSuccess", null);

        return CheckerService.callAuthorizeCheckerQueueApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    CheckerService.callReadCheckerQueueApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateCheckerSuccess", responseData1.responseMessage);
                                commit("updateCheckerResponse", responseData1);
                                //router.push('alternative');
                                commit("updateCheckerLoading", false);

                            } else {
                                commit("updateCheckerLoading", false);
                                commit("updateCheckerError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateCheckerLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateCheckerLoading", false);
                    commit("updateCheckerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateCheckerLoading", false)
                commit("updateCheckerError", error);
                alert(error)
                    // throw error;
            });

    },
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ///******************************************************************************************* */

    //********************************************************************************************* */

}

export default {
    state,
    actions,
    mutations,
    getters
};