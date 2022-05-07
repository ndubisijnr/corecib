   <template>
  <modal-1 :show="showCreateDispute && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="text-end">
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()"></button>
        </div>
        <div class=""></div>
      </div>
      <div class="card-body">
        <form role="form" @submit.prevent="transactionsQuery()" v-if="status == 'false'">
          <div class="form-floating mb-3">
            <input type="tel" class="form-control" placeholder="Session ID or Transaction Refrenence" required
              v-model="transactionsQuerymodel.reference" />
            <label>Session ID or Transaction Refrenence</label>
          </div>
          <b-button type="submit" v-if="status == 'false'"
            style="background-color:var(--primary);border:none;color:white;">
            <span v-if="!loading2">Proceed</span>
            <span :class="{ 'spinner-border': loading2 }" :disabled="loading2"></span>
          </b-button>

        </form>

        <form role="form" @submit.prevent="logDispute()" v-else>
          <div class="form-floating mb-3">
            <input type="tel" class="form-control" placeholder="Payment Refrenence" required
              v-model="transactionquery.paymentReference" disabled />
            <label>Payment Refrenence</label>
          </div>
          <div class="form-floating mb-3">
            <select class="form-select" aria-label="Default select example" required
              v-model="createDisputemodel.disputeIssueType">
              <option value="Credit" selected>Credit</option>
              <option value="Debit">Debit</option>
            </select>
            <label>Dispute Issue Type</label>
          </div>
          <div class="row">
            <div class="col col-6 mb-3">
              <label>Dispute Transaction Type</label>
              <input type="tel" class="form-control" placeholder="Dispute Transaction Type" disabled
                :value="transactionquery.transactionType == null ? 'NA' : transactionquery.transactionType" required />
            </div>

            <div class="col col-6 mb-3">
              <label>Dispute Remark</label>
              <input type="text" class="form-control" placeholder="Dispute Remark" value="Transaction" disabled />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label>Debit Account Name</label>
              <input type="text" class="form-control" placeholder="Debit Account Name"
                :value="transactionquery.debitAccountName" required disabled />
            </div>
            <div class="col">
              <label>Debit Account Number</label>
              <input type="number" class="form-control" placeholder="Organasation ID"
                :value="transactionquery.debitAccountNumber" required disabled />
            </div>

          </div>

          <div class="row mb-3">
            <div class="col">
              <label>Credit Account Number</label>
              <input type="number" class="form-control" placeholder="Organasation ID"
                :value="transactionquery.creditAccountNumber" required disabled />
            </div>
            <div class="col">
              <label>narration</label>
              <input type="text" class="form-control" placeholder="narration" :value="transactionquery.narration"
                required disabled />
            </div>

          </div>
          <div class="row">
            <div class="col mb-3">
              <label>Bank Name</label>
              <input type="text" class="form-control" placeholder="Bank Name" required disabled
                v-model="transactionquery.bankName" />
            </div>
            <div class="col mb-3">
              <label>Amount</label>
              <input type="text" class="form-control" placeholder="Bank Name" required disabled
                v-model="transactionquery.amount" />
            </div>
          </div>
          <div class="form-floating mb-3">
            <textarea type="text" class="form-control h-25" placeholder="Dispute Comment" cols="5" required
              v-model="createDisputemodel.disputeComment" />
            <label>Dispute Comment</label>
          </div>

          <b-button type="submit" v-if="status != 'false'"
            style="background-color:var(--primary);border:none;color:white;"><span v-if="!loading2">Proceed</span>
            <span :class="{ 'spinner-border': loading2 }" :disabled="loading2"></span>
          </b-button>
        </form>
      </div>
    </div>
  </modal-1>
</template>

<script>
import { mapState } from "vuex";
import DisputeRequest from "../../model/request/DisputeRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "Dispute-Form",
  props: {
    showCreateDispute: Boolean,
  },
  data: () => {
    return {
      showModal: true,
      createDisputemodel: DisputeRequest.disputeCreate,
      transactionsQuerymodel: DisputeRequest.transactionStatusQuery,
      disputeReadModel: DisputeRequest.disputeRead
    };
  },

  methods: {
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeCreateDispute", false);
      this.showModal = true;
      StoreUtils.commit(StoreUtils.mutations.dispute.updateStatus, 'false')
    },

    logDispute() {
      //set dispute session id from transaction reference
      this.createDisputemodel.disputeOrgId = this.currentOrganisationId.organisationId
      this.createDisputemodel.disputeSessionId = this.transactionsQuerymodel.reference,
        this.createDisputemodel.disputeRemark = "Transaction",
        this.createDisputemodel.disputeTrnType = "NA",
        //call create dispute action
        StoreUtils.dispatch(
          StoreUtils.actions.dispute.createDispute,
          this.createDisputemodel
        ).then(() => {
          //clear create dispute form
          this.createDisputemodel.disputeComment = null,
            this.createDisputemodel.disputeSessionId = null,
            this.transactionsQuerymodel = {}
          this.closeModal();

        });
    },

    transactionsQuery() {
      //call create transaction query action
      StoreUtils.dispatch(
        StoreUtils.actions.dispute.updateTransactionQuery,
        this.transactionsQuerymodel
      )

    },
  },
  computed: {
    ...mapState({
      loading2: (state) => state.dispute.loading2,
      userinfo: (state) => state.auth.userInfo,
      //get's oraganisation ID from localstorage
      currentOrganisationId: () => { return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization) },
      transactionquery: (state) => state.dispute.transactionsquery,
      success: (state) => state.dispute.success,
      status: state => state.dispute.status
    }),
  },

  watch: {
    status(newvalue) {
      //watch for change to close modal form and update dispute table 
      if (newvalue == 'read') {
        this.disputeReadModel.disputeId = localStorage.organisationId;
        StoreUtils.dispatch(
          StoreUtils.actions.dispute.updateDisputes,
          this.disputeReadModel
        );
        this.closeModal()
      }

    }
  },

};
</script>

<style scoped>
.spinner-border {
  display: inline-block;
  vertical-align: text-bottom;
  border: 0.15em solid currentColor;
  border-right-color: transparent;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
