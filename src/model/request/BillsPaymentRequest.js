class BillsPaymentRequest {
    static readCategories = {
        request: "readAll"
    }
    static readBiller = {
        categoryCode: null
    }
    static readProduct = {
        billerCode:null
    }
    static customerEnquiry = {
        billerCode:null
    }
    static productPayment = {
        reference: null,
        billerCustomerId: null,
        productCode: null,
        amount: null,
        email:null
    }
    static customerEnquiry = {
        billerCode:null,
        billerCustomerId:null,
    }
}


export default BillsPaymentRequest