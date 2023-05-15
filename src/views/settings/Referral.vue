<template>
  <div class="m-3">
    <div class="tab">
      <b-card-body>
        <div class="inner-card">
          <b-container class="itemabc1234">
            <div class="p-2">
              <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_rkboxc5u.json"  background="transparent"
                             speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
              <h4>Your Referral link</h4>
              <p class="text-dark">
                Refer new merchants with your referral Link and earn 10% on the
                revenue Corestep makes from each transaction.
              </p>
              <div class="mb-3" @click="copyToClipboard()" title="click to copy to clipboard" >
                <label>click on link to copy</label>
                <input
                  class="form-control form-control-md"
                  :value="getReferralLink"
                  id="content"
                  style="cursor: pointer;"
                  disabled
                />
              </div>
            </div>
          </b-container>
          <b-container class="itemabc123">
            <dashboard-card :value="refferalstats.totalReferrals == null ? '0' : refferalstats.totalReferrals" :title="'Total Referrals'" :showBtn="false" :showBtn1="false"></dashboard-card>
            <dashboard-card :show="true" :refresh="true" :currency="'₦'" :value="referalbalance.referralBalance.accountBalance | formatAmount" :title="'Total Revenue'" :showBtn="false" :showBtn1="false"></dashboard-card>
          </b-container>
          
        </div>
         <div class="text-center">
        <base-table
          :items="refferalstats.referral"
          :fields="fields"
          filter-mode="default"
          :is-busy="loadingRefferal"
        />
      </div>
      </b-card-body>
    </div>
  </div>
</template>

<script>
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BaseTable from "../../components/table/BaseTable";
import Swal from "sweetalert2";
import DashboardView from "../../components/dashboardComponent/DashboardCircle"
import {mapState} from "vuex"

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  name: "Referral",
  components: {
    BaseTable,
    'dashboard-card':DashboardView
  },
  data() {
    return {
      items: [],
      fields: [
        { key: "organisationName", label: "businessName" },
        { key: "organisationStatus", label: "businessStatus" },
        { key: "organisationCreatedAt", label: "Date Joined" },
      ],
    };
  },
  methods: {
    copyToClipboard() {
      let copyLink = document.getElementById("content").value;
      navigator.clipboard.writeText(copyLink).then(() => {
        Toast.fire({ text: "Copied to clipboard", icon: "success" }).then(
          () => {}
        );
      });
    },
  },
  computed: {
    getReferralLink() {
      let url = window.__env.app.url;
      let referralLink = StoreUtils.rootGetters(
        StoreUtils.getters.auth.getOrginizationReferralLink
      );
      return `${url}/signup/${referralLink}`;
    },

    ...mapState({
      loadingRefferal:state => state.auth.loading,
      refferalstats:state => state.auth.refferalstats,
      referalbalance:state => state.auth.balances

    })
  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.auth.readRefferalState)
  },
};
</script>

<style scoped>
.inner-card {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  line-height: 3rem;
  font-family: "Fibon Sans";
  background-color: white;

}
.tab{
    margin-top:2%;
    box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
    background-color: white;
}
@media (max-width:999px) {
  .inner-card {
  display: flex;
  justify-content: space-around;
  padding: 5px;
  flex-direction: column-reverse;
  line-height: 3rem;
  font-family: "Fibon Sans";
}
.itemabc123 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
    flex-direction: column-reverse;

}
}
.itemabc123 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.itemabc1234 {
  width: 100%;
  display: flex;
  align-items: center;
}

</style>