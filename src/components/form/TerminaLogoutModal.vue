<template>
  <modal-1 :show="showOrganisationUserForm === 'logout' && showModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-md">

    <div class="card-head">
      <div class="d-flex justify-content-between">
        <h4 style="color:black;font-size:18px;width: 100%;display: flex;justify-content: center;margin:5px;align-items: center">Logout from Terminal</h4>
        <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel"></button>
      </div>
    </div>
    <div class="modal-body" style="text-align: center">

      <div style="font-size: 50px">⚠️</div>
      <div style="font-weight: lighter; font-size: 5px;margin-bottom:15px">
        <div style="width: 100%">
          <p class="text-dark" style="font-weight: bolder; font-size: 18px;text-align: center;">Are you sure you want to logout from terminal</p>
        </div>
      </div>
      <b-button  class="text-white" @click="terminalLogout" type="submit" :style="{backgroundColor:primaryColor,width:'100%'}">{{ loading ? 'please wait..' : 'Proceed' }} <span :class="{ 'spinner-border': loading }"></span>
      </b-button>

    </div>

  </modal-1>

</template>

<script>
import router from "../../router";
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import AuthRequest from "../../model/request/AuthRequest";

export default {
  name: "TerminaLogoutModal",
  components: {},

  data() {
    return {
      showModal: true,
      primaryColor: window.__env.app.primaryColor,
      model:AuthRequest.terminalRequest

    }
  },
  props: {
    showOrganisationUserForm: Boolean,
  },

  methods: {
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeLogoutForm", false);
      this.showModal = true;
      //   StoreUtils.commit(StoreUtils.mutations.auth.updateReminder, false)
    },

    terminalLogout(){
      StoreUtils.dispatch(StoreUtils.actions.auth.terminalLogout, this.model)
    },

    routeToSettings(){
      router.push({path:'/settings/settings'}).then(() => {
        this.closeModal()
      })
    }

  },

  computed:{
    ...mapState({
      loading:state => state.auth.loading,
      userInfo: (state) => state.auth.userInfo
    })
  }

}
</script>

<style scoped>

</style>