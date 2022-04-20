class EnrollmentResponse{

  enrollmentResponse(){
    return {
      responseCode: null,
      responseMessage: null,
      data: []
    }
  }

  enrollmentDataResponse(){
    return{
          customerCountry: null,
          customerBusinessName: null,
          customerCountryCode: "+234",
          customerEmail: null,
          customerFirstName: null,
          customerLastName: null,
          customerPhone: null,
          source: "web",
          responseCode: null,
          responseMessage:null
        }
  }

}

export default EnrollmentResponse
