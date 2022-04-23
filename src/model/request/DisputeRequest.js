

class DisputeRequest {

    static disputeCreate={
        disputeSessionId: null,
        disputeTrnType: null,
        disputeIssueType: null,
        disputeComment: null,
        disputeRemark: null,
        disputeOrgId: null

    }

    static disputeRead={
        disputeId: null
    }

    static disputeReadSingle={
        disputeId: null,

    }

    static disputeUpdate={
        disputeId: null,
        disputeSessionId: null,
        disputeTrnType: null,
        disputeIssueType: null,
        disputeComment: null,
        disputeRemark: null,
        disputeOrgId: null
    }

    static disputeUpdateStatus={
        disputeId: null,
        disputeStatus: null

    }
}

export default DisputeRequest


