import store from "../../store/store";

class StoreUtils {
  static actions = {
    apiKey: {
      updateApikey: "apiKey/updateApikey",
      create: "apiKey/create"
    },
    auth: {
      initialEnrollment: "auth/initialEnrollment",
      logon: "auth/logon",
      resendOtp: "auth/resendOtp",
      revalidateUser: "auth/revalidateUser",
      logOut: "auth/logOut",
      initiatePasswordReset: "auth/initiatePasswordReset",
      completePasswordReset: "auth/completePasswordReset",
      switchOrganisation: "auth/switchOrganisation"
    },
  };

  static mutations = {
    apiKey: {
      updateLoading: "apiKey/updateLoading",
      updateApikey: "apiKey/updateApikey"
    },
  };
  static getters = {

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
