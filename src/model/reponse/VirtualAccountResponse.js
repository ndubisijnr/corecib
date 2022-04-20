class VirtualAccountResponse {
    static create = {
        accountNumber: null,
        accountName: null,
        accountParent: null,
        accountCustomerId: null,
        responseCode: null,
        responseMessage: null
    }

    static retrieve = {
        accountId: null,
        accountNumber: null,
        accountName: null,
        accountCurrency: null,
        accountStatus: null,
        channelBankCode: null,
        channelBankName: null,
        accountCreatedDate: null,
        accountParent: null,
        responseCode: null,
        responseMessage: null

    }
}

export default VirtualAccountResponse