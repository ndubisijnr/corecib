class AuthenticationRequest {
    static initiateEnrollment = {
        customerCountry: null,
        customerBusinessName: null,
        customerCountryCode: null,
        customerEmail: null,
        customerFirstName: null,
        customerLastName: null,
        customerPhone: null,
        source: null

    }
    static completeEnrollment = {
        customerOtp: null,
        customerPassword: null,
        customerConfirmPassword: null,
        customerEmail: null,
        customerBusinessName: null

    }
    static changePassword = {
        customerOldPassword: null,
        customerPassword: null,
        customerPasswordConfirmation: null,
        customerEmail: null

    }
    static initiatePasswordReset = {
        customerEmail: null,
        source: null

    }
    static resendOtp = {
        customerEmail: null,
        source: null

    }
    static completePasswordReset = {
        customerEmail: null,
        customerPassword: null,
        customerPasswordConfirmation: null,
        customerOtp: null

    }
    static login = {
        deviceId: null,
        deviceName: null,
        pushId: null,
        source: null,
        devicePlatform: null,
        ipAddress: null,
        latitude: null,
        longitude: null,
        password: null,
        username: null,
        status:null,
        profileStatus: null,
        countryCode: null,
        idToken: null
    }

}

export default AuthenticationRequest