<template>
  <div class="">
    <div class="export-btn-area" v-if="withSearch === 'YES'">
      <search-form :module="searchALL_TRANSACTION"></search-form>
      <b-button class="export-ex shadow-lg--hover small desktop" @click="download">Download Transactions</b-button>
      <b-icon-download  class="mobile" @click="download" />
    </div>
    <export-excel style="display: none" id="export" name="bizgemTransactions-excel" :data="[transactions]"></export-excel>
    <base-table
        :items="JSON.parse(JSON.stringify(transactions))"
        :fields="fields"
        filter-mode="default"
        :is-busy="loading" />
  </div>
</template>

<script>
import SearchForm from "../../components/form/SearchForm";
import BaseTable from "../../components/table/BaseTable";
import WalletRequest from "../../model/request/WalletRequest";
import SearchModuleutil from "../../util/constant/SearchModuleutil";
import Toast from "../../../toastNotification";
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "Transactions",
  props:{
    withSearch:{
      default:"YES"
    },
  },
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
        { key: "trnDrCr", label: "drCr" },
        { key: "trnAmount", label: "amount",sortable: true },
        { key: "trnService", label: "Service" },
        { key: "trnDrAccountNumber", label: "trnDr AccountNumber"},
        { key: "trnDrAccountName", label: "trnDr. AccountName" },
        //{ key: "counterPartyBankCode", label: "counterPartyBankCode" },
        { key: "trnStatus", label: "Status" },
        { key: "trnCreatedAt", label: "CreatedAt" },
        { key: "TransactionAction", label: "actions" },
      ],
    };
  },
  methods: {
    download(){
      if(this.transactions.length <= 0){
        Toast.fire({text:"No data to download", icon:"error"})
      }else{
        document.getElementById('export').click()
      }
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
      userInformation: (state) => state.auth.userInfo,
      transactions: (state) => state.transactions.transactions,
      loading: (state) => state.transactions.loading,
    }),

    myStyles() {
      return { height: "150px" };
    },

    lll(){
      return this.allTransactions.data.map((item) => [item.transactionDate,item.amount])
    },

    jjj(){
      return this.lll.filter(date => {
        switch (date){}
      })
    }
  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.transactions.readTransactions)
  },
}
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
  position: sticky;
  /*background-color: #ffffff;*/

}
.cardd {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 10%);
  background-color: white;

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

@media (max-width: 500px) {
  .export-btn-area{
    flex-direction: row;
    justify-content: space-evenly;
    /*border: solid red;*/
  }
  .export-ex{
    background-color:#3F88C5;
    color:white;
    margin: 2px;
    width:200px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
  .desktop{
    display: none;
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

</style>
