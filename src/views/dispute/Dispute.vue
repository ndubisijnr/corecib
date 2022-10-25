<template>
  <div class="">
    <div class="m-3">
      <div class="mr-4 text-right">
        <b-button @click="show = true" :style="{backgroundColor:primaryColor,border:'none',color:'white'}"><i class="fa fa-plus"></i> Log dispute
        </b-button>
      </div>
      <base-table
        :items="disputes"
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
//import BaseButton from "../../components/button/BaseButton";
const sort_by = (field, reverse, primer) => {
    const key = primer ?
    function(x) {
      return primer(x[field])
    } :
    function(x) {
      return x[field]
    };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

export default {
  name: "Dispute",
  components: { BaseTable, DisputeForm },
  data() {
    return {
      show: false,
      disputeReadModel: DisputeResquest.disputeReadByOrg,
      primaryColor:window.__env.app.primaryColor,
      dis:null,
      fields: [
        // { key: "disputeId", label: "Id", sortable: true, class: "text-left" },
        {
          key: "disputeSessionId",
          label: "SessionId",
          sortable: true,
          class: "text-left",
        },
        { key: "disputeTrnType", label: "Transaction Type", sortable: true, class: "text-left",},
        { key: "disputeAmount", label: "Amount", sortable: true, class: "text-left",},
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

  mounted() {},

  computed: {
    ...mapState({
      user: (state) => state.auth.userInfo,
      loading: (state) => state.dispute.loading,
      disputes: (state) => JSON.parse(JSON.stringify(state.dispute.disputes.data)).sort(sort_by('disputeId', true, parseInt)),
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