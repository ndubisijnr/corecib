
class VirtualAccountRequest {

    static createVirtualAccount={
        firstName: null,
        lastName: null,
        address: null,
        gender: null,
        phoneNumber: null,
        accountParent: null,
        bvn: null,
        channelBankCode: null,
        dob: null
    }

    static retrieveVirtualAccount={
        accountNumber: null,
        channelBankCode: null
    }

    static readVirtualAccount={
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
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

}

export default VirtualAccountRequest