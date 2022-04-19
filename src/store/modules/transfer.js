//import { mapState, mapActions } from 'vuex';
import transferService from "../../service/transferService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    transfer_loading: false,
    transfer_response: {},
    transfer_response1: {},
    userInfo: {},
    transfer_errors: null,
    transfer_success: null,
    transfer_page: 'tab1_form1_1',
    bankList: {},
    productList: {}

}
export const getters = {
    getTransferResponse: state => {
        // console.log("getter getTok")
        return state.transfer_response
    },


}
export const mutations = {
    updateTransferResponse: (state, payload) => {
        state.transfer_response = payload
    },
    updateTransferResponse1: (state, payload) => {
        state.transfer_response1 = payload
    },
    updateTransferLoading: (state, payload) => {
        state.transfer_loading = payload
    },
    updateTransferError: (state, payload) => {
        state.transfer_errors = payload
    },
    updateTransferSuccess: (state, payload) => {
        state.transfer_success = payload
    },
    updatePageResponse: (state, payload) => {
        state.transfer_page = payload
    },
    updateBankResponse: (state, payload) => {
        state.bankList = payload
    },
    updateProductResponse: (state, payload) => {
        state.productList = payload
    },

}
export const actions = {
    updatePage: ({ commit, dispatch, rootState }, payload) => {
        commit("updatePageResponse", payload.page)
    },
    cashTransaction: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
            //commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callCashTransactionApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTransferResponse", responseData);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    fundTransfer: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
            //commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callFundTransferApi(payload.payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    //commit("updateTransferResponse", responseData);
                    commit("updatePageResponse", payload.page.page);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },


    fundTransferChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
        commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callFundTransferCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTransferResponse", responseData);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateFundTransferCheckQueue: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callFundTransferCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    transferService.callFundTransferCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateTransferResponse", responseData1);
                                //router.push('alternative');
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                commit("updateTransferError", error);
                alert(error)
                    // throw error;
            });

    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    cashWithdrawalChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
            //commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callCashWithdrawalCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTransferResponse", responseData);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateCashWithdrawalChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callCashWithdrawalCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    transferService.callCashWithdrawalCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateTransferResponse", responseData1);
                                //router.push('alternative');
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                commit("updateTransferError", error);
                alert(error)
                    // throw error;
            });

    },
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ///******************************************************************************************* */

    cashDepositChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
        commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callCashDepositCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTransferResponse", responseData);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateCashDepositChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callCashDepositCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    transferService.callCashDepositCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateTransferResponse", responseData1);
                                //router.push('alternative');
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                commit("updateTransferError", error);
                alert(error)
                    // throw error;
            });

    },


    //********************************************************************************************* */
    /**&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7 */

    cashTransactionChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
        commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callCashTransactionCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTransferResponse", responseData);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateCashTransactionChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callCashTransactionCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    transferService.callCashTransactionCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateTransferResponse", responseData1);
                                //router.push('alternative');
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                commit("updateTransferError", error);
                alert(error)
                    // throw error;
            });

    },


    /*****&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    balanceEnquiry: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true)
        commit("updateTransferResponse", {});
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return transferService.callBalanceEnquiryApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateTransferResponse", responseData);
                    commit("updateTransferSuccess", responseData.responseMessage);
                    commit("updateTransferLoading", false);
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateTransferLoading", false);
                commit("updateTransferError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    checkBalBank: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callBalanceEnquiryApi(payload.payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTransferResponse", responseData);
                    transferService.callBankListApi(payload.payload)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateBankResponse", responseData1);
                                //router.push('alternative');
                                commit("updatePageResponse", payload.page.page)
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                alert(error)
                    // throw error;
            });

    },
    checkBalProd: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callBalanceEnquiryApi(payload.payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTransferResponse1", responseData);
                    transferService.callReadProductApi(payload.payload)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateProductResponse", responseData1);
                                commit("updatePageResponse", payload.page.page)
                                    //router.push('alternative');
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                alert(error)
                    // throw error;
            });

    },

    checkNameProd: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callNameEnquiryApi(payload.payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTransferResponse1", responseData);
                    transferService.callReadProductApi(payload.payload)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateTransferSuccess", responseData1.responseMessage);
                                commit("updateProductResponse", responseData1);
                                commit("updatePageResponse", payload.page.page)
                                    //router.push('alternative');
                                commit("updateTransferLoading", false);

                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
                alert(error)
                    // throw error;
            });

    },

    checkBalProdBal: ({ commit, dispatch, rootState }, payload) => {
        commit("updateTransferLoading", true);
        commit("updateTransferError", null);
        commit("updateTransferSuccess", null);

        return transferService.callBalanceEnquiryApi(payload.debit)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTransferResponse", responseData);
                    transferService.callReadProductApi(payload.product)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                commit("updateProductResponse", responseData1);
                                transferService.callBalanceEnquiryApi(payload.credit)
                                    .then(response2 => {
                                        //commit("updateCustomerLoading", !true)
                                        let responseData2 = response2.data;
                                        if (responseData2.responseCode === "00") {
                                            //commit("updateResponse", responseData1);
                                            console.log(responseData2.responseMessage);
                                            //commit("updateAuthLoading", false);
                                            commit("updateTransferSuccess", responseData2.responseMessage);
                                            commit("updateTransferResponse1", responseData2);
                                            //router.push('alternative');
                                            commit("updatePageResponse", payload.page)
                                            commit("updateTransferLoading", false);

                                        } else {
                                            commit("updateTransferLoading", false);
                                            commit("updateTransferError", responseData1.responseMessage);
                                            console.log(responseData1.responseMessage);
                                            //swal('Error!', responseData.responseMessage, 'error').then();
                                        }

                                    })
                                    .catch(error => {
                                        commit("updateTransferLoading", false)
                                        alert(error)
                                            // throw error;
                                    });


                            } else {
                                commit("updateTransferLoading", false);
                                commit("updateTransferError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateTransferLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateTransferLoading", false);
                    commit("updateTransferError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateTransferLoading", false)
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