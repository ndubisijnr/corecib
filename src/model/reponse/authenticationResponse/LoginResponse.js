class LoginResponse {
    loginResponse() {
        return {
            responseCode: null,
            responseMessage: null,
            data: []
        }
    }
    loginDataResponse() {
        return {
            customerId: null,
            customerFirstName: null,
            customerLastName: null,
            customerEmail: null,
            customerPhone: null,
            customerCountry:null,
            customerCountryCode:null,
            customerOnlineStatus:null,
            customerStatus:null,
            customerCreatedAt:null,
            customerUpdatedAt:null,
            token:null,
            organisations:[
                {
                    organisationId:null,
                    organisationCustomerId:null,
                    organisationAccountNumber:null,
                    organisationName:null,
                    organisationPhone:null,
                    organisationEmail:null,
                    organisationStatus:null,
                    organisationCreatedAt:null,
                    organisationUpdatedAt:null,
                    organisationStage:null,
                    organisationFtOutwardPrd:null,
                    organisationFtInternalPrd:null,
                    organisationFtInwardPrd:null,
                    customerOrganisationId:null,
                    customerOrganisationOrganisationId:null,
                    customerOrganisationCustomerId:null,
                    customerOrganisationRole:null,
                    customerOrganisationStatus:null,
                    customerOrganisationCreatedAt:null,
                    customerOrganisationUpdatedAt:null
                }
            ],
            responseCode:null,
            responseMessage:null
        }
    }
}

export default LoginResponse
