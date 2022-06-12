class OrganisationRequest{

    static updateOrganisation={
        organisationId: null,
        organisationAddress: null,
        organisationName: null,
        organisationLogo: "Company Logo",
        organisationRegistrationNo: null,
        organisationRegistrationDate: null,
        organisationCity: null,
        organisationState: null,
        organisationPhone: null,
        organisationMemorandumAndArticleOfAssociation: null,
        organisationEmail:null,
        organisationType: null,
        organisationCustomerId:null,
        organisationAccountNumber: null,
        organisationStatus: null,
        organisationWebsite: null,
        organisationCountry:null,
        organisationIndustryType: null,
        organisationFormCac: null,
        organisationCertificateIncorpation: null,
        organisationScumlCertificate: null,
        organisationTin: null,
        organisationDirectorBvn:null,
        organisationDirectorName:null,
        organisationDirectorDob:null,
        organisationDirectorIdCard:null,
        organisationDirectorIdCardType:null,
        organisationDirectorName2:null,
        organisationDirectorBvn2:null,
        organisationDirectorDob2:null,
        organisationDirectorIdCard2:null,
        organisationDirectorIdCardType2:null
    }

    static transactionEnquiry={
        bankCode: null,
        source: null,
        customerId: null,
        startDate: null,
        endDate: null,
        queryType: null
    }

    static balanceEnquiry={
        accountBankCode: null,
        accountNumber: null
    }

    static readOrganisationById={
        organisationId: null
    }

    static readUsersByOrganisationId={
        organisationId: null
    }

    static switchStage={
        organisationStage: null
    }

}

export default OrganisationRequest
