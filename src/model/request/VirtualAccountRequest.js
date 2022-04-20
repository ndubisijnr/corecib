class VirtualAccountRequest {
    static createVirtualAccount = {
        firstName: null,
        address: null,
        gender: null,
        phoneNumber: null,
        accountParent: null,
        bvn: null,
        channelBankCode: null,
        dob: null,
        lastName: null
    }
    static retrieveVirtualAccountRequest = {
        accountNumber: null,
        channelBankCode: null
    }
    static readVirtualAccountRequest = {
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
    }
    static channelCodeRequest = {
        requestType: "FETCH_ALL"

    }
}


export default VirtualAccountRequest