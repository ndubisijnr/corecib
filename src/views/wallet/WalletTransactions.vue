<template>
  
 <div>
   {{wallettransactions}}
  </div>
</template>


<script>
import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";


import WalletRequest from "../../model/request/WalletRequest"

export default {
  name:"WalletTransaction",
  data() {
    return {
      minDatetime: "2022-04-28",
      maxDatetime: "2022-04-01",
      startDate: "",
      endDate: "",

      light: "light",
      allWalletTransactionsmodel: WalletRequest.readAllWalletTransaction,
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
      field: [
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

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState({
        loading: (state) => state.walletTransactions.loading,
       wallettransactions: (state) => state.walletTransactions.allWalletTransactions,
    }),
  },

  mounted(){
    this.allWalletTransactionsmodel.startDate = this.maxDatetime;
    this.allWalletTransactionsmodel.endDate = this.minDatetime;
    this.allWalletTransactionsmodel.page = 1;
    StoreUtils.dispatch(
      StoreUtils.actions.walletTransactions.updateAllWalletTransactions,
      this.allWalletTransactionsmodel
    );
  }
};
</script>
