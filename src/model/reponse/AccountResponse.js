class AccountResponse {
    static create = {
        customerId:null,
        accountNumber:null,
        responseCode:null,
        responseMessage:null,
    }

    static  read = {
        responseCode: null,
        responseMessage: null,
        data: []
    }
}

export default  AccountResponse