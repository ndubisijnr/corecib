import GLLevelService from "../../service/GLLevelService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    gl_loading: false,
    gl_response: {},
    gl_response1: {},
    userInfo: {},
    gl_errors: null,
    gl_success: null,

}
export const getters = {
    getGLResponse: state => {
        // console.log("getter getTok")
        return state.gl_response
    },


}
export const mutations = {
    updateGLResponse: (state, payload) => {
        state.gl_response = payload
    },
    updateGLResponse1: (state, payload) => {
        state.gl_response1 = payload
    },
    updateGLLoading: (state, payload) => {
        state.gl_loading = payload
    },
    updateGLError: (state, payload) => {
        state.gl_errors = payload
    },
    updateGLSuccess: (state, payload) => {
        state.gl_success = payload
    },


}
export const actions = {
    updatePage: ({ commit, dispatch, rootState }, payload) => {
        commit("updatePageResponse", payload.page)
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    glLevel1Create: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true)
            //commit("updateGLResponse", {});
        commit("updateGLError", null);
        commit("updateGLSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return GLLevelService.callglLevel1CreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateGLResponse", responseData);
                    commit("updateGLSuccess", responseData.responseMessage);
                    commit("updateGLLoading", false);
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateGLLoading", false);
                commit("updateGLError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    glLevel1Read: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true)
            //commit("updateGLResponse", {});
        commit("updateGLError", null);
        commit("updateGLSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return GLLevelService.callglLevel1ReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateGLResponse", responseData);
                    commit("updateGLSuccess", responseData.responseMessage);
                    commit("updateGLLoading", false);
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateGLLoading", false);
                commit("updateGLError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    glLevel1Checker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true)
            //commit("updateGLResponse", {});
        commit("updateGLError", null);
        commit("updateGLSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return GLLevelService.callglLevel1CheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateGLResponse", responseData);
                    commit("updateGLSuccess", responseData.responseMessage);
                    commit("updateGLLoading", false);
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateGLLoading", false);
                commit("updateGLError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    updateglLevel1Checker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true);
        commit("updateGLError", null);
        commit("updateGLSuccess", null);

        return GLLevelService.callglLevel1CheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    GLLevelService.callglLevel1CheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateGLSuccess", responseData1.responseMessage);
                                commit("updateGLResponse", responseData1);
                                //router.push('alternative');
                                commit("updateGLLoading", false);

                            } else {
                                commit("updateGLLoading", false);
                                commit("updateGLError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateGLLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateGLLoading", false)
                commit("updateGLError", error);
                alert(error)
                    // throw error;
            });

    },
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ///******************************************************************************************* */

    glLevel2Create: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true)
            //commit("updateGLResponse", {});
        commit("updateGLError", null);
        commit("updateGLSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return GLLevelService.callglLevel2CreateApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateGLResponse", responseData);
                    commit("updateGLSuccess", responseData.responseMessage);
                    commit("updateGLLoading", false);
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateGLLoading", false);
                commit("updateGLError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    glLevel2Read: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true)
            //commit("updateGLResponse", {});
        commit("updateGLError", null);
        commit("updateGLSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return GLLevelService.callglLevel2ReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateGLResponse", responseData);
                    commit("updateGLSuccess", responseData.responseMessage);
                    commit("updateGLLoading", false);
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateGLLoading", false);
                commit("updateGLError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    glLevel2Checker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true)
            //commit("updateGLResponse", {});
        commit("updateGLError", null);
        commit("updateGLSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return GLLevelService.callglLevel2CheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateGLResponse", responseData);
                    commit("updateGLSuccess", responseData.responseMessage);
                    commit("updateGLLoading", false);
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateGLLoading", false);
                commit("updateGLError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    updateglLevel2Checker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateGLLoading", true);
        commit("updateGLError", null);
        commit("updateGLSuccess", null);

        return GLLevelService.callglLevel2CheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    GLLevelService.callglLevel2CheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateGLSuccess", responseData1.responseMessage);
                                commit("updateGLResponse", responseData1);
                                //router.push('alternative');
                                commit("updateGLLoading", false);

                            } else {
                                commit("updateGLLoading", false);
                                commit("updateGLError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateGLLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateGLLoading", false);
                    commit("updateGLError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateGLLoading", false)
                commit("updateGLError", error);
                alert(error)
                    // throw error;
            });

    },


    //********************************************************************************************* */



}

export default {
    state,
    actions,
    mutations,
    getters
};