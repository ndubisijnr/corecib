<template>
      <div class="kyc-item">
        <div class="kyc-box" @click="showKycForm2(obj='Bank verification number')">
          <h5>Bank verification number</h5>
        </div>
        <div class="kyc-box" @click="showKycForm2(obj='Corporate affairs commission')">
          <h5>Corporate affairs commission</h5>
        </div>
        <div class="kyc-box"@click="showKycForm2(obj='National identity')">
          <h5>National identity</h5>
        </div>
        <div class="kyc-box" @click="showKycForm2(obj='Drivers license')">
          <h5>Drivers license</h5>

        </div>
        <div class="kyc-box" @click="showKycForm2(obj='Tax identification number')">
          <h5>Tax identification number</h5>

        </div>
        <div class="kyc-box" @click="showKycForm2(obj='Voters card')">
          <h5>Voters card</h5>
        </div>
      </div>
</template>

<script>
import KycLists from "../../components/kyc-components/KycLists";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "KycLists",
  components:{KycLists},

  methods:{
    showKycForm2(obj){
      this.$emit("openEachKycForm", true);
      StoreUtils.commit(StoreUtils.mutations.kycVerification.UpdateKycType, obj)
    }

  }

}
</script>

<style scoped>
.kyc-box{
  width: 100%;
  height: 100px;
  background: #FFFFFF;
  /*box-shadow: 0px 10px 21px rgba(0, 0, 0, 0.08);*/
  border-radius: 25px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
}



/*.profile-card {*/
/*  background: #FFB300;*/
/*  width: 56px;*/
/*  height: 56px;*/
/*  position: absolute;*/
/*  left: 50%;*/
/*  top: 50%;*/
/*  z-index: 2;*/
/*  overflow: hidden;*/
/*  opacity: 0;*/
/*  margin-top: 70px;*/
/*  -webkit-transform: translate(-50%, -50%);*/
/*  transform: translate(-50%, -50%);*/
/*  -webkit-border-radius: 50%;*/
/*  border-radius: 50%;*/
/*  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);*/
/*  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);*/
/*  -webkit-animation: init 0.5s 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards, moveDown 1s 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards, moveUp 1s 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, materia 0.5s 2.7s cubic-bezier(0.86, 0, 0.07, 1) forwards;*/
/*  animation: init 0.5s 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards, moveDown 1s 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards, moveUp 1s 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, materia 0.5s 2.7s cubic-bezier(0.86, 0, 0.07, 1) forwards;*/
/*}*/


.kyc-box:hover{
  box-shadow:none;
  cursor: pointer;
}


.kyc-box > h5{
   width: 150px;
   text-align: center;
}

.kyc-item{
  display: grid;
  width: 100%;
  grid-template-columns:repeat(2,1fr) ;
  gap: 20px;
}

</style>