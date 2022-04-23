<template>
  <div class="">
    <div class="text-right m-3">
      <button
          class="btn btn-success mt-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
      >
        <i class="fa fa-plus"></i> Create Disputes
      </button>
      <base-table
          :items="this.disputes.data"
          :fields="fields"
          filter-mode="default"
          :is-busy="loading" />
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";
import DisputeResquest from "../../model/request/DisputeRequest"
import StoreUtils from '../../util/baseUtils/StoreUtils';
import BaseTable from "../../components/table/BaseTable";

export default {
  name: "Dispute",
  components: {BaseTable},
  data() {
    return {
      disputeReadModel: DisputeResquest.disputeRead,
      perPage: 9,
      currentPage: 1,
      fields: [
        { key: "disputeId", label: "disputeId", sortable: true, class: "text-left", },
        { key: "disputeSessionId", label: "disputeSessionId", sortable: true, class: "text-left",},
        { key: "disputeTrnType",label: "disputeTrnType",sortable: true,class: "text-left", },
        { key: "disputeIssueType", label: "disputeIssueType", sortable: true, class: "text-left", },
        { key: "disputeComment", label: "disputeComment", sortable: true, class: "text-left",},
        { key: "disputeOrgId", label: "disputeOrgId  ", sortable: true, class: "text-left",},
        { key: "disputeStatus", label: "disputeStatus"},
        { key: "disputeActions", label: "Actions"},
      ],
    };
  },

  methods: {},

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.dispute.updateDisputes, this.disputeReadModel)
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.userInfo,
      loading: (state) => state.dispute.loading,
      disputes: state => state.dispute.disputes
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
</style>