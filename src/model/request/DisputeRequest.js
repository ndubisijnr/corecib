

class DisputeRequest {

    static disputeCreate={
        disputeSessionId: null,
        disputeTrnType: "NA",
        disputeIssueType: null,
        disputeComment: null,
        disputeRemark: "Transaction",
        disputeOrgId: localStorage.getItem("organisationId")

    }

    static disputeRead={
        disputeId: null
    }

    static transactionStatusQuery={
        reference:null

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


