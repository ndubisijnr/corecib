class ApiKeyRequest {
    static generateApiKey = {
        organisationId: null
    }
    static regenerateApiKey = {
        organisationId: null
    }
    static readApiKey = {
        apikeyOrganisationId: null
    }
    static readApiKeyById = {
        apikeyId: null
    }
    static readApikeyByOrganisation = {
        apikeyOrganisationId: null
    }
    static updateApiKey = {
        apikeyId: null,
        apikeyOrganisationId: null
    }
    static updateWebHook = {
    apikeyId:null,
    apikeyOrganisationId:null,
    apikeyTestWebhook:null,
    apikeyTestCallback:null,
    apikeyLiveWebhook:null,
    apikeyLiveCallback:null,
    apikeyTestHeaderKey:null,
    apikeyTestHeaderValue:null,
    apikeyLiveHeaderKey:null,
    apikeyLiveHeaderValue:null
    }
}

export default ApiKeyRequest