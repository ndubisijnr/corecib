<template>
  <div class="wrapper"  :style="isdarkMode === 'false' ? {backgroundColor:'#FFFFFF'}:{backgroundColor:'#181818'}">
      <div class="cardd m-3" id="cardd" :style="isdarkMode === 'false' ? {backgroundColor:'#FFFFFF'}:{backgroundColor:'#181818'}">
          <div class="mb card-holder">
            <div class="card-area">
                <dashboard-card  :show="true" :refresh="true" :currency="'₦'" :showBtn="false" :showBtn1="false" :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'"></dashboard-card>
                <dashboard-card  :showBtn="false" :showBtn1="false" :currency="'₦'" :value="balances.referralBalance.accountBalance | formatAmount" :title="'Referral Balance'"></dashboard-card>
                <dashboard-card  :value="getStage === 'DEV' ? currentOrganisation.organisationNumberOfWalletDev : currentOrganisation.organisationNumberOfWallet" :title="'Number of Wallet'"></dashboard-card>
                <dashboard-card  :showBtn="false" :showBtn1="false" :value="getStage === 'DEV' ? currentOrganisation.organisationNumberOfVirtualAccountDev : currentOrganisation.organisationNumberOfVirtualAccount" :title="'Number of Virtual Account'"></dashboard-card>
            </div>
          </div>
          <div class="mb-3 text-center">
            <b-button style="background-color:#3F88C5;color:white" v-b-modal.modal-scrollable>Fund Wallet </b-button>
            <b-button @click="show = true"> Withdraw</b-button>
          </div>
        <div id="end"></div>
          <div>
              <div class="ml-4">
                <h4>Recent Transactions</h4>
              </div>
              <transaction with-search="NO"></transaction>
            </div>
      </div>
      <payout-form @closeCreatePayout="updateCreatePayout" :showCreatePayout="show"></payout-form>
      <b-modal centered id="modal-scrollable" scrollable hide-backdrop content-class="shadow" hide-footer title="Fund your wallet">
      <h3 style="text-align:center">Top up Balance</h3>
      <div>
        <h3>To fund your wallet</h3>
        <span>Transfer desired amount to the account details below and have your balance funded</span>
        <div class="carddd" v-for="items in balances.walletBalance.virtualAccounts" :key="items">
          <h6 class="text-right rounded-3 p-1 text-white"
              :style="{position:'absolute',right:'50px',cursor:'pointer',background:primaryColor}"
              @click="copyToClipboard(id = items.accountNumber)">Copy</h6>
          <code>
            <span class="mb-3 text-dark">Bank Name: {{ items.accountOtherBankName }}</span><br>
            <span class="mb-3 text-dark">Account Name: {{ items.accountName }}</span><br>
            <span class="mb-3 text-dark" >Account Number: <span :id="items.accountNumber">{{ items.accountNumber }}</span></span>
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
      primaryColor:window.__env.app.primaryColor,
      data:[]
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

    updateAddBusiness(value) {
      this.showBusinessForm = value;
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
      isdarkMode:state => state.auth.darkMode,
      user: (state) => state.auth.userInfo,
      loading: (state) => state.auth.loading,
      api: (state) => state.apiKey.apiKey,
      stage: (state) => state.auth.stage,
      accLoading: state => state.accountPayout.accloading,
      balances: state => state.auth.balances,
      allTransactionsTotal: (state) => state.walletTransactions.allWalletTransactions.data.length,


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
    StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions)
  },
};
</script>
<style scoped>
.wrapper{
  /*height: 100%;*/
  background-color: #181818;
}

.paymentBox{
  position: absolute;
  left: 6%;
}
.center-block {
  float: none;
}

.card-holder{
  display: flex;
  width: 100%;
  justify-content: center;
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


.cardd {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 10%);
  /*!*background-color: white;*!*/
  /*background-color: #181818;*/
  width: 100%;
}


.carddd {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
  /*background-color: white;*/
  margin-top: 20px;
  padding: 10px;
}

.wrapper{
  display: flex;
  justify-content: center;
}

.card-area {
  display: flex;
  justify-content: space-around;
   /*border: solid yellow;*/
  padding: 10px;
  width: 100%;
}

@media (max-width:999px){
  .card-area{
    display: flex;
    width: 1500px;
    justify-content: center;
  }

  .card-holder{
    display: flex;
    width: 150%;
    justify-content: left;
  }


  .cardd {
    box-shadow: none;
    background-color: transparent;
    margin-top: 0;
    padding: 0;
  }

  .mb{
    width: 100%;
    overflow: scroll;

  }
}

.itemabc1234 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
}
</style>
