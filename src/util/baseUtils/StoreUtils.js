import store from "../../store/store";

class StoreUtils {
  static actions = {
    apiKey: {
      updateApikey: "apiKey/updateApikey",
      create: "apiKey/create"
    },
    auth: {
      initialEnrollment: "auth/initialEnrollment",
      completeEnrollment: "auth/completeEnrollment",
      logon: "auth/logon",
      resendOtp: "auth/resendOtp",
      revalidateUser: "auth/revalidateUser",
      logOut: "auth/logOut",
      initiatePasswordReset: "auth/initiatePasswordReset",
      completePasswordReset: "auth/completePasswordReset",
      updateStage: "auth/updateStage",
      updateOrganisation:"auth/updateOrganisation"
    },
    dispute: {
      updateDisputes: "dispute/updateDisputes",
      createDispute: "dispute/createDispute",
      updateTransactionQuery:"dispute/updateTransactionQuery"
    },
    virtualAccount: {
      updateVirtualAccount: "virtualAccount/updateVirtualAccount",
      updateVirtualaccountTransactions:"virtualAccount/updateVirtualaccountTransactions"
    },
    walletTransactions: {
      updateAllWalletTransactions: "walletTransactions/updateAllWalletTransactions",
      updateBalanceEnquiry: "walletTransactions/updateBalanceEnquiry",
      updateReadAllWallets: "walletTransactions/updateReadAllWallets",
      updateWalletTransactions: "walletTransactions/updateWalletTransactions",
      updateWallet: "walletTransactions/updateWallet",
    },
  };

  static mutations = {
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
      updateOrganisation:"auth/updateOrganisation"
    },
    dispute: {
      updateLoading: "dispute/updateLoading",
      updateLoading2: "dispute/updateLoading2",
      updateDisputes: "dispute/updateDisputes",
      updateTransactionQuery:"dispute/updateTransactionQuery",
      updateSuccess:"dispute/updateSuccess"
    },
    virtualAccount: {
      updateLoading: "virtualAccount/updateLoading",
      updateVirtualAccount: "virtualAccount/updateVirtualAccount",
      updateVirtualaccountTransactions:"virtualAccount/updateVirtualaccountTransactions"
    },
    walletTransactions: {
      updateLoading: "walletTransactions/updateLoading",
      updateBalanceEnquiry: "walletTransactions/updateBalanceEnquiry",
      updateReadAllWallets: "walletTransactions/updateReadAllWallets",
      updateWalletTransactions: "walletTransactions/updateWalletTransactions",
      updateWallet: "walletTransactions/updateWallet",
      updateAllWalletTransactions: "walletTransactions/updateAllWalletTransactions"
    },
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
