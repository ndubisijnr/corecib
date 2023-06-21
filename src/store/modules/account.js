import AccountRequest from "../../model/request/AccountRequest";
import AccountService from "../../service/AccountService";
import AccountPayoutResponse from "../../model/reponse/AccountPayoutResponse";
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
   loading:false,
    accounts:[]
}

export const getters = {}

export const mutations = {
    updateLoading:(state, payload) => {
        state.loading = payload
    },
    updateAccount:(state, payload) => {
        state.accounts = payload
    }
}

export const actions = {

    createAccount({commit}, payload = AccountRequest.create) {
        commit("updateLoading", true)
        return AccountService.callCreateAccount(payload).then(async response => {
            commit("updateLoading", false)
            let responseData = response.data
            if(responseData.responseCode == "00"){
                await Toast.fire({text:responseData.responseMessage, icon:'success'})
            }else{
               await Toast.fire({text:responseData.responseMessage, icon:'error'})
            }
        }).catch(e => {
            console.log(e)
        })
    },

    readAccount({commit}, payload =AccountRequest.read){
        commit("updateLoading", true)
        return AccountService.callReadAccount(payload).then(response => {
            commit("updateLoading", false)
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("updateAccount", responseData.data)
                //.....
            }

        }).catch(e => {
            //.....
            console.log(e)
        })
    }

}

