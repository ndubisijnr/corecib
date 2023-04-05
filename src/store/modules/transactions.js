import TransactionService from "../../service/TransactionService";
import TransactionRequest from "../../model/request/TransactionRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import Swal from "sweetalert2";


export const state = {
    loading: false,
    transactions:null
}

export const mutations = {
    updateLoading: (state, payload) => {
        state.loading = payload
    },
    updateTransactions: (state, payload) => {
        state.transactions = payload
    },
}

export const actions = {

   readTransactions: ({ commit, state}, payload = TransactionRequest.readWalletTransaction) => {
        if(!state.transactions) commit("updateLoading", true)
        return TransactionService.callReadTransactionsApi(payload).then(response => {
            let responseData = response.data
            commit("updateLoading", false)
            if (responseData.responseCode === "00") {
                commit("updateTransactions", responseData.data)
            }
        }).catch(error => {
            commit("updateLoading", false)
            console.log(error);
        })

    },

}