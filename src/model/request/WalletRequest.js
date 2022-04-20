
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
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
    }

    static readWalletTransaction={
        accountNumber: null,
        page: null
    }

    static readAllWalletTransaction={
        startDate: null,
        endDate: null,
        searchItem: null,
        page: null
    }

}

export default WalletRequest