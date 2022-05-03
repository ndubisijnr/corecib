<template>
  <div>
    <div class="m-4 text-right">
      <b-button
        style="background-color: var(--primary); border: none; color: white"
        v-b-modal.modal-no-backdrop3
        >Request Payout
      </b-button>
    </div>
    <div class="mt-4" v-if="withSearch != 'YES'">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <search-form :module="searchALL_TRANSACTION"></search-form>
      </div>
    </div>

    <base-table
      :items="transactions.data"
      filter-mode="default"
      :fields="fields"
      :is-busy="loading"
    />

    <b-modal
      centered
      title="Withdraw"
      id="modal-no-backdrop3"
      hide-backdrop
      content-class="shadow"
      hide-footer
    >
      <div class="container">
        <b-form class="" @submit.prevent="requestPayout()">
          <h4 class="text-left">
            Wallet Balance: ₦{{ "100000" | formatAmount }}
          </h4>
          <b-input-group size="md" prepend="NGN" class="mb-3">
            <b-form-input
              id="withdrawInput"
              step="0.01"
              type="number"
              autofocus
              v-model="payoutModel.payoutAmount"
              style="font-size: 16px; letter-spacing: 0.2rem"
              placeholder="Enter Amount"
              required
            ></b-form-input>
          </b-input-group>
          <h4 id="error" class="text-danger text-center"></h4>
          <b-button
            v-if="payoutModel.payoutAmount <= 100000"
            class="w-100 text-white"
            type="submit"
            style="background-color: var(--primary)"
            >{{ loading ? "please wait.." : "withdraw" }}
            <span :class="{ 'spinner-border': loading }"></span
          ></b-button>
          <base-button title="Insufficent Funds" v-else disabled></base-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
<script>
import BaseTable from "../../components/table/BaseTable";
import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import SearchForm from "../../components/form/SearchForm";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";

export default {
  name: "PayoutTransaction",
  components: { BaseTable, SearchForm },
  data() {
    return {
      items: [],
      fields: [
        { key: "payoutId", label: "PAYOUT ID" },
        { key: "payoutReference", label: "PAYOUT REFERENCE" },
        { key: "payoutAmount", label: "PAYOUT AMOUNT" },
        { key: "payoutStatus", label: "PAYOUT STATUS" },
        { key: "action", label: "Actions" },
      ],
      payoutTransactionsModel: AccountPayoutRequest.readPayout,
      payoutModel: AccountPayoutRequest.createPayout,
    };
  },
  methods: {
    reference(length) {
      let result = "";
      let characters =
        "abcdefghijklmnopgrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    requestPayout() {
      this.payoutModel.payoutReference = `BIZGEM-${this.reference(30)}`;
      StoreUtils.dispatch(
        StoreUtils.actions.accountPayout.requestPayout,
        this.payoutModel
      ).then(() => {
        StoreUtils.dispatch(
          StoreUtils.actions.accountPayout.readPayout,
          this.payoutTransactionsModel
        );
        this.payoutModel.payoutAmount = null;
      });
    },
  },

  computed: {
    ...mapState({
      transactions: (state) => state.accountPayout.allpayouts,
      loading: (state) => state.accountPayout.accloading,
    }),
  },

  mounted() {
    StoreUtils.dispatch(
      StoreUtils.actions.accountPayout.readPayout,
      this.payoutTransactionsModel
    );
  },
  watch: {
    payoutModel(newValue) {
      if (newValue > 100000) {
        document.getElementById("withdrawInput").style.border = "solid red";
        document.getElementById("error").innerHTML = "Insufficent Funds";
      } else {
        document.getElementById("withdrawInput").style.border =
          "solid var(--primary)";
        document.getElementById("error").innerHTML = "";
      }
    },
  },
};
</script>
<style scoped>
</style>