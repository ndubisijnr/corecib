class VirtualAccountResponse {
<<<<<<< HEAD
    static create = {
=======

    static createVirtualAccount={
>>>>>>> 48a5eb300c222a9c5828340f0f2891e7c784b1d1
        accountNumber: null,
        accountName: null,
        accountParent: null,
        accountCustomerId: null,
        responseCode: null,
        responseMessage: null
    }

<<<<<<< HEAD
    static retrieve = {
=======
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
>>>>>>> 48a5eb300c222a9c5828340f0f2891e7c784b1d1
        accountId: null,
        accountNumber: null,
        accountName: null,
        accountCurrency: null,
        accountStatus: null,
        channelBankCode: null,
        channelBankName: null,
        accountCreatedDate: null,
        accountParent: null,
<<<<<<< HEAD
        responseCode: null,
        responseMessage: null

    }
}

export default VirtualAccountResponse
=======
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
>>>>>>> 48a5eb300c222a9c5828340f0f2891e7c784b1d1
