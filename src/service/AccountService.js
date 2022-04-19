import { apiClient} from "./BaseService";

export default {
    callAccountReadAPI(payload) {
        return apiClient.post("accountRead", payload);
    },
    callAccountReadSingleAPI(payload) {
        return apiClient.post("accountReadSingle", payload);
    },
    callAccountCreateAPI(payload) {
        return apiClient.post("accountCreate", payload);
    },
    callAccountUpdateAPI(payload) {
        return apiClient.post("accountUpdate", payload);
    },
    callCreateTerminalAPI(payload) {
        return apiClient.post("createTerminal", payload);
    },
    callAccountCheckerAPI(payload) {
        return apiClient.post("accountChecker", payload);
    },
    callRequestStatementAPI(payload) {
        return apiClient.post("requestStatement", payload);
    }


};