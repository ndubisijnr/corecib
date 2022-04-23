
class WalletRequest {

    static walletCreate={
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

    static balanceEnquiry={
        accountNumber: null
    }

    static retrieveWallet={
        accountNumber: null
    }

    static readWallet={
        startDate: "",
        endDate: "",
        searchItem: "",
        page: null
    }

    static readWalletTransaction={
        accountNumber: null,
        page: null
    }

    static readAllWalletTransaction={
        startDate: "",
        endDate: "",
        searchItem: "",
        page: null
    }

}

export default WalletRequest