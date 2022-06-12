import BillsPaymentRequest from "../../model/request/BillsPaymentRequest";
import BillsPaymentResponse from "../../model/reponse/BillsPaymentResponse";
import BillsPaymentService from "../../service/BillsPaymentService";
import Toast from "../../../toastNotification";
import swal from "sweetalert2";


export const state = {
    categoriesloading:false,
    billersloading:false,
    productloading:false,
    paymentloading:false,
    loading:false,
    categories:{},
    billers:{},
    products:{},
    payment:{}
}

export const mutations = {
    updateCategories:(state,payload) => {
        state.categories = payload
    } ,
    updateCategoriesLoading:(state,payload) => {
        state.productloading = payload
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
             Toast.fire({text:"Something went wrong please try again", icon:"error"})
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
                Toast.fire({text:"Something went wrong please try again", icon:"error"})
            }
        })
    },
    updateProducts:({commit}, payload = BillsPaymentRequest.readProduct) => {
        commit("updateProductLoading", true)
        return BillsPaymentService.callReadProductApi(payload).then((response) => {
            let responseData = response.data
            if(responseData.responseCode == "00"){
                commit("updateProductLoading", false)
                commit("updateProducts", responseData)
            }
            else{
                commit("updateBillersLoading", false)
                Toast.fire({text:"Something went wrong please try again", icon:"error"})
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
                swal.fire({text:responseData.responseMessage, icon:"success"})
            }
            else{
                commit("updatePaymentLoading", false)
                Toast.fire({text:responseData.responseMessage, icon:"error"})
            }
        })
    }
}