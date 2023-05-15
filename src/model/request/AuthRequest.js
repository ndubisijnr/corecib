class AuthenticationRequest {
    static initiateEnrollment = {
        customerCountry: null,
        customerBusinessName: null,
        customerCountryCode: null,
        customerEmail: null,
        customerFirstName: null,
        customerLastName: null,
        customerPhone: null,
        customerBusinessType:null,
        source: "WEB"

    }
    static completeEnrollment = {
        customerOtp: null,
        customerPassword: null,
        customerConfirmPassword: null,
        customerEmail: null,
        customerBusinessName: null,
        customerReferralCode: null

    }

    static initiatePasswordReset = {
        customerEmail: null,
        source: "WEB"

    }
    static resendOtp = {
        customerEmail: null,
        source: "WEB"

    }
    static completePasswordReset = {
        customerEmail: null,
        customerPassword: null,
        customerPasswordConfirmation: null,
        customerOtp: null

    }
    static login = {
        deviceId:null,
        deviceName:null,
        pushId:null,
        source:null,
        devicePlatform:null,
        ipAddress:null,
        latitude:null,
        longitude:null,
        password:null,
        username:null,
        status:null,
        profileStatus:null,
        countryCode:null,
        idToken:null,
    }
    static createCustomerRequest = {
        customerPhone:null,
        customerFirstName:null,
        customerLastName:null,
        customerCountryCode:null,
        customerCountry:null,
        customerPassword:null,
        customerConfirmPassword:null,
        customerLink:null
    }
    static validateCustomerLinkRequest = {
        customerLink:null
    }


}

export default AuthenticationRequest