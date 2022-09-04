<template>
 <div>
   <RouteNav/>
      <div class="export-btn-area">
        <search-form :module="searchVirtualAccountTransactions"/>
        <b-button class="export-ex shadow-lg--hover small desktop">Download Transactions</b-button>
      </div>
     <export-excel style="display: none" id="export" name="bizgemTransactions-excel" :data="virtualAccounttransactions"></export-excel>

    <div class="pl-4 text-dark ml-4" v-if="!loading && virtualAccounttransactions.length > 0" style="width:20%;box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);padding: 5px;background-color: white;">
      <h6>Account Number: {{virtualAccounttransactions[0].accountNumber}}</h6>
      <h6>Wallet Account Name: {{virtualAccounttransactions[0].accountName}}</h6>
    </div>
   <base-table
          :items="virtualAccounttransactions"
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
        { key: "accountId", label: "accountId" },
        { key: "accountCustomerId", label: "accountCustomerId" },
        { key: "accountNumber", label: "accountNumber" },
        { key: "accountName", label: "accountName" },
        {
          key: "accountCurrency",
          label: "accountCurrency",
        },
        { key: "accountBalance", label: "accountBalance" },
        { key: "accountStatus", label: "accountStatus" },
        { key: "accountLedgerBalance", label: "accountLedgerBalance" },
        { key: "accountPhone", label: "accountPhone" },
        { key: "accountEmail", label: "accountEmail" },
        { key: "accountBvn", label: "accountBvn" },
        // { key: "actions", label: "actions" },
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
