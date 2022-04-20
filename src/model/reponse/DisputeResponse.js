
class DisputeResponse {

    static disputeCreate={
        disputeSessionId:null,
        disputeTrnType:null,
        disputeIssueType:null,
        disputeComment:null,
        disputeRemark:null,
        disputeOrgId:null,
        responseCode: null,
        responseMessage: null
    }

    static disputeRead={
        responseCode: null,
        responseMessage: null,
        data:[]
    }

    static data={
        disputeId:null,
        disputeSessionId:null,
        disputeTrnType:null,
        disputeIssueType:null,
        disputeComment:null,
        disputeRemark:null,
        disputeOrgId:null,
        disputeStatus:null,
        disputeCreatedAt:null,
        disputeUpdatedAt:null,
        responseCode: null,
        responseMessage: null
    }

    static disputeReadSingle={
        disputeId:null,
        disputeSessionId:null,
        disputeTrnType:null,
        disputeIssueType:null,
        disputeComment:null,
        disputeRemark:null,
        disputeOrgId:null,
        disputeStatus:null,
        disputeCreatedAt:null,
        disputeUpdatedAt:null,
        responseCode: null,
        responseMessage: null
    }

    static disputeUpdate={
        disputeId:null,
        disputeSessionId:null,
        disputeTrnType:null,
        disputeIssueType:null,
        disputeComment:null,
        disputeRemark:null,
        disputeOrgId:null,
        disputeStatus:null,
        disputeCreatedAt:null,
        disputeUpdatedAt:null,
        responseCode: null,
        responseMessage: null
    }

    static disputeUpdateStatus={
        disputeId:null,
        disputeStatus:null,
        responseCode: null,
        responseMessage: null
    }

}

export default DisputeResponse