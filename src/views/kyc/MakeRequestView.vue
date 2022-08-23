<template>
  <div>
    <div class="m-4 text-right">
      <b-button @click="showKycForm = true" :style="{backgroundColor:primaryColor,border:'none',color:'white'}">Make Another Request
      </b-button>
    </div>
    <div class="business-profile">
        <div>
          <div class="mb-4" style="color:black;">
            <h3>
              KYC {{ kycVerificationType }} Result
            </h3>
          </div>

          <div v-show="kycVerificationType == 'Bank verification number' ">
            <div class="image-box">
              <img :scr="'data:image/png;base64,'+kycData.photo" :alt="kycData.photo" width="200" height="200">
            </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">First Name</label>
              <input type="text" class="form-control"  :value="kycData.firstName" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Middle Name</label>
              <input type="text" class="form-control"  :value="kycData.middleName" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Last Name</label>
              <input type="text" class="form-control"  :value="kycData.lastName" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">BVN</label>
              <input type="text" class="form-control"  :value="kycData.bvn" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Phone</label>
              <input type="text" class="form-control"  :value="kycData.phone" readonly />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Gender</label>
              <input type="text" class="form-control"  :value="kycData.gender" readonly />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">DOB</label>
              <input type="text" class="form-control"  :value="kycData.birthdate" readonly />
            </div>
          </div>
        </div>
        </div>

      <!---------------------------------------------  Second layer ------------------------------------------------------>
    </div>

    <kyc-form :show-kyc-form="showKycForm" @closeKycForm="updateKycForm"></kyc-form>

  </div>

</template>

<script>
import {mapState} from "vuex"
import KycForm from "../../components/kyc-components/KycForm";
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
    KycForm
  },

  methods:{
    updateKycForm(value) {
      this.showKycForm = value;
    },
  },
  computed:{
    ...mapState({
      kycData:state => state.kycVerification.bvn,
      kycVerificationType: state => state.kycVerification.kycType,

    })
}
}
</script>

<style scoped>
.business-profile{
  width: 550px;
  display: flex;
  justify-content: center;
  margin:5px;
  overflow-x: scroll;
  padding: 30px;
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