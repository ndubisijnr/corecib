<template>
  
  <div class="dispute-table">
   <b-table
      class="table table-striped shadow"
      :items="wallettrans"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template #cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>
      <template #cell(accountNumber)="row">
        <span
          size="md"
          style="cursor: pointer"
          @click="getvalue(row.value)"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {{ row.value }}
          <i class="fa fa-info-circle"></i>
        </span>
      </template>
      <template #row-details="row">
        <b-card>
          <table class="table dark">
            <tbody>
              <tr v-for="(value, key) in row.item" :key="key">
                {{
                  key
                }}:
                {{
                  value
                }}
              </tr>
            </tbody>
          </table> 
          <!-- <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul> -->
      </b-card>
      </template>
    </b-table> 
  </div>
</template>


<script>
// import { mapState } from "vuex";

export default {
  name:"WalletTransaction",
  data() {
    return {
      minDatetime: "1960-01-01",
      maxDatetime: "2022-12-12",
      startDate: "",
      endDate: "",

      light: "light",
      model: {
        startDate: "",
        endDate: "",
        searchItem: "",
        page: 1,
      },
      type: "",
      option_time: [
        { value: "last30", label: "Last 30 days" },
        { value: "last90", label: "Last 90 days" },
        { value: "alltime", label: "All TIme" },
        { value: "customperiod", label: "Custom Period" },
        { value: "thismonth", label: "This Month" },
        { value: "today", label: "Today" },
        { value: "thisyear", label: "This Year" },
      ],
      items: [],
      field: [
        { key: "accountId", label: "accountId" },
        { key: "accountCustomerId", label: "accountCustomerId" },
        { key: "accountNumber", label: "accountNumber" },
        { key: "accountName", label: "accountName" },
        {
          key: "accountCurrency",
          label: "accountCurrency",
        },
        { key: "accountBalance", label: "accountBalance" },
        { key: "accountStatus", label: "accountStatus" },
        { key: "accountLedgerBalance", label: "accountLedgerBalance" },
        { key: "accountPhone", label: "accountPhone" },
        { key: "accountEmail", label: "accountEmail" },
        { key: "accountBvn", label: "accountBvn" },
        // { key: "actions", label: "actions" },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
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
    ...mapState({
        loading2: (state) => state.walletransactions.retrieveloading,
       wallettrans: (state) => state.walletransactions.wallettrans,
    }),
  },
};
</script>
