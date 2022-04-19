import { apiClient } from "./BaseService";

export default {
    callBranchReadAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("branchRead", payload);
    },
    callBranchCreateAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("branchcreate", payload);
    },
    callBranchCheckerAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("branchChecker", payload);
    },
    callBranchUpdateAPI(payload) {
        // console.log("Service Payload ==>>", payload)
        return apiClient.post("branchUpdate", payload);
    },

};