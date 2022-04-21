<template>
  <div>
    <div class="mt-4">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
        <div class="row">
          <!-- <div class="col-lg-3 col-md-3 col-sm-3 col-3"> -->
          <div style="display: flex">
            <div class="">
              <base-input label="Transaction Period">
                <el-select
                  class="select-danger"
                  filterable
                  placeholder=""
                  @change="getStartEndDate()"
                  v-model="type"
                >
                  <el-option
                    v-for="option in option_time"
                    class="select-danger"
                    :value="option.value"
                    :label="option.label"
                    :key="option.value"
                  >
                  </el-option>
                </el-select>
              </base-input>
            </div>
            <base-input
              label="Search"
              input-classes="form-control-md"
              name="Report Name"
              placeholder="Search"
              v-model="filter"
              class="w-50 ml-1"
            >
            </base-input>
            <div v-if="type === 'customperiod'" class="">
              <div style="display: flex">
                <div></div>
                <div class="ml-2">
                  <label class="form-control-label"> From</label>
                  <datetime
                    v-model="startDate"
                    input-class="form-control"
                    class="theme-green"
                    placeholder="Start Date"
                    zone="Africa/Lagos"
                    value-zone="Africa/Lagos"
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime"
                  ></datetime>
                </div>
                <div class="ml-2">
                  <label class="form-control-label"> To</label>
                  <datetime
                    v-model="endDate"
                    input-class="form-control"
                    class="theme-green"
                    placeholder="End Date"
                    zone="Africa/Lagos"
                    value-zone="Africa/Lagos"
                    :min-datetime="minDatetime"
                    :max-datetime="maxDatetime"
                  ></datetime>
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
          <!-- <div class="col-lg-3 col-md-3 col-sm-3 col-3">
              
            </div> -->
        </div>
      </div>

      <div class="dispute" v-if="!wallet">
        <div class="text-center">
          <img src="@/assets/empty.svg" />
          <h3>No Wallets</h3>
        </div>
      </div>
      <div class="dispute" v-if="loading">
        <div class="text-center">
          <div class="d-flex align-items-center justify-content-center">
            <span :class="{ 'spinner-border': loading }"></span
            ><span class="m-2">Loading wallets...</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="wallet">

      <!-- <singleTrans  v-if="wallettrans"/> -->

      <div class="dispute-table" v-if="!loading">
        <b-table
          class="table table-striped shadow"
          :fields="field"
          :items="wallet"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          show-empty
        >
          <template #cell(accountNumber)="row">
            <span
              size="md"
              style="cursor: pointer"
              @click="getvalue(row.value)"
            >
              {{ row.value }}
              <i class="fa fa-info-circle"></i>
            </span>
          </template>
        </b-table>
      </div>
      <div class="text-center mt-3 mr-5 ml-5" v-if="!loading">
        <b-pagination
          v-model="currentPage"
          :total-rows="items.length"
          :per-page="perPage"
          align="right"
          size="md"
          class="my-0"
        ></b-pagination>
      </div>
    </div>


    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 v-for="(i, key) in wallettrans[0]" :key="key">  {{key}} : {{i}}</h5> -->
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="dispute" v-if="loading2">
              <div class="text-center">
                <p>Please Wait.</p>
                <span :class="{ 'spinner-border': loading2 }"></span>
              </div>
            </div>

            <ul class="list-group list-group-flush" v-if="!loading2">
              <div style="width: 100%;overflow-x:scroll;">
                <b-table :items="wallettrans" show-empty class="table table-striped shadow"></b-table>
              </div>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// charts
// Components
import BaseHeader from "@/components/BaseHeader";

// Lists

// Tables

import { mapState, mapActions, mapGetters } from "vuex";
import { Datetime } from "vue-datetime";
import router from '../../router/router';

export default {
  name: "Wallet",
  components: {
    Datetime,
    BaseHeader,
  },
  data() {
    return {
      minDatetime: "1960-01-01",
      maxDatetime: "2022-12-12",
      startDate: "",
      endDate: "",

      light: "light",
      model: {
        startDate: "",
        endDate: "",
        searchItem: "",
        page: 1,
      },
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
      bitems: [],
      field: [
        { key: "accountId", label: "accountId" },
        { key: "accountCustomerId", label: "accountCustomerId" },
        { key: "accountNumber", label: "accountNumber" },
        { key: "accountName", label: "accountName" },
        {
          key: "accountCurrency",
          label: "accountCurrency",
        },
        { key: "accountBalance", label: "accountBalance" },
        { key: "accountStatus", label: "accountStatus" },
        { key: "accountLedgerBalance", label: "accountLedgerBalance" },
        { key: "accountPhone", label: "accountPhone" },
        { key: "accountEmail", label: "accountEmail" },
        { key: "accountBvn", label: "accountBvn" },
        // { key: "actions", label: "actions" },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      bigLineChart: {
        chartData: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              data: [
                86, 114, 106, 106, 107, 111, 133, 221, 783, 2478, 107, 111,
              ],
              label: "Card Transaction",
              borderColor: "#3e95cd",
              fill: true,
            },
            {
              data: [
                282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267, 107, 111,
              ],
              label: "NIP",
              borderColor: "#8e5ea2",
              fill: true,
            },
            {
              data: [
                168, 170, 178, 190, 203, 276, 408, 547, 675, 734, 107, 111,
              ],
              label: "Intra BAnk",
              borderColor: "#3cba9f",
              fill: true,
            },
          ],
        },
        //extraOptions: chartConfigs.blueChartOptions,
      },
    };
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    changeDate(event) {
      //this.showDate = (this.form1.category==='')?true:false;
      // console.log(`##########${this.form1.category}`);
      console.log(`##########>>>${event}`);
    },
    logthis() {
      console.log("logged");
    },
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
        // model.endDate = new Date(new Date().setDate(today.getDate() + 1))
        //   .toJSON()
        //   .slice(0, 10);
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
        // console.log("thisweek::", model.startDate, model.endDate);
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
        this.model.startDate = this.minDatetime;
        this.model.endDate = this.maxDatetime;
      }
      return model;
    },

    getData() {
      let payload = {
        startDate: "2022-04-01",
        endDate: "2022-04-28",
        searchItem: "",
        page: 1,
      };
      this.$store.dispatch("readWallet", payload);
    },

    getvalue(accountnumber) {
      let payload = {
        accountNumber: accountnumber,
        page: 1,
      };
      this.$store.dispatch("readWalletTrans", payload).then(()=>{
        this.$router.push("/all-transactions")
      });
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
      loading: (state) => state.walletransactions.loading,
      error: (state) => state.walletransactions.errors,
      success: (state) => state.walletransactions.success,
      wallet: (state) => state.walletransactions.allwallet,
      retrievewallet: (state) => state.walletransactions.walletretrieve,
      loading2: (state) => state.walletransactions.retrieveloading,
      wallettrans: (state) => state.walletransactions.wallettrans,
    }),

    myStyles() {
      return { height: "150px" };
    },

    checkcustome: function () {
      return this.endDate, this.startDate;
    },
    checktype: function () {
      return this.model.endDate, this.model.startDate;
    },
  },
  mounted() {
    console.log(this.wallet);
    this.getData();
  },

  watch: {
    checkcustome() {
      if (this.endDate !== null) {
        let payload = {
          startDate: this.startDate.slice(0, 10),
          endDate: this.endDate.slice(0, 10),
          searchItem: "",
          page: 1,
        };
        this.$store.dispatch("readWallet", payload);
      }
    },
    checktype() {
      if (this.model) {
        this.$store.dispatch("readWallet", this.model);
      }
    },

    // success(newValue) {
    //   if (newValue) {
    //     this.$toast.success(newValue);
    //   }
    // },
  },
};
</script>
<style scoped>
.form-body {
  height: 100%;
}

.card-side {
  margin-bottom: 30px;
  -webkit-box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
  height: 100%;
  border: 0;
}
.card-side {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
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

.dispute-table {
  margin-left: 10px;
  margin-top: 0;
  margin-right: 10px;
  width: 98%;
  overflow-x: scroll;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.dispute {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
}

.date-container {
  display: inline;
  text-align: left;
  padding: 0px 0px !important;
}
.date-flex {
  flex: 50%;
  margin-right: 2px;
}
@media (max-width: 500px) {
  .date-flex {
    flex: 100%;
  }
}

/*input[type="text"] {
   display: flex;
   flex-wrap: wrap;
}*/
.table-section {
  display: block;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 40px;
  height: 99%;
  /*max-width: 100%;*/
}
.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}
.text-lg {
  font-size: 18px;
}
.text-md {
  font-size: 14px;
}
.text-sm {
  font-size: 10px;
}
.bg-light {
  border-color: #525f7f;
}
.bg-border {
  border-bottom: 1px solid #dee5e7;
}
.view-header {
  position: relative;
  padding: 15px 30px;
  /*background-color: #fff;*/
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  height: 70px;
  clear: both;
}
/* Solid border */
hr.solid {
  border-top: 3px solid #bbb;
}

.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
  font-weight: 600;
  color: white;
}
.top-right {
  position: absolute;
  top: 25%;
  right: 16px;
  font-weight: 600;
  color: white;
}
.avatar-title {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #556ee6;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-weight: 500;
  height: 100px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100px;
}
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

