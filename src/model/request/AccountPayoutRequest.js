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

}

export default AccountPayoutRequest