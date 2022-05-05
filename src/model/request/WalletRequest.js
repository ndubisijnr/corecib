
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
        page: 1
    }

    static readWalletTransaction={
        accountNumber: "",
        endDate: "",
        startDate: "",
        searchItem: "",
        page: 1
    }

    static readAllWalletTransaction={
        startDate: "",
        endDate: "",
        searchItem: "",
        page: null
    }

    static readBalance ={
        requestType: "read-balances"
    }

}

export default WalletRequest