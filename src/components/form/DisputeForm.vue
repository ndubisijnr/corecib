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
              >
                <option value="Credit" selected>Credit</option>
                <option value="Debit">Debit</option>
              </select>
              <label>disputeIssueType</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="disputeSessionId"
                disabled
                required
              />
              <label>disputeTrnType</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="disputeSessionId"
                value="Transaction"
                disabled
              />
              <label>disputeRemark</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                type="text"
                class="form-control"
                placeholder="disputeSessionId"
                required
              />
              <label>disputeComment</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="disputeSessionId"
                :value="orgnasationId"
                required
                disabled
              />
              <label>disputeOrgId</label>
            </div>
          </template>
          <b-button
            type="button"
            v-if="status == false"
            @click="transactionsQuery()"
          >
            <span v-if="!loading2">Proceed</span>
            <span :class="{ 'spinner-border': loading2 }"></span
          ></b-button>
          <b-button type="submit" v-if="status == true" @click="logDispute()"
            ><span v-if="!loading2">Proceed</span>
            <span :class="{ 'spinner-border': loading2 }"></span
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
    };
  },

  methods: {
    closeModal() {
      this.showModal = false;
      this.$emit("closeCreateDispute", false);
      this.showModal = true;
    },

    logDispute() {
      StoreUtils.dispatch(StoreUtils.actions.dispute.createDispute,this.createDisputemodel)
    },

    transactionsQuery() {
      StoreUtils.dispatch(
        StoreUtils.actions.dispute.updateTransactionQuery,
        this.transactionsQuerymodel
      ).then(() => {
        this.status = true;
      });
    },
  },

  computed: {
    ...mapState({
      loading2: (state) => state.dispute.loading2,
      orgnasationId: () => {
        return localStorage.organisationId;
      },
      transactionquery: (state) => state.dispute.transactionsquery,
      success:state => state.dispute.success
    }),
  },

  watch:{
    success(value){
      if(value){
        this.closeModal()
      }
    }
    
  }
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
