class AccountPayoutRequest{
    static readAccountPayoutById={
        accountOrganisationId:null
    }

    static createAccountPayout={
        accountName:null, 
        accountNumber:null,
        accountBankName:null,
        accountBankCode:null,
        accountCountry:null,
        username:null,
        otp:null,
        accountOrganisationId:null
    }

    static updateAccountPayout={
        accountName:null, 
        accountNumber:null,
        accountBankName:null,
        accountBankCode:null,
        accountCountry:null,
        username:null,
        otp:null,
        accountOrganisationId:null 
    }

    static createPayout = {
        payoutReference:null,
        payoutAmount: null,
        payoutMessage:"this is a message"
    }


    static readPayout = {
        startDate: null,
        endDate: null,
        page: 1
    }

}

export default AccountPayoutRequest