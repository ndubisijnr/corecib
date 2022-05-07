<template>
 <div>
    <div class="mt-4">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <search-form :module="searchWALLET_TRANSACTION"/>
      </div>
    </div>
        {{getParams}}

    <div class="" v-if="wallettransactions== []">
    hi
      <!-- <h3>{{wallettransactions[0].accountNumber}}</h3>
      <h3>{{wallettransactions[0].accountName}}</h3> -->
    </div>
   <base-table
          :items="wallettransactions"
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





import WalletRequest from "../../model/request/WalletRequest"

export default {
  name:"WalletTransaction",
  components: {
    BaseTable,
    SearchForm
  },
  data() {
    return {
      minDatetime: "2022-04-28",
      maxDatetime: "2022-04-01",
      startDate: "",
      endDate: "",

      light: "light",
      allWalletTransactionsmodel: WalletRequest.readAllWalletTransaction,
      searchWALLET_TRANSACTION: SearchModuleutil.WALLET_TRANSACTION,
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
        { key: "id", label: "id" },
        { key: "amount", label: "amount" },
        { key: "drCr", label: "DR/CR" },
        {
          key: "contractReference",
          label: "contractReference",
        },
        { key: "counterPartyAccountName", label: "counterPartyAccountName" },
        { key: "counterPartyAccountNumber", label: "counterPartyAccountNumber" },
        { key: "transactionType", label: "transactionType" },
        { key: "transactionDate", label: "TransactionDate" },
        { key: "action", label: "Action" },

       
        // { key: "actions", label: "actions" },
      ],
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.walletTransactions.loading,
      wallettransactions: (state) => state.walletTransactions.walletTransactions,
    }),

    getParams(){
      return JSON.parse(JSON.stringify(this.$route))
    }
  },

  mounted(){
    console.log(this.wallettransactions)
  }
};
</script>
