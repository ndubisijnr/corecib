
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
        startDate: "",
        endDate: "",
        searchItem: "",
        page: 1
    }

    static readVirtualAccountTransactionList={
        address: null,
        bvn: null,
        dob: null,
        firstName: null,
        gender: null,
        lastName: null,
        middleName: null,
        phone: null
    }

    static getChennelCodes={
        requestType: null
    }

}

export default VirtualAccountRequest