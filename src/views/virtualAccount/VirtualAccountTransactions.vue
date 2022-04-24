<template>
  
 <div>
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



import VirtualAccountRequest from "../../model/request/VirtualAccountRequest"

export default {
  name:"VirtualAccountTransaction",
  components: {
    BaseTable
  },
  data() {
    return {
      minDatetime: "2022-04-28",
      maxDatetime: "2022-04-01",
      startDate: "",
      endDate: "",

      light: "light",
      virtualAccountmodel: VirtualAccountRequest.readVirtualAccountTransactions,
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
        loading: (state) => state.walletTransactions.loading,
       virtualAccounttransactions: (state) => state.walletTransactions.walletTransactions,
    }),
  },

  mounted(){
  }

};
</script>
