//import { mapState, mapActions } from 'vuex';
import BranchService from "../../service/BranchService";
import RoleService from "../../service/RoleService";
import role from "./role";
import swal from 'sweetalert2'
import router from "../../routes/router";

export const state = {
    token: null,
    branch_loading: false,
    branch_response: {},
    branch_res: {},
    branch_role: {},
    branch_errors: null,
    branch_success: null,
    branch_errors1: null,
    branch_success1: null,

}
export const getters = {
    getBranchResponse: state => {
        // console.log("getter getTok")
        return state.branch_response
    },

}
export const mutations = {
    updateBranchResponse: (state, payload) => {
        state.branch_response = payload
    },
    /*updateBranchData: (state, payload) => {
        //console.log(`Payload???? ${JSON.stringify(payload)}`);
        var dataObj = state.branch_response;

        var dataArray = dataObj.data;
        var removeIndex = dataArray.map(item => item.branchID)
            .indexOf(payload.branchID);

        ~removeIndex && dataArray.splice(removeIndex, 1);
        dataArray.splice(removeIndex, 0, payload);
        console.log(`Helloooooo>>>>> ${JSON.stringify(dataArray)}`);
        dataObj['data'] = dataArray;
        console.log(`Datatatatataat>>>>> ${JSON.stringify(dataObj)}`);
        state.branch_response = dataObj;
    },*/
    updateBranchRes: (state, payload) => {
        state.branch_res = payload
    },
    updateBranchRole: (state, payload) => {
        state.branch_role = payload
    },
    updateBranchLoading: (state, payload) => {
        state.branch_loading = payload
    },
    updateBranchError: (state, payload) => {
        state.branch_errors = payload
    },
    updateBranchSuccess: (state, payload) => {
        state.branch_success = payload
    },
    updateBranchError1: (state, payload) => {
        state.branch_errors1 = payload
    },
    updateBranchSuccess1: (state, payload) => {
        state.branch_success1 = payload
    },

}
export const actions = {
    branchChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
            //commit("updateBranchResponse", {});
        commit("updateBranchError", null);
        commit("updateBranchSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateBranchResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateBranchSuccess", responseData.responseMessage);
                    //commit("updateBranchResponse", responseData);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    branchCheckerType: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
            //commit("updateBranchResponse", {});
        commit("updateBranchError1", null);
        commit("updateBranchSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateBranchResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateBranchSuccess1", responseData.responseMessage);
                    //commit("updateBranchResponse", responseData);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError1", error);
                // throw error;
                // return Promise.reject(error)
            });
    },



    branchcreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
            //commit("updateBranchResponse", {});
        commit("updateBranchError", null);
        commit("updateBranchSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateBranchResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateBranchSuccess", responseData.responseMessage);
                    //commit("updateBranchResponse", responseData);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    branchUpdate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
            //commit("updateBranchResponse", {});
        commit("updateBranchError1", null);
        commit("updateBranchSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchUpdateAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateBranchResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(`Helloooooo ${responseData.responseMessage}`);
                    //commit("updateAuthLoading", false);

                    // commit("updateBranchData", payload);
                    commit("updateBranchSuccess1", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError1", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    branchReadAll: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
            //commit("updateBranchResponse", {});
        commit("updateBranchError", null);
        commit("updateBranchSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateBranchResponse", responseData);
                    console.log(`Helloooooo<???><>< ${JSON.stringify(responseData)}`);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateBranchSuccess", responseData.responseMessage);
                    //commit("updateBranchResponse", responseData);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    branchRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
        commit("updateBranchResponse", {});
        commit("updateBranchError", null);
        commit("updateBranchSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateBranchResponse", responseData);
                    dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateBranchSuccess", responseData.responseMessage);
                    //commit("updateBranchResponse", responseData);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    roleRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBranchLoading", true)
        commit("updateBranchRole", {});
        commit("updateBranchError", null);
        commit("updateBranchSuccess", null);
        console.log(payload);
        //console.log(auth.getUserInfo.);
        return RoleService.callRoleReadAPI(payload)
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
                    commit("updateBranchSuccess", responseData.responseMessage);
                    commit("updateBranchRole", responseData);
                    //router.push('alternative');
                    commit("updateBranchLoading", false);
                } else {
                    commit("updateBranchLoading", false);
                    commit("updateBranchError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBranchLoading", false);
                commit("updateBranchError", error);
                alert(error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    branchReadInfo: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateBranchLoading", true)
        commit("updateBranchRes", {});
        //commit("updateBranchError", null);
        //commit("updateBranchSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return BranchService.callBranchReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateBranchResponse", responseData);
                    //dispatch("roleRead", payload, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateBranchSuccess", responseData.responseMessage);
                    commit("updateBranchRes", responseData);
                    //router.push('alternative');
                    //commit("updateBranchLoading", false);
                } else {
                    //commit("updateBranchLoading", false);
                    //commit("updateBranchError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                //commit("updateBranchLoading", false);
                //commit("updateBranchError", error);
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