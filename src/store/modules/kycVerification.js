import KycRequest from "../../model/request/KycRequest";
import KycResponse from "../../model/reponse/KycResponse";
import KycVerificationService from "../../service/KycVerificationService";
import Swal from "sweetalert2";
import router from "../../router";
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
    tax:KycResponse.tax_identification_number,
    readKyc:KycResponse.read_by_organisation_id,
    kycReadAll:{},
    kycResponse: {}
}

export const mutations = {
    UpdateKycType: (state, payload) => {
        state.kycType = payload
    },
    updateKycReadAll: (state, payload) => {
        state.kycReadAll = payload
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
    },
    UpdateReadKYC:(state, payload) => {
        state.readKyc = payload
    },
    UpdateKycResponse:(state, payload) => {
        state.kycResponse = payload
    }
}

export const getters = {}


export const actions = {
    readAllKyc:({commit,state}, payload = KycRequest.read_by_organisation_id) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callReadAllKyc(payload).then((response) => {
            commit("UpdateLoading", false)
            let responseData = response.data
            if(responseData.responseCode === "00"){
                commit("updateKycReadAll", responseData.data)
            }else{
                console.log(responseData.responseMessage)
            }
        }).catch((e) => {
            commit("UpdateLoading", true)
            console.log(e)
        })
    },


    UpdateCorporateAffairs:({commit}, payload=KycRequest.corporate_affairs) => {
        commit("UpdateLoading", true)
        return KycVerificationService.callCorporateAffairsEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateKycResponse", responseData)

                if(router.currentRoute.name !== "MakeRequestView"){
                    setTimeout(() => {
                        router.push({name:"MakeRequestView"}).then(()=>{
                        Object.keys(KycRequest.corporate_affairs).forEach((key)=>{
                            KycRequest.corporate_affairs[key] = null
                        })
                    })
                    },0)
                }
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
        commit("UpdateBvn", KycResponse.bank_verification)
        return KycVerificationService.callBvnVerificationEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateKycResponse", responseData)
                if(router.currentRoute.name !== "MakeRequestView"){
                    setTimeout(() => {
                        router.push({name:"MakeRequestView"}).then(()=>{
                            Object.keys(KycRequest.bank_verification).forEach((key)=>{
                                KycRequest.bank_verification[key] = null
                            })
                        })
                    },0)
                }
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
        commit("UpdateNationalIdentity", KycResponse.bank_verification)
        return KycVerificationService.callNationalIdentityEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateKycResponse", responseData)
                if(router.currentRoute.name !== "MakeRequestView"){
                    setTimeout(() => {
                        router.push({name:"MakeRequestView"}).then(()=>{
                        Object.keys(KycRequest.national_identity).forEach((key)=>{
                            KycRequest.national_identity[key] = null
                        })
                    })
                    },0)
                }
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
        commit("UpdateVoterCard", KycResponse.bank_verification)
        return KycVerificationService.callVoterCardVerificationEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateKycResponse", responseData)
                if(router.currentRoute.name !== "MakeRequestView"){
                    setTimeout(() => {
                        router.push({name:"MakeRequestView"}).then(()=>{
                        Object.keys(KycRequest.voter_card).forEach((key)=>{
                            KycRequest.voter_card[key] = null
                        })
                    })
                },0)
                }
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
        commit("UpdateTax", KycResponse.bank_verification)
        return KycVerificationService.callTaxIdentificationEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateKycResponse", responseData)
                if(router.currentRoute.name !== "MakeRequestView"){
                    setTimeout(() => {
                        router.push({name:"MakeRequestView"}).then(()=>{
                        Object.keys(KycRequest.tax_identification_number).forEach((key)=>{
                            KycRequest.tax_identification_number[key] = null
                        })
                    })
                    },0)
                }
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
        commit("UpdateDriversLicense", KycResponse.bank_verification)
        return KycVerificationService.callDriverLicenceEndPoint(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("UpdateLoading", false)
                commit("UpdateKycResponse", responseData)
                if(router.currentRoute.name !== "MakeRequestView"){
                    setTimeout(() => {
                        router.push({name:"MakeRequestView"}).then(()=>{
                        Object.keys(KycRequest.drivers_licence).forEach((key)=>{
                            KycRequest.drivers_licence[key] = null
                        })
                    })
                },0)
    }
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