import BankService from "../../service/BankService";
import role from "./role";
import swal from 'sweetalert2'
import router from "../../routes/router";

export const state = {
    token: null,
    bank_loading: false,
    bank_response: {},
    bank_res: {},
    bank_role: {},
    bank_errors: null,
    bank_success: null,
    bank_errors1: null,
    bank_success1: null,

}
export const getters = {
    getBankResponse: state => {
        // console.log("getter getTok")
        return state.bank_response
    },

}
export const mutations = {
    updateBankResponse: (state, payload) => {
        state.bank_response = payload
    },
    updateBankRes: (state, payload) => {
        state.bank_res = payload
    },
    updateBankRole: (state, payload) => {
        state.bank_role = payload
    },
    updateBankLoading: (state, payload) => {
        state.bank_loading = payload
    },
    updateBankError: (state, payload) => {
        state.bank_errors = payload
    },
    updateBankSuccess: (state, payload) => {
        state.bank_success = payload
    },
    updateBankError1: (state, payload) => {
        state.bank_errors1 = payload
    },
    updateBankSuccess1: (state, payload) => {
        state.bank_success1 = payload
    },

}
export const actions = {
    bankLogos: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBankLoading", true)
            //commit("updatebankResponse", {});
        commit("updateBankError", null);
        commit("updateBankSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return BankService.callImageUploadBankAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responsecode === "00") {
                    BankService.callBankUpdateLogoAPI({
                            bankCode: payload.bankCode,
                            bankCreatedBy: payload.bankCreatedBy,
                            bankLogo: responseData.url,
                            bankLogoMaker: payload.bankLogoMaker,
                            source: "web"
                        })
                        .then(response1 => {
                            //console.log(`>>><<< Uplaban ${JSON.stringify(response1)}`)
                            //commit("updateBankLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                console.log(`>>><<< Uplaban ${responseData1.responseMessage}`);
                                commit("updateBankLoading", !true)
                                commit("updateBankSuccess", responseData1.responseMessage);
                            } else {
                                commit("updateBankLoading", false);
                                commit("updateBankError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateBankError", responseData1.responseMessage);
                            commit("updateBankLoading", false)
                            alert(error)
                                // throw error;
                        });


                } else {
                    commit("updateBankLoading", false);
                    commit("updateBankError", responseData.responsemessage);
                    console.log(responseData.responsemessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateBankLoading", false);
                commit("updateBankError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    logoBanks: ({ commit, dispatch, rootState }, payload) => {
        commit("updateBankLoading", true)
            //commit("updateBankResponse", {});
        commit("updateBankError", null);
        commit("updateBankSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        Promise.all([
                dispatch("bankLogos", payload, { root: false }),
                //dispatch("imageUpload", payload, { root: false }).

            ])
            .then(values => {
                console.log(values);
                console.log(JSON.stringify(state.bank_response));
            })
            .catch((error) => {
                console.log(`><>??? ${error.message}`);
                commit("updateBankLoading", false);
                commit("updateBankError", error);
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