class KycResponse {
    static bank_verification = {
        responseCode:null,
        responseMessage:null,
        birthdate:null,
        bvn:null,
        fieldMatches:{
            dob:null,
            firstName:null,
            lastName:null,
        },
        firstName:null,
        gender:null,
        lastName:null,
        middleName:null,
        phone:null,
        photo:null,
    }

    static corporate_affairs = {
        responseCode:null,
        responseMessage:null,
        affiliates:null,
        branchAddress:null,
        city:null,
        classification:null,
        companyEmail:null,
        companyName:null,
        companyType:null,
        headOfficeAddress:null,
        lga:null,
        rcNumber:null,
        registrationDate:null,
        shareCapital:null,
        shareCapitalInWords:null,
        state:null,
        status:null
    }

    static national_identity = {
        responseCode:null,
        responseMessage:null,
        birthCountry:null,
        birthState:null,
        email:null,
        employmentStatus:null,
        height:null,
        lgaOfOrigin:null,
        maritalStatus:null,
        nationality:null,
        nextOfKin:{
            address1:null,
            address2:null,
            firstName:null,
            lastName:null,
            lga:null,
            middleName:null,
            state:null,
            town:null,
        },
        nspokenlang:null,
        ospokenlang:null,
        parentLastname:null,
        placeOfOrigin:null,
        profession:null,
        religion:null,
        residence:{
            address1:null,
            address2:null,
            lga:null,
            state:null,
            status:null,
            town:null,
        },
        signature:null,
        stateOfOrigin:null,
        title:null,
        birthdate:null,
        fieldMatches:{
            dob:null,
            firstName:null,
            lastName:null,
        },
        firstName:null,
        gender:null,
        lastName:null,
        middleName:null,
        nin:null,
        phone:null,
        photo:null,
    }

    static drivers_licence = {
        responseCode:null,
        responseMessage:null,
        birthdate:null,
        expiryDate:null,
        fieldMatches:{
            dob:null,
            firstName:null,
            lastName:null,
        },
        firstName:null,
        gender:null,
        issuedDate:null,
        lastName:null,
        licenseNo:null,
        photo:null,
        stateOfIssue:null,
    }

    static tax_identification_number = {
        responseCode:null,
        responseMessage:null,
        cacRegNo:null,
        email:null,
        entityType:null,
        jittin:null,
        phone:null,
        taxOffice:null,
        taxpayerName:null,
        tin:null
    }

    static voter_card = {
        responseCode:null,
        responseMessage:null,
        firstName:null,
        fullName:null,
        gender:null,
        lastName:null,
        occupation:null,
        pollingUnitCode:null,
        vin:null
    }

    static read_by_organisation_id = {
        kycId:null,
        kycOrganisationId:null,
        kycNumber:null,
        kycType:null,
        kycRequest:null,
        kycResponse:null,
        kycStatus:null,
        kycCreatedAt:null,
        kycUpdatedAt:null
    }

}

export default KycResponse