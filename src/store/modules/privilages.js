//import { mapState, mapActions } from 'vuex';
import PrivilageService from "../../service/PrivilageService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    privilage_loading: false,
    privilage_response: {},
    privilage: [],
    privilage_errors: null,
    privilage_success: null,

}
export const getters = {
    getPrivilageResponse: state => {
        // console.log("getter getTok")
        return state.privilage_response
    },

}
export const mutations = {
    updatePrivilageResponse: (state, payload) => {
        state.privilage_response = payload
    },
    updatePrivilage: (state, payload) => {
        state.privilage = payload;
    },
    updatePrivilageLoading: (state, payload) => {
        state.privilage_loading = payload
    },
    updatePrivilageError: (state, payload) => {
        state.privilage_errors = payload
    },
    updatePrivilageSuccess: (state, payload) => {
        state.privilage_success = payload
    },

}
export const actions = {
    privilageRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updatePrivilageLoading", true)
        commit("updatePrivilageResponse", {});
        commit("updatePrivilageError", null);
        commit("updatePrivilageSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return PrivilageService.callPrivilageReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                commit("updatePrivilageResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    commit("updatePrivilage", responseData.data);
                    //let jsonArray = responseData.data;
                    //let newJson = {};
                    /*for (var i = 0; i < jsonArray.length - 4; i = i + 4) {
                        newJson[jsonArray[i].privilegeModuleName] = Object.assign({}, { privilegeType: jsonArray[i].privilegeType, privilegeId: jsonArray[i].privilegeId }, { privilegeType: jsonArray[i + 1].privilegeType, privilegeId: jsonArray[i + 1].privilegeId }, { privilegeType: jsonArray[i + 2].privilegeType, privilegeId: jsonArray[i + 2].privilegeId }, { privilegeType: jsonArray[i + 3].privilegeType, privilegeId: jsonArray[i + 3].privilegeId });
                        console.log(console.log(`Steps ${i} -> ${JSON.stringify(newJson)}`));
                    }
                    console.log(console.log(`THe privliages are -> ${JSON.stringify(newJson)}`));

                    commit("updatePrivilage", newJson);
                    */
                    //console.log(`THe privliages are -> ${JSON.stringify(responseData)}`);
                    console.log(">>>>>>>>>>>>>>>|||||||||||||||<<<<<<<<<<<<<<<<<<<");
                    //commit("updateAuthLoading", false);
                    commit("updatePrivilageSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updatePrivilageLoading", false);
                } else {
                    commit("updatePrivilageLoading", false);
                    commit("updatePrivilageError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updatePrivilageLoading", false);
                commit("updatePrivilageError", error);
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