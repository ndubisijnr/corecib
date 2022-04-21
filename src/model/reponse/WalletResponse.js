class WalletResponse {

    static walletCreate={
        customerId: null,
        accountNumber: null,
        responseCode: null,
        responseMessage: null
    }

    static balanceEnquiry={
        responseCode: null,
        responseMessage: null,
        data:[]
    }

    static data={
        accountBalance:null,
        accountLedgerBalance:null,
        accountBankCode:null,
        accountBankName:null,
        accountBranchCode:null,
        accountCurrency:null,
        accountCustomerPhone:null,
        accountName:null,
        accountNumber:null,
    }

    static retrieveWallet={
        accountId:null,
        accountCustomerId:null,
        accountNumber:null,
        accountName:null,
        accountCurrency:null,
        accountBalance:null,
        accountStatus:null,
        accountLedgerBalance:null,
        accountPhone:null,
        accountEmail:null,
        accountBvn:null,
        responseCode: null,
        responseMessage: null
    }

    static walletTransaction={
        amount:null,
        counterPartyService:null,
        transactionDate:null,
        eventDate:null,
        counterPartyBankCode:null,
        contractReference:null,
        paymentReference:null,
        counterPartyAccountName:null,
        drCr:null,
        counterPartyBank:null,
        counterPartyChannel:null,
        accountName:null,
        accountNumber:null,
        counterPartyAccountNumber:null,
        transactionType:null,
        id:null,
        narration:null,
        responseCode: null,
        responseMessage: null
    }
}

export default WalletResponse

