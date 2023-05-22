<template>
  <div class="wrapper">
    <div class="kyc-data">
      <div class="export-btn-area">
        <search-form :module="searchALL_TRANSACTION"></search-form>
        <b-button class="export-ex shadow-lg--hover small desktop" @click="openKyc">Make a Request</b-button>
      </div>
      <BaseTable
          :items="allKyc"
          :fields="fields"
          filter-mode="default"
          :is-busy="loading"/>
      <div id="kyc-modal" class="kyc-modal">
        <div class="card-head">
          <div class="d-flex justify-content-between">
            <h4 style="color:#FFFFFF;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">KYC Verification Request</h4>
            <button type="button" class="btn-close p-2 m-2" @click="closeModal" title="Cancel Create Wallet Account"></button>
          </div>
        </div>
        <div class="card-body">
          <div class="kyc-item">
            <div class="kyc-box" @click="showKycFormFuc(obj='Bank verification number')">
              <img src="@/assets/bank.svg" width="40" />
              <h5>Bank verification number</h5>
            </div>
            <div class="kyc-box" @click="showKycFormFuc(obj='Corporate affairs commission')">
              <img src="@/assets/identification-card.svg" width="40" />
              <h5>Corporate affairs commission</h5>
            </div>
            <div class="kyc-box"@click="showKycFormFuc(obj='National identity')">
              <img src="@/assets/identification-card.svg" width="40" />
              <h5>National identity</h5>
            </div>
            <div class="kyc-box" @click="showKycFormFuc(obj='Drivers license')">
              <img src="@/assets/identification-card.svg" width="40" />
              <h5>Drivers license</h5>

            </div>
            <div class="kyc-box" @click="showKycFormFuc(obj='Tax identification number')">
              <img src="@/assets/identification-card.svg" width="40" />
              <h5>Tax identification number</h5>

            </div>
            <div class="kyc-box" @click="showKycFormFuc(obj='Voters card')">
              <img src="@/assets/identification-card.svg" width="40" />
              <h5>Voters card</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
    <kyc-form :show-kyc-form="showKycForm" @closeKycForm="updateKycForm"></kyc-form>

  </div>


</template>

<script>
import BaseTable from "../../components/table/BaseTable";
import SearchForm from "../../components/form/SearchForm";
import SearchModuleutil from "../../util/constant/SearchModuleutil";
import KycForm from "../../components/kyc-components/KycForm";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import {mapState} from "vuex";
import KycRequest from "../../model/request/KycRequest";

export default {
  name: "KYC Verification",
  data(){
    return{
      searchALL_TRANSACTION: SearchModuleutil.ALL_TRANSACTION,
      showKycForm:false,
      showKycForm2:false,
      showModal:false,
      readKycModel:KycRequest.read_by_organisation_id,
      fields: [
        { key: "kycNumber", label: "kyc Number" },
        {key: "kycType", label: "kyc Type"},
        {key: "kycResponse", label: "Name"},
        { key: "kycStatus", label: "kycStatus" },
        // { key: "kycResponse", label: "kycStatus"},
        { key: "kycAction", label: "Action" },

      ],

    }
  },
  components:{
    BaseTable,
    SearchForm,
    KycForm
  },

  methods: {
    updateKycForm(value) {
      this.showKycForm = value;
    },
    showKycFormFuc(obj) {
      this.showKycForm = true;
      StoreUtils.commit(StoreUtils.mutations.kycVerification.UpdateKycType, obj)
    },
    closeModal() {
      this.showModal = !this.showModal
      if (!this.showModal){
        document.getElementById('kyc-modal').classList.remove('open-modal')
        document.getElementById('kyc-modal').classList.add('kyc-modal')
      }
    },

    openKyc() {
      this.showModal = !this.showModal
      if (this.showModal){
        document.getElementById('kyc-modal').classList.add('open-modal')
        document.getElementById('kyc-modal').classList.remove('kyc-modal')
      }
    },
  },
  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.kycVerification.readAllKyc)

  },

  computed: {
     ...mapState({
       loading:state => state.kycVerification.loading,
       allKyc: state => state.kycVerification.kycReadAll
     })
  }
}
</script>

<style scoped>
.btn-close{
  background-color: white;
}
.card-head{
  background-color: #413d52;
}
.wrapper{
  width: 100%;
  height: 80vh;
  display: flex;
}

.export-btn-area {
/*
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
*/
  gap: 10px;
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: #ffffff;*/
}

.export-ex{
  background-color:#413d52;
  color:white;
  /*margin: 2px;*/
  /*width:200px;*/
  /*cursor: pointer;*/
  /*height: 5vh;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*border-radius: 5px;*/
}

.kyc-data{
  width: 100%;
  /*display: flex;*/
  height: 100%;
}

.kyc-modal{
  width:0;
  position: absolute;
  top:0;
  right: -100px;
  height:100vh;
  background-color: #FFFFFF;box-shadow: 0px 8px 16px rgba(141, 141, 141, 0.1);
  z-index: 9999999999999999999999999999999;
  transition: .1s ease-out;
}

.open-modal{
  width:auto;
  right: 0;
  position: absolute;
  top:0;
  height:100vh;
  background-color: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(141, 141, 141, 0.1);
  z-index: 9999999999999999999999999999999;
  transition: .2s ease-in;

}

.kyc-box{
  width: 100%;
  height: 100px;
  background: #FFFFFF;
  /*box-shadow: 0px 10px 21px rgba(0, 0, 0, 0.08);*/
  border-radius: 25px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /*-webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);*/
  /*box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);*/
}

.kyc-box:hover{
  -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;

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


/*.kyc-box:hover{*/
/*  box-shadow:none;*/
/*}*/


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