//import { mapState, mapActions } from 'vuex';
import journalService from "../../service/journalService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    journal_loading: false,
    journal_response: {},
    journal_resp: {},
    userInfo: {},
    journal_errors: null,
    journal_success: null,

}
export const getters = {
    getJournalResponse: state => {
        // console.log("getter getTok")
        return state.journal_response
    },


}
export const mutations = {
    updateJournalResponse: (state, payload) => {
        state.journal_response = payload
    },
    updateJournalResponse1: (state, payload) => {
        Object.assign(state.journal_response, payload);

    },
    updateJournalResp: (state, payload) => {
        state.journal_resp = payload
    },
    updateJournalLoading: (state, payload) => {
        state.journal_loading = payload
    },
    updateJournalError: (state, payload) => {
        state.journal_errors = payload
    },
    updateJournalSuccess: (state, payload) => {
        state.journal_success = payload
    },

}
export const actions = {
    batchCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true)
            //commit("updateJournalResponse", {});
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return journalService.callBatchCreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateJournalResponse", responseData);
                    commit("updateJournalResponse1", { batchName: payload.batchName });
                    commit("updateJournalSuccess", responseData.responseMessage);
                    commit("updateJournalLoading", false);
                    router.push({ name: 'AddEntryToBatch' });
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateJournalLoading", false);
                commit("updateJournalError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    submitBatchEntry: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true)
            //commit("updateJournalResponse", {});
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return journalService.callSubmitBatchEntryApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateJournalResponse", responseData);
                    commit("updateJournalSuccess", responseData.responseMessage);
                    commit("updateJournalLoading", false);
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateJournalLoading", false);
                commit("updateJournalError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    loadData: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalResp", payload);
        router.push({ name: 'EditBatchEntry' });

    },
    submitBulkBatchEntry: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true)
            //commit("updateJournalResponse", {});
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return journalService.callSubmitBulkBatchEntryApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateJournalResponse", responseData);
                    commit("updateJournalSuccess", responseData.responseMessage);
                    commit("updateJournalLoading", false);
                    //router.push({ name: 'JournalOpen' });
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateJournalLoading", false);
                commit("updateJournalError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    /**&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7 */

    batchChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true)
            //commit("updateJournalResponse", {});
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return journalService.callBatchCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateJournalResponse", responseData);
                    commit("updateJournalSuccess", responseData.responseMessage);
                    commit("updateJournalLoading", false);
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateJournalLoading", false);
                commit("updateJournalError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateBatchChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true);
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);

        return journalService.callBatchCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    journalService.callBatchCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateJournalSuccess", responseData1.responseMessage);
                                commit("updateJournalResponse", responseData1);
                                //router.push('alternative');
                                commit("updateJournalLoading", false);

                            } else {
                                commit("updateJournalLoading", false);
                                commit("updateJournalError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateJournalLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateJournalLoading", false)
                commit("updateJournalError", error);
                alert(error)
                    // throw error;
            });

    },


    /*****&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    batchClose: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true)
            //commit("updateJournalResponse", {});
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return journalService.callBatchCloseApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateJournalResponse", responseData);
                    commit("updateJournalSuccess", responseData.responseMessage);
                    commit("updateJournalLoading", false);
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateJournalLoading", false);
                commit("updateJournalError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    batchRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true)
            //commit("updateJournalResponse", {});
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return journalService.callBatchReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateJournalResponse", responseData);
                    commit("updateJournalSuccess", responseData.responseMessage);
                    commit("updateJournalLoading", false);
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateJournalLoading", false);
                commit("updateJournalError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    editBatch: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateJournalLoading", true)
        commit("updateJournalResponse", payload);
        router.push({ name: 'AddEntryToBatch' });

    },

    updateBatchStatus: ({ commit, dispatch, rootState }, payload) => {
        commit("updateJournalLoading", true);
        commit("updateJournalError", null);
        commit("updateJournalSuccess", null);

        return journalService.callUpdateBatchStatusApi(payload.status)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    journalService.callBatchReadApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateJournalSuccess", responseData1.responseMessage);
                                commit("updateJournalResponse", responseData1);
                                //router.push('alternative');
                                commit("updateJournalLoading", false);

                            } else {
                                commit("updateJournalLoading", false);
                                commit("updateJournalError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateJournalLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateJournalLoading", false);
                    commit("updateJournalError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateJournalLoading", false)
                commit("updateJournalError", error);
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