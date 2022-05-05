<template>
  <div class="">
    <div class="m-3">
      <div class="mr-4 text-right">
        <b-button @click="show = true" style="background-color:var(--primary);border:none;color:white"><i class="fa fa-plus"></i> Create  dispute
        </b-button>
      </div>
      <base-table
        :items="this.disputes.data"
        :fields="fields"
        filter-mode="default"
        :is-busy="loading"
      />
    </div>

    <dispute-form
      @closeCreateDispute="updateCreateDispute"
      :showCreateDispute="show"
    ></dispute-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DisputeResquest from "../../model/request/DisputeRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BaseTable from "../../components/table/BaseTable";
import DisputeForm from "../../components/form/DisputeForm";
import BaseButton from "../../components/button/BaseButton";

export default {
  name: "Dispute",
  components: { BaseTable, DisputeForm, BaseButton },
  data() {
    return {
      show: false,
      disputeReadModel: DisputeResquest.disputeReadByOrg,
      fields: [
        { key: "disputeId", label: "Id", sortable: true, class: "text-left" },
        {
          key: "disputeSessionId",
          label: "SessionId",
          sortable: true,
          class: "text-left",
        },
        //{ key: "disputeTrnType", label: "Trn Type", sortable: true, class: "text-left",},
        //{ key: "disputeIssueType", label: "IssueType", sortable: true, class: "text-left",},
        {
          key: "disputeComment",
          label: " Comment",
          sortable: true,
          class: "text-left",
        },
        //{ key: "disputeOrgId", label: "disputeOrgId  ", sortable: true, class: "text-left",},
        { key: "disputeStatus", label: "Status" },
        { key: "disputeActions", label: "Actions" },
      ],
    };
  },

  methods: {
    updateCreateDispute(value) {
      this.show = value;
    },
  },

  mounted() {
    this.disputeReadModel.disputeOrgId = localStorage.getItem("organisationId");
    StoreUtils.dispatch(
      StoreUtils.actions.dispute.updateDisputes,
      this.disputeReadModel
    );
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.userInfo,
      loading: (state) => state.dispute.loading,
      disputes: (state) => state.dispute.disputes,
    }),
  },
};
</script>

<style>
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

.dispute-btn {
  background-color: var(--primary) !important;
  border: none !important;
}
</style>