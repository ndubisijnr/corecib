import TransactionService from "../../service/TransactionService";
import TransactionRequest from "../../model/request/TransactionRequest";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const state = {
    loading: false,
    transactions:null,
    refreshLoading:false
}

export const mutations = {
    updateLoading: (state, payload) => {
        state.loading = payload
    },
    updateTransactions: (state, payload) => {
        state.transactions = payload
    },
    updateRefreshLoading:(state, payload) => {
        state.refreshLoading = payload
    },
}

export const actions = {

   readTransactions: ({ commit, state}, payload = TransactionRequest.readWalletTransaction) => {
        if(!state.transactions) commit("updateLoading", true)
        commit("updateRefreshLoading", true)
        return TransactionService.callReadTransactionsApi(payload).then(response => {
            let responseData = response.data
            commit("updateLoading", false)
            commit("updateRefreshLoading", false)
            if (responseData.responseCode === "00") {
                if(payload.page >= 2){
                    if(responseData.data.length < 1){
                        Toast.fire({text:'All transactions has been retrieved', icon:'info'}).then()
                    }
                    let newData = [...state.transactions, ...responseData.data]
                    commit("updateTransactions", newData)
                }else{
                    commit("updateTransactions", responseData.data)
                }
            }

            // if (responseData.responseCode === "00") {
            //     commit("updateTransactions", responseData.data)
            // }
        }).catch(error => {
            commit("updateRefreshLoading", false)
            commit("updateLoading", false)
            console.log(error);
        })

    },

   filterTransactions: ({ commit, state}, payload = TransactionRequest.filterTransaction) => {
       commit("updateLoading", true)
        return TransactionService.callReadTransactionsApi(payload).then(response => {
            let responseData = response.data
            commit("updateLoading", false)
            if (responseData.responseCode === "00") {
                commit("updateTransactions", responseData.data)
                Toast.fire({text:'result updated', icon:'success'})
            }else if(responseData.data.length < 1){
                Toast.fire({text:'no result found', icon:'error'})
            }
        }).catch(error => {
            commit("updateLoading", false)
            console.log(error);
        })

    },

}