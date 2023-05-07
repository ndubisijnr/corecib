<template>
  <modal-1 :show="showCreateEditVirtualAccount && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <h4 class="container" style="color:#413d52;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Edit Virtual Account</h4>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Request Payout"></button>
        </div>
      </div>

      <div class="card-body">
        <form role="form" @submit.prevent="edit()">
          <div class="mb-1">
            <input type="text" class="form-control" placeholder="Account Name" required
                   :value="virtualAccountEditPayload?.virtualAccountName" id="accountName"  />
            <label>Account Name</label>
          </div>
          <div class="mb-1">
            <input type="tel" class="form-control" placeholder="Account Number" required
                   :value="virtualAccountEditPayload?.virtualAccountNumber" id="accountNumber" />
            <label>Account Number</label>
          </div>

          <b-button type="submit" :disabled="loading"><span v-if="!loading">Proceed</span>
            <span :class="{ 'spinner-border': loading }" ></span>
          </b-button>
        </form>
      </div>
    </div>
  </modal-1>
</template>

<script>
import StoreUtils from "../../util/baseUtils/StoreUtils";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";
import {mapState} from "vuex";

export default {
  name: "EditVirtualAccountForm",
  props: {
    showCreateEditVirtualAccount: Boolean,
  },
  data: () => {
    return {
      showModal: true,
      model:VirtualAccountRequest.editVirtualAccount
    }
  },

  methods:{
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeEditVirtualAccountForm", false);
      this.showModal = true;
      StoreUtils.commit(StoreUtils.mutations.dispute.updateStatus, 'false')
    },

    edit(){
      const accountName = document.getElementById('accountName').value
      const accountNumber =  document.getElementById('accountNumber').value
      this.model.virtualAccountName = accountName
      this.model.virtualAccountNumber = accountNumber
      StoreUtils.dispatch(StoreUtils.actions.virtualAccount.editVirtualAccount).then(() => {
        this.closeModal()
      })
    }
  },

  computed:{
    ...mapState({
      virtualAccountEditPayload:state => state.virtualAccount.virtualAccountEditPayload,
      loading:state => state.virtualAccount.loading,
    })
  }

}
</script>

<style scoped>

</style>