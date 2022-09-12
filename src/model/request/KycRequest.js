class KycRequest{

    static bank_verification = {
        dob:null,
        firstName:null,
        lastName:null,
        bvn:null,
        reference:null
    }

    static corporate_affairs = {
        type:null,
        rcNumber:null,
        reference:null
    }

    static national_identity = {
        dob:null,
        firstName:null,
        lastName:null,
        idNumber:null,
        reference:null
    }

    static drivers_licence = {
        dob:null,
        firstName:null,
        lastName:null,
        licenseNumber:null,
        reference:null
    }

    static tax_identification_number = {
        taxIdentificationNumber:null,
        reference:null
    }

    static voter_card = {
        dob:null,
        firstName:null,
        lastName:null,
        idNumber:null,
        reference:null
    }

    static read_by_organisation_id = {
        page:1,
        startDate:null,
        endDate:null,
        searchItem:null
    }

}

export default  KycRequest