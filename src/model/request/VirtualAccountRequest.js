
class VirtualAccountRequest {

    static createVirtualAccount={
        virtualAccountName:null,
        virtualAccountParent:null,//optional(default is your business account)
        virtualAccountBankCode:null,
        virtualAccountAmountControl:null, //optional(default is VARIABLE) values can be VARIABLE, GREATER, EXACT, LESSER
        virtualAccountType:null, //REUSABLE or DISPOSABLE
        virtualAccountExtraData:null, //optional
        virtualAccountValidTime:null,//optional(default is 1443 minutes)
    }

    static retrieveVirtualAccount={
        accountNumber: null,
        channelBankCode: null
    }

    static readByAccountNumber = {
        virtualAccountNumber: null
    }

    static readVirtualAccount={
        startDate: "",
        endDate: "",
        searchItem: "",
        page: 1
    }

    static readVirtualAccountTransactions={
        startDate: null,
        endDate: null,
        accountNumber: null,
        searchItem: null,
        page: 1
    }

    static getChennelCodes={
        requestType: null
    }

    static getBankList={
        readAll:"YES"
    }

    static virtualAccountUpdate={
        virtualAccountName:null,
        virtualAccountNumber:null,
    }

    static editVirtualAccount={
        virtualAccountName:null,
        virtualAccountNumber:null,
    }

}

export default VirtualAccountRequest