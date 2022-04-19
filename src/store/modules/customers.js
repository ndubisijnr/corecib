//import { mapState, mapActions } from 'vuex';
import nipService from "../../service/nipService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    cus_loading: false,
    cus_response: {},
    userInfo: {},
    cus_errors: null,
    cus_success: null,

}
export const getters = {
    getCustomersResponse: state => {
        // console.log("getter getTok")
        return state.nip_response
    },


}
export const mutations = {
    updateCustomersResponse: (state, payload) => {
        state.cus_response = payload
    },
    updateCustomersLoading: (state, payload) => {
        state.nip_loading = payload
    },
    updateCustomersError: (state, payload) => {
        state.nip_errors = payload
    },
    updateCustomersSuccess: (state, payload) => {
        state.nip_success = payload
    },

}
export const actions = {

    editCustomers: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateLoading", true)
        commit("updateCustomersResponse", {});
        //commit("updateError", null);
        //commit("updateSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        commit("updateCustomersResponse", payload);
        //commit("updateSuccess", responseData.responseMessage);
        //commit("updateLoading", false);
        router.push({ name: "EditCustomer" });

    },
}

export default {
    state,
    actions,
    mutations,
    getters
};