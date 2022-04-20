class VirtualAccountResponse {

    static CreateVirtualAccount={
        accountNumber: null,
        accountName: null,
        accountParent: null,
        accountCustomerId: null,
        responseCode: null,
        responseMessage: null
    }

    static RetrieveVirtualAccount={
        accountId: null,
        accountCurrency: null,
        responseCode: null,
        responseMessage: null
    }

    static ReadVirtualAccount={
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

    static ReadVirtualAccountTransactionList={
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

    static GetChennelCodes={
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
