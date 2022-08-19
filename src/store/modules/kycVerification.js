import KycRequest from "../../model/request/KycRequest";
import KycResponse from "../../model/reponse/KycResponse";
import KycVerificationService from "../../service/KycVerificationService";
import Swal from "sweetalert2";
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
    loading:false,
    kycType:null,
    bvn:KycResponse.bank_verification,
    corporate_affairs:KycResponse.corporate_affairs,
    national_identity:KycResponse.national_identity,
    drivers_license:KycResponse.drivers_licence,
    voter_card:KycResponse.voter_card,
    tax:KycResponse.tax_identification_number
}

export const mutations = {
    UpdateKycType: (state, payload) => {
        state.kycType = payload
    },
    UpdateCorporateAffairs: (state, payload) => {
        state.corporate_affairs = payload
    },
    UpdateBvn: (state, payload) => {
        state.bvn = payload
    },
    UpdateNationalIdentity: (state, payload) => {
        state.national_identity = payload
    },
    UpdateVoterCard: (state, payload) => {
        state.voter_card= payload
    },
    UpdateTax: (state, payload) => {
        state.tax= payload
    },
    UpdateDriversLicense: (state, payload) => {
        state.drivers_license= payload
    },
    UpdateLoading: (state, payload) => {
        state.loading = payload
    }
}

export const getters = {}

export const actions = {
    UpdateCorporateAffairs:({commit}, payload=KycRequest.corporate_affairs) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callCorporateAffairsEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateCorporateAffairs", responseData)
            }else{
                commit("UpdateLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()
            }
        }).catch((e) => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()

        })
    },
    UpdateBvn:({commit}, payload=KycRequest.bank_verification) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callBvnVerificationEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateBvn", responseData)
            }else{
                commit("UpdateLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()
            }
        }).catch((e) => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()
        })
    },
    UpdateNationalIdentity:({commit}, payload=KycRequest.national_identity) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callNationalIdentityEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateNationalIdentity", responseData)
            }else{
                commit("UpdateLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()
            }
        }).catch((e) => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()
        })
    },
    UpdateVoterCard:({commit}, payload=KycRequest.voter_card) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callVoterCardVerificationEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateVoterCard", responseData)
            }else{
                commit("UpdateLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()

            }
        }).catch((e) => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()
        })
    },
    UpdateTax:({commit}, payload=KycRequest.tax_identification_number) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callTaxIdentificationEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateTax", responseData)
            }else{
                commit("UpdateLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()

            }
        }).catch((e) => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()
        })
    },
    UpdateDriversLicense:({commit}, payload=KycRequest.drivers_licence) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callDriverLicenceEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateDriversLicense", responseData)
            }else{
                commit("UpdateLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"}).then()

            }
        }).catch((e) => {
            commit("UpdateLoading", false)
            Toast.fire({text:e, icon:"error"}).then()
        })
    },
}