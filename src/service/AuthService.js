import {apiClient} from "./BaseService";

export default {
    callLogonApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.appClient.post("/authentication/login", payload);
    },
    callInitiateEnrollmentApi(payload) {
      // console.log("Service Payload ==>>", payload)
      return apiClient.appClient.post("/authentication/initiate-enrollment", payload);
    },
    callCompleteEnrollmentApi(payload){
      return apiClient.appClient.post("/authentication/complete-enrollment", payload)
    },
    callResendOtpApi(payload){
      return apiClient.appClient.post("/authentication/resend-otp", payload)

    },

  callRevalidateApi(payload){
    return apiClient.appClient.post("/authentication/user-details", payload)

  },
    callInitiatePasswordResetApi(payload){
      return apiClient.appClient.post("authentication/initiate-password-reset", payload)
    },
  callCompletePasswordResetApi(payload){
    return apiClient.appClient.post("authentication/complete-password-reset", payload)
  },
  callChangePasswordApi(payload){
    return apiClient.appClient.post("/authentication/change-password", payload)
  },
    callLogOutApi(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.appClient.post("logOut", payload);
    },

};
