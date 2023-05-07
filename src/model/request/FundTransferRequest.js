
class FundTransferRequest {

    static fundTransfer={
        amount:null,
        bankName:null,
        bankCode:null,
        creditAccountName:null,
        creditAccountNumber:null,
        debitAccountName:null,
        debitAccountNumber:null,
        narration:null,
        sessionId:null,
        reference:null,
        sourceType: "WEB"
    }


    static readTransactions={
        startDate:null ,//2022-04-01
        endDate:null ,//2022-04-28
        searchItem:null ,
        page: 1
    }

    static nameEnquiry={
        accountBankCode:null,
        accountNumber: null
    }

    static transactionQueryStatus={
        reference: null
    }

    static postSingleTransactions = {
        amount:null,
        creditAccountNumber:null,
        debitAccountNumber:null,
        narration:null,
        reference:null,
    }

}

export default FundTransferRequest