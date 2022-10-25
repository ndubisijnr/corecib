<template>
  <div>
    <div class="export-btn-area">
      <search-form :module="searchVirtualAccount"></search-form>
      <b-button @click="show = true" class="export-ex shadow-lg--hover small desktop">Create Virtual Account</b-button>
      <b-icon-plus-circle class="mobile" @click="show = true"  />
    </div>
    <base-table
        :items="accounts.data"
        filter-mode=""
        :fields="fields"
        :is-busy="loading" />

    <create-virtual-account @closeAccountForm="updateAccountForm"  :showAccountForm="show"></create-virtual-account>

  </div>
</template>
<script>
// charts
// Components
import BaseHeader from "@/components/BaseHeader";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BaseTable from "../../components/table/BaseTable"

// Lists

// Tables

import { mapState } from "vuex";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";
import SearchForm from "../../components/form/SearchForm";
import CreateVirtualAccount from "../../components/form/CreateVirtualAccount";
import SearchModuleutil from "../../util/constant/SearchModuleutil"

export default {
  name: "VirtualAccount",
  components: {
    SearchForm,
    BaseTable,
    CreateVirtualAccount
  },
  data() {
    return {
      minDatetime: "2022-04-28",
      maxDatetime: "2022-04-01",
      startDate: "",
      endDate: "",
      show: false,


      light: "light",
      virtualAccountModel: VirtualAccountRequest.readVirtualAccount,
      searchVirtualAccount: SearchModuleutil.VIRTUAL_ACCOUNT,
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
      fields: [
        { key: "accountId", label: "accountId" },
        { key: "accountNumber", label: "accountNumber" },
        { key: "accountName", label: "accountName" },
        {
          key: "channelBankCode",
          label: "channelBankCode",
        },
        { key: "channelBankName", label: "channelBankName" },
        { key: "accountParent", label: "accountParent" },
        { key: "accountStatus", label: "accountStatus" },
        { key: "virtualAccountactions", label: "actions" },
      ],
    };
  },
  methods: {
    updateAccountForm(value) {
      this.show = value;
    },

    updateEvent(value){
      this.show = value;
    }

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
      loading: (state) => state.virtualAccount.loading,
      accounts: (state) => state.virtualAccount.virtualAccount,
    }),

    myStyles() {
      return { height: "150px" };
    },
  },
  mounted() {},
};
</script>
<style scoped>
.mobile{
  display: none;
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

.export-ex{
  background-color:#3F88C5;
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

.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}

/* Solid border */
hr.solid {
  border-top: 3px solid #bbb;
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

