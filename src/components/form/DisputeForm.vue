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
        <div class="">
          <h6 class="mb-0 text-start">Enter Dispute Session ID</h6>
        </div>
      </div>
      <div class="card-body">
        <form role="form" @submit.prevent="handleSubmit(logDispute())">
          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              placeholder="disputeSessionId"
              required
            />
            <label>disputeSessionId</label>
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
                required
                disabled
              />
              <label>disputeOrgId</label>
            </div>
          </template>
          <button type="submit" class="btn btn-success">proceed</button>
          <button type="submit" class="btn btn-success" v-if="status == true">
            Proceed
          </button>
        </form>
      </div>
    </div>
  </modal-1>
</template>

<script>
import DisputeRequest from "../../model/request/DisputeRequest";
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
    };
  },

  methods: {
    closeModal() {
      console.log("Closing Moddalslslslsl");
      this.showModal = false;
      this.$emit("closeCreateDispute", false);
      this.showModal = true;
    },
  },
};
</script>
