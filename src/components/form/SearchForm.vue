<template>
<b-breadcrumb>

  <div class="row">
    <b-form @submit.prevent="fetchResult">
      <!-- <div class="col-lg-3 col-md-3 col-sm-3 col-3"> -->
      <div class="" style="display: flex;">
        <div class="">
          <base-input label="Transaction Period">
            <el-select
                class="select-danger"
                filterable
                placeholder=""
                @change="getStartEndDate()"
                v-model="type"
                required

            >
              <el-option
                  v-for="option in options"
                  class="select-danger"
                  :value="option.value"
                  :label="option.label"
                  :key="option.value"
              >
              </el-option>
            </el-select>
          </base-input>
        </div>
        <div v-if="type === 'customperiod'" class="">
          <div style="display: flex">
            <div></div>
            <div class="ml-2">
              <label class="form-control-label"> From</label>
              <datetime
                  v-model="model.startDate"
                  input-class="form-control form-control-lg"
                  class="theme-green"
                  placeholder="Start Date"
                  zone="Africa/Lagos"
                  value-zone="Africa/Lagos"

              ></datetime>
            </div>
            <div class="ml-2">
              <label class="form-control-label"> To</label>
              <datetime
                  v-model="model.endDate"
                  input-class="form-control form-control-lg"
                  class="theme-green"
                  placeholder="End Date"
                  zone="Africa/Lagos"
                  value-zone="Africa/Lagos"
              ></datetime>
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <base-input
              label="Search"
              input-classes="form-control-lg"
              name="Report Name"
              v-model="searchModel.searchItem"
              placeholder="Search Here"
              class="ml-2"
          >
          </base-input>&nbsp;
           <base-button :loading="loading" class="mt-3" icon="b-icon-search"  title="Search"/>
        </div>
      </div>
    </b-form>
  </div>
</b-breadcrumb>
</template>

<script>
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils"
import WalletRequest from "../../model/request/WalletRequest"
import {Datetime} from "vue-datetime";
import BaseButton from "../../components/button/BaseButton";
import BaseResponse from "../../model/reponse/BaseResponse";
import SearchModuleUtil from "../../util/constant/SearchModuleutil"

let module = ''

export default {
  name: "SearchForm",
  props: ["module"],
  components: {
    Datetime,
    BaseButton
  },
  data() {
    return {
      options: [
        {value: "last30", label: "Last 30 days"},
        {value: "last90", label: "Last 90 days"},
        {value: "alltime", label: "All TIme"},
        {value: "customperiod", label: "Custom Period"},
        {value: "thismonth", label: "This Month"},
        {value: "today", label: "Today"},
        {value: "thisyear", label: "This Year"},
      ],
      startDate: "",
      endDate: "",
      type: "",
      searchModel: WalletRequest.readWallet,
     

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
        console.log(
            "today:: in a bit",
            this.model.startDate,
            this.model.endDate
        );
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
        console.log("last30::", model.startDate, model.endDate);
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
      this.searchModel.endDate = this.searchModel.endDate.split("T")[0]
      this.searchModel.startDate = this.searchModel.startDate.split("T")[0]
      if (this.module === SearchModuleUtil.ALL_TRANSACTION) {
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateAllWalletTransactions, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions, this.searchModel);
        console.log("hello ALL_TRANSACTION", this.searchModel)
      } else if (this.module === SearchModuleUtil.WALLET) {
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateReadAllWallets, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateReadAllWallets, this.searchModel);
        console.log("hello WALLET", this.searchModel)

      } else if (this.module === SearchModuleUtil.VIRTUAL_ACCOUNT) {
        StoreUtils.commit(StoreUtils.mutations.virtualAccount.updateVirtualAccount, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.virtualAccount.updateVirtualAccount, this.searchModel);
        console.log("hello VIRTUAL_ACCOUNT", this.searchModel)
      } else {
        StoreUtils.commit(StoreUtils.mutations.walletTransactions.updateAllWalletTransactions, BaseResponse.list)
        StoreUtils.dispatch(StoreUtils.actions.walletTransactions.updateAllWalletTransactions, this.searchModel);
        console.log("hello Something else", this.searchModel)
      }
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
          .filter((f) => f.sortable)
          .map((f) => {
            return {text: f.label, value: f.key};
          });
    },
    ...mapState({
      userInformation: (state) => state.auth.userInfo,
      loading: (state) => {
        console.log(module)
        if (module === SearchModuleUtil.ALL_TRANSACTION || SearchModuleUtil.WALLET)
          return state.walletTransactions.loading
        else if (module === SearchModuleUtil.VIRTUAL_ACCOUNT)
          return state.virtualAccount.loading
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
        else
          return state.walletTransactions.allWalletTransactions
      },
    }),
    myStyles() {
      return {height: "150px"};
    },
  },
  created() {
    module = this.module
  }
}
</script>

<style scoped>

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
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

.card-profile-image span:hover {
  -webkit-transform: translate(-50%, -50%) scale(1.03);
  transform: translate(-50%, -50%) scale(1.03);
}
</style>