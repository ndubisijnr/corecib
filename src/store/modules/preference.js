import PreferenceService from "../../service/PreferenceService";
import PreferenceRequest from "../../model/request/PreferenceRequest";
import PreferenceResponse from "../../model/reponse/PreferenceResponse";
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

export const state={
    loading:false,
    preference:PreferenceResponse.readPreference,
    preferenceState:"create"

}


export const getter={}


export const mutations={
    UpdateLoading:(state, payload)=> {
        state.loading = payload
    },
    UpdatePreference:(state, payload)=> {
        state.preference = payload
    },
    updatePreferenceState:(state, payload) => {state.preferenceState = payload}

}

export const actions={
    readAllPreference:({commit}, payload=PreferenceRequest.preferenceRead) => {
        commit("UpdateLoading", true)
        return PreferenceService.callReadPreferenceApi(payload).then(response => {
            let responseData = response.data
            if(responseData.responseCode === "00"){

            }
        })
    },
    readPreferenceById:({commit,state}, payload=PreferenceRequest.preferenceReadByOrganisationId) => {
        payload.preferenceOrganisationId = localStorage.organisationId
        commit("UpdateLoading", true)
        return PreferenceService.callReadPreferenceByOrganisationApi(payload).then(response => {
            commit("UpdateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                commit("UpdatePreference",responseData)
                if(responseData.preferenceStatus === "ACTIVE"){
                    commit("updatePreferenceState", "edit")
                }
            }else{
                Object.keys(state.preference).forEach(key => {
                    state.preference[key] = null
                })
            }
        }).catch(e => {
            Toast.fire({text:e, icon:"error"}).then()
        })
    },

    createPreference:({commit}, payload=PreferenceRequest.preferenceCreate) => {
        payload.preferenceOrganisationId = localStorage.organisationId
        payload.preferenceMakerId = localStorage.organisationId
        payload.preferenceId = localStorage.organisationId
        commit("UpdateLoading", true)
        return PreferenceService.callCreatePreferenceApi(payload).then(response => {
            commit("UpdateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                Toast.fire({text:responseData.responseMessage, icon:"success"})
                commit("updatePreferenceState", "edit")
            }else{
                Toast.fire({text:responseData.responseMessage, icon:"error"})
            }
        }).catch(e => {
            Toast.fire({text:e, icon:"error"})

        })
    },
    updatePreference:({commit,state}, payload=PreferenceRequest.preferenceCreate) => {
        payload.preferenceOrganisationId = localStorage.organisationId
        payload.preferenceId = state.preference.preferenceId
        commit("UpdateLoading", true)
        return PreferenceService.callUpdatePreferenceApi(payload).then(response => {
            commit("UpdateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                Toast.fire({text:responseData.responseMessage, icon:"success"})
            }else{
                Toast.fire({text:responseData.responseMessage, icon:"error"})
            }
        }).catch(e => {
            Toast.fire({text:e, icon:"error"})
        })
    },
    updatePreferenceStatus:({commit,state}, payload=PreferenceRequest.preferenceUpdateStatus) => {
        payload.preferenceId = localStorage.organisationId
        commit("UpdateLoading", true)
        return PreferenceService.callUpdatePreferenceStatusApi(payload).then(response => {
            commit("UpdateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                StoreUtils.dispatch(StoreUtils.actions.preference.readPreferenceById).then()
            }else {
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()
            }
        }).catch(e => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()

        })
    },
}