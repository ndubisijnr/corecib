//import { mapState, mapActions } from 'vuex';
import ProductService from "../../service/ProductService";
import RoleService from "../../service/RoleService";
import role from "./role";
import swal from 'sweetalert2'
import router from "../../routes/router";

export const state = {
    token: null,
    product_loading: false,
    product_response: {},
    product_view: {},
    product_res: {},
    singleSlab: {
        slabCode: 'SlabOne',
        slabMaxAmount: '99999999999999999.00'
    },
    selectAcc: {},
    page: '',
    assignResponse: {},
    gl_response: {},
    response_product_selected: null,
    product_errors: null,
    product_success: null,

}
export const getters = {
    getBProductResponse: state => {
        // console.log("getter getTok")
        return state.product_response
    },

}
export const mutations = {
    updateProductResponse: (state, payload) => {
        state.product_response = payload
    },
    updateProductView: (state, payload) => {
        state.product_view = payload
    },
    UpdateProductSelect: (state, payload) => {
        state.response_product_selected = payload
    },
    updateGLResponse: (state, payload) => {
        state.gl_response = payload
    },
    updateProductRole: (state, payload) => {
        state.product_role = payload
    },
    updateProductLoading: (state, payload) => {
        state.product_loading = payload
    },
    updateProductError: (state, payload) => {
        state.product_errors = payload
    },
    updateProductSuccess: (state, payload) => {
        state.product_success = payload
    },
    updateSingleSlab: (state, payload) => {
        state.singleSlab = payload
    },
    updateAssignResponse: (state, payload) => {
        state.assignResponse = payload
    },
    updateSelectAcc: (state, payload) => {
        state.selectAcc = payload
    },
    updatePage: (state, payload) => {
        state.page = payload
    },
}
export const actions = {
    submitEntries: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callSubmitEntriesAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateProductResponse", responseData);
                    //console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductView", responseData);
                    //router.push('accounting-entry/create');
                    // router.push({ name: 'AssignEntries' });
                    commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateAssignResponse", responseData);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    readSingleAccountingEntry: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadSingleAccountingEntryAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateProductResponse", responseData);
                    //console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductView", responseData);
                    //router.push('accounting-entry/create');
                    // router.push({ name: 'AssignEntries' });
                    commit("updatePage", 'edit');
                    commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateAssignResponse", responseData);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    readSingleSlab: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
        commit("updateSingleSlab", {});
        commit("updateProductError", null);
        //commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadSingleSlabAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateSingleSlab", responseData);
                    //console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductView", responseData);
                    // router.push('accounting-entry/create');
                    //commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    addSlab: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
        commit("updatePage", payload.action);
        router.push({ name: 'AssignEntries' })
        commit("updateProductLoading", !true)
            //commit("updateProductResponse", {});

    },

    readSlabs: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateProductLoading", true)
        commit("updateProductResponse", {});
        commit("updateProductError", null);
        //commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadSlabsAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateSelectAcc", payload);
                    commit("updateProductResponse", responseData);
                    //console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductView", responseData);
                    // router.push('accounting-entry/create');
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductLoading", false);
                } else {
                    // commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                //commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    readAccountingEntry: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        //commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadAccountingEntryAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateProductResponse", responseData);
                    //console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductView", responseData);
                    // router.push('accounting-entry/create');
                    //commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    createAccountingEntry: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callCreateAccountingEntryAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateProductResponse", responseData);
                    //console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductResponse", responseData);
                    //router.push('accounting-entry/create');

                    commit("updatePage", 'create');
                    commit("updateSelectAcc", payload);
                    commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductLoading", false);
                    //router.push({name:'AssignEntries'});
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    readProduct: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadProductAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateProductResponse", responseData);
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductResponse", responseData);
                    //router.push('alternative');
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    createProduct: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(JSON.stringify(payload));
        //console.log(payload.username);callProductReadAPI
        return ProductService.callCreateProductAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    //commit("updateProductResponse", responseData);
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductResponse", responseData);
                    //router.push('alternative');
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    readProductView: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateProductLoading", true)
        //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadProductAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/

                    console.log(responseData.responseMessage);
                    commit("UpdateProductSelect", payload.productType);
                    commit("updateProductSuccess", responseData.responseMessage);
                    //commit("updateProductResponse", responseData);
                    commit("updateProductView", responseData);

                    router.push('view-products');
                    commit("updateProductResponse", {});
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },





    productRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
        commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callProductReadAPI(payload.product)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    // eslint-disable-next-line no-undef
                    //store.dispatch("bankList", { request: "banklist" }, { root: true })
                    /*   // eslint-disable-next-line no-unused-vars
                       .then(res => {*/
                    commit("updateProductResponse", responseData);
                    dispatch("glLevel2Read", payload.gl, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductResponse", responseData);
                    //router.push('alternative');
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    glLevel2Read: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
        commit("updateProductRole", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(auth.getUserInfo.);
        return ProductService.callGLLevel2ReadAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateGLResponse", responseData);
                    //router.push('alternative');
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                alert(error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    branchReadInfo1: ({ commit, dispatch, rootState }, payload) => {
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
    productReadTemplate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadProductTemplateAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateProductResponse", responseData);
                    //dispatch("glLevel2Read", payload.gl, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    commit("updateProductResponse", responseData);
                    //router.push('alternative');
                    commit("updateProductLoading", false);
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    readProductForm: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadProductFormAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    //commit("updateProductResponse", responseData);
                    commit("UpdateProductSelect", payload.templateType);
                    //dispatch("glLevel2Read", payload.gl, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    router.push('create-product');
                    //commit("updateProductResponse", responseData);
                    //router.push('alternative');
                    commit("updateProductView", responseData);

                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    readProductForm1: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true)
            //commit("updateProductResponse", {});
        commit("updateProductError", null);
        commit("updateProductSuccess", null);
        console.log(payload);
        //console.log(payload.username);callProductReadAPI
        return ProductService.callReadProductFormAPI(payload)
            .then(response => {
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    //commit("updateProductResponse", responseData);
                    commit("UpdateProductSelect", payload.templateType);
                    //dispatch("glLevel2Read", payload.gl, { root: false });
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateProductSuccess", responseData.responseMessage);
                    // router.push('create-product');
                    commit("updateProductResponse", responseData);
                    commit("updateProductLoading", false);
                    //router.push('alternative');
                    //commit("updateProductView", responseData);

                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateProductLoading", false);
                commit("updateProductError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    updateProduct: ({ commit, dispatch, rootState }, payload) => {
        commit("updateProductLoading", true);
        return ProductService.callUpdateProductAPI({
                requestType: "update",
                products: payload.products
            })
            .then(response => {
                // commit("updateProductLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    ProductService.callReadProductAPI({
                            productBankCode: payload.productBankCode,
                            productType: payload.productType
                        })
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateProductResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateProductSuccess", responseData1.responseMessage);
                                commit("updateProductView", responseData1);
                                //router.push('alternative');
                                commit("updateProductLoading", false);

                            } else {
                                commit("updateProductLoading", false);
                                commit("updateProductError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateProductLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateProductLoading", false);
                    commit("updateProductError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateProductLoading", false)
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