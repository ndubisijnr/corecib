<template>
  <modal-1 :show="showReminderForm && showModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-md">

    <div class="card-head">
      <div class="d-flex justify-content-between">
        <h4 style="color:white;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Reminder Notice</h4>
        <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel"></button>
      </div>
    </div>
    <div class="modal-body">
      <div style="font-size: 50px">⚠️</div>
      <div class="p-1" style="font-weight: lighter; font-size: 5px;margin-bottom:15px">
        <span style="font-weight: bolder; font-size: 18px;"  class="d-flex">
          <span class="small text-dark">You are currently only allowed to use bills payment APIs, kindly update your business information to access all our services</span>
        </span>
      </div>
    </div>

  </modal-1>
</template>

<script>
// import StoreUtils from "../../util/baseUtils/StoreUtils";

import router from "../../router";

export default {
  name: "ReminderModal",
  components: {},

  data() {
    return {
      showModal: true,
      primaryColor: window.__env.app.primaryColor,
    }
  },
  props: {
    showReminderForm: Boolean,
  },

  methods: {
    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeReminderForm", false);
      this.showModal = true;
      //   StoreUtils.commit(StoreUtils.mutations.auth.updateReminder, false)
    },

    routeToSettings(){
      router.push({path:'/settings/settings'}).then(() => {
        this.closeModal()
      })
    }

  }
}
</script>

<style scoped>
.modal-body{
  display: flex;
  gap: 20px;
}
.card-head{
  background-color: #EE9BA9;
  color: white;
  border: solid;
  margin: 0 !important;
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

.link{
  margin-top:2%;
  color: #413d52;
  cursor: pointer;
}

.link:hover{
  text-decoration: underline;
}


label{
  color: #000;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>


