<template>
  <modal-1 :show="showReminderForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="d-flex justify-content-between">
          <h4 style="color:#3F88C5;font-size:18px;font-weight:700;width: 100%;display: flex;justify-content: center;align-items: center">Reminder Notice ⚠️</h4>
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()" title="Cancel Add Payout Bank"></button>
        </div>
      </div>
      <div class="modal-body">
        <div class="p-1" style="background:#FEE1E1;font-weight: lighter; font-size: 5px;margin-bottom:15px">
          <span style="font-weight: bolder; font-size: 18px;"  class="d-flex">
            <span class="small">You are currently only allowed to use bills payment APIs, kindly update your business information to access all our services</span>
          </span>
        </div>
        <div>
           <span style="font-weight: bolder; font-size: 18px;"  class="d-flex">
             <span class="small">How to upload documents</span>
           </span>
          <span style="font-weight: bolder; font-size: 18px;"  class="d-flex gap-3">
            <ul>
             <li class="small link">Go to Settings </li>
            <li class="small link"> Under Profiles </li>
             <li class="small link">Then Upload Documents</li>
            </ul>
           </span>
        </div>
<!--        <div class="text-right">-->
<!--          <b-button @click="closeModal()">Will do later.</b-button>-->
<!--        </div>-->
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
.card-head{
  background-color: #D7E6F3;
  color: white;
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
  color: #3F88C5;
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


