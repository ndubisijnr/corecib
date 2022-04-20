class VirtualAccountResponse {

    static createVirtualAccount={
        accountNumber: null,
        accountName: null,
        accountParent: null,
        accountCustomerId: null,
        responseCode: null,
        responseMessage: null
    }

    static retrieveVirtualAccount={
        accountId: null,
        accountCurrency: null,
        responseCode: null,
        responseMessage: null
    }

    static readVirtualAccount={
        responseCode: null,
        responseMessage: null,
        data:[]
    }

    static data={
        accountId: null,
        accountNumber: null,
        accountName: null,
        accountCurrency: null,
        accountStatus: null,
        channelBankCode: null,
        channelBankName: null,
        accountCreatedDate: null,
        accountParent: null,
        accountExtraData: null,
        responseCode: null,
        responseMessage: null
    }

    static readVirtualAccountTransactionList={
        responseCode: null,
        responseMessage: null,
        data:[]
    }

    static data={
        address: null,
        bvn: null,
        dob: null,
        firstName: null,
        gender: null,
        lastName: null,
        middleName: null,
        phone: null,
        responseCode: null,
        responseMessage: null
    }

    static getChennelCodes={
        responseCode: null,
        responseMessage: null,
        data:[]
    }

    static data={
        bankCode: null,
        bankName: null,
    }

}

export default VirtualAccountResponse
