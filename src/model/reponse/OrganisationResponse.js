
class OrganisationResponse {

    static updateOrganisation = {
        responseCode: null,
        responseMessage: null
    }

    static transactionEnquiry = {
        responseCode: null,
        responseMessage: null,
        data: []
    }

    static data = {
        transactionId: null,
        transactionAmount: null,
        transactionContractReference: null,
        transactionPaymentReference: null,
        transactionResponseCode: null,
        transactionResponseMessage: null,
        transactionService: null,
        transactionType: null,
        transactionWaitTimeInMinute: null,
        transactionCreatedAt: null,
        transactionUpdatedAt: null,
        responseCode: null,
        responseMessage: null
    }

    static balanceEnquiry = {
        responseCode: null,
        responseMessage: null
    }

    static readOrganisationById = {
        organisationId: null,
        organisationCustomerId: null,
        organisationAccountNumber: null,
        organisationName: null,
        organisationLogo: null,
        organisationRegistrationNo: null,
        organisationRegistrationDate: null,
        organisationAddress: null,
        organisationCity: null,
        organisationState: null,
        organisationPhone: null,
        organisationMemorandumAndArticleOfAssociation: null,
        organisationEmail: null,
        organisationDirectorName:null,
        organisationDirectorDob:null,
        organisationDirectorIdCard:null,
        organisationDirectorIdCardType:null,
        organisationType: null,
        organisationStatus: null,
        organisationCreatedAt: null,
        organisationUpdatedAt: null,
        organisationWebsite: null,
        organisationCountry: null,
        organisationIndustryType: null,
        organisationFormCac: null,
        organisationCertificateIncorpation: null,
        organisationScumlCertificate: null,
        organisationTin: null,
        organisationStage: null,
        organisationFtOutwardPrd: null,
        organisationFtInternalPrd: null,
        organisationFtInwardPrd: null,
        customerOrganisationId: null,
        customerOrganisationOrganisationId: null,
        customerOrganisationCustomerId: null,
        customerOrganisationRole: null,
        customerOrganisationStatus: null,
        customerOrganisationCreatedAt: null,
        customerOrganisationUpdatedAt: null,
        privileges: null,
        responseCode: null,
        responseMessage: null
    }

    static readUsersByOrganisationId = {
        organisationId: null,
        organisationCustomerId: null,
        organisationAccountNumber: null,
        organisationName: null,
        organisationLogo: null,
        organisationRegistrationNo: null,
        organisationRegistrationDate: null,
        organisationAddress: null,
        organisationCity: null,
        organisationState: null,
        organisationPhone: null,
        organisationMemorandumAndArticleOfAssociation: null,
        organisationEmail: null,
        organisationType: null,
        organisationStatus: null,
        organisationCreatedAt: null,
        organisationUpdatedAt: null,
        organisationWebsite: null,
        organisationCountry: null,
        organisationIndustryType: null,
        organisationFormCac: null,
        organisationCertificateIncorpation: null,
        organisationScumlCertificate: null,
        organisationTin: null,
        organisationStage: null,
        organisationFtOutwardPrd: null,
        organisationFtInternalPrd: null,
        organisationFtInwardPrd: null,
        customerOrganisationId: null,
        customerOrganisationOrganisationId: null,
        customerOrganisationCustomerId: null,
        customerOrganisationRole: null,
        customerOrganisationStatus: null,
        customerOrganisationCreatedAt: null,
        customerOrganisationUpdatedAt: null,
        privileges: null,
        responseCode: null,
        responseMessage: null
    }

    static refferalStatsResponse = {
        responseMessage:null,
        responseCode: null,
        totalReferrals: null,
        totalReferralAmount: null,
        referral: []
    }

}

export default OrganisationResponse

