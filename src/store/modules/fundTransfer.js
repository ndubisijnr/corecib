import FundTransferService from "../../service/FundTransferService";
import FundTransferRequest from "../../model/request/FundTransferRequest";
import Swal from "sweetalert2";
import StoreUtils from "../../util/baseUtils/StoreUtils";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});


export const state = {
    loading: false,
    loading2:false,
    success:false,
    transactions:null,
    nameEnquiry:null,
    debitAccountNameEnquiry:null,
    coreStepCreditAccount:null,
    sendingTo:null,
    closeModal:false,
    stage:'nameEnquiry'
}

export const mutations = {

    updateNameEnquiry:(state, payload)=> {
        state.nameEnquiry = payload
    },

    updateStage:(state, payload)=> {
        state.stage = payload
    },

    updateCoreStepCreditAccount:(state, payload)=> {
        state.coreStepCreditAccount = payload
    },

    updateCloseModal:(state, payload)=> {
        state.closeModal = payload
    },

    updateDebitAccountNameEnquiry:(state, payload)=> {
        state.debitAccountNameEnquiry = payload
    },

    updateLoading2: (state, payload) => {
        state.loading2 = payload
    },

    updateStatus:(state, payload) => {
        state.status = payload
    },
    updateTransactions: (state, payload) => {
        state.transactions = payload
    },
    updateSendingTo:(state,payload) => {
        state.sendingTo = payload
    },

    updateLoading: (state, payload) => {
        state.loading = payload
    },

}

export const actions = {

    callNameEnquiry({commit, state}, payload = FundTransferRequest.nameEnquiry) {
        commit("updateLoading", true)
        return FundTransferService.callNameEnquiry(payload).then(response => {
            commit("updateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                if(payload.accountBankCode === "000000"){
                    if(state.stage == "nameEnquiry"){
                        commit("updateCoreStepCreditAccount", responseData)
                    }else{
                        commit("updateDebitAccountNameEnquiry", responseData)
                    }
                }else{
                    commit("updateNameEnquiry", responseData)
                }
            }else{
                Toast.fire({
                    text:responseData.responseMessage,
                    icon:'error'
                })
            }
        }).catch(e => {
            commit("updateLoading", false)
            console.log(e)
        })
    },

    fundTransfer({commit}, payload = FundTransferRequest.fundTransfer) {
        commit("updateLoading2", true)
        return FundTransferService.callFundTransfer(payload).then(response => {
            commit("updateLoading2", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                Toast.fire({
                    text:responseData.responseMessage,
                    icon:'success'
                })
            }else{
                Toast.fire({
                    text:responseData.responseMessage,
                    icon:'error'
                })
            }
        }).catch(e => {
            commit("updateLoading2", false)
            console.log(e)
        })
    },

    callPostSingleTransaction({commit}, payload = null) {
        return FundTransferService.callPostSingleTransaction(payload).then(response => {
            let responseData = response.data
            if(responseData.responseCode === "00"){

            }else{

            }
        }).catch(e => {
            console.log(e)
        })
    },


    readTransactions: ({ commit, state}, payload = FundTransferRequest.readTransactions) => {
        if(state.transactions) commit("updateLoading", true)
        return FundTransferService.calReadTransactions(payload).then(response => {
            let responseData = response.data
            commit("updateLoading", false)
            if (responseData.responseCode === "00") {
                commit("updateTransactions", responseData)
            }
        }).catch(error => {
            commit("updateLoading", false)
            console.log(error);
        })

    },


    // updateTransactionQuery: ({commit}, payload = DisputeRequest.transactionStatusQuery) => {
    //     commit("updateLoading2", true)
    //     return DisputeService.callTransactionStatusQuerApi(payload).then(response => {
    //         let responseData = response.data
    //         if(responseData.responseCode === "00"){
    //             commit("updateLoading2", false)
    //             commit("updateStatus", 'true')
    //             commit("updateTransactionQuery", responseData)
    //         }else{
    //             commit("updateLoading2", false)
    //             commit("updateSuccess", responseData.responseCode)
    //             commit("updateStatus", 'false')
    //             Swal.fire({title: responseData.responseMessage, icon: 'error'}).then(()=>{})
    //         }
    //     }).catch(error => {
    //         commit("updateLoading2", false)
    //         console.log(error)
    //     })
    // }

}