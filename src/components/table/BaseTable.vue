<template>
  <div :style="$router.currentRoute.fullPath === '/reports/transactions' ? {maxHeight:'100vh'}: null">
  <b-container fluid style="color: #FFFFFF">
    <create-virtual-account @closeAccountForm="updateAccountForm" :walletAccountNumber="walletAccNum" :showAccountForm="show"></create-virtual-account>

    <b-row> </b-row>
    <br />
    <div class="skeleton skeleton-text__body" v-if="isLoading"></div>
    <!-- Main table element -->
    <b-table
      v-else
      responsive
      small
      show-empty
      stacked="md"
      :style="$router.currentRoute.fullPath === '/reports/transactions' ?
      {fontSize: 12, height: 'auto'}:{fontSize: 12}"
      striped
      :busy="loading || loading3 || loading4"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :tbody-tr-class="rowClass"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2" style="display: flex; justify-content: center">
          <lottie-player src="https://assets5.lottiefiles.com/private_files/lf30_4svt0lb2.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"  loop  autoplay></lottie-player>
        </div>
      </template>
      <!-- cell coloring -->
      <template v-slot:cell(drCr)="row">
       <h5 :style="row.item.drCr === 'DR' ? {color: 'red'} : {color: 'green'}"> {{row.item.drCr}}</h5>
      </template>

      <template v-slot:cell(trnDrCr)="row">
       <h5 :style="row.item.trnDrCr === 'DR' ? {color: 'red'} : {color: 'green'}"> {{row.item.trnDrCr}}</h5>
      </template>

      <template v-slot:cell(payoutStatus)="row">
       <h5 :style="row.item.payoutStatus === 'FAILED' ? {color: 'red'} : {color: 'green'}"> {{row.item.payoutStatus}}</h5>
      </template>


      <!-- TODO AMOUNT FORMATTING -->
      <template v-slot:cell(amount)="row">
        {{ row.item.amount | formatAmount }}
      </template>

      <template v-slot:cell(trnAmount)="row">
        {{ row.item.trnAmount | formatAmount }}
      </template>
      <template v-slot:cell(accountBalance)="row">
        {{ row.item.accountBalance | formatAmount }}
      </template>
      <template v-slot:cell(accountLedgerBalance)="row">
        {{ row.item.accountLedgerBalance | formatAmount }}
      </template>
      <template v-slot:cell(disputeAmount)="row">
        {{ row.item.disputeAmount | formatAmount }}
      </template>
      <template v-slot:cell(payoutAmount)="row">
        {{ row.item.payoutAmount | formatAmount }}
      </template>

      <!-- / -->
      <!-- TODO DATE FORMATTING -->
      <template v-slot:cell(createdat)="row">
        {{ row.item.createdat | moment("DD-MMM-YYYY") }}
      </template>
      <!-- / -->

      <!-- TODO TEXT ELLIPSIS FORMATTING -->
      <template :title="row.item.contractDebitAccountName" v-slot:cell(contractDebitAccountName)="row">
        {{ row.item.contractDebitAccountName | formatTextWithEllipsis }}
      </template>
      <template v-slot:cell(disputeComment)="row">
        {{ row.item.disputeComment | formatTextWithEllipsis }}
      </template>
      <template v-slot:cell(disputeSessionId)="row">
        {{ row.item.disputeSessionId | formatTextWithEllipsis }}
      </template>
      <template v-slot:cell(counterPartyAccountName)="row">
        {{ row.item.counterPartyAccountName | formatTextWithEllipsis }}
      </template>
      <template v-slot:cell(narration)="row">
        {{ row.item.narration | formatTextWithEllipsis }}
      </template>
      <!-- / -->
      <template v-slot:cell(serial)="row">
        {{ row.index + 1 }}
      </template>

      <!-- actions -->
      <template v-slot:cell(action)="row">
        <b-icon-eye-slash
          style="cursor: pointer; width: 25px; height: 15px"
          v-if="row.detailsShowing"
          href="#"
          @click="row.toggleDetails"
        />
        <b-icon-eye
          style="cursor: pointer; width: 25px; height: 15px"
          v-else
          href="#"
          @click="row.toggleDetails"
        />
      </template>
      <template v-slot:cell(TransactionAction)="row">
        <b-icon-eye-slash
          style="cursor: pointer; width: 25px; height: 15px"
          v-if="row.detailsShowing"
          href="#"
          @click="row.toggleDetails"
        />
        <b-icon-eye
          style="cursor: pointer; width: 25px; height: 15px"
          v-else
          href="#"
          @click="row.toggleDetails"
        />
      </template>
      <template v-slot:cell(disputeActions)="row">
        <b-icon-folder2-open v-if="row.disputeStatus == 'CLOSED'" />
        <b-icon-folder2 v-if="row.disputeStatus == 'OPEN'" />
        <b-icon-eye-slash
          style="cursor: pointer; width: 25px; height: 15px"
          v-if="row.detailsShowing"
          href="#"
          @click="row.toggleDetails"
        />
        <b-icon-eye
          style="cursor: pointer; width: 25px; height: 15px"
          v-else
          href="#"
          @click="row.toggleDetails"
        />
      </template>
      <template v-slot:cell(virtualAccountactions)="row">
        <b-icon-file
          style="cursor: pointer; width: 25px; height: 15px"
          @click="getValueCallVAT(row.item.accountNumber)"
          title="view virtual account transactions"
        />
        <b-icon-eye-slash
          style="cursor: pointer; width: 25px; height: 15px"
          v-if="row.detailsShowing"
          href="#"
          @click="row.toggleDetails"
        />
        <b-icon-eye
          style="cursor: pointer; width: 25px; height: 15px"
          v-else
          href="#"
          @click="row.toggleDetails"
        />
      </template>
      <template v-slot:cell(CustomerAction)="row">
        <b-icon-pencil-square
          style="cursor: pointer; width: 25px; height: 15px"
          @click="getUserInfo(row.item)"
          title="Edit User"
        />
<!--        <b-icon-eye-slash-->
<!--          style="cursor: pointer; width: 25px; height: 15px"-->
<!--          v-if="row.detailsShowing"-->
<!--          href="#"-->
<!--          @click="row.toggleDetails"-->
<!--        />-->
<!--        <b-icon-eye-->
<!--          style="cursor: pointer; width: 25px; height: 15px"-->
<!--          v-else-->
<!--          href="#"-->
<!--          @click="row.toggleDetails"-->
<!--        />-->
      </template>

      <template v-slot:cell(kycResponse)="row">
        <div>{{ JSON.parse(Object(row).item.kycResponse).firstName}} {{ JSON.parse(Object(row).item.kycResponse).middleName}} {{ JSON.parse(Object(row).item.kycResponse).lastName}}</div>
      </template>
      <template v-slot:cell(kycAction)="row">
          <b-icon-info-circle-fill style="font-size: 18px;cursor: pointer" @click="readKyc(obj=JSON.parse(Object(row).item.kycResponse), kycType=row.item.kycType)"/>
      </template>

      <template #cell(walletAction)="row">
        <h3 v-if="loading">Loading</h3>
        <b-icon-plus-circle @click="show = true, getValueForVA(row.item.accountNumber)" title="Create Virtual Account"  style="cursor: pointer; width: 25px; height: 15px"></b-icon-plus-circle>
        <b-icon-file
          style="cursor: pointer; width: 25px; height: 15px"
          @click="getValue(row.item.accountNumber)"
          title="View Wallet Transactions"
        />
        <b-icon-eye-slash
          style="cursor: pointer; width: 25px; height: 15px"
          v-if="row.detailsShowing"
          href="#"
          @click="row.toggleDetails"
        />
        <b-icon-eye
          style="cursor: pointer; width: 25px; height: 15px"
          v-else
          href="#"
          @click="row.toggleDetails"
        />
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              <strong>{{ key }}</strong
              >: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-row  v-show="$router.currentRoute.fullPath !== '/dashboard/get-started'">
      <b-col md="6" class="my-1 ml-0">
        <b-form-group
          :label="showTitle ? 'perPage' : 'Page'"
          label-cols-sm="6"
          label-cols-md="5"
          label-cols-lg="4"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="$router.currentRoute.fullPath === '/settings/settings' ? userManagementPageOptions : pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="">
        <div style="display: flex">
          <b-pagination
          v-model="currentPage"
          :total-rows="items == null ? 0 : items.length"
          :per-page="perPage"
          pills
          :style="{color:primaryColor}"
        >
        </b-pagination>
          <div v-if="$router.currentRoute.fullPath === '/reports/transactions'">
            <button :disabled="loading2" title="request more transactions" style="background-color:#FFFF;color:black;border: none;width:35px;height:35px"  @click="requestNewTransactions"> <img :class="{'loadMore':loading2}" src="../../assets/Refresh.svg"/> </button>
          </div>
          <div v-if="$router.currentRoute.fullPath === '/wallet'">
            <button :disabled="loading2" title="load more wallets" style="background-color:#FFFF;color:black;border: none;width:35px;height:35px"  @click="requestWallets"> <img :class="{'loadMore':loading2}" src="../../assets/Refresh.svg"/> </button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import WalletRequest from "../../model/request/WalletRequest";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";
import CreateVirtualAccount from "../../components/form/CreateVirtualAccount";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BIZ from "@/assets/BIZ.gif"
import Toast from "../../../toastNotification";
import router from "../../router";

export default {
  props: [
    "items",
    "fields",
    "subfields",
    "isBusy",
    "showTitle",
    "type",
    "showMetrics",
    "filterMode",
    "accounts",
  ],
  components: {
    CreateVirtualAccount
  },
  data() {
    return {
      show: false,
      primaryColor:window.__env.app.primaryColor,
      loaderImage:BIZ,
      allTransactionsModel: WalletRequest.readAllWalletTransaction,
      walletTransactionmodel: WalletRequest.readWalletTransaction,
      virtualAccountTransactionmodel:
        VirtualAccountRequest.readVirtualAccountTransactions,
      dateFormat: "D MMM",
      totalRows: 1,
      currentPage: 1,
      perPage: this.$router.currentRoute.path === '/dashboard/get-started' ? 10 : this.$router.currentRoute.fullPath === '/settings/settings' ? 2 : 50,
      userManagementPerPage:2,
      pageOptions: [5, 10, 50, 100, 500],
      userManagementPageOptions:[2,5],
      sortBy: "",
      row: {},
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      walletAccNum:"",
      count: 1
    };
  },
  computed: {
    ...mapGetters("account", ["accoptions", "accSelectOptionsWithDefault"]),
    ...mapState({
      loading: (state) => state.walletTransactions.loading,
      loading2:(state) => state.walletTransactions.retrieveLoading,
      loading3:(state) => state.virtualAccount.loading,
      loading4:(state) => state.kycVerification.loading,
      isLoading:state => state.auth.loginLoading
    }),
  },
  mounted() {},
  methods: {
    readKyc(obj,kycType){
        StoreUtils.commit(StoreUtils.mutations.kycVerification.UpdateKycResponse, obj)
        StoreUtils.commit(StoreUtils.mutations.kycVerification.UpdateKycType, kycType)
        router.push({name:"MakeRequestView"})
    },
    getUserInfo(obj){
      StoreUtils.commit(StoreUtils.mutations.auth.updateUserEditForm, true)
      StoreUtils.commit(StoreUtils.mutations.auth.updateSingleOrganisationUser, obj)
      console.log(obj)
    },

    requestNewTransactions(){
      this.count++
      this.allTransactionsModel.page = this.count
      StoreUtils.dispatch(
          StoreUtils.actions.walletTransactions.updateAllWalletTransactions,
          this.allWalletTransactions
      )
    },
    requestWallets(){
      this.count++
      this.walletTransactionmodel.page = this.count
      StoreUtils.dispatch(
          StoreUtils.actions.walletTransactions.updateReadAllWallets,
          this.walletTransactionmodel
      )
    },
    updateAccountForm(value) {
      this.show = value;
    },
    getValueForVA(payload) {
      this.walletAccNum = payload
      navigator.clipboard.writeText(payload).then(() => {
        Toast.fire({ text: "Account number copied to clipboard", icon: "success" }).then(
            () => {}
        );
      });
    },
    getValue(payload) {
      this.walletTransactionmodel.accountNumber = payload;
      this.$router
        .replace(`/wallet/all-transactions?account-number=${payload}`)
        .then(() => {
          StoreUtils.dispatch(
            StoreUtils.actions.walletTransactions.updateWalletTransactions,
            this.walletTransactionmodel
          );
        });
    },
    getValueCallVAT(acct) {
      this.virtualAccountTransactionmodel.accountNumber = acct;
      this.$router.replace(`/account/virtual-acccount/transactions`).then(() => {
        StoreUtils.dispatch(
          StoreUtils.actions.virtualAccount.updateVirtualaccountTransactions,
          this.virtualAccountTransactionmodel
        );
      });
    },
    billsNavigate(_id, _type) {
      if (_type === "billers") {
        localStorage._category = _id;
        this.$router.push("/payments/billers");
      } else if (_type === "products") {
        localStorage._biller = _id;
        this.$router.push("/payments/biller-products");
      } else if (_type === "buyProduct") {
        localStorage._product = _id;
        this.showBill = !this.showBill;
      }
    },
    onFiltered(data) {
      if (this.filterMode === "accountActivities")
        this.$store.commit("account/updateAccountActivitiesFiltered", data);
      else if (this.filterMode === "balances")
        this.$store.commit("account/updateAccountsFiltered", data);
      else if (this.filterMode === "statements")
        this.$store.commit("account/updateAccountStatementsFiltered", data);
      //console.log(data)
    },
    navigate(_id) {
      localStorage.suOfficerID = _id;
      this.$router.push("/onboarding/officer-details");
    },
    showModal(_id, _type, _row = {}) {
      if (_type === "invoice") {
        this.showInvoice = !this.showInvoice;
      }
    },
    disabled(_status, _canMutate = true) {
      let rtn = false;
      if (_status == null) return rtn;
      return _status.toLowerCase() === "deleted";
    },
    async updateStatus(_id, _status, _mode, _row = {}) {
      let status = "";
      if (_status.toLowerCase().includes("approve")) status = "approve";
      if (_status.toLowerCase().includes("post")) status = "approve";
      if (_status.toLowerCase().includes("decline")) status = "decline";
      if (_status.toLowerCase().includes("delete")) status = "delete";
      if (_status.toLowerCase().includes("stop")) status = "stop";
      if (_status.includes("sprole")) status = "assign sole authorizer";
      let errorMessage = "";
      let isInput = "none";
      if (
        (_mode === "db" && _status.toLowerCase().includes("approved")) ||
        (_mode === "si" && _status.toLowerCase().includes("approved")) ||
        (_mode === "invoice" && _status.toLowerCase().includes("approved")) ||
        (_mode === "sweep" && _status.toLowerCase().includes("approved")) ||
        (_mode === "bills" && _status.toLowerCase().includes("approved"))
      )
        isInput = "block";
      let option = {};
      if (isInput === "none")
        option.text = `Are you sure you want to perform this action(${status})?`;
      else
        option.html = `<input id="swal-input1" type="password" style="display: ${isInput}" placeholder="Please enter your token to ${status}" class="swal2-input">`;
      option.showCancelButton = true;
      option.confirmButtonText = "Confirm";
      option.showLoaderOnConfirm = true;
      option.preConfirm = () => {
        let payload = {
          approverid: this.system.userInfo.id,
          contractChecker: this.system.userInfo.id,
          beneficiaryid: _id,
          queueId: _id,
          orgId: localStorage.orgID,
          status: _status,
          password: "",
          LimitType: "",
          contractType: "",
          contractId: _id,
          contractStatus: _status,
          requestType: "updateStatus",
          contractCreditAccountNumber: _row.contractCreditAccountNumber,
          contractDebitAccountNumber: _row.contractDebitAccountNumber,
        };
        if (isInput !== "none")
          payload.password = document.getElementById("swal-input1").value;
        let endpoint = "beneficiary/approveBeneficiary";
        if (_mode === "db") {
          payload.contractType = "DD";
          endpoint = "directDebit/approveContract";
        }
        console.log(endpoint, payload);
        return this.$store
          .dispatch(endpoint, payload)
          .then((response) => {
            let responseData = response.data;
            console.log(response.data);
            if (responseData.responseCode !== "00") {
              errorMessage = responseData.responseMessage;
              throw new Error(responseData.responseMessage);
            }
            return response;
          })
          .catch((error) => {
            console.log(error);
            Swal.showValidationMessage(`Request failed: ${errorMessage}`);
          });
      };
      option.allowOutsideClick = () => !Swal.isLoading();
      this.$swal(option).then((result) => {
        console.log(result.value);
        if (result.value.data.responseCode === "00") {
          let payload = {
            orgID: localStorage.orgID,
            orgId: localStorage.orgID,
            contractOrgId: localStorage.orgID,
            module: "",
            requestType: "read",
            contractType: "",
          };
          let endpoint = "beneficiary/updateBeneficiaries";
          if (_mode === "db") {
            if (this.filterMode === "cdd")
              endpoint = "directDebit/updateDirectDebits";
            else endpoint = "directDebit/updateDebitDirectDebits";
            payload.contractType = "DD";
          } else if (_mode === "si") {
            payload.module = "payment";
            payload.contractType = "SI";
            endpoint = "standingInstruction/updateStandingInstructions";
          } else if (_mode === "invoice") {
            // payload = {approverid:this.system.userInfo.id, standinginstructionid:_id, status:_status}
            endpoint = "invoice/updateOrgInvoices";
            this.$store.dispatch(
              "invoice/updateCounterpartyInvoices",
              payload,
              { root: false }
            );
          } else if (_mode === "sweep") {
            payload.module = "account";
            payload.contractType = "SWEEP";
            // payload = {approverid:this.system.userInfo.id, standinginstructionid:_id, status:_status}
            endpoint = "account/updateSweeps";
          } else if (_mode === "accountSetting") {
            payload.orgid = localStorage.orgID;
            endpoint = "account/updateCheckersQueue";
          } else if (_mode === "orgSetting") {
            payload.orgid = localStorage.orgID;
            if (_row.orgAuthCount == null)
              endpoint = "company/updateCheckersLimitsQueue";
            else endpoint = "company/updateCheckersQueueLevel";
          } else if (_mode === "bills") {
            payload.orgid = localStorage.orgID;
            endpoint = "billsPayment/updateBillsQueue";
          } else if (_mode === "rights") {
            payload.orgId = localStorage.orgID;
            endpoint = "account/updateRightsQueue";
          } else if (_mode === "cif") {
            payload = {};
            payload.orgId = localStorage.orgID;
            payload.orgIdToApprove = _row.orgId;
            endpoint = "company/updateCifQueue";
          }
          console.log(endpoint);
          this.$store.dispatch(endpoint, payload, { root: false });
          this.$swal("Success", result.value.data.responseMessage, "success");
        }
      });
    },
    rowClass(item, type) {
      if (!item || type !== "row") return "";
      if (item.drCr != null || item.trDrCr != null)
        if (item.drCr === "dR") return "table-danger";
        else if (item.drCr === "cR" || item.trDrCr != null) return "table-success";
        else return "";
    },
  },
};
</script>
<style scoped>

@keyframes rotate {
  100%{transform: rotate(360deg)}
}

.skeleton-text__body {
  width: 100%;
  height: 20rem;
  margin-bottom: 0.5rem;

}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.loadMore{
  animation:rotate infinite linear .9s;
  /*transition: .9s ease forward;*/
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
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
</style>
