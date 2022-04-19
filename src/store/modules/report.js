//import { mapState, mapActions } from 'vuex';
import reportService from "../../service/reportService";
import swal from 'sweetalert2'
import router from "../../routes/router";
export const state = {
    token: null,
    report_loading: false,
    report_loading1: false,
    report_response: {},
    report_response1: {},

    report_resp: {},
    department_resp: {},
    table_resp: {},
    report_page: null,
    report_create_data: {},
    firstColumn: {},
    secondColumn: {},

    report_item: {},
    userInfo: {},
    report_errors: null,
    report_success: null,
    reportType: null,

}
export const getters = {
    getReportResponse: state => {
        // console.log("getter getTok")
        return state.report_response
    },


}
export const mutations = {
    updateTableResponse: (state, payload) => {
        state.table_resp = payload
    },
    updateReportType: (state, payload) => {
        state.reportType = payload
    },
    updateDepartmentResponse: (state, payload) => {
        state.department_resp = payload
    },
    updateReportsResponse: (state, payload) => {
        state.report_resp = payload
    },

    updateReportResponse: (state, payload) => {
        state.report_response = payload
    },
    updateReportResponse1: (state, payload) => {
        state.report_response1 = payload
    },
    updateReportItem: (state, payload) => {
        state.report_item = payload
    },
    updateReportLoading: (state, payload) => {
        state.report_loading = payload
    },
    updateReportLoading1: (state, payload) => {
        state.report_loading1 = payload
    },
    updateReportError: (state, payload) => {
        state.report_errors = payload
    },
    updateReportSuccess: (state, payload) => {
        state.report_success = payload
    },
    updateReportPage: (state, payload) => {
        state.report_page = payload
    },
    updateReportCreatePayloadClear: (state, payload) => {
        state.report_page = payload
    },
    updateReportCreatePayload: (state, payload) => {
        Object.assign(state.report_create_data, payload)
            //state. = payload
    },
    updateFirstColumn: (state, payload) => {
        state.firstColumn = payload
    },
    updateSecondColumn: (state, payload) => {
        state.secondColumn = payload
    },



}
export const actions = {
    eodRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callEodReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    eodReadSingle: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callEodReadSingleApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse1", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    router.push({ name: 'EODItems' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    /**&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7 */
    eodCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading1", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);

        return reportService.callEodCreateApi(payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    reportService.callEodReadApi(payload)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateReportSuccess", responseData1.responseMessage);
                                commit("updateReportResponse", responseData1);
                                //router.push('alternative');
                                commit("updateReportLoading1", false);

                            } else {
                                commit("updateReportLoading1", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading1", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading1", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading1", false)
                commit("updateReportError", error);
                alert(error)
                    // throw error;
            });

    },


    /*****&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */


    eomRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callEomReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    eomReadSingle: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callEomReadSingleApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse1", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    router.push({ name: 'EOMItems' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    /**&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7 */
    eomCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading1", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);

        return reportService.callEomCreateApi(payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    reportService.callEomReadApi(payload)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateReportSuccess", responseData1.responseMessage);
                                commit("updateReportResponse", responseData1);
                                //router.push('alternative');
                                commit("updateReportLoading1", false);

                            } else {
                                commit("updateReportLoading1", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading1", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading1", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading1", false)
                commit("updateReportError", error);
                alert(error)
                    // throw error;
            });

    },
    /*****&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    reportChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callReportCheckerApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    /// router.push({ name: 'EOMItems' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    updateReportChecker: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);

        return reportService.callReportCheckerApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    reportService.callReportCheckerApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                //commit("updateResponse", responseData1);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                commit("updateReportSuccess", responseData1.responseMessage);
                                commit("updateReportResponse", responseData1);
                                //router.push('alternative');
                                commit("updateReportLoading", false);

                            } else {
                                commit("updateReportLoading", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading", false)
                commit("updateReportError", error);
                alert(error)
                    // throw error;
            });

    },
    reportRead: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callReportReadApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    /// router.push({ name: 'EOMItems' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },

    reportReadColumn: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
        commit("updateReportPage", null);
        //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callReportReadColumnApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportPage", '3');
                    commit("updateReportCreatePayload", payload);
                    commit("updateReportResponse1", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    //commit("updateReportItem", payload.item);
                    //router.push({ name: 'QueryReport' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    reportReadSingle: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callReportReadSingleApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse1", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    //commit("updateReportItem", payload.item);
                    //router.push({ name: 'SingleReport' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);

                // throw error;
                // return Promise.reject(error)
            });
    },

    reportReadSingleCondition: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callReportReadSingleApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateReportResponse1", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    //commit("updateReportItem", payload.item);
                    router.push({ name: 'SingleReportQuery' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);

                // throw error;
                // return Promise.reject(error)
            });
    },
    changePage: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateReportLoading", true);
        commit("updateReportPage", payload.page);
        //router.push({ name: 'SingleReport' });
    },

    viewSingleReport: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateReportLoading", true);
        commit("updateReportItem", payload.item);
        router.push({ name: 'SingleReport' });
    },
    readColumn: ({ commit, dispatch, rootState }, payload) => {
        //commit("updateReportLoading", true);
        commit("updateReportItem", payload.item);
        router.push({ name: 'QueryReport' });
    },
    /**********%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5555555555555555 */
    reportCreate1: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);

        return reportService.callReadTablesApi(payload.checker)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTableResponse", responseData);
                    reportService.callReadDepartmentsApi(payload.read)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                commit("updateDepartmentResponse", responseData1);
                                reportService.callReportReadApi(payload.read)
                                    .then(response2 => {
                                        //commit("updateCustomerLoading", !true)
                                        let responseData2 = response2.data;
                                        if (responseData2.responseCode === "00") {
                                            commit("updateReportsResponse", responseData2);
                                            //console.log(responseData1.responseMessage);
                                            //commit("updateAuthLoading", false);
                                            commit("updateReportSuccess", responseData2.responseMessage);
                                            //router.push('alternative');
                                            commit("updateReportLoading", false);

                                        } else {
                                            commit("updateReportLoading", false);
                                            commit("updateReportError", responseData2.responseMessage);
                                            console.log(responseData2.responseMessage);
                                            //swal('Error!', responseData.responseMessage, 'error').then();
                                        }

                                    })
                                    .catch(error => {
                                        commit("updateReportLoading", false)
                                        commit("updateReportError", responseData2.responseMessage);
                                        alert(error)
                                            // throw error;
                                    });

                            } else {
                                commit("updateReportLoading", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading", false);
                            commit("updateReportError", responseData1.responseMessage);
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading", false)
                commit("updateReportError", error);
                alert(error)
                    // throw error;
            });

    },
    reportCreate2: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        commit("updateReportPage", null);
        commit("updateReportType", payload.reportType);
        return reportService.callReadTablesApi(payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTableResponse", responseData);
                    reportService.callReportReadApi(payload)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                commit("updateReportCreatePayload", payload);
                                console.log(responseData1.responseMessage);
                                //commit("updateReportType", payload.reportType);
                                //commit("updateReportSuccess", responseData1.responseMessage);
                                commit("updateReportsResponse", responseData1);
                                //router.push('alternative');
                                commit("updateReportLoading", false);
                                commit("updateReportPage", '2');

                            } else {
                                commit("updateReportLoading", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                commit("updateReportType", null);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading", false);
                            commit("updateReportType", null);
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading", false)
                commit("updateReportError", error);
                alert(error)
                    // throw error;
            });

    },
    department: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true)
            //commit("updateReportResponse", {});
        commit("updateReportPage", null);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        console.log(payload);
        //console.log(payload.username);
        return reportService.callReadDepartmentsApi(payload)
            .then(response => {
                let responseData = response.data;

                if (responseData.responseCode === "00") {
                    console.log(responseData.responseMessage);
                    //commit("updateAuthLoading", false);
                    commit("updateDepartmentResponse", responseData);
                    commit("updateReportSuccess", responseData.responseMessage);
                    commit("updateReportLoading", false);
                    commit("updateReportType", null);
                    commit("updateReportPage", '1');

                    //commit("updateReportItem", payload.item);
                    //router.push({ name: 'QueryReport' });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch((error) => {
                commit("updateReportLoading", false);
                commit("updateReportError", error);
                // throw error;
                // return Promise.reject(error)
            });
    },
    reportCreate: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        //commit("updateReportPage", null);
        return reportService.callReportCreateApi(payload)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateTableResponse", responseData);
                    reportService.callReadDepartmentsApi({
                            bankCode: payload.reportBankCode
                        })
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                commit("updateReportCreatePayloadClear", {});
                                commit("updateReportType", null);
                                commit("updateDepartmentResponse", responseData1);
                                commit("updateReportSuccess", responseData.responseMessage);
                                commit("updateReportLoading", false);
                                commit("updateReportPage", '1');
                                //commit("updateReportItem", payload.item);
                                //router.push({ name: 'QueryReport' });

                            } else {
                                commit("updateReportLoading", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading", false)
                commit("updateReportError", error);
                alert(error)
                    // throw error;
            });

    },
    ///????

    reportReadColumnJoins: ({ commit, dispatch, rootState }, payload) => {
        commit("updateReportLoading", true);
        commit("updateReportError", null);
        commit("updateReportSuccess", null);
        commit("updateReportPage", null);
        return reportService.callReportReadColumnApi(payload.payload1)
            .then(response => {
                // commit("updateLoading", !true)
                let responseData = response.data;
                if (responseData.responseCode === "00") {
                    commit("updateFirstColumn", responseData);
                    reportService.callReportReadColumnApi(payload.payload2)
                        .then(response1 => {
                            //commit("updateCustomerLoading", !true)
                            let responseData1 = response1.data;
                            if (responseData1.responseCode === "00") {
                                commit("updateReportCreatePayload", payload);
                                console.log(responseData1.responseMessage);
                                //commit("updateAuthLoading", false);
                                //commit("updateReportSuccess", responseData1.responseMessage);
                                commit("updateSecondColumn", responseData1);
                                //router.push('alternative');
                                commit("updateReportLoading", false);
                                commit("updateReportPage", '4');

                            } else {
                                commit("updateReportLoading", false);
                                commit("updateReportError", responseData1.responseMessage);
                                console.log(responseData1.responseMessage);
                                //swal('Error!', responseData.responseMessage, 'error').then();
                            }

                        })
                        .catch(error => {
                            commit("updateReportLoading", false)
                            alert(error)
                                // throw error;
                        });
                } else {
                    commit("updateReportLoading", false);
                    commit("updateReportError", responseData.responseMessage);
                    console.log(responseData.responseMessage);
                    //swal('Error!', responseData.responseMessage, 'error').then();
                }

            })
            .catch(error => {
                commit("updateReportLoading", false)
                commit("updateReportError", error);
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