<template>
  <div class="wrapper"  :style="{backgroundColor:'#FFFFFF'}">
    <div class="cardd m-3"  :style="{backgroundColor:'#FFFFFF'}">
      <div class="mb card-holder">
        <div class="card-area">
          <dashboard-view  :show="true" :refresh="true" :currency="'₦'" :showBtn="false" :showBtn1="false" :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'"></dashboard-view>
          <dashboard-view  :showBtn="false" :showBtn1="false" :currency="'₦'" :value="balances.referralBalance.accountBalance | formatAmount" :title="'Referral Balance'"></dashboard-view>
          <dashboard-view  :value="getStage === 'DEV' ? currentOrganisation.organisationNumberOfWalletDev : currentOrganisation.organisationNumberOfWallet" :title="'Number of Wallet'"></dashboard-view>
          <dashboard-view  :showBtn="false" :showBtn1="false" :value="getStage === 'DEV' ? currentOrganisation.organisationNumberOfVirtualAccountDev : currentOrganisation.organisationNumberOfVirtualAccount" :title="'Number of Virtual Account'"></dashboard-view>
        </div>
      </div>
      <div>
        <div class="mb-3 text-center">
          <b-button style="background-color:#413d52;color:white" @click="showM">Transfer to Other Banks </b-button>
          <b-button @click="setSendingToState"> Transfer to Tax Bank</b-button>
        </div>
        <div>
          <div class="ml-4">
            <h4>Recent Transactions</h4>
          </div>
          <transactions with-search="NO"></transactions>
        </div>
      </div>
        <fund-transfer-form :show-fund-transfer="showModal" @closeFundTransferForm="updateFundTransfer"></fund-transfer-form>
    </div>
  </div>

</template>

<script>
import SearchModuleutil from "../../util/constant/SearchModuleutil";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import {mapState} from "vuex";
import BaseTable from "../../components/table/BaseTable";
import SearchForm from "../../components/form/SearchForm";
import DashboardView from "../../components/dashboardComponent/DashboardCircle"
import FundTransferForm from "../../components/form/FundTransferForm";
import Transactions from "../report/Transactions";


export default {
  name: "FundTransfer",
  components:{
    BaseTable,
    SearchForm,
    DashboardView,
    FundTransferForm,
    Transactions
  },
  data(){
    return{
      searchWALLET: SearchModuleutil.WALLET,
      fields: [
        { key: "trnDrCr", label: "trnDrCr" },
        // { key: "accountCustomerId", label: "accountCustomerId" },
        { key: "trnAmount", label: "trnAmount" },
        { key: "trnFee", label: "trnFee" },
        // {
        //   key: "accountCurrency",
        //   label: "accountCurrency",
        // },
        { key: "trnService", label: "trnService" },
        { key: "trnDrAccountNumber", label: "trnDrAccountNumber" },
        { key: "trnDrAccountName", label: "trnDrAccountName" },
        { key: "trnCrAccountNumber", label: "trnCrAccountNumber" },
        { key: "trnCrAccountName", label: "trnCrAccountName" },
        { key: "trnStatus", label: "trnStatus" },
        { key: "trnCreatedAt", label: "trnCreatedAt" },
        { key: "walletAction", label: "Actions" },
      ],
    }
  },

  methods:{

    showM(){
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateCloseModal, true)
    },

    setSendingToState(){
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateCloseModal, true)
      StoreUtils.commit(StoreUtils.mutations.fundTransfer.updateSendingTo, 'coreStep')
    },
    updateFundTransfer(value) {
      this.show = value;
    },
    addRippleEffectToCoreStep(){
      const div = document.getElementById('toCoreStep')
      div.classList.add('transfer-option-ripple')
      setTimeout(() => {
        div.classList.remove('transfer-option-ripple')
      }, 1000)
    }
  },
  computed:{
    ...mapState({
      transactions:state => state.fundTransfer.transactions,
      loading:state => state.fundTransfer.loading,
      isdarkMode:state => state.auth.darkMode,
      user: (state) => state.auth.userInfo,
      api: (state) => state.apiKey.apiKey,
      stage: (state) => state.auth.stage,
      accLoading: state => state.accountPayout.accloading,
      balances: state => state.auth.balances,
      allTransactionsTotal: (state) => state.walletTransactions.allWalletTransactions.data.length,
      showModal:state => state.fundTransfer.closeModal
    }),

    currentOrganisation() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },

    getStage() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getStage)
    },
  },
  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.fundTransfer.readTransactions)
  }
}
</script>

<style scoped>
.mobile{
  display: none;
}

.transfer-option-div{
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  gap: 30px;
}

.transfer-option-inner{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column-reverse;
  height: inherit;
  gap: 10px;
}



.transfer-option{
  background-color: white;
  width: 20%;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);

}

.transfer-option:hover{
}

/*.transfer-option-ripple:before{*/
/*  content: "";*/
/*  width: 400px;*/
/*  height: 200px;*/
/*  position: absolute;*/
/*  border-radius: 100%;*/
/*  -webkit-animation: ripples 0.8s ease-in-out;*/
/*  animation: ripples 0.8s ease-in-out;*/
/*}*/

/*@-webkit-keyframes ripples {*/
/*  0% {*/
/*    border: 1px solid transparent;*/
/*  }*/
/*  100% {*/
/*    border: 20px solid #dfdfdf;*/
/*    opacity: 0;*/
/*  }*/
/*}*/
/*@keyframes ripples {*/
/*  0% {*/
/*    border: 1px solid transparent;*/
/*  }*/
/*  100% {*/
/*    border: 20px solid #dfdfdf;*/
/*    opacity: 0;*/
/*  }*/
/*}*/


.card-holder{
  display: flex;
  width: 100%;
  justify-content: center;
}

.card-area {
  display: flex;
  justify-content: space-around;
  /*border: solid yellow;*/
  /*padding: 10px;*/
  width: 100%;
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

.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}

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
  /*/*background-color: white;*/
  /*background-color: #181818;*/
  width: 100%;
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