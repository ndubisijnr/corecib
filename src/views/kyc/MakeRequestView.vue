<template>
  <div>
    <RouteNav />
    <div style="display: flex;justify-content: end;padding: 1rem">
        <b-button @click="showKycForm = true, showLoading()" :style="{backgroundColor:primaryColor,border:'none',color:'white'}">Make Another Request</b-button>
      </div>
    <div>
      <div class="business-profile">
        <div v-if="kycVerificationType">
          <div class="mb-4" style="color:black;">
            <h3>
              KYC {{ kycVerificationType }} Request
            </h3>
          </div>
          <div>
            <div class="d-flex">
              <div class="image-box" v-if="kycReadALL.photo">
                <div id="img"></div>
              </div>
              <div class="image-box ml-2" v-if="kycReadALL.signature">
             <img :src="kycReadALL.signature" class="image-box" :alt="kycReadALL.signature">
            </div>
            </div>
            <div class="row">
              <div class="col-4 mb-3" v-for="(item, index) in kycReadALL" :key="index"  v-if="index !== 'fieldMatches' && index !== 'residence' && index !== 'responseCode' && index !== 'responseMessage' && index !== 'photo' && index !== 'nextOfKin' && index !== 'signature' ">
                <label for="floatingInput2">{{index}}</label>
                <input type="text" class="form-control"  :value="item" readonly />
              </div>
            </div>
            <div class="row mt-3" v-if="kycReadALL.nextOfKin">
              <div>
                <h5>Next Of Kin Information</h5>
              </div>
              <div class="col-4 mb-3" v-for="(item, index) in kycReadALL.nextOfKin" :key="index">
                <label for="floatingInput2">{{index}}</label>
                <input type="text" class="form-control"  :value="item" readonly />
              </div>
            </div>
            <div class="row mt-3" v-if="kycReadALL.residence">
              <div>
                <h5>Residence Information</h5>
              </div>
              <div class="col-4 mb-3" v-for="(item, index) in kycReadALL.residence" :key="index">
                <label for="floatingInput2">{{index}}</label>
                <input type="text" class="form-control"  :value="item" readonly />
              </div>
            </div>
          </div>
        </div>
        <div v-else style="display: flex;flex-direction: column;justify-content: center;align-items: center">
        <h5>Waiting for your new request</h5>
        <lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_4svt0lb2.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"  loop  autoplay></lottie-player>
      </div>
      </div>
    </div>
    <kyc-form :show-kyc-form="showKycForm" @closeKycForm="updateKycForm"></kyc-form>
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
      img.src = `data:image/png;base64,${this.kycReadALL.photo}`
      window.document.getElementById('img').appendChild(img)
    },
    // convertNIN(){
    //   let img = new Image(200,200);
    //   img.src = `data:image/png;base64,${this.kycNinData.photo}`
    //   window.document.getElementById('ninImg').appendChild(img)
    // },
    // convertSignature(){
    //   let img = new Image(200,200);
    //   img.src = `data:image/png;base64,${this.kycNinData.signature}`
    //   window.document.getElementById('signatureImg').appendChild(img)
    // },
    // convertDl(){
    //   let img = new Image(200,200);
    //   img.src = `data:image/png;base64,${this.kycDlData.photo}`
    //   window.document.getElementById('driversImg').appendChild(img)
    // },
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
      kycReadALL: state => state.kycVerification.kycResponse
    }),
  },
  mounted() {
    setTimeout(()=>{this.convertToPng()}, 300)
    // setTimeout(()=>{this.convertNIN()}, 300)
    // setTimeout(()=>{this.convertSignature()}, 300)
    // setTimeout(()=>{this.convertDl()}, 300)

    console.log(this.kycReadALL)

  },

  watch:{
    'kycReadALL.photo'(){
      setTimeout(()=>{this.convertToPng()}, 1000)
    },
    // 'kycNinData.photo'(){
    //   setTimeout(()=>{this.convertNIN()}, 1000)
    // },
    // 'kycNinData.signature'(){
    //   setTimeout(()=>{this.convertSignature()}, 1000)
    // },
    //
    // 'kycDlData.photo'(){
    //   setTimeout(()=>{this.convertDl()}, 1000)
    // }
  }
}
</script>

<style scoped>
.business-profile{
  width: 850px;
  height: auto;
  padding: 20px;
  margin: 30px auto;
  background: white;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
}

.image-box{
  height: 200px;
  border: 360px;
  width: 200px;
  margin-bottom: 10px;
}

.holder{
  position: relative;
  width: 100%;
}


</style>