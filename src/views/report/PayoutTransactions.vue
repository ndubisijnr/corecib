<template>
  <div>
    <div class="export-btn-area">
      <search-form :module="searchALL_TRANSACTION" />
      <b-button class="export-ex desktop" v-if="!loading && Object.values(payoutAccount).every((o) => o === null)" @click="showPayout = true" >Payout Bank</b-button>
      <b-button class="export-ex" @click="show = true">Request Payout</b-button>
    </div>
    <payout-form @closeCreatePayout="updateCreatePayout" :showCreatePayout="show"></payout-form>
    <add-bank-form @closeCreateBank="updateCreateBank" :showCreateBank="showPayout"></add-bank-form>


    <base-table :items="transactions.data" filter-mode="default" :fields="fields" :is-busy="loading" />
  </div>
</template>
<script>
import BaseTable from "../../components/table/BaseTable";
import { mapState } from "vuex";
import SearchForm from "../../components/form/SearchForm";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";
import PayoutForm from "../../components/form/PayoutForm";
import SearchModuleutil from "../../util/constant/SearchModuleutil"
import AddBankForm from "../../components/form/AddBankForm";


export default {
  name: "PayoutTransaction",
  components: { BaseTable, SearchForm, PayoutForm,AddBankForm },
  data() {
    return {
      items: [],
      show: false,
      showPayout:false,
      fields: [
        { key: "payoutId", label: "PAYOUT ID" },
        { key: "payoutReference", label: "PAYOUT REFERENCE" },
        { key: "payoutAmount", label: "PAYOUT AMOUNT" },
        { key: "payoutStatus", label: "PAYOUT STATUS" },
        { key: "action", label: "Actions" },
      ],
      payoutTransactionsModel: AccountPayoutRequest.readPayout,
      payoutModel: AccountPayoutRequest.createPayout,
      searchALL_TRANSACTION: SearchModuleutil.PAYOUT_TRANSACTION,
      readPayoutAccountModel: AccountPayoutRequest.readAccountPayoutById,


    };
  },
  methods: {

    updateCreateBank(value) {
      this.showPayout = value;
    },
    updateCreatePayout(value) {
      this.show = value;
    },

  },

  computed: {
    ...mapState({
      transactions: (state) => state.accountPayout.allpayouts,
      loading: (state) => state.accountPayout.accloading,
      balances: state => state.auth.balances,
      payoutAccount: (state) => state.auth.addedBanks,

    }),
  },
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
  /*background-color: #ffffff;*/

}

.export-ex{
  background-color:#3F88C5;
  color:white;
  /*margin: 2px;*/
  /*width: 200px;*/
  /*border: none;*/
  /*cursor: pointer;*/
  /*height: 5vh;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*border-radius: 5px;*/
}
.export-ex:hover{
  color: #FFFFFF;
  background-color: rgb(63, 136, 197);
}

.mobile{
  display: none;
}

@media (max-width: 500px) {
  .export-ex{
    background-color:#3F88C5;
    color:white;
    margin: 2px;
    width: 220px;
    border: none;
    cursor: pointer;
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }

  .desktop{
    display: none !important;
  }

  .mobile{
    font-size: 25px !important;
    display: block;
  }
  .export-ex:hover{
    color: #FFFFFF;
    background-color: rgb(63, 136, 197);
  }

}
</style>