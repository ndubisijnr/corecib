<template>
  <div>
<!--    <blocker-loader v-if="accloading" :message="'Please Wait'"></blocker-loader>-->
<!--        <blocker-loader v-if="loading" :message="'Please Wait'"></blocker-loader>-->

    <base-header class="pb-6" type="">
    </base-header>
    <div class="container-fluid mt--6">
      <div class="cardd p-3 m-3">
        <div>
          <h1 class="m-b- text-center"><b>Hello {{ user.customerFirstName }}, Welcome to BizGem</b></h1>
          <h2 class="text-center">Your business is in <span v-if="getStage === 'DEV'">Test</span><span
              v-else>Live</span> mode</h2>
          <div class="card-area">
            <dashboard-card :currency="'₦'" :showBtn="false" :showBtn1="false"
              :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'"></dashboard-card>
            <dashboard-card :showBtn="false" :showBtn1="false" :currency="'₦'"
              :value="balances.referralBalance.accountBalance | formatAmount" :title="'Referral Balance'">
            </dashboard-card>
            <dashboard-card :value="currentOrganisation.organisationNumberOfWallet" :title="'Number of Wallet'">
            </dashboard-card>
            <dashboard-card :showBtn="false" :showBtn1="false"
              :value="currentOrganisation.organisationNumberOfVirtualAccount" :title="'Number of Virtual Account'">
            </dashboard-card>
          </div>
          <div class="mb-3 text-center">
            <b-button style="background-color:#3F88C5;color:white" v-b-modal.modal-scrollable>Fund Wallet </b-button>
            <b-button @click="show = true"> Withdraw</b-button>
          </div>
          <div>
            <h4 class="badge"> All Transactions</h4>
            <transaction withSearch="YES"></transaction>
          </div>
        </div>
      </div>
    </div>
    <payout-form @closeCreatePayout="updateCreatePayout" :showCreatePayout="show"></payout-form>

    <b-modal centered id="modal-scrollable" scrollable hide-backdrop content-class="shadow" hide-footer>

      <h3 style="text-align:center">
        Topup Balance
      </h3>
      <div>
        <h3>To fund your wallet</h3>
        <span>Transfer desired amount to the account details below and have your balance funded</span>
        <div class="carddd" v-for="items in balances.walletBalance.virtualAccounts" :key="items">
          <h6 class="text-right rounded-3 p-1 text-white"
            style="position:absolute;right:50px;cursor:pointer;background:var(--primary)"
            @click="copyToClipboard(id = items.accountNumber)">Copy</h6>
          <code>
                   <span class="mb-3 text-dark">Bank Name: {{ items.accountOtherBankName }}</span><br>
                    <span class="mb-3 text-dark">Account Name: {{ items.accountName }}</span><br>
                    <span class="mb-3 text-dark" >Account Name: <span :id="items.accountNumber">{{ items.accountNumber }}</span></span>
                </code>
        </div>
      </div>

    </b-modal>



  </div>
</template>
<script>
import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import DashboardView from "../../components/dashboardComponent/DashboardCircle"
import ApikeyRequest from "../../model/request/ApiKeyRequest";
import Swal from "sweetalert2";
import Transaction from "../report/Transactions.vue"
import PayoutForm from "../../components/form/PayoutForm";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest"

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  name: "GetStarted",
  components: {"dashboard-card": DashboardView, Transaction, PayoutForm},

  data: () => {
    return {
      isSwitched: false,
      apikeyModel: ApikeyRequest.regenerateApiKey,
      payoutModel: AccountPayoutRequest.createPayout,
      payoutTransactionsModel: AccountPayoutRequest.readPayout,
      show: false,
    }
  },

  methods: {

    regenerateApiKey() {
      StoreUtils.dispatch(StoreUtils.actions.apiKey.regenerateApiKey, this.apikeyModel).then(() => {
        this.$bvModal.hide('modal-no-backdrop')
      })

    },

    updateCreatePayout(value) {
      this.show = value;
    },
    copyToClipboard(id) {
      let copyLink = document.getElementById(id).textContent;
      navigator.clipboard.writeText(copyLink).then(() => {
        Toast.fire({ text: "Copied to clipboard", icon: "success" }).then(
          () => { }
        );
      });
    },

  },
  computed: {
    ...mapState({
      user: (state) => state.auth.userInfo,
      loading: (state) => state.auth.loading,
      api: (state) => state.apiKey.apiKey,
      stage: (state) => state.auth.stage,
      accLoading: state => state.accountPayout.accloading,
      balances: state => state.auth.balances

    }),
    currentOrganisation() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },

    getStage() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
    },



  },

  watch: {

  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.auth.readDashboardStats)
  },
};
</script>
<style scoped>
.center-block {
  float: none;
}

.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}



svg:not(:root) {
  overflow: hidden;
}

.badge {}


.onboarding-title {
  padding: 20px 0 0;
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

.inner-card {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  line-height: 3rem;
  font-family: "Fibon Sans";
}

@media (max-width:999px) {
  .inner-card {
    display: flex;
    justify-content: space-around;
    padding: 5px;
    flex-direction: column-reverse;
    line-height: 3rem;
    font-family: "Fibon Sans";
  }

  .itemabc123 {
    width: auto;
    display: flex;
    /* align-items: center; */
    justify-content: space-around;
    flex-direction: column-reverse;

  }
}

.itemabc123 {
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  flex-wrap: wrap;
}

.cardd {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 10%);
  background-color: white;


}

.carddd {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
  background-color: white;
  margin-top: 20px;
  padding: 10px;


}

.card-area {
  display: flex;
  justify-content: space-around;
  /* border: solid yellow; */
  padding: 10px;
  width: 100%;
}

.itemabc1234 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
}
</style>
