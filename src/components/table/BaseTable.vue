<template>
  <b-container fluid>
    <b-row> </b-row>
    <br />
    <!-- Main table element -->
    <b-table
      responsive
      small
      show-empty
      stacked="md"
      style="font-size: 12px"
      striped
      :items="items"
      :busy="isBusy"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :tbody-tr-class="rowClass"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading ...</strong>
        </div>
      </template>
      <!-- TODO AMOUNT FORMATTING -->
      <template v-slot:cell(bookBalance)="row">
        {{ row.item.amount | formatAmount }}
      </template>
      <!-- / -->
      <!-- TODO DATE FORMATTING -->
      <template v-slot:cell(createdat)="row">
        {{ row.item.createdat | moment("DD-MMM-YYYY") }}
      </template>
      <!-- / -->
      <!-- TODO TEXT ELLIPSIS FORMATTING -->
      <template
        :title="row.item.contractDebitAccountName"
        v-slot:cell(contractDebitAccountName)="row"
      >
        {{ row.item.contractDebitAccountName | formatTextWithEllipsis }}
      </template>
      <!-- / -->
      <template v-slot:cell(serial)="row">
        {{ row.index + 1 }}
      </template>
      <template v-slot:cell(action)="row">
        <b-icon-eye-slash style="cursor: pointer; width: 25px; height: 15px;" v-if="row.detailsShowing" href="#" @click="row.toggleDetails" />
        <b-icon-eye style="cursor: pointer; width: 25px; height: 15px;" v-else href="#" @click="row.toggleDetails" />
      </template>
      <template v-slot:cell(TransactionAction)="row">
        <b-icon-eye-slash style="cursor: pointer; width: 25px; height: 15px;" v-if="row.detailsShowing" href="#" @click="row.toggleDetails" />
        <b-icon-eye style="cursor: pointer; width: 25px; height: 15px;" v-else href="#" @click="row.toggleDetails" />
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
        <b-icon-file style="cursor: pointer; width: 25px; height: 15px" @click="getValueCallVAT(row.item.accountNumber)" />
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

      <template #cell(walletAction)="row">
        <h3 v-if="loading">Loading</h3>
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
    <b-row>
      <b-col md="3" class="my-1 ml-0">
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
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="4"></b-col>
      <b-col sm="5" md="4" class="my-1 mr-0 mx-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="items == null ? 0 : items.length"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Swal from "sweetalert2";
import WalletRequest from "../../model/request/WalletRequest";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest"
import StoreUtils from "../../util/baseUtils/StoreUtils";
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
  components: {},
  data() {
    return {
      show: false,
      walletTransactionmodel: WalletRequest.readWalletTransaction,
      virtualAccountTransactionmodel: VirtualAccountRequest.readVirtualAccountTransactions,
      dateFormat: "D MMM",
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
      pageOptions: [50, 100],
      sortBy: '',
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
    };
  },
  computed: {
    ...mapGetters("account", ["accoptions", "accSelectOptionsWithDefault"]),
    ...mapState({
      loading: (state) => state.walletTransactions.loading,
    }),
  },
  mounted() {},
  methods: {
    getValue(payload) {
      console.log(payload);
      this.$router.replace("/user/all-transactions");
      this.walletTransactionmodel.accountNumber = payload;
      StoreUtils.dispatch(
        StoreUtils.actions.walletTransactions.updateWalletTransactions,
        this.walletTransactionmodel
      )
    },
    getValueCallVAT(payload) {
      console.log(payload);
      this.$router.replace(`/user/virtual-acccount/transactions`);
      this.virtualAccountTransactionmodel.accountNumber = payload;
      StoreUtils.dispatch(
        StoreUtils.actions.virtualAccount.updateVirtualaccountTransactions,
        this.virtualAccountTransactionmodel
      )
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
    onFiltered(data){
      if (this.filterMode === 'accountActivities')
        this.$store.commit('account/updateAccountActivitiesFiltered', data);
      else if (this.filterMode === 'balances')
        this.$store.commit('account/updateAccountsFiltered', data);
      else if (this.filterMode === 'statements')
        this.$store.commit('account/updateAccountStatementsFiltered', data);
      //console.log(data)
    },
    navigate(_id){
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
      if (!item || type !== 'row') return '';
      if (item.drCr != null)
        if (item.drCr === 'DRr') return 'table-danger';
        else if(item.drCr === 'CRr') return 'table-success';
        else return '';
    },
  },
};
</script>
