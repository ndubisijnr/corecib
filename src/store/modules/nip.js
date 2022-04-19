//import { mapState, mapActions } from 'vuex';
import nipService from "../../service/nipService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    nip_loading: false,
    nip_response: {},
    userInfo: {},
    nip_errors: null,
    nip_success: null,

}
export const getters = {
    getNIPResponse: state => {
        // console.log("getter getTok")
        return state.nip_response
    },


}
export const mutations = {
    updateResponse: (state, payload) => {
        state.nip_response = payload
    },
    updateLoading: (state, payload) => {
        state.nip_loading = payload
    },
    updateError: (state, payload) => {
        state.nip_errors = payload
    },
    updateSuccess: (state, payload) => {
        state.nip_success = payload
    },

}
export const actions = {
    nipInwards: ({ commit, dispatch, rootState }, payload) => {
        commit("updateLoading", true)
        commit("updateResponse", {});
        commit("updateError", null);
        commit("updateSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return nipService.callNIPInwardsApi(payload)
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
}

export default {
    state,
    actions,
    mutations,
    getters
};