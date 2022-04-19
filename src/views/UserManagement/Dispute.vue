<template>
  <div class="">
    <!-- <div v-if="loading" class="dispute">
      <div class="text-center">
        <img src="@/assets/empty.svg" />
        <h3>No disputes</h3>
        <p>There're no disputes for your transactions.</p>
      </div>
    </div> -->
    <div class="text-right m-3">
      <button
        class="btn btn-success mt-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i class="fa fa-plus"></i> Create Disputes
      </button>
    </div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      data-bs-scroll="true"
      data-bs-backdrop="false"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Log Dispute</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form role="form" @submit.prevent="handleSubmit(logDispute())">
          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              placeholder="disputeSessionId"
              v-model="dispute_fields.disputeSessionId"
              required
            />
            <label for="floatingInput">disputeSessionId</label>
          </div>
          <template v-if="show == true">
            <div class="form-floating mb-3">
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="dispute_fields.disputeIssueType"
                required
              >
                <option value="Credit" selected>Credit</option>
                <option value="Debit">Debit</option>
              </select>
              <label for="floatingInput">disputeIssueType</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="disputeSessionId"
                :value="qtrans.transactionType"
                disabled
                required
              />
              <label for="floatingInput">disputeTrnType</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="disputeSessionId"
                value="Transaction"
                disabled
              />
              <label for="floatingInput">disputeRemark</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                type="text"
                class="form-control"
                placeholder="disputeSessionId"
                v-model="dispute_fields.disputeComment"
                required
              />
              <label for="floatingInput">disputeComment</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="tel"
                class="form-control"
                placeholder="disputeSessionId"
                :value="`000${user.organisations[0].organisationId}`"
                required
                disabled
              />
              <label for="floatingInput">disputeOrgId</label>
            </div>
          </template>
          <button
            type="submit"
            :disabled="log_loading"
            class="btn btn-success"
            @click="transQuery()"
            v-if="show == false"
          >
            Proceed <span :class="{ 'spinner-border': log_loading }"></span>
          </button>
          <button
            type="submit"
            :disabled="log_loading"
            class="btn btn-success"
            @click="logDispute()"
            v-if="show == true"
          >
            Proceed <span :class="{ 'spinner-border': log_loading }"></span>
          </button>
        </form>
      </div>
    </div>
    <div class="dispute-table" v-if="!loading">
      <b-table
        class="table table-striped shadow"
        :items="dispute"
        :fields="fields"
        id="my-table"
        :per-page="perPage"
        :current-page="currentPage"
        show-empty

      >
      </b-table>
    </div>
    <div class="text-center mt-3 mr-5 ml-5" v-if="!loading">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="right"
        size="md"
        aria-controls="my-table"
        class="my-0"
      ></b-pagination>
    </div>
    <div class="dispute" v-if="loading">
      <div class="text-center">
        <h3>No disputes</h3>
        <p>There're no disputes for your transactions.</p>
        <span :class="{ 'spinner-border': loading }"></span>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-success">
              Proceed <span :class="{ 'spinner-border': loading }"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Dispute",
  data() {
    return {
      show: false,
      perPage: 9,
      currentPage: 1,
      fields: [
        // { key: "sn", label: "S/N", sortable: true, sortDirection: "desc" },
        {
          key: "disputeId",
          label: "disputeId",
          sortable: true,
          class: "text-left",
        },
        {
          key: "disputeSessionId",
          label: "disputeSessionId",
          sortable: true,
          class: "text-left",
        },
        {
          key: "disputeTrnType",
          label: "disputeTrnType",
          sortable: true,
          class: "text-left",
        },
        {
          key: "disputeIssueType",
          label: "disputeIssueType",
          sortable: true,
          class: "text-left",
        },
        {
          key: "disputeComment",
          label: "disputeComment",
          sortable: true,
          class: "text-left",
        },
        {
          key: "disputeOrgId",
          label: "disputeOrgId  ",
          sortable: true,
          class: "text-left",
        },
        { key: "disputeStatus", label: "disputeStatus" },
      ],

      dispute_fields: {
        disputeSessionId: "",
        disputeIssueType: "",
        disputeComment: "",
        disputeRemark: "Transaction",
      },
    };
  },

  methods: {
    readAllDispute() {
      let payload = {
        disputeId: this.user.customerId,
      };
      this.$store.dispatch("readDispute", payload, { root: false });
    },
    transQuery() {
      let payload = {
        reference: this.dispute_fields.disputeSessionId,
      };
      this.$store.dispatch("queryId", payload);
    },
    logDispute() {
      let payload = {
        disputeSessionId: this.dispute_fields.disputeSessionId,
        disputeTrnType: this.qtrans.transactionType,
        disputeIssueType: this.dispute_fields.disputeIssueType,
        disputeComment: this.dispute_fields.disputeComment,
        disputeRemark: this.dispute_fields.disputeRemark,
        disputeOrgId: this.user.organisations[0].organisationId,
      };
      this.$store.dispatch("createDispute", payload).then(() => {
        this.readAllDispute();
      });
    },
  },

  mounted() {
    this.readAllDispute();
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.userInfo,
      dispute: (state) => state.dispute.readispute,
      loading: (state) => state.dispute.loading,
      log_loading: (state) => state.transaction.log_loading,
      success: (state) => state.dispute.success,
      error: (state) => state.dispute.errors,
      querysuccess: (state) => state.transaction.querysuccess,
      queryerror: (state) => state.transaction.queryerrors,
      qtrans: (state) => state.transaction.transactionquery,
    }),

    rows() {
      return this.dispute.length;
    },
  },

  watch: {
    success(newValue) {
      if (newValue) {
        this.$toast.success(newValue);
      }
    },
    error(newValue) {
      if (newValue) {
        this.$toast.error(newValue);
      }
    },
    querysuccess(query_sucess) {
      if (query_sucess) {
        // this.$toast.success(query_sucess);
        this.show = true;
      }
    },
    queryerror(qnewValue) {
      if (qnewValue) {
        this.$toast.error(qnewValue);
      }
    },
  },
};
</script>

<style>
.dispute-table {
  margin: 20px;
  width: 95%;
  overflow-x: scroll;
}

.dispute {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
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
</style>