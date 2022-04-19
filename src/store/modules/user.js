//import { mapState, mapActions } from 'vuex';
import UserService from "../../service/UserService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    user_loading: false,
    user_loader: false,
    user_response: {},
    user_single_read: {},
    users_reset: {},
    user_error: null,
    user_reset_error: null,
    user_success: null,
    user_reset_success: null

}
export const getters = {
    getUserResponse: state => {
        // console.log("getter getTok")
        return state.user_response
    },

}
export const mutations = {

    updateUserResponse: (state, payload) => {
        state.user_response = payload
    },
    userUserResetResponse: (state, payload) => {
        state.users_reset = payload
    },
    updateUserSingleResponse: (state, payload) => {
        state.user_single_read = payload
    },
    updateUserLoading: (state, payload) => {
        state.user_loading = payload
    },
    updateUserLoader: (state, payload) => {
        state.user_loader = payload
    },
    updateUserError: (state, payload) => {
        state.user_error = payload
    },
    updateUserResetError: (state, payload) => {
        state.user_reset_error = payload
    },
    updateUserSuccess: (state, payload) => {
        state.user_success = payload
    },
    updateRUserSuccess: (state, payload) => {
        state.user_reset_success = payload
    },

}
export const actions = {
    userRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateUserLoading", true)
        commit("updateUserResponse", {});
        commit("updateUserError", null);
        commit("updateUserSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return UserService.callUserReadAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    commit("updateUserResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateUserSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateUserLoading", false);
                    //router.push('create-user');
                } else {
                    commit("updateUserLoading", false);
                    commit("updateUserError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateUserLoading", false);
                commit("updateUserError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    userChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateUserLoading", true)
            //if (payload.task !== "authorize") {
        commit("updateUserResponse", {});
        //}
        commit("updateUserError", null);
        commit("updateUserSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return UserService.callUserCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateUserResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //if (payload.task !== "authorize") {
                    commit("updateUserResponse", responseData);
                    // }
                    commit("updateUserSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateUserLoading", false);
                    //router.push('create-user');
                } else {
                    commit("updateUserLoading", false);
                    commit("updateUserError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateUserLoading", false);
                commit("updateUserError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    userCheckerAuth: ({ commit, dispatch, rootState }, payload) => {
        commit("updateUserLoading", true)
        commit("updateUserError", null);
        commit("updateUserSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return UserService.callUserCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateUserResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(`>>>}}}}{{{{{${responseData.responseMessage}`);
                    //commit("updateAuthLoading", false);
                    //commit("updateUserResponse", responseData);

                    commit("updateUserSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateUserLoading", false);
                    //router.push('create-user');
                } else {
                    commit("updateUserLoading", false);
                    commit("updateUserError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateUserLoading", false);
                commit("updateUserError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    userCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateUserLoading", true)
        commit("updateUserResponse", {});
        commit("updateUserError", null);
        commit("updateUserSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return UserService.callUserCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateUserResponse", responseData);
                    commit("updateUserSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateUserLoading", false);
                } else {
                    commit("updateUserLoading", false);
                    //router.push('create-user');
                    commit("updateUserError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateUserLoading", false);
                commit("updateUserError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    userUpdate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateUserLoading", true)
            //commit("userUpdateResponse", {});
        commit("updateUserError", null);
        commit("updateUserSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return UserService.callUserUpdateAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("userUpdateResponse", responseData);
                    commit("updateUserSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateUserLoading", false);
                } else {
                    commit("updateUserLoading", false);
                    //router.push('create-user');
                    commit("updateUserError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateUserLoading", false);
                commit("updateUserError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    resetUser: ({ commit, dispatch, rootState }, payload) => {
        commit("updateUserLoader", true)
        commit("userUserResetResponse", {});
        commit("updateUserResetError", null);
        //commit("updateUserSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return UserService.callUserResetAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("userUpdateResponse", responseData);
                    commit("updateRUserSuccess", responseData.responseMessage);
                    commit("updateUserLoader", false);
                    //commit("userUserResetResponse", responseData);
                    //router.push('alternative');

                } else {
                    commit("updateUserLoader", false);
                    //router.push('create-user');
                    commit("updateUserResetError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateUserLoader", false);
                commit("updateUserResetError", error);
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