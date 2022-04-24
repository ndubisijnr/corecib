   <template>
  <modal-1
    :show="showCreateDispute && showModal"
    body-classes="p-1"
    modal-classes="modal-dialog-centered modal-md"
  >
    <div>
      <div class="card-head">
        <div class="text-end">
          <button
            type="button"
            class="btn-close p-2 m-2"
            @click="closeModal()"
          ></button>
        </div>
        <div class=""></div>
      </div>
      <div class="card-body">
        <form role="form" @submit.prevent="logDispute()">
          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              placeholder="Session ID or Transaction Refrenence"
              required
              v-model="transactionsQuerymodel.reference"
            />
            <label>Session ID or Transaction Refrenence</label>
          </div>
          <template v-if="status == true">
            <div class="form-floating mb-3">
              <select
                class="form-select"
                aria-label="Default select example"
                required
                placeholder="Dispute Issue Type"
                v-model="createDisputemodel.disputeIssueType"
              >
                <option value="Credit" selected>Credit</option>
                <option value="Debit">Debit</option>
              </select>
              <label>Dispute Issue Type</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="Dispute Transaction Type"
                disabled
                v-model="createDisputemodel.disputeTrnType"
                required
              />
              <label>Dispute Transaction Type</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Dispute Remark"
                v-model="createDisputemodel.disputeRemark"
                disabled
              />
              <label>Dispute Remark</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                type="text"
                class="form-control"
                placeholder="Dispute Comment"
                required
                v-model="createDisputemodel.disputeComment"
              />
              <label>Dispute Comment</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="Organasation ID"
                v-model="createDisputemodel.disputeOrgId"
                required
                disabled
              />
              <label>Organasation ID</label>
            </div>
          </template>
          <b-button
            type="button"
            v-if="status == false"
            @click="transactionsQuery()"
          >
            <span v-if="!loading2">Proceed</span>
            <span :class="{ 'spinner-border': loading2 }" :disabled="loading2"></span
          ></b-button>
          <b-button type="submit" v-if="status == true" @click="logDispute()"
            ><span v-if="!loading2">Proceed</span>
            <span :class="{ 'spinner-border': loading2 }" :disabled="loading2"></span
          ></b-button>
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
      status: false,
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
      this.status = false
    },

    logDispute() {
      //set dispute session id from transaction reference
      this.createDisputemodel.disputeSessionId = this.transactionsQuerymodel.reference,
      //call create dispute action
        StoreUtils.dispatch(
          StoreUtils.actions.dispute.createDispute,
          this.createDisputemodel
        ).then(()=> {
          //clear create dispute form
          this.createDisputemodel={disputeComment: null,disputeSessionId: null},this.transactionsQuerymodel={}
          this.closeModal();
          this.status=false
        });
    },

    transactionsQuery() {
      //call create transaction query action
      StoreUtils.dispatch(
        StoreUtils.actions.dispute.updateTransactionQuery,
        this.transactionsQuerymodel
      ).then(() => {
        //update form to true to create dispute
        this.status = true;
      });
    },
  },

  computed: {
    ...mapState({
      loading2: (state) => state.dispute.loading2,
      //get's oraganisation ID from localstorage
      orgnasationId: () => {
        return localStorage.organisationId;
      },
      transactionquery: (state) => state.dispute.transactionsquery,
      success: (state) => state.dispute.success,
    }),
  },

  watch: {
    success(newvalue) {
      //watch for change to close modal form and update dispute table 
      if (newvalue) {
        this.disputeReadModel.disputeId = localStorage.getItem("organisationId");
        StoreUtils.dispatch(
          StoreUtils.actions.dispute.updateDisputes,
          this.disputeReadModel
        );
      }
    },
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
