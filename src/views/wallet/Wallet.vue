<template>
  <div>
      <div class="export-btn-area">
        <search-form :module="searchWALLET"/>
        <b-button @click="show = true" class="export-ex shadow-lg--hover small desktop">Create Wallet</b-button>
        <b-icon-plus-circle class="mobile" @click="show = true"/>
      </div>
    <base-table
        :items="this.wallet.data"
        :fields="fields"
        filter-mode="default"
        :is-busy="loading" />
    <create-wallet-form @closeWalletForm="updateWalletForm"  :showWalletForm="show"></create-wallet-form>
  </div>
</template>
<script>

import WalletRequest from "../../model/request/WalletRequest"
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BaseTable from "../../components/table/BaseTable";
import SearchModuleutil from "../../util/constant/SearchModuleutil"
import CreateWalletForm from "@/components/form/CreateWalletForm";



import { mapState } from "vuex";
import SearchForm from "../../components/form/SearchForm";
export default {
  name: "Wallet",
  components: {
    SearchForm,
    BaseTable,
    CreateWalletForm,
  },
  data() {
    return {
      minDatetime: "2022-04-28",
      maxDatetime: "2022-04-01",
      startDate: "",
      endDate: "",
      show: false,

      light: "light",
      allWalletModel: WalletRequest.readWallet,
      singleWalletTransactionmodel: WalletRequest.readWalletTransaction,
      searchWALLET: SearchModuleutil.WALLET,
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
        // { key: "accountCustomerId", label: "accountCustomerId" },
        { key: "accountNumber", label: "accountNumber" },
        { key: "accountName", label: "accountName" },
        // {
        //   key: "accountCurrency",
        //   label: "accountCurrency",
        // },
        { key: "accountBalance", label: "accountBalance" },
        { key: "accountStatus", label: "accountStatus" },
        { key: "accountLedgerBalance", label: "accountLedgerBalance" },
        // { key: "accountPhone", label: "accountPhone" },
        // { key: "accountEmail", label: "accountEmail" },
        // { key: "accountBvn", label: "accountBvn" },
        { key: "walletAction", label: "Actions" },
      ],
    }
  },
  methods: {
    updateWalletForm(value) {
      this.show = value;
    },

  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    ...mapState({
      userInformation: (state) => state.auth.userInfo,
      loading: (state) => state.walletTransactions.loading,
      wallet: (state) => state.walletTransactions.wallets,
    }),

    myStyles() {
      return { height: "150px" };
    },
  },
  mounted() {},

};
</script>
<style scoped>
.mobile{
  display: none;
}

.export-btn-area{
  /*box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);*/
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


@media (max-width: 500px) {
  .export-btn-area{
    flex-direction: row;
  }

  .desktop{
    display: none !important;
  }

  .mobile{
    font-size: 25px;
    display: block;
  }

}

.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}

</style>

