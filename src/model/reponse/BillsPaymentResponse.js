class BillsPaymentResponse{
    static productPayment = {
        reference:null,
        billerCustomerId:null,
        productCode:null,
        amount:null,
        responseCode:null,
        responseMessage:null
    }
    static customerEnq = {
        customerId:null,
        customerName:null,
        address:null,
        dueDate:null,
        district:null,
        outstandingBalance:null,
        customerType:null,
        billerCode:null,
        responseCode:null,
        responseMessage:null,
    }
}

export default  BillsPaymentResponse