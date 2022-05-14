<template>
  
 <div>
    <div class="mt-4">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <search-form :module="searchVirtualAccountTransactions"/>
      </div>
    </div>

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





import VirtualAccountRequest from "../../model/request/VirtualAccountRequest"

export default {
  name:"VirtualAccountTransaction",
  components: {
    BaseTable,
    SearchForm
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
