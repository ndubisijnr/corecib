class AuthenticationResponse {
    static login = {
        customerFirstName:  null,
        customerId:  null,
        customerLastName:  null,
        customerEmail:  null,
        customerPhone:  null,
        customerCountry:  null,
        customerCountryCode:  null,
        customerOnlineStatus:  null,
        customerStatus:  null,
        customerCreatedAt:  null,
        customerUpdatedAt:  null,
        token: null,
        organisations: [],
        responseCode:  null,
        responseMessage: null
    }
    static organisation = {
        organisationId:  null,
        organisationLogo:null,
        organisationCustomerId:  null,
        organisationAccountNumber:  null,
        organisationName:  null,
        organisationPhone:  null,
        organisationEmail:  null,
        organisationStatus:  null,
        organisationCreatedAt:  null,
        organisationUpdatedAt:  null,
        organisationStage:  null,
        organisationFtOutwardPrd:  null,
        organisationFtInternalPrd:  null,
        organisationFtInwardPrd:  null,
        customerOrganisationId: null,
        customerOrganisationOrganisationId: null,
        customerOrganisationCustomerId:  null,
        customerOrganisationRole:  null,
        customerOrganisationStatus: null,
        customerOrganisationCreatedAt:  null,
        customerOrganisationUpdatedAt: null
    }
}


export default AuthenticationResponse