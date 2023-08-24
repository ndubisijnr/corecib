<template>
 <div>
   <RouteNav/>
      <div class="export-btn-area">
        <search-form :module="searchVirtualAccountTransactions"/>
        <b-button class="export-ex shadow-lg--hover small desktop">Download Transactions</b-button>
      </div>
     <export-excel style="display: none" id="export" name="bizgemTransactions-excel" :data="virtualAccounttransactions"></export-excel>

   <base-table
          :items="virtualAccounttransactions.data"
          :fields="fields"
          filter-mode="default"
          :is-busy="loading" />
  </div>
</template>


<script>
import { mapState } from "vuex";
import BaseTable from "../../components/table/BaseTable";
import SearchForm from "../../components/form/SearchForm";
import SearchModuleutil from "../../util/constant/SearchModuleutil"
import RouteNav from "../../components/RouteNav";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest"

export default {
  name:"VirtualAccountTransaction",
  components: {
    RouteNav,
    BaseTable,
    SearchForm,
  },
  data() {
    return {
      startDate: "",
      endDate: "",

      light: "light",
      virtualAccountmodel: VirtualAccountRequest.readVirtualAccountTransactions,
      searchVirtualAccountTransactions: SearchModuleutil.VIRTUAL_ACCOUNT_TRANSACTION,
      type: "",
      option_time: [
        { value: "last30", label: "Last 30 days" },
        { value: "last90", label: "Last 90 days" },
        { value: "alltime", label: "All TIme" },
        { value: "customperiod", label: "Custom Period" },
        { value: "thismonth", label: "This Month" },
        { value: "today", label: "Today" },
        { value: "thisyear", label: "This Year" },
      ],
      items: [],
      fields: [
        { key: "trnDrCr", label: "trnDrCr" },
        { key: "trnActualAmount", label: "trnActualAmount" },
        { key: "trnDrAccountName", label: "trnDrAccountName" },
        { key: "trnCrAccountNumber", label: "trnCrAccountNumber" },
        {
          key: "trnCrAccountName",
          label: "trnCrAccountName",
        },
        { key: "trnStatus", label: "trnStatus" },

        { key: "actions", label: "actions" },
      ],
    };
  },


  computed: {
    ...mapState({
        loading: (state) => state.virtualAccount.loading,
        virtualAccounttransactions: (state) => state.virtualAccount.virtualaccounttransaction,
    }),
  },

  mounted(){
  }

};
</script>

<style scoped>
.export-btn-area{
  /*box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);*/
  gap: 10px;
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
