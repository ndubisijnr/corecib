<template>
  <div class="wrapper">
    <div class="kyc-data">
      <div class="export-btn-area">
        <search-form :module="searchALL_TRANSACTION"></search-form>
        <b-button class="export-ex shadow-lg--hover small desktop" @click="showKycForm = true">Make a Request</b-button>
      </div>
    <BaseTable
          :items="[]"
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
import {mapState} from "vuex";



export default {
  name: "KYC Verification",
  data(){
    return{
      searchALL_TRANSACTION: SearchModuleutil.ALL_TRANSACTION,
      showKycForm:false,
      showKycForm2:false,
      fields: [
        { key: "kycId", label: "kycId" },
        { key: "kycOrganisationId", label: "kycOrganisationId" },
        { key: "kycNumber", label: "kycNumber" },
        {
          key: "kycRequest",
          label: "kycRequest",
        },
        { key: "kycResponse", label: "kycResponse" },
        { key: "kycStatus", label: "kycStatus" },

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

  computed: {
     ...mapState({
       loading:state => state.kycVerification.loading
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
  background-color:#3F88C5;
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