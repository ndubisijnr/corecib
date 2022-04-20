
class WalletRequest {

    static WalletCreate={
        bvn: null,
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        countryCode: null,
        currency: null,
        minimumBalance: null,
        maximumBalance: null
    }

    static BalanceEnquiry={
        accountNumber: null
    }

    static RetrieveWallet={
        accountNumber: null
    }

    static ReadWallet={
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
    }

    static ReadWalletTransaction={
        accountNumber: null,
        page: null
    }

    static ReadAllWalletTransaction={
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
    }

}

export default WalletRequest