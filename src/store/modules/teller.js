//import { mapState, mapActions } from 'vuex';
import tellerService from "../../service/tellerService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    teller_loading: false,
    teller_response: {},
    userInfo: {},
    teller_errors: null,
    teller_success: null,

}
export const getters = {
    getTellerResponse: state => {
        // console.log("getter getTok")
        return state.teller_response
    },


}
export const mutations = {
    updateResponse: (state, payload) => {
        state.teller_response = payload
    },
    updateLoading: (state, payload) => {
        state.teller_loading = payload
    },
    updateError: (state, payload) => {
        state.teller_errors = payload
    },
    updateSuccess: (state, payload) => {
        state.teller_success = payload
    },

}
export const actions = {
    tellerCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoading", true)
        commit("updateResponse", {});
        commit("updateError", null);
        commit("updateSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return tellerService.callTellerCreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateResponse", responseData);
                    commit("updateSuccess", responseData.responseMessage);
                    commit("updateLoading", false);
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
    tellerRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoading", true)
        commit("updateResponse", {});
        commit("updateError", null);
        commit("updateSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return tellerService.callTellerReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateResponse", responseData);
                    commit("updateSuccess", responseData.responseMessage);
                    commit("updateLoading", false);
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
    tellerChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoading", true)
        commit("updateResponse", {});
        commit("updateError", null);
        commit("updateSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return tellerService.callTellerCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateResponse", responseData);
                    commit("updateSuccess", responseData.responseMessage);
                    commit("updateLoading", false);
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
    updateTellerCheckQueue: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoading", true);
        commit("updateError", null);
        commit("updateSuccess", null);

        return tellerService.callTellerCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    tellerService.callTellerCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateSuccess", responseData1.responseMessage);
                                commit("updateResponse", responseData1);
                                //router.push('alternative');
                                commit("updateLoading", false);

                            } else {
                                commit("updateLoading", false);
                                commit("updateError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateLoading", false);
                    commit("updateError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateLoading", false)
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