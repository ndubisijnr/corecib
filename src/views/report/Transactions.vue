<template>
  <div>

    <search-form v-if="withSearch != 'YES' " :module="searchALL_TRANSACTION" class="m-2"></search-form>

      <div class="export-btn-area">
        <b-button class="export-ex shadow-lg--hover small" @click="download">Download Transactions</b-button>
      </div>
      <export-excel style="display: none" id="export" name="bizgemTransactions-excel" :data="allTransactions.data"></export-excel>

    <base-table
          :items="JSON.parse(JSON.stringify(allTransactions.data))"
          :fields="fields"
          filter-mode="default"
          :is-busy="loading" />
  </div>
</template>
<script>

import { mapState } from "vuex";
import WalletRequest from "../../model/request/WalletRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BaseTable from "../../components/table/BaseTable";
import SearchForm from "../../components/form/SearchForm";
import SearchModuleutil from "../../util/constant/SearchModuleutil"
import Toast from "../../../toastNotification";



export default {
  name: "AllTransaction",
  props:["withSearch"],
  components: {
    SearchForm,
    BaseTable
  },
  data() {
    return {
      allTransactionsModel: WalletRequest.readAllWalletTransaction,
      searchALL_TRANSACTION: SearchModuleutil.ALL_TRANSACTION,
      light: "light",
      type: "",
      items: [],
      fields: [
        { key: "drCr", label: "drCr" },
        { key: "amount", label: "amount" },
        { key: "accountNumber", label: "accountNumber" },
        { key: "counterPartyAccountNumber", label: "C. AccountNumber"},
        { key: "counterPartyAccountName", label: "C. AccountName" },
        //{ key: "counterPartyBankCode", label: "counterPartyBankCode" },
        { key: "eventDate", label: "eventDate" },
        { key: "narration", label: "narration" },
        { key: "TransactionAction", label: "actions" },
      ],
    };
  },
  methods: {
    download(){
      if(this.allTransactions.data.length <= 0){
        Toast.fire({text:"No data to download", icon:"error"})
        console.log('empty')
      }else{
        document.getElementById('export').click()
      }
    }

  },

  computed: {
    appendAppostropytoExcelData(){

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
      allTransactions: (state) => state.walletTransactions.allWalletTransactions,
      loading: (state) => state.walletTransactions.loading,
    }),

    myStyles() {
      return { height: "150px" };
    },
  },
  mounted() {
    StoreUtils.dispatch(
      StoreUtils.actions.walletTransactions.updateAllWalletTransactions,
      this.allWalletTransactions
    );
  },
};
</script>
<style scoped>
.form-body {
  height: 100%;
}
.export-btn-area{
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 30px;
}
.export-ex{
  background-color:#3F88C5;
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

