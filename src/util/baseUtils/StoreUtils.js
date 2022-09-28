import store from "../../store/store";

class StoreUtils {
  static actions = {
    kycVerification: {
      UpdateCorporateAffairs:"kycVerification/UpdateCorporateAffairs",
      UpdateNationalIdentity:"kycVerification/UpdateNationalIdentity",
      UpdateVoterCard:"kycVerification/UpdateVoterCard",
      UpdateTax:"kycVerification/UpdateTax",
      UpdateDriversLicense:"kycVerification/UpdateDriversLicense",
      UpdateBvn:"kycVerification/UpdateBvn",
      readAllKyc:"kycVerification/readAllKyc"

    },

    document:{
      updateDocument:"document/updateDocument",
      readDocument:"document/readDocument",
      createDocument:"document/createDocument",
      uploadDocument:"document/uploadDocument"
    },
    apiKey: {
      updateApikey: "apiKey/updateApikey",
      create: "apiKey/create",
      regenerateApiKey:"apiKey/regenerateApiKey",
      updateWebhookCallback:"apiKey/updateWebhookCallback"
    },
    auth: {
      initialEnrollment: "auth/initialEnrollment",
      createCustomer: "auth/createCustomer",
      validateLink: "auth/validateLink",
      completeEnrollment: "auth/completeEnrollment",
      logon: "auth/logon",
      resendOtp: "auth/resendOtp",
      revalidateUser: "auth/revalidateUser",
      logOut: "auth/logOut",
      initiatePasswordReset: "auth/initiatePasswordReset",
      completePasswordReset: "auth/completePasswordReset",
      updateStage: "auth/updateStage",
      updateOrganisation:"auth/updateOrganisation",
      readRefferalState:"auth/readRefferalState",
      readDashboardStats:"auth/readDashboardStats",
      changePassword:"auth/changePassword",
      readOrganisationById:"auth/readOrganisationById"
    },
    dispute: {
      updateDisputes: "dispute/updateDisputes",
      createDispute: "dispute/createDispute",
      updateTransactionQuery:"dispute/updateTransactionQuery"
    },
    virtualAccount: {
      updateVirtualAccount: "virtualAccount/updateVirtualAccount",
      updateVirtualaccountTransactions:"virtualAccount/updateVirtualaccountTransactions",
      updateReadBankList:"virtualAccount/updateReadBankList",
      updateVirtualAccountCreate:"virtualAccount/updateVirtualAccountCreate"
    },
    walletTransactions: {
      updateAllWalletTransactions: "walletTransactions/updateAllWalletTransactions",
      updateBalanceEnquiry: "walletTransactions/updateBalanceEnquiry",
      updateReadAllWallets: "walletTransactions/updateReadAllWallets",
      updateWalletTransactions: "walletTransactions/updateWalletTransactions",
      updateWallet: "walletTransactions/updateWallet",
      updateCreatedWallet:"walletTransactions/updateCreatedWallet"
    },
    accountPayout:{
      readAddedBanks:"accountPayout/readAddedBanks",
      createAddedBanks:"accountPayout/createAddedBanks",
      editAddedBanks:"accountPayout/editAddedBanks",
      requestPayout:"accountPayout/requestPayout",
      readPayout:"accountPayout/readPayout"
    },
    billspayment:{
      updateCategories:"billspayment/updateCategories",
      updateBillers:"billspayment/updateBillers",
      updateProducts:"billspayment/updateProducts",
      updatePayment:"billspayment/updatePayment",
      updateCustomerEnq:"billspayment/updateCustomerEnq",
    }
  };

  static mutations = {
    kycVerification:{
      UpdateKycType:"kycVerification/UpdateKycType",
      UpdateLoading:"kycVerification/UpdateLoading",
      UpdateCorporateAffairs:"kycVerification/UpdateCorporateAffairs",
      UpdateNationalIdentity:"kycVerification/UpdateNationalIdentity",
      UpdateVoterCard:"kycVerification/UpdateVoterCard",
      UpdateTax:"kycVerification/UpdateTax",
      UpdateDriversLicense:"kycVerification/UpdateDriversLicense",
      UpdateBvn:"kycVerification/UpdateBvn",
      updateKycReadAll:"kycVerification/updateKycReadAll",
    },
    document:{
      updateLoading: "document/updateLoading",
      updateADocument: "document/updateADocument",
      uploadDocument: "document/uploadDocument",
      uploadStateDirectorIdCard1:"document/uploadStateDirectorIdCard1",
      uploadStateDirectorIdCard2:"document/uploadStateDirectorIdCard2"
},
    apiKey: {
      updateLoading: "apiKey/updateLoading",
      updateApikey: "apiKey/updateApikey"
    },
    auth: {
      updateLoading: "auth/updateLoading",
      updateStage: "auth/updateStage",
      updateToken: "auth/updateToken",
      updateUserInfo: "auth/updateUserInfo",
      updateScreen: "auth/updateScreen",
      updatePasswordResetScreen: "auth/updatePasswordResetScreen",
      updateOrganisation:"auth/updateOrganisation",
      updateBalance:"auth/updateBalances",
      updateRefferalStats:"auth/updateRefferalStats",
      updateTimedOut:"auth/updateTimedOut",
      updateAddedBanks:"accountPayout/updateAddedBanks",
      updatereadAddedBanks:"accountPayout/updatereadAddedBanks",


    },
    dispute: {
      updateLoading: "dispute/updateLoading",
      updateLoading2: "dispute/updateLoading2",
      updateDisputes: "dispute/updateDisputes",
      updateTransactionQuery:"dispute/updateTransactionQuery",
      updateSuccess:"dispute/updateSuccess",
      updateStatus:"dispute/updateStatus"
    },
    virtualAccount: {
      updateLoading: "virtualAccount/updateLoading",
      updateVirtualAccount: "virtualAccount/updateVirtualAccount",
      updateVirtualaccountTransactions:"virtualAccount/updateVirtualaccountTransactions",
      updateReadBankList:"virtualAccount/updateReadBankList",
      updateVirtualAccountCreate:"virtualAccount/updateVirtualAccountCreate"
    },
    walletTransactions: {
      updateLoading: "walletTransactions/updateLoading",
      updateBalanceEnquiry: "walletTransactions/updateBalanceEnquiry",
      updateReadAllWallets: "walletTransactions/updateReadAllWallets",
      updateWalletTransactions: "walletTransactions/updateWalletTransactions",
      updateWallet: "walletTransactions/updateWallet",
      updateAllWalletTransactions: "walletTransactions/updateAllWalletTransactions",
      updateCreatedWallet:"walletTransactions/updateCreatedWallet",
      updateRetrieveLoading:"walletTransactions/updateRetrieveLoading",
      updateWalletState:"walletTransactions/updateWalletState"
    },
    accountPayout:{
      updateAddedBanks:"accountPayout/updateAddedBanks",
      updateAccLoading:"accountPayout/updateAccLoading",
      updatereadAddedBanks:"accountPayout/updatereadAddedBanks",
      updateAllPayouts:"accountPayout/updateAllPayouts",
      updateAddBankLoading:"accountPayout/updateAddBankLoading"
    },
    billspayment:{
      updateCategories:"billspayment/updateCategories",
      updateBillers:"billspayment/updateBillers",
      updateBillersLoading:"billspayment/updateBillersLoading",
      updateCategoriesLoading:"billspayment/updateCategoriesLoading",
      updateProducts:"billspayment/updateProducts",
      updateProductLoading:"billspayment/updateProductLoading",
      updatePayment:"billspayment/updatePayment",
      updatePaymentLoading:"billspayment/updatePaymentLoading",
      updateCustomerEnq:"billspayment/updateCustomerEnq",
      updateCustomerEnqLoading:"billspayment/updateCustomerEnqLoading",
      updateSuccessMsg:"billspayment/updateSuccessMsg",
      updateErrorMsg:"billspayment/updateErrorMsg",

    }
  };

  static getters = {
    auth: {
      getUserInfo: "auth/getUserInfo",
      getToken: "auth/getToken",
      getUserToken: "auth/getUserToken",
      getOrganizationId: "auth/getOrganizationId",
      getCurrentOrganization: "auth/getCurrentOrganization",
      getStage: "auth/getStage",
      getOrginizationReferralLink:"auth/getOrginizationReferralLink",
      getOrganizationName:"auth/getOrganizationName",
      getorganisationRegistrationDate:"auth/getorganisationRegistrationDate",
      getorganisationPhone:"auth/getorganisationPhone",
      getorganisationEmail:"auth/getorganisationEmail",
      getorganisationCountry:"auth/getorganisationCountry"

    },
    document:{
      getDocuments:"document/getDocument"
    }
  };

  static dispatch(actionToDispatch, payload) {
    return store.dispatch(actionToDispatch, payload, { root: true });
  }

  static commit(mutationToCommit, payload) {
    return store.commit(mutationToCommit, payload, { root: true });
  }

  static rootGetters(getter, payload) {
    if (payload) {
      return store.getters[getter](payload);
    } else {
      return store.getters[getter];
    }
  }
}

export default StoreUtils;
