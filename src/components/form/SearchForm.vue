<template>
      <div class="form-area">
        <div class="filter-search">
         <h1 class="small p-1 rounded-1" style="background-color:#413d52;color:white;" v-b-modal.modal-center><b-icon-funnel /> filter</h1>
        </div>
<!--        <input class="form-control" name="Report Name" v-model="searchValue" placeholder="Search Here"  v-if="module != 'payoutTransactions'" @keyup="fetchResult" />&nbsp;-->
        <input class="form-control w-75" name="Report Name" v-model="searchValue" placeholder="Search Here" />&nbsp;

        <button @click="fetchResult" class="btn search-loading" v-if="loading" disabled><span class="spinner-border"></span></button>
        <button @click="fetchResult" class="btn search" v-else>search</button>
        <form @submit.prevent="fetchResult">
         <b-modal id="modal-center" centered hide-backdrop  hide-footer :title="label">
          <div>
            <div class="transaction-period">
              <base-input :label="label">
                <el-select  style="width: 100%" class="" filterable placeholder="" @change="getStartEndDate()" v-model="type"
                           required>
                  <el-option v-for="option in options" class="" :value="option.value" :label="option.label"
                             :key="option.value">
                  </el-option>
                </el-select>
              </base-input>
            <div v-if="type === 'customperiod'" class="">
              <div style="display: flex; flex-direction: column">
                <div class="">
                  <label class="form-control-label"> From</label>
                  <datetime v-model="model.startDate" input-class="form-control" class="theme-green"
                            placeholder="Start Date" zone="Africa/Lagos" value-zone="Africa/Lagos" :min-datetime="minDatetime"></datetime>
                </div>
                <div class="">
                  <label class="form-control-label"> To</label>
                  <datetime v-model="model.endDate" input-class="form-control" :max-datetime="maxDatetime" :min-datetime="minDatetime" class="theme-green" placeholder="End Date"
                            zone="Africa/Lagos" value-zone="Africa/Lagos"></datetime>
                </div>
              </div>
            </div>
            <b-button class="export-ex shadow-lg--hover small" :loading="loading"  type="submit" @click="fetchResult"> Search </b-button>
          </div>
          </div>
        </b-modal>
        </form>
<!--        {{loading}}{{module}}-->
      </div>
</template>

<script>
import { mapState } from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils"
import WalletRequest from "../../model/request/WalletRequest"
import { Datetime } from "vue-datetime";
import BaseButton from "../../components/button/BaseButton";
import BaseResponse from "../../model/reponse/BaseResponse";
import SearchModuleUtil from "../../util/constant/SearchModuleutil"
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest"
import AccountPayoutRequest from "@/model/request/AccountPayoutRequest";

let module = ''

let today = new Date()

export default {
  name: "SearchForm",
  props: ["module", "lable"],

  components: {
    Datetime,
    BaseButton
  },
  data() {
    return {
      minDatetime: "2022-04-1",
      maxDatetime: today.toLocaleDateString(),
      options: [
        { value: "today", label: "Today" },
        { value: "thismonth", label: "This Month" },
        { value: "last30", label: "Last 30 days" },
        { value: "last90", label: "Last 90 days" },
        { value: "thisyear", label: "This Year" },
        { value: "alltime", label: "All TIme" },
        { value: "customperiod", label: "Custom Period" },
      ],
      model: {
        startDate: "",
        endDate: ""
      },

      type: "",
      searchValue: "",
      searchModel: WalletRequest.readWallet,
      virtualAccountsearchModel: VirtualAccountRequest.readVirtualAccountTransactions,
      payoutSearchModel:AccountPayoutRequest.readPayout,
      label: "",


    }
  },
  methods: {

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getMonday(d) {
      d = new Date(d);
      let day = d.getDay(),
         diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    },
    formatDates(dateOne, dateTwo) {
      let formattedDates = "";
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat);
      }
      if (dateTwo) {
        //this.query(true);
        formattedDates += " - " + format(dateTwo, this.dateFormat);
      }
      return formattedDates;
    },
    getDuration(_startDate, _endDate) {
      let years =
        new Date(new Date(_endDate) - new Date(_startDate)).getFullYear() -
        1970;
      //console.log(years);
      let months = new Date(
        new Date(_endDate) - new Date(_startDate)
      ).getMonth();
      //console.log(months);
      let days =
        (new Date(_endDate).getTime() - new Date(_startDate).getTime()) /
        (1000 * 3600 * 24);
      //console.log(days);
      let hours =
        (new Date(_endDate).getTime() - new Date(_startDate).getTime()) /
        (1000 * 3600);
      //console.log(hours);
      let minutes =
        (new Date(_endDate).getTime() - new Date(_startDate).getTime()) /
        (1000 * 60);
      //console.log(minutes);
      let seconds =
        (new Date(_endDate).getTime() - new Date(_startDate).getTime()) / 1000;
      // //console.log(seconds);
      //return years;
      if (years > 0) return `${years} Years`;
      else if (months > 0) return `${months} Months`;
      else if (days > 0) return `${days} Days`;
      else if (hours > 0) return `${hours} Hours`;
      else if (minutes > 0) return `${minutes} Minutes`;
      else `${seconds} Seconds`;
    },
    getDaysArray(start, end) {
      let arr = [];
      let dt = new Date(start);
      for (; dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(format(new Date(dt), "YYYY-MM-DD"));
      }
      return arr;
    },
    getStartEndDate() {
      let today = new Date();
      let model = {
        startDate: "",
        endDate: "",
      };
      if (this.type === "today") {
        this.model.startDate = today.toJSON().slice(0, 10);
        this.model.endDate = today.toJSON().slice(0, 10);
        // console.log(
        //   "today:: in a bit",
        //   this.model.startDate,
        //   this.model.endDate
        // );
      } else if (this.type === "thisweek") {
        let priorDate = this.getMonday(new Date());
        this.myStylesmodel.startDate = priorDate.toJSON().slice(0, 10);
        this.model.endDate = new Date(new Date().setDate(today.getDate() + 1))
          .toJSON()
          .slice(0, 10);
      } else if (this.type === "thismonth") {
        let priorDate = new Date(today.getFullYear(), today.getMonth(), 2);
        this.model.startDate = priorDate.toJSON().slice(0, 10);
        this.model.endDate = new Date(new Date().setDate(today.getDate() + 1))
          .toJSON()
          .slice(0, 10);
      } else if (this.type === "last30") {
        let priorDate = new Date(new Date().setDate(today.getDate() - 30));
        this.model.startDate = priorDate.toJSON().slice(0, 10);
        this.model.endDate = new Date(new Date().setDate(today.getDate() + 1))
          .toJSON()
          .slice(0, 10);
        // console.log("last30::", model.startDate, model.endDate);
      } else if (this.type === "last90") {
        let priorDate = new Date(new Date().setDate(today.getDate() - 90));
        this.model.startDate = priorDate.toJSON().slice(0, 10);
        this.model.endDate = new Date(new Date().setDate(today.getDate() + 1))
          .toJSON()
          .slice(0, 10);
      } else if (this.type === "thisyear") {
        let priorDate = new Date(new Date().getFullYear(), 0, 1);
        this.model.startDate = priorDate.toJSON().slice(0, 10);
        this.model.endDate = new Date(new Date().setDate(today.getDate() + 1))
          .toJSON()
          .slice(0, 10);
      } else if (this.type === "alltime") {
        this.model.startDate = "";
        this.model.endDate = "";
      }
      return model;
    },
    fetchResult() {
      this.searchModel.endDate = this.model.endDate.split("T")[0]
      this.searchModel.startDate = this.model.startDate.split("T")[0]
      this.virtualAccountsearchModel.endDate = this.model.endDate.split("T")[0]
      this.virtualAccountsearchModel.startDate = this.model.startDate.split("T")[0]
      this.payoutSearchModel.endDate = this.model.endDate.split("T")[0]
      this.payoutSearchModel.startDate = this.model.startDate.split("T")[0]
      if (this.module === SearchModuleUtil.ALL_TRANSACTION) {
        this.searchModel.searchItem = this.searchValue
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateAllWalletTransactions, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions, this.searchModel).then(() => {
          this.searchModel.searchItem = null
        })
        // console.log("hello ALL_TRANSACTION", this.searchModel)
      }
      else if (this.module === SearchModuleUtil.WALLET) {
        this.searchModel.searchItem = this.searchValue
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateReadAllWallets, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets, this.searchModel).then(() => {
          this.searchModel.searchItem = null
        })
        // console.log("hello WALLET", this.searchModel)

      }
      else if (this.module === SearchModuleUtil.VIRTUAL_ACCOUNT) {
        this.lable = "Virtual Account Transaction Period"
        this.searchModel.searchItem = this.searchValue
        StoreUtils.commit(StoreUtils.mutations.virtualAccount.updateVirtualAccount, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualAccount, this.searchModel).then(() => {
          this.searchModel.searchItem = null
        })
        // console.log("hello VIRTUAL_ACCOUNT", this.searchModel)
      }
      else if (this.module === SearchModuleUtil.WALLET_TRANSACTION) {
        this.searchModel.searchItem = this.searchValue
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateAllWalletTransactions, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions, this.searchModel).then(() => {
          this.searchModel.searchItem = null
        })
        // console.log("hello WALLET_TRANSACTION", this.searchModel)
      }
      else if (this.module === SearchModuleUtil.VIRTUAL_ACCOUNT_TRANSACTION) {
        this.virtualAccountsearchModel.searchItem = this.searchValue
        StoreUtils.commit(StoreUtils.mutations.virtualAccount.updateVirtualaccountTransactions, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualaccountTransactions, this.virtualAccountsearchModel).then(() => {
          this.virtualAccountsearchModel.searchItem = null
        })
        // console.log("hello WALLET_TRANSACTION", this.virtualAccountsearchModel)
      }
      else if (this.module === SearchModuleUtil.PAYOUT_TRANSACTION) {
        StoreUtils.commit(StoreUtils.mutations.accountPayout.updateAllPayouts, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.accountPayout.readPayout, this.payoutSearchModel);
        // console.log("hello PAYOUT_TRANSACTION", this.payoutSearchModel)
      }
      else if(this.module === SearchModuleUtil.TRANSACTIONS){
        this.searchModel.searchItem = this.searchValue
        // StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateAllWalletTransactions, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.transactions.filterTransactions, this.searchModel).then(() => {
          this.searchModel.searchItem = null
        })
      }
      else {
        this.searchModel.searchItem = this.searchValue
        StoreUtils.commit(StoreUtils.mutations.dispute.updateDisputes, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.dispute.updateDisputes, this.searchModel).then(() => {
          this.searchModel.searchItem = null
        })
        // console.log("hello Something else")
      }
    }
  },
  computed: {
    getToday(){
      return this.maxDatetime
    },
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
      loading: (state) => {
        // console.log(module)
        if (module === SearchModuleUtil.ALL_TRANSACTION || SearchModuleUtil.WALLET)
          return state.auth.searchLoading
        else if (module === SearchModuleUtil.VIRTUAL_ACCOUNT)
          return state.virtualAccount.loading
        else if (module === SearchModuleUtil.PAYOUT_TRANSACTION)
          return state.accountPayout.accloading
        else
          return state.walletTransactions.loading
      },
      data: (state) => {
        if (module === SearchModuleUtil.ALL_TRANSACTION)
          return state.walletTransactions.allWalletTransactions
        else if (module === SearchModuleUtil.WALLET)
          return state.walletTransactions.wallets
        else if (module === SearchModuleUtil.VIRTUAL_ACCOUNT)
          return state.virtualAccount.virtualAccount
        else if(module === SearchModuleUtil.PAYOUT_TRANSACTION){
          return state.accountPayout.allpayouts
        }
        else
          return state.walletTransactions.allWalletTransactions
      },
    }),
    myStyles() {
      return { height: "150px" };
    },
  },
  created() {
    module = this.module

  },
  mounted() {
    if (this.module === "wallet") {
        this.label = "Wallet Creation Period"
    }else if(this.module === "virtualAccount"){
        this.label = "Account Creation Period"
    }
    else if(this.module === "payoutTransactions"){
        this.label = "Payout Transaction Period"
    }else{
        this.label = "Transaction Period"
    }
  // console.log(this.maxDatetime)
    this.getMonday()
  }


}
</script>

<style scoped>
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
.filter-search{
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*border-right: solid black*/
}

.form-area{
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.search{
  background-color: #413d52;
  color: white;
  margin-left: -115px;
  border: none;
  height: 42px;
  /*border-radius: 3px;*/
}

.search-loading{
  background-color: #413d52;
  color: white;
  margin-left: -80px;
  border: none;
  height: 42px;
}

.search:hover{
  color: white;
}

input{
  width:90%;
}

.export-ex{
  background-color:#413d52;
  color:white;
  margin: 2px;
  width:200px;
  cursor: pointer;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}

@media (max-width: 999px) {
  .form-area{
    display: flex;
    flex-direction:row;
    justify-content: center;
    width: 80%;

  }

  .filter-search{
    width: 20%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .transaction-period{
    display: flex;
    gap: 20px;
  }
  input{
    width:100%;
  }

  .export-ex{
    height: 5vh;
    font-size: 12px;
    width:200px;
    display: block !important;

  }

}

/*input[type="text"] {
   display: flex;
   flex-wrap: wrap;
}*/
.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}

/* Solid border */

.card-profile-image span {
  max-width: 140px;
  border-radius: 0.375rem;
  border: 3px solid #fff;
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
  position: absolute;
  left: 50%;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
}

span {
  vertical-align: middle;
  border-style: none;
}

.control{
  width: 100%;
}

.transaction-period{
  display: flex;
  gap: 20px;
  flex-direction: column;
}



.card-profile-image span:hover {
  -webkit-transform: translate(-50%, -50%) scale(1.03);
  transform: translate(-50%, -50%) scale(1.03);
}
</style>