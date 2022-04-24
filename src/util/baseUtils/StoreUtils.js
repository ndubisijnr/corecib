import store from "../../store/store";

class StoreUtils {
  static actions = {
    apiKey: {
      updateApikey: "apiKey/updateApikey",
      create: "apiKey/create",
      regenerateApiKey:"apiKey/regenerateApiKey",
      updateWebhookCallback:"apiKey/updateWebhookCallback"
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
      switchOrganisation: "auth/switchOrganisation"
    },
    dispute: {
      updateDisputes: "dispute/updateDisputes",
      createDispute: "dispute/createDispute",
      updateTransactionQuery:"dispute/updateTransactionQuery"
    },
    virtualAccount: {
      updateVirtualAccount: "virtualAccount/updateVirtualAccount",
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
      updatePasswordResetScreen: "auth/updatePasswordResetScreen"
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
