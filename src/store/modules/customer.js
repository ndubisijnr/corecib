//import { mapState, mapActions } from 'vuex';
import CustomerService from "../../service/CustomerService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    customer_loading: false,
    customer_ctrl: false,
    customer_response: {},
    single_customer: {},
    customer_errors: null,
    customer_success: null,
    customer_errors1: null,
    customer_success1: null,
    customer_arr: []

}
export const getters = {
    getCustomerResponse: state => {
        // console.log("getter getTok")
        return state.customer_response
    },
    getCustomerUploadArr: state => {
        // console.log("getter getTok")
        return state.customer_arr
    },

}
export const mutations = {
    updateCustomerResponse: (state, payload) => {
        state.customer_response = payload
    },
    updateCustomerArr: (state, payload) => {
        state.customer_arr = payload
    },
    updateSingleCustomerResponse: (state, payload) => {
        state.single_customer = payload
    },
    updateCustomerLoading: (state, payload) => {
        state.customer_loading = payload
    },
    updateCustomerControl: (state, payload) => {
        state.customer_ctrl = payload
    },
    updateCustomerError: (state, payload) => {
        state.customer_errors = payload
    },
    updateCustomerSuccess: (state, payload) => {
        state.customer_success = payload
    },
    updateCustomerError1: (state, payload) => {
        state.customer_errors1 = payload
    },
    updateCustomerSuccess1: (state, payload) => {
        state.customer_success1 = payload
    },

}
export const actions = {
    customerRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateCustomerResponse", {});
        commit("updateCustomerError", null);
        commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callCustomerReadAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    commit("updateCustomerResponse", responseData);
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateCustomerSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    customerCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateCustomerResponse", {});
        commit("updateCustomerError", null);
        commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callCustomerCreateAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateCustomerResponse", responseData);
                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    commit("updateCustomerResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateCustomerSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    customerCheckerType: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateCustomerResponse", {});
        commit("updateCustomerError1", null);
        commit("updateCustomerSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callCustomerCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateCustomerResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateCustomerResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateCustomerSuccess1", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError1", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    customerChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateCustomerResponse", {});
        commit("updateCustomerError", null);
        commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callCustomerCheckerAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateCustomerResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    commit("updateCustomerResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateCustomerSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    customerUpdate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateSingleCustomerResponse", {});
        commit("updateCustomerError1", null);
        commit("updateCustomerSuccess1", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callCustomerUpdateAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateCustomerResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    // commit("updateSingleCustomerResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateCustomerSuccess1", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError1", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError1", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    customerUpload: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
        commit("updateCustomerResponse", {});
        commit("updateCustomerError", null);
        //commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callUploadCustomersAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateCustomerResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateSingleCustomerResponse", responseData);
                    //commit("updateAuthLoading", false);
                    commit("updateCustomerSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    customerReadSingle: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
        commit("updateSingleCustomerResponse", {});
        commit("updateCustomerError", null);
        //commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callCustomerReadSingleAPI(payload)
            .then(response => {
                let responseData = response.data;
                //commit("updateCustomerResponse", responseData);
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    console.log(responseData.responseMessage);
                    commit("updateSingleCustomerResponse", responseData);
                    //commit("updateAuthLoading", false);
                    //commit("updateCustomerSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    imageUpload: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateCustomerResponse", {});
        commit("updateCustomerError", null);
        commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return CustomerService.callImageUploadAPI(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //dispatch("bankList", { request: "banklist" }, { root: false });
                    commit("updateCustomerResponse", responseData);
                    console.log(`Image Result>>>> ${responseData}`);
                    //commit("updateAuthLoading", false);
                    //commit("updateCustomerSuccess", responseData.responseMessage);
                    //router.push('alternative');
                    //commit("updateCustomerLoading", false);
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    createCustomer: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true)
            //commit("updateCustomerResponse", {});
        commit("updateCustomerError", null);
        commit("updateCustomerSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        Promise.all([
                dispatch("imageUpload", payload, { root: false }),
                dispatch("imageUpload", payload, { root: false }).
                false
            ])
            .then(values => {

            })
            .catch((error) => {
                commit("updateCustomerLoading", false);
                commit("updateCustomerError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    customerCreateNew: ({ commit, dispatch, rootState }, payload) => {
        commit("updateCustomerLoading", true);
        return CustomerService.callImageUploadAPI({
                username: payload.pictureFileName,
                base64: payload.customerPicture,
                region: "us-east-1",
                source: 'quickgem',
                s3bucket: 'quikgem-repo'
            })
            .then(response => {
                // commit("updateCustomerLoading", !true)
                let responseData = response.data;
                if (responseData.responsecode === "00") {
                    CustomerService.callImageUploadAPI({
                            username: payload.mandateFileName,
                            base64: payload.customerMandate,
                            region: "us-east-1",
                            source: 'quickgem',
                            s3bucket: 'quikgem-repo'
                        })
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responsecode === "00") {
                                payload.customerPicture = responseData.url;
                                payload.customerMandate = responseData1.url;
                                CustomerService.callCustomerCreateAPI(payload)
                                    .then(response2 => {
                                        let responseData2 = response2.data;
                                        //commit("updateCustomerLoading", !true)
                                        if (responseData2.responseCode === "00") {
                                            commit("updateCustomerSuccess", responseData2.responseMessage);
                                            commit("updateCustomerLoading", !true)
                                        } else {
                                            commit("updateCustomerLoading", false);
                                            commit("updateCustomerError", responseData2.responseMessage);
                                            console.log(responseData2.responseMessage);
                                            //swal('Error!', responseData.responseMessage, 'error').then();
                                        }

                                    })
                                    .catch(error => {
                                        commit("updateCustomerLoading", false)
                                        alert(error)
                                            // throw error;
                                    });
                            } else {
                                commit("updateCustomerLoading", false);
                                commit("updateCustomerError", responseData1.responsemessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateCustomerLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateCustomerLoading", false);
                    commit("updateCustomerError", responseData.responsemessage);
                    console.log(responseData.responsemessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateCustomerLoading", false)
                alert(error)
                    // throw error;
            });

    },
    customerArray: ({ commit, dispatch, rootState }, payload) => {
        console.log("Customer");
        console.log(payload);
        var count = 1;
        var items = payload.map((result) => {

            return {
                sn: count++,
                customerFirstName: result.customerFirstName,
                customerMiddleName: result.customerMiddleName,
                customerLastName: result.customerLastName,
                //name: `${result.customerFirstName} ${result.customerMiddleName} ${result.customerLastName}`,
                customerBvn: result.customerBvn,
                customerPhoneNumber: result.customerPhoneNumber,
                customerCountryCode: result.customerCountryCode,
                customerAddress: result.customerAddress,
                customerCountry: result.customerCountry,
                customerDob: result.customerDob,
                dateCreated: result.dateCreated,
                customerEmail: result.customerEmail,
                customerState: result.customerState,
                customerBranchCode: result.customerBranchCode,
                customerGender: result.customerGender,
                accountNumber: result.accountNumber,
                accountClass: result.accountClass,
                accountCurrency: result.accountCurrency

            };
        });
        if (items.length > 0) {
            commit("updateCustomerArr", items);
            commit("updateCustomerControl", true);
        } else {
            commit("updateCustomerControl", false);
        }


    },
    customerDelete: ({ commit, dispatch, rootState }, payload) => {
        console.log("Customer");
        console.log(payload);
        var li = state.customer_arr;
        var index = li.map(x => {
            return x.customerBvn;
        }).indexOf(payload.customerBvn);

        li.splice(index, 1);
        console.log(`Li---->>>>>> ${li}`);


        console.log(`Lists---->>>>>> ${JSON.stringify(li)}`);
        commit("updateCustomerArr", li);
    }


}

export default {
    state,
    actions,
    mutations,
    getters
};