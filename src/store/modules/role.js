//import { mapState, mapActions } from 'vuex';
import RoleService from "../../service/RoleService";
import auth from "./auth";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    role_loading: false,
    role_btn_display: false,
    role_response: {},
    role: {},
    role_errors: null,
    role_success: null,
    role_read_response: {},

}
export const getters = {
    getRoleResponse: state => {
        // console.log("getter getTok")
        return state.role_response
    },

}
export const mutations = {
    updateRoleResponse: (state, payload) => {
        state.role_response = payload
    },
    updateRoleReadResponse: (state, payload) => {
        state.role_read_response = payload
    },
    updateRoleBtn: (state, payload) => {
        state.role_btn_display = payload
    },
    updateRoleLoading: (state, payload) => {
        state.role_loading = payload
    },
    updateRoleError: (state, payload) => {
        state.role_errors = payload
    },
    updateRoleSuccess: (state, payload) => {
        state.role_success = payload
    },

}
export const actions = {
    roleRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateRoleLoading", true)
        commit("updateRoleResponse", {});
        commit("updateRoleError", null);
        commit("updateRoleSuccess", null);
        console.log(payload);
        //console.log(auth.getUserInfo.);
        return RoleService.callRoleReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                commit("updateRoleResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateRoleSuccess", responseData.responseMessage);
                    commit("updateRoleResponse", responseData);
                    //router.push('alternative');
                    commit("updateRoleLoading", false);
                } else {
                    commit("updateRoleLoading", false);
                    commit("updateRoleError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateRoleLoading", false);
                commit("updateRoleError", error);
                alert(error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    roleReadSingle: ({ commit, dispatch, rootState }, payload) => {
        commit("updateRoleLoading", true)
        commit("updateRoleReadResponse", {});
        commit("updateRoleError", null);
        commit("updateRoleSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        if (payload.action === 'edit') {
            router.push('edit-role');
        }
        return RoleService.callRoleReadSingleAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(`callRoleCreateAPI>>>>> Message${responseData.responseMessage} Code${responseData.responseCode}`);
                    //commit("updateAuthLoading", false);
                    commit("updateRoleSuccess", responseData.responseMessage);
                    commit("updateRoleReadResponse", responseData);
                    //router.push('alternative');
                    commit("updateRoleLoading", false);
                    commit("updateRoleBtn", false);

                } else {
                    commit("updateRoleLoading", false);
                    commit("updateRoleError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    console.log(`callRoleCreateAPI<<<<<<< Message${responseData.responseMessage} Code${responseData.responseCode}`);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                    commit("updateRoleBtn", true);
                }

            })
            .catch((error) => {
                commit("updateRoleLoading", false);
                commit("updateRoleError", error);
                alert(error);

                // throw error;
                // return Promise.reject(error)
            });
    },

    userRolePrivilegeCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateRoleLoading", true)
        commit("updateRoleResponse", {});
        commit("updateRoleError", null);
        commit("updateRoleSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return RoleService.callUserRolePrivilegeCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                commit("updateRoleResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(`callRoleCreateAPI>>>>> Message${responseData.responseMessage} Code${responseData.responseCode}`);
                    //commit("updateAuthLoading", false);
                    commit("updateRoleSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateRoleLoading", false);
                    commit("updateRoleBtn", false);
                    if (payload.action === "edit") {
                        router.push('all-roles');
                    }

                } else {
                    commit("updateRoleLoading", false);
                    commit("updateRoleError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    console.log(`callRoleCreateAPI<<<<<<< Message${responseData.responseMessage} Code${responseData.responseCode}`);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                    commit("updateRoleBtn", true);
                }

            })
            .catch((error) => {
                commit("updateRoleLoading", false);
                commit("updateRoleError", error);
                alert(error);

                // throw error;
                // return Promise.reject(error)
            });
    },

    roleCreate: ({ commit, dispatch, rootState }, payload) => {
        console.log(`*******${JSON.stringify(payload)}`);
        commit("updateRoleLoading", true)
        commit("updateRoleResponse", {});
        commit("updateRoleError", null);
        commit("updateRoleSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return RoleService.callRoleCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                commit("updateRoleResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    // eslint-disable-next-line no-unused-vars
                    // .then(res => {
                    //dispatch("userRolePrivilegeCreate", payload, { root: false });
                    console.log(responseData.responseMessage);
                    console.log(`callUserRolePrivilegeCreateAPI>>>>> Message${responseData.responseMessage} Code${responseData.responseCode}`);
                    //commit("updateAuthLoading", false);
                    commit("updateRoleResponse", responseData);
                    commit("updateRoleSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateRoleLoading", false);
                    commit("updateRoleBtn", true);
                } else {
                    commit("updateRoleLoading", false);
                    commit("updateRoleError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    console.log(`callUserRolePrivilegeCreateAPI<<<<<<<Message${responseData.responseMessage} Code${responseData.responseCode}`);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                    commit("updateRoleBtn", false);
                }

            })
            .catch((error) => {
                commit("updateRoleLoading", false);
                commit("updateRoleError", error);
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