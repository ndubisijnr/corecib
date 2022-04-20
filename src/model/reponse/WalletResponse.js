class WalletResponse {

    static WalletCreate={
        customerId: null,
        accountNumber: null,
        responseCode: null,
        responseMessage: null
    }

    static BalanceEnquiry={
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

    static RetrieveWallet={
        accountId: null,
        accountCustomerId: null,
        accountNumber: null,
        accountName: null,
        accountCurrency: null,
        accountBalance: null,
        accountStatus: null,
        accountLedgerBalance: null,
        responseCode: null,
        responseMessage: null
    }

    static ReadWallet={
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

    static ReadWalletTransaction={
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

    static ReadAllWalletTransaction={
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

