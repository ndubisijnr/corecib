import BillsPaymentRequest from "../../model/request/BillsPaymentRequest";
import BillsPaymentResponse from "../../model/reponse/BillsPaymentResponse";
import BillsPaymentService from "../../service/BillsPaymentService";
import Toast from "../../../toastNotification";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import StoreUtils from "@/util/baseUtils/StoreUtils";


export const state = {
    categoriesloading:false,
    billersloading:false,
    customerEnqloading:false,
    productloading:false,
    paymentloading:false,
    loading:false,
    errorMsg:null,
    successMsg:null,
    customerEnq:BillsPaymentResponse.customerEnq,
    categories:{},
    billers:{},
    products:{},
    payment:{}
}

export const mutations = {
    updateCategories:(state,payload) => {
        state.categories = payload
    } ,
    updateErrorMsg:(state, payload) => {
        state.errorMsg = payload
    },
    updateSuccessMsg:(state, payload) => {
        state.successMsg = payload
    },
    updateCategoriesLoading:(state,payload) => {
        state.productloading = payload
    } ,
    updateCustomerEnqLoading:(state,payload) => {
        state.customerEnqloading = payload
    } ,
    updateProductLoading:(state,payload) => {
        state.categoriesloading = payload
    } ,
    updatePaymentLoading:(state,payload) => {
        state.paymentloading = payload
    } ,
    updateProducts:(state,payload) => {
        state.products = payload
    },
    updateCustomerEnq:(state, payload) => {
        state.customerEnq = payload
    },
    updateBillersLoading:(state,payload) => {
        state.billersloading = payload
    } ,
    updateBillers:(state,payload) => {
        state.billers = payload
    },
    updatePayment:(state,payload) => {
        state.payment = payload
    }
}
export const getters = {

}
export const actions = {
    updateCategories:({commit}, payload = BillsPaymentRequest.readCategories) => {
        commit("updateCategoriesLoading", true)
     return BillsPaymentService.callReadCategoriesApi(payload).then((response) => {
         let responseData = response.data
         if(responseData.responseCode == "00"){
             commit("updateCategoriesLoading", false)
             commit("updateCategories", responseData)
         }else{
             commit("updateCategoriesLoading", false)
             Swal.fire({
                 title: 'Session timed out',
                 html: 'Please re-authenticate',
                 icon:"info",
                 // didOpen: () => {
                 //   Swal.showLoading()
                 //   const b = Swal.getHtmlContainer().querySelector('b')
                 //   timerInterval = setInterval(() => {
                 //     b.textContent = Swal.getTimerLeft()
                 //   }, 100)
                 // },
             }).then((result) => {
                 /* Read more about handling dismissals below */
                 // if (result.dismiss === Swal.DismissReason.timer) {
                 //   console.log('I was closed by the timer')
                 //   router.push({name:"Logon"}).then(()=> {
                 //     window.location.reload()
                 //   })
                 // }
                 StoreUtils.dispatch(StoreUtils.actions.auth.logOut,{customerEmail: StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).customerEmail})
             })
         }
     })
    },
    updateBillers:({commit}, payload = BillsPaymentRequest.readBiller) => {
        commit("updateBillersLoading", true)
        return BillsPaymentService.callReadBillersApi(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("updateBillersLoading", false)
                commit("updateBillers", responseData)
            }
            else{
                commit("updateBillersLoading", false)
                Swal.fire({
                    title: 'Session timed out',
                    html: 'Please re-authenticate',
                    icon:"info",
                    // didOpen: () => {
                    //   Swal.showLoading()
                    //   const b = Swal.getHtmlContainer().querySelector('b')
                    //   timerInterval = setInterval(() => {
                    //     b.textContent = Swal.getTimerLeft()
                    //   }, 100)
                    // },
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    // if (result.dismiss === Swal.DismissReason.timer) {
                    //   console.log('I was closed by the timer')
                    //   router.push({name:"Logon"}).then(()=> {
                    //     window.location.reload()
                    //   })
                    // }
                    StoreUtils.dispatch(StoreUtils.actions.auth.logOut,{customerEmail: StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).customerEmail})
                })
            }
        })
    },
    updateProducts:({commit,dispatch}, payload = BillsPaymentRequest.readProduct) => {
        commit("updateProductLoading", true)
        return BillsPaymentService.callReadProductApi(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("updateProductLoading", false)
                commit("updateProducts", responseData)
            }
            else{
                commit("updateBillersLoading", false)
                Swal.fire({
                    title: 'Session timed out',
                    html: 'Please re-authenticate',
                    icon:"info",
                    // didOpen: () => {
                    //   Swal.showLoading()
                    //   const b = Swal.getHtmlContainer().querySelector('b')
                    //   timerInterval = setInterval(() => {
                    //     b.textContent = Swal.getTimerLeft()
                    //   }, 100)
                    // },
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    // if (result.dismiss === Swal.DismissReason.timer) {
                    //   console.log('I was closed by the timer')
                    //   router.push({name:"Logon"}).then(()=> {
                    //     window.location.reload()
                    //   })
                    // }
                    StoreUtils.dispatch(StoreUtils.actions.auth.logOut,{customerEmail: StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).customerEmail})
                })
            }
        })
    },
    updatePayment:({commit}, payload = BillsPaymentRequest.productPayment) => {
        commit("updatePaymentLoading", true)
        return BillsPaymentService.callProductPaymentApi(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("updatePaymentLoading", false)
                commit("updatePayment", responseData)
                StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions).then();
                swal.fire({text:responseData.responseMessage, icon:"success"})
            }
            else{
                commit("updatePaymentLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"})

            }
        }).catch((e) => {
            commit("updatePaymentLoading", false)
            Toast.fire({text:e, icon:"error"})

        })
    },
    updateCustomerEnq:({commit}, payload=BillsPaymentRequest.customerEnquiry) => {
        commit("updateCustomerEnqLoading", true)
        return BillsPaymentService.callCustomerEnquiry(payload).then((response) => {
            let responseData = response.data
            if (responseData.responseCode == "00") {
                commit("updateCustomerEnqLoading", false)
                commit("updateErrorMsg", responseData.responseCode)
                commit("updateCustomerEnq", responseData)
            }else{
                commit("updateCustomerEnqLoading", false)
                commit("updateErrorMsg", responseData.responseCode)
                // swal.fire({text:responseData.responseMessage, icon:"error"})
            }
        }).catch((e) => {
            commit("updateCustomerEnqLoading", false)
            // swal.fire({text:e, icon:"error"})
        })
    }
}