<template>
  <div>
    <div class="m-4 text-right">
      <b-button style="background-color: var(--primary); border: none; color: white" @click="show = true">Request Payout
      </b-button>
    </div>
    <div class="mt-4">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <search-form :module="searchALL_TRANSACTION"></search-form>
      </div>
    </div>

    <payout-form @closeCreatePayout="updateCreatePayout" :showCreatePayout="show"></payout-form>

    <base-table :items="transactions.data" filter-mode="default" :fields="fields" :is-busy="loading" />
  </div>
</template>
<script>
import BaseTable from "../../components/table/BaseTable";
import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import SearchForm from "../../components/form/SearchForm";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";
import PayoutForm from "../../components/form/PayoutForm";
import SearchModuleutil from "../../util/constant/SearchModuleutil"


export default {
  name: "PayoutTransaction",
  components: { BaseTable, SearchForm, PayoutForm },
  data() {
    return {
      items: [],
      show: false,
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

    };
  },
  methods: {


    updateCreatePayout(value) {
      this.show = value;
    },

  },

  computed: {
    ...mapState({
      transactions: (state) => state.accountPayout.allpayouts,
      loading: (state) => state.accountPayout.accloading,
      balances: state => state.auth.balances

    }),
  },

  mounted() {
    StoreUtils.dispatch(
      StoreUtils.actions.accountPayout.readPayout,
      this.payoutTransactionsModel
    );
  },

};
</script>
<style scoped>
</style>