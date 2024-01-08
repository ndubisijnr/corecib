import store from "../../store/store";

class StoreUtils {
  static actions = {

    account:{
      createAccount:"account/createAccount",
      readAccount:"account/readAccount"
    },

    transactions:{
      readTransactions:"transactions/readTransactions",
      filterTransactions:"transactions/filterTransactions"
    },

    fundTransfer:{
      readTransactions:"fundTransfer/readTransactions",
      callNameEnquiry:"fundTransfer/callNameEnquiry",
      fundTransfer:"fundTransfer/fundTransfer"
    },

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
      resetTerminalPin: "auth/resetTerminalPin",
      terminalLogout: "auth/terminalLogout",
      resendOtp: "auth/resendOtp",
      revalidateUser: "auth/revalidateUser",
      logOut: "auth/logOut",
      initiatePasswordReset: "auth/initiatePasswordReset",
      completePasswordReset: "auth/completePasswordReset",
      updateStage: "auth/updateStage",
      updateOrganisation:"auth/updateOrganisation",
      readRefferalState :"auth/readRefferalState",
      readDashboardStats:"auth/readDashboardStats",
      changePassword:"auth/changePassword",
      readOrganisationById:"auth/readOrganisationById",
      addOrganisation:"auth/addOrganisation",
      readOrganisationByUserId:"auth/readOrganisationByUserId",
      inviteCustomer:"auth/inviteCustomer",
      readCustomerByOrganisation:"auth/readCustomerByOrganisation",
      readOrganisationRoles:"auth/readOrganisationRoles",
      readAllInvites:"auth/readAllInvites",
      updateUser:"auth/updateUser"
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
      updateVirtualAccountCreate:"virtualAccount/updateVirtualAccountCreate",
      editVirtualAccount:"virtualAccount/editVirtualAccount"
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
    },
    preference:{
      readAllPreference:"preference/readAllPreference",
      readPreferenceById:"preference/readPreferenceById",
      createPreference:"preference/createPreference",
      updatePreference:"preference/updatePreference",
      updatePreferenceStatus:"preference/updatePreferenceStatus"

    }

  };

  static mutations = {
    account:{
      updateLoading:"account/updateLoading",
      updateAccount:"account/updateAccount"
    },
    transactions:{
      updateTransactions:"transactions/updateTransactions",
      updateLoading:"transactions/updateLoading",
      updateRefreshLoading:"transactions/updateRefreshLoading"
    },

    fundTransfer:{
      updateTransactions:"fundTransfer/updateTransactions",
      updateLoading:"fundTransfer/updateLoading",
      updateNameEnquiry:"fundTransfer/updateNameEnquiry",
      updateDebitAccountNameEnquiry:"fundTransfer/updateDebitAccountNameEnquiry",
      updateLoading2:"fundTransfer/updateLoading2",
      updateSendingTo:"fundTransfer/updateSendingTo",
      updateCloseModal:"fundTransfer/updateCloseModal",
      updateCoreStepCreditAccount:"fundTransfer/updateCoreStepCreditAccount",
      updateStage:"fundTransfer/updateStage"
    },

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
      UpdateKycResponse:"kycVerification/UpdateKycResponse"
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
      updateReminderForm:"auth/updateReminderForm",
      updateDarkMode:"auth/updateDarkMode",
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
      updateAllOrganisation:"auth/updateAllOrganisation",
      updateAllOrganisationList:"auth/updateAllOrganisationList",
      updateCurrentOrganisation:"auth/updateCurrentOrganisation",
      updateForm:"auth/updateForm",
      updateAllCustomer:"auth/updateAllCustomer",
      updateOrganisationRoles:"auth/updateOrganisationRoles",
      updateAllInvites:"auth/updateAllInvites",
      updateSingleOrganisationUser:"auth/updateSingleOrganisationUser",
      updateUserEditForm:"auth/updateUserEditForm",
      updateIsSwitching:"auth/updateIsSwitching",
      updateLoginLoading:"auth/updateLoginLoading",
      updateShowBalance:"auth/updateShowBalance",
      updateSearchLoading:"auth/updateSearchLoading"

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
      updateVirtualAccountCreate:"virtualAccount/updateVirtualAccountCreate",
      updateVirtualAccountEditPayload:"virtualAccount/updateVirtualAccountEditPayload"
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
    },
    preference:{
      UpdatePreference:"preference/UpdatePreference",
      updatePreferenceState:"preference/updatePreferenceState"
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
      getorganisationCountry:"auth/getorganisationCountry",
      getCustomerId:"auth/getCustomerId"

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
