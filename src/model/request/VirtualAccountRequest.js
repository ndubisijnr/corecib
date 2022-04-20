
class VirtualAccountRequest {

    static CreateVirtualAccount={
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

    static RetrieveVirtualAccount={
        accountNumber: null,
        channelBankCode: null
    }

    static ReadVirtualAccount={
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
    }

    static ReadVirtualAccountTransactionList={
        address: null,
        bvn: null,
        dob: null,
        firstName: null,
        gender: null,
        lastName: null,
        middleName: null,
        phone: null
    }

    static GetChennelCodes={
        requestType: null
    }

}

export default VirtualAccountRequest