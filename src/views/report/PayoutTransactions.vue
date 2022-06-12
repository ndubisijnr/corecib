<template>
  <div>
    <div class="m-4 text-right">
      <b-button v-if="!loading && Object.values(payoutAccount).every((o) => o === null)" @click="showPayout = true" style="background-color: var(--primary); border: none; color: white"><i class="fa fa-plus"></i> Add Payout Bank</b-button>
      <b-button style="background-color: var(--primary); border: none; color: white" @click="show = true">Request Payout</b-button>
    </div>
    <div class="mt-4">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <search-form :module="searchALL_TRANSACTION"></search-form>
      </div>
    </div>

    <payout-form @closeCreatePayout="updateCreatePayout" :showCreatePayout="show"></payout-form>
    <add-bank-form @closeCreateBank="updateCreateBank" :showCreateBank="showPayout"></add-bank-form>


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
      payoutAccount: (state) => state.accountPayout.addedBanks,

    }),
  },

  beforeCreate() {
    this.readPayoutAccountModel.accountOrganisationId = localStorage.organisationId;
    StoreUtils.dispatch(
        StoreUtils.actions.accountPayout.readAddedBanks,
        this.readPayoutAccountModel
    );
    StoreUtils.dispatch(
        StoreUtils.actions.accountPayout.readPayout,
        this.payoutTransactionsModel
    );

  },

  mounted() {

    // this.readPayoutAccountModel.accountOrganisationId =
    //     localStorage.organisationId;
    // StoreUtils.dispatch(
    //     StoreUtils.actions.accountPayout.readAddedBanks,
    //     this.readPayoutAccountModel
    // );
  },

};
</script>
<style scoped>
</style>