class PreferenceRequest{
    static preferenceRead={
        readAll:"YES"
    }

    static preferenceCreate={
        preferenceAllowNotification:null,
        preferenceRevenueProfitWallet:null,
        preferenceCommissionMargin:null,
        preferenceFeeMargin:null,
        preferenceOrganisationId:null,
        preferenceMakerId:null
    }
    static preferenceUpdate={
        preferenceAllowNotification:null,
        preferenceRevenueProfitWallet:null,
        preferenceCommissionMargin:null,
        preferenceFeeMargin:null,
        preferenceId:null
    }

    static preferenceUpdateStatus={
        preferenceId:null,
        preferenceStatus:null
    }

    static preferenceReadById = {
        preferenceId:1
    }

    static preferenceReadByOrganisationId = {
        preferenceOrganisationId:1
    }
}

export default PreferenceRequest