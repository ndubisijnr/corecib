import { apiClient, apiClient2 } from "./BaseService";

export default {
    callLogonApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient2.post("/authentication/login", payload);
    },
    callInitiateEnrollmentApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient2.post("/authentication/initiate-enrollment", payload);
    },
    callCompleteEnrollmentApi(payload){
      return apiClient2.post("/authentication/complete-enrollment", payload)
    },
    callResendOtpApi(payload){
      return apiClient2.post("/authentication/resend-otp", payload)

    },

  callRevalidateApi(payload){
    return apiClient.post("/authentication/user-details", payload)

  },
    callInitiatePasswordResetApi(payload){
      return apiClient2.post("authentication/initiate-password-reset", payload)
    },
  callCompletePasswordResetApi(payload){
    return apiClient2.post("authentication/complete-password-reset", payload)
  },
  callChangePasswordApi(payload){
    return apiClient2.post("/authentication/change-password", payload)
  },
    callLogOutApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient2.post("logOut", payload);
    },

};
