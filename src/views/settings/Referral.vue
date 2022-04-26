<template>
  <div class="m-3">
    <div>
      <b-card-body>
        <div class="inner-card">
          <b-container class="itemabc1234">
            <div class="p-2">
              <h4>Your Referral link</h4>
              <p>
                Refer new merchants with your referral Link and earn 10% on the
                revenue Bizgem makes from each transaction.
              </p>
              <div class="mb-3" @click="copyToClipboard()">
                <input
                  class="form-control form-control-md"
                  :value="getReferralLink"
                  id="content"
                  disabled
                />
                <div class="copy-span" @click="copyToClipboard()">
                  <span>Copy</span>
                </div>
              </div>
              <span>Your Referral Link</span>
            </div>
          </b-container>
          <b-container class="itemabc123">
            <div class="total-referrals card">
              <span style="font-size: 50px">4</span>
              <span>Total Referrals</span>
            </div>
            <div class="total-referrals card">
              <span style="font-size: 50px"
                ><span style="font-size: 30px">₦</span>1,000</span
              >
              <span>Total Revenue</span>
            </div>
          </b-container>
        </div>
        <base-table
          :items="items"
          :fields="fields"
          filter-mode="default"
          :is-busy="loading"
        />
      </b-card-body>
    </div>
  </div>
</template>

<script>
import StoreUtils from "../../util/baseUtils/StoreUtils";
import BaseTable from "../../components/table/BaseTable";
import Swal from "sweetalert2";

export default {
  name: "Referral",
  components: {
    BaseTable,
  },
  data() {
    return {
      items: [
        {
          businessId: 40,
          businessName: "Dickerson LTD",
          businessStatus: "Active",
        },
        { businessId: 21, businessName: "Larsen Foods", businessStatus: "Active" },
        { businessId: 89, businessName: "Geneva Hair and Lotion", businessStatus: "Active" },
        { businessId: 38, businessName: "Jami Motors", businessStatus: "Active" },
      ],
      fields: [
        { key: "businessId", label: "businessId" },

        { key: "businessName", label: "businessName" },
        { key: "businessStatus", label: "businessStatus" },
        { key: "action", label: "Action" },
      ],
    };
  },
  methods: {
    copyToClipboard() {
      let copyLink = document.getElementById("content").value;
      navigator.clipboard.writeText(copyLink).then(() => {
        Swal.fire({ text: "Copied to clipboard", icon: "success" }).then(
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
      return `${url}/signup?referralcode=${referralLink}`;
    },
  },

  mounted() {},
};
</script>

<style scoped>
.inner-card {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  line-height: 3rem;
  font-family: "Fibon Sans";
}
.itemabc123 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.total-referrals {
  width: 250px;
  height: 250px;
  border-radius: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color:#3F88C5;
}
.itemabc1234 {
  width: 100%;
  display: flex;
  align-items: center;
}

.copy-span {
  position: inherit;
  float: right;
  margin-top: -42px;
  margin-right: 28px;
  cursor: pointer;
}
.copy-span:hover {
  color: rgb(10, 133, 190);
}
</style>