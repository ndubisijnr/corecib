class EnrollmentResponse{
  enrollmentResponse(){
    return {
      responseCode: "",
      responseMessage: "",
      data: []
    }
  }
  enrollmentDataResponse(){
        return{
          customerCountry: "",
          customerBusinessName: "",
          customerCountryCode: "+234",
          customerEmail: "",
          customerFirstName: "",
          customerLastName: "",
          customerPhone: "",
          source: "web",
          responseCode: "",
          responseMessage:""
        }
  }
}

export default EnrollmentResponse
