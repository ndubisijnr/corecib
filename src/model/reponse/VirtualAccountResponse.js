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

    static virtualAccountTransactionData={
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

    static chennelCodedata={
        bankCode: null,
        bankName: null,
    }

}

export default VirtualAccountResponse
