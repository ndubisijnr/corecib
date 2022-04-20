
class OrganisationRequest{

    static UpdateOrganisation={
        organisationId: null,
        organisationAddress: null,
        organisationName: null,
        organisationLogo: null,
        organisationRegistrationNo: null,
        organisationRegistrationDate: null,
        organisationCity: null,
        organisationState: null,
        organisationPhone: null,
        organisationMemorandumAndArticleOfAssociation: null,
        organisationEmail: null,
        organisationType: null,
        organisationCustomerId: null,
        organisationAccountNumber: null,
        organisationStatus: null,
        organisationWebsite: null,
        organisationCountry: null,
        organisationIndustryType: null,
        organisationFormCac: null,
        organisationCertificateIncorpation: null,
        organisationScumlCertificate: null,
        organisationTin: null
    }

    static TransactionEnquiry={
        bankCode: null,
        source: null,
        customerId: null,
        startDate: null,
        endDate: null,
        queryType: null
    }

    static BalanceEnquiry={
        accountBankCode: null,
        accountNumber: null
    }

    static ReadOrganisationById={
        organisationId: null
    }

    static ReadUsersByOrganisationId={
        organisationId: null
    }

}

export default OrganisationRequest
