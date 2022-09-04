<template>
  <div>
    <RouteNav />
      <div style="display: flex;justify-content: end;padding: 1rem">
        <b-button @click="showKycForm = true, showLoading()" :style="{backgroundColor:primaryColor,border:'none',color:'white'}">Make Another Request</b-button>
      </div>
    <div class="business-profile">
        <div v-if="kycVerificationType">
          <div class="mb-4" style="color:black;">
            <h3>
              KYC {{ kycVerificationType }} Request
            </h3>
          </div>
          <div>
<!--            <div class="image-box">-->
<!--              <div id="img" ></div>-->
<!--            </div>-->
<!--          <div class="row">-->
<!--            <div class="col-4 mb-3" v-for="(value, key) in kycReadALL" v-bind:key="key">-->
<!--&lt;!&ndash;              <span v-if="key.toLowerCase() !== 'fieldmatches' && key.toLowerCase() !== 'photo'">&ndash;&gt;-->
<!--              <span>-->
<!--                <label>{{ key }}</label>-->
<!--                <input type="text" class="form-control"  :value="value" readonly />-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

          <div v-if="kycVerificationType == 'Bank verification number' && Object.values(kycBvnData).every(key => key !== null)">
            <div class="image-box">
              <div id="img"></div>
            </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">First Name</label>
              <input type="text" class="form-control"  :value="kycBvnData.firstName" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Middle Name</label>
              <input type="text" class="form-control"  :value="kycBvnData.middleName" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Last Name</label>
              <input type="text" class="form-control"  :value="kycBvnData.lastName" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">BVN</label>
              <input type="text" class="form-control"  :value="kycBvnData.bvn" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Phone</label>
              <input type="text" class="form-control"  :value="kycBvnData.phone" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Gender</label>
              <input type="text" class="form-control"  :value="kycBvnData.gender" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">DOB</label>
              <input type="text" class="form-control"  :value="kycBvnData.birthdate" readonly />
            </div>
          </div>
        </div>
          <div v-if="kycVerificationType == 'National identity' && Object.values(kycNinData).every(key => key !== null)">
            <div>
              <div class="image-box" id="ninImg"></div>
              <div>
                <h5>Personal Information</h5>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">Title</label>
                  <input type="text" class="form-control"  :value="kycNinData.title" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">First Name</label>
                  <input type="text" class="form-control"  :value="kycNinData.firstName" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Middle Name</label>
                  <input type="text" class="form-control"  :value="kycNinData.middleName" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Last Name</label>
                  <input type="text" class="form-control"  :value="kycNinData.lastName" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">Email</label>
                  <input type="text" class="form-control"  :value="kycNinData.email" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Phone</label>
                  <input type="text" class="form-control"  :value="kycNinData.phone" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Gender</label>
                  <input type="text" class="form-control"  :value="kycNinData.gender" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">Height</label>
                  <input type="text" class="form-control"  :value="kycNinData.height" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">LGA Of Origin</label>
                  <input type="text" class="form-control"  :value="kycNinData.lgaOfOrigin" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Marital Status</label>
                  <input type="text" class="form-control"  :value="kycNinData.maritalStatus" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">DOB</label>
                  <input type="text" class="form-control"  :value="kycNinData.birthdate" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Employment Status</label>
                  <input type="text" class="form-control"  :value="kycNinData.employmentStatus" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Nationality</label>
                  <input type="text" class="form-control"  :value="kycNinData.nationality" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">First Spoken Lang</label>
                  <input type="text" class="form-control"  :value="kycNinData.nspokenlang" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Second Spoken Lang</label>
                  <input type="text" class="form-control"  :value="kycNinData.ospokenlang" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Family Last name</label>
                  <input type="text" class="form-control"  :value="kycNinData.parentLastname" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">Place of Origin</label>
                  <input type="text" class="form-control"  :value="kycNinData.placeOfOrigin" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">State of Origin</label>
                  <input type="text" class="form-control"  :value="kycNinData.stateOfOrigin" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Profession</label>
                  <input type="text" class="form-control"  :value="kycNinData.profession" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Religion</label>
                  <input type="text" class="form-control"  :value="kycNinData.religion" readonly />
                </div>
              </div>
              <div>
                <div>
                  <h5>Residence</h5>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="floatingInput2">Address 1</label>
                    <input type="text" class="form-control"  :value="kycNinData.residence.address1" readonly />
                  </div>
                  <div class="col mb-3">
                    <label for="floatingInput2">Address 2</label>
                    <input type="text" class="form-control"  :value="kycNinData.residence.address2" readonly />
                  </div>
                  <div class="col mb-3">
                    <label for="floatingInput2">LGA</label>
                    <input type="text" class="form-control"  :value="kycNinData.residence.lga" readonly />
                  </div>
                </div>
                <div class="row">
                  <div class="col mb-3">
                    <label for="floatingInput2">State</label>
                    <input type="text" class="form-control"  :value="kycNinData.residence.state" readonly />
                  </div>
                  <div class="col mb-3">
                    <label for="floatingInput2">Town</label>
                    <input type="text" class="form-control"  :value="kycNinData.residence.town" readonly />
                  </div>
                  <div class="col mb-3">
                    <label for="floatingInput2">Status</label>
                    <input type="text" class="form-control"  :value="kycNinData.residence.status" readonly />
                  </div>
                </div>
              </div>
              <div class="image-box">
                <h5>Signature</h5>
                <div id="signatureImg"></div>
              </div>
            </div>
            <div class="mt-5">
              <div>
                <h5>Next Of Kin</h5>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">First Name</label>
                  <input type="text" class="form-control"  :value="kycNinData.nextOfKin.firstName" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Middle Name</label>
                  <input type="text" class="form-control"  :value="kycNinData.nextOfKin.middleName" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Last Name</label>
                  <input type="text" class="form-control"  :value="kycNinData.nextOfKin.lastName" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">State</label>
                  <input type="text" class="form-control"  :value="kycNinData.nextOfKin.state" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Town</label>
                  <input type="text" class="form-control"  :value="kycNinData.nextOfKin.town" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">LGA</label>
                  <input type="text" class="form-control"  :value="kycNinData.nextOfKin.lga" readonly />
                </div>
              </div>
            </div>
          </div>
          <div v-if="kycVerificationType == 'Voters card' && Object.values(kycVcData).every(key => key !== null)">
            <div class="row">
              <div class="col mb-3">
                <label for="floatingInput2">First Name</label>
                <input type="text" class="form-control"  :value="kycVcData.firstName" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Middle Name</label>
                <input type="text" class="form-control"  :value="kycVcData.middleName" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Last Name</label>
                <input type="text" class="form-control"  :value="kycVcData.lastName" readonly />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="floatingInput2">Occupation</label>
                <input type="text" class="form-control"  :value="kycVcData.occupation" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Polling Unit Code</label>
                <input type="text" class="form-control"  :value="kycVcData.pollingUnitCode" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Gender</label>
                <input type="text" class="form-control"  :value="kycVcData.gender" readonly />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="floatingInput2">VIN</label>
                <input type="text" class="form-control"  :value="kycVcData.vin" readonly />
              </div>
            </div>
          </div>
          <div v-if="kycVerificationType == 'Drivers license' && Object.values(kycDlData).every(key => key !== null)">
            <div class="image-box" id="driversImg">
            </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">First Name</label>
              <input type="text" class="form-control"  :value="kycDlData.firstName" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Middle Name</label>
              <input type="text" class="form-control"  :value="kycDlData.middleName" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Last Name</label>
              <input type="text" class="form-control"  :value="kycDlData.lastName" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Issued Date</label>
              <input type="text" class="form-control"  :value="kycDlData.issuedDate" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Expiry Date</label>
              <input type="text" class="form-control"  :value="kycDlData.expiryDate" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">License No</label>
              <input type="text" class="form-control"  :value="kycDlData.licenseNo" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">DOB</label>
              <input type="text" class="form-control"  :value="kycDlData.birthdate" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Gender</label>
              <input type="text" class="form-control"  :value="kycDlData.gender" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">State Of Issue</label>
              <input type="text" class="form-control"  :value="kycDlData.stateOfIssue" readonly />
            </div>
          </div>
        </div>
          <div v-if="kycVerificationType == 'Tax identification number' && Object.values(kycTaxData).every(key => key !== null)">
            <div class="row">
              <div class="col mb-3">
                <label for="floatingInput2">Tax Payer Name</label>
                <input type="text" class="form-control"  :value="kycTaxData.taxpayerName" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Email</label>
                <input type="text" class="form-control"  :value="kycTaxData.email" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Phone</label>
                <input type="text" class="form-control"  :value="kycTaxData.phone" readonly />
              </div>
            </div>
            <div class="row">
                <div class="col mb-3">
                  <label for="floatingInput2">CAC Reg No</label>
                  <input type="text" class="form-control"  :value="kycTaxData.cacRegNo" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">JITTIN</label>
                  <input type="text" class="form-control"  :value="kycTaxData.jittin" readonly />
                </div>
                <div class="col mb-3">
                  <label for="floatingInput2">Entity Type</label>
                  <input type="text" class="form-control"  :value="kycTaxData.entityType" readonly />
                </div>
              </div>
            <div class="row">
              <div class="col mb-3">
                <label for="floatingInput2">Tax Office</label>
                <input type="text" class="form-control"  :value="kycTaxData.taxOffice" readonly />
              </div>

              <div class="col mb-3">
                <label for="floatingInput2">TIN</label>
                <input type="text" class="form-control"  :value="kycTaxData.tin" readonly />
              </div>
            </div>
        </div>
          <div v-if="kycVerificationType == 'Corporate affairs commission' && Object.values(kycCacData).every(key => key !== null)">
            <div class="row">
              <div class="col mb-3">
                <label for="floatingInput2">Affiliates</label>
                <input type="text" class="form-control"  :value="kycCacData.affiliates" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">Branch Address</label>
                <input type="text" class="form-control"  :value="kycCacData.branchAddress" readonly />
              </div>
              <div class="col mb-3">
                <label for="floatingInput2">City</label>
                <input type="text" class="form-control"  :value="kycCacData.city" readonly />
              </div>
            </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Classification</label>
              <input type="text" class="form-control"  :value="kycCacData.classification" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Company Email</label>
              <input type="text" class="form-control"  :value="kycCacData.companyEmail" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Company Name</label>
              <input type="text" class="form-control"  :value="kycCacData.companyName" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Company Type</label>
              <input type="text" class="form-control"  :value="kycCacData.companyType" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Head Office Address</label>
              <input type="text" class="form-control"  :value="kycCacData.headOfficeAddress" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">LGA</label>
              <input type="text" class="form-control"  :value="kycCacData.lga" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">RC Number</label>
              <input type="text" class="form-control"  :value="kycCacData.rcNumber" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Registration Date</label>
              <input type="text" class="form-control"  :value="kycCacData.registrationDate" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Share Capital</label>
              <input type="text" class="form-control"  :value="kycCacData.shareCapital" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Share Capital In Words</label>
              <input type="text" class="form-control"  :value="kycCacData.shareCapitalInWords" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">State</label>
              <input type="text" class="form-control"  :value="kycCacData.state" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Status</label>
              <input type="text" class="form-control"  :value="kycCacData.status" readonly />
            </div>
          </div>
          </div>
        </div>

      <!---------------------------------------------  Second layer ------------------------------------------------------>
    </div>

        <div v-else style="display: flex;flex-direction: column;justify-content: center;align-items: center">
          <h5>Waiting for your new request</h5>
          <lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_4svt0lb2.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"  loop  autoplay></lottie-player>
        </div>

    <kyc-form :show-kyc-form="showKycForm" @closeKycForm="updateKycForm"></kyc-form>
  </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import KycForm from "../../components/kyc-components/KycForm";
import RouteNav from "../../components/RouteNav";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "MakeRequestView",
  data(){
    return{
      primaryColor:window.__env.app.primaryColor,
      showKycForm:false,
      showKycForm2:false,
    }
  },


  components:{
    KycForm,
    RouteNav
  },

  methods:{
    updateKycForm(value) {
      this.showKycForm = value;
    },
    showLoading(){
      StoreUtils.commit(StoreUtils.mutations.kycVerification.UpdateKycType, null)
    },
    convertToPng(){
      let img = new Image(200,200);
      img.src = `data:image/png;base64,${this.kycBvnData.photo}`
      window.document.getElementById('img').appendChild(img)
    },
    convertNIN(){
      let img = new Image(200,200);
      img.src = `data:image/png;base64,${this.kycNinData.photo}`
      window.document.getElementById('ninImg').appendChild(img)
    },
    convertSignature(){
      let img = new Image(200,200);
      img.src = `data:image/png;base64,${this.kycNinData.signature}`
      window.document.getElementById('signatureImg').appendChild(img)
    },
    convertDl(){
      let img = new Image(200,200);
      img.src = `data:image/png;base64,${this.kycDlData.photo}`
      window.document.getElementById('driversImg').appendChild(img)
    },
  },

  computed:{
    ...mapState({
      kycBvnData:state => state.kycVerification.bvn,
      kycNinData:state => state.kycVerification.national_identity,
      kycCacData:state => state.kycVerification.corporate_affairs,
      kycVcData:state => state.kycVerification.voter_card,
      kycTaxData:state => state.kycVerification.tax,
      kycDlData:state => state.kycVerification.drivers_license,
      kycVerificationType: state => state.kycVerification.kycType,
      // kycReadALL: state => state.kycVerification.kycReadAll
    }),
  },
  mounted() {
    setTimeout(()=>{this.convertToPng()}, 300)
    setTimeout(()=>{this.convertNIN()}, 300)
    setTimeout(()=>{this.convertSignature()}, 300)
    setTimeout(()=>{this.convertDl()}, 300)
    console.clear()
  },

  watch:{
    'kycBvnData.photo'(){
      setTimeout(()=>{this.convertToPng()}, 1000)
    },
    'kycNinData.photo'(){
      setTimeout(()=>{this.convertNIN()}, 1000)
    },
    'kycNinData.signature'(){
      setTimeout(()=>{this.convertSignature()}, 1000)
    },

    'kycDlData.photo'(){
      setTimeout(()=>{this.convertDl()}, 1000)
    }
  }
}
</script>

<style scoped>
.business-profile{
  width: 850px;
  overflow-y: scroll;
  height: auto;
  padding: 20px;
  margin: 30px auto;
  background: white;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
}

.image-box{
  border: solid green;
  height: 200px;
  border: 360px;
  width: 200px;
  margin-bottom: 10px;
}



</style>