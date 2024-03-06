<template>
  <div>
    <div class="export-btn-area">
      <search-form :module="searchAccount"/>
      <b-button @click="show = true" class="export-ex shadow-lg--hover small desktop">Enumerate</b-button>
      <b-icon-plus-circle class="mobile" @click="show = true"/>
    </div>
    <base-table
        :items="account"
        :fields="fields"
        filter-mode="default"
        :is-busy="loading" />
    <create-account-form @closeAccountForm="updateAccountForm"  :showAccountForm="show"></create-account-form>
  </div>
</template>

<script>
import SearchForm from "../../components/form/SearchForm";
import BaseTable from "../../components/table/BaseTable";
import WalletRequest from "../../model/request/WalletRequest";
import SearchModuleutil from "../../util/constant/SearchModuleutil";
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import CreateAccountForm from "../../components/form/CreateAccountForm";

export default {
  name: "Account",
  components: {
    SearchForm,
    BaseTable,
    CreateAccountForm
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
      searchAccount: SearchModuleutil.ACCOUNTS,
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
        // { key: "accountId", label: "accountId" },
        // { key: "accountCustomerId", label: "accountCustomerId" },
        { key: "customerFirstName", label: "customerFirstName" },
        { key: "customerLastName", label: "customerLastName" },
        {
          key: "customerEmail",
          label: "customerEmail",
        },
        { key: "customerPhone", label: "customerPhone" },
        { key: "customerBvn", label: "customerBvn" },
        { key: "customerStatus", label: "customerStatus" },
        // { key: "customerCreatedAt", label: "customerCreatedAt" },
        // { key: "customerLastLoginAt", label: "customerLastLoginAt" },
        // { key: "accountBvn", label: "accountBvn" },
        { key: "action", label: "Actions" },
      ],
    }
  },
  methods: {
    updateAccountForm(value) {
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
      loading: (state) => state.account.loading,
      account: (state) => state.account.accounts,
    }),

    myStyles() {
      return { height: "150px" };
    },
  },
  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.account.readAccount)
  },
}
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
