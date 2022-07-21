<template>
  <div>

      <div class="container export-btn-area">
        <search-form :module="searchALL_TRANSACTION"></search-form>
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
.export-btn-area{
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
  gap: 10px;
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
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

@media (max-width: 500px) {
  .export-btn-area{
    flex-direction: column;
  }
}

.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}

</style>

