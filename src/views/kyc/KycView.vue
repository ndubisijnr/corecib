<template>
  <div class="wrapper">
    <div class="kyc-data">
      <div class="export-btn-area">
        <search-form :module="searchALL_TRANSACTION"></search-form>
        <b-button class="export-ex shadow-lg--hover small desktop" @click="showKycForm = true">Make a Request</b-button>
      </div>
    <BaseTable
          :items="allKyc"
          :fields="fields"
          filter-mode="default"
          :is-busy="loading"/>
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
  methods:{
    updateKycForm(value) {
      this.showKycForm = value;
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
</style>