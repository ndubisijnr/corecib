<template>
  <modal-1 :show="showOrganisationUserForm && showModal" body-classes="p-1" modal-classes="modal-dialog-centered modal-md">
    <div>
      <div class="card-head">
        <div class="text-end">
          <button type="button" class="btn-close p-2 m-2" @click="closeModal()"></button>
        </div>
        <div class=""></div>
      </div>
      <div class="card-body">
        <div class="form">
          <b-form class="bform2 text-left" @submit.prevent="updateUser()">
            <div class="row">
              <div class="col-6">
                <b-form-group id="input-group-4" label="Organisation name" label-for="input-4">
                  <b-form-input id="input-4" disabled  placeholder="Organisation name" v-model="singleUserPayload.organisationName" class="mr-2" required></b-form-input>
                </b-form-group>
              </div>
              <div class="col-6">
                <b-form-group id="input-group-4" label="Status" label-for="input-4">
                  <b-form-input id="input-4" disabled  placeholder="status" :value="singleUserPayload.customerOrganisationStatus" class="mr-2" required></b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <b-form-group id="input-group-4" label="User Id" label-for="input-4">
                  <b-form-input id="input-4" disabled type="number" placeholder="Account Number" :value="singleUserPayload.customerOrganisationCustomerId" class="mr-2" required></b-form-input>
                </b-form-group>
              </div>
              <div class="col-6">
                <b-form-group id="input-group-4" label="Email" label-for="input-4">
                  <b-form-input id="input-4" disabled  placeholder="organisation email" :value="singleUserPayload.organisationEmail" class="mr-2" required></b-form-input>
                </b-form-group>
              </div>
            </div>
            <b-form-group label="User Role">
              <base-input>
                <el-select class="select-danger" filterable placeholder="Select user role" required  v-model="model.customerRole">
                  <el-option v-if="readOrganisationRoles.length > 1" v-for="(item, index) in readOrganisationRoles" :key="index" :value="item.roleName" :label="item.roleName" class="select-danger"></el-option>
                </el-select>
              </base-input>
            </b-form-group>
            <b-button class="w-100 text-white" :disabled="loading" :style="{backgroundColor:primaryColor}" type="submit">{{loading ? "Saving" : "Save" }}
              <span :class="{ 'spinner-border': loading }"></span>
            </b-button>
          </b-form>
        </div>
      </div>
    </div>

  </modal-1>

</template>

<script>
import OrganisationRequest from "../../model/request/OrganisationRequest";
import {mapState} from "vuex"
import StoreUtils from "../../util/baseUtils/StoreUtils";
import swal from "sweetalert2";
export default {
  name: "EditOrganisationUser",
  props: {
    showOrganisationUserForm: Boolean,
  },
  data() {
    return {
      model: OrganisationRequest.updateOrganisationUser,
      organisationRoles: [],
      showModal: true,
      primaryColor: window.__env.app.primaryColor

    };
  },

  methods:{
    updateUser(){
      let message = "Updating this user role \n" +
                    "will restrict this user from having any ADMINISTRATIVE Privilege."
      this.model.customerStatus = this.singleUserPayload.customerOrganisationStatus
      this.model.customerId = this.singleUserPayload.customerOrganisationCustomerId
      if(this.singleUserPayload.customerOrganisationRole === "ADMINISTRATOR"){
        swal.fire({
          title: 'Are you sure?',
          text:message,
          icon:"info",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          showCancelButton: true,
          confirmButtonColor: this.primaryColor,
          cancelButtonColor: '#EE9BA9',
          confirmButtonText: 'Yes, Save'
        }).then((response) => {
          if(response.isConfirmed){
            StoreUtils.dispatch(StoreUtils.actions.auth.updateUser, this.model)
          }else{
            StoreUtils.commit(StoreUtils.mutations.auth.updateUserEditForm, false)
          }
        })
      }else{
        StoreUtils.dispatch(StoreUtils.actions.auth.updateUser, this.model)
      }
    },

    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeUserForm", false);
      this.showModal = true;
      //   StoreUtils.commit(StoreUtils.mutations.accountPayout.updateStatus, 'false')
    },
  },

  computed:{
    ...mapState({
      singleUserPayload:state => state.auth.singleOrganisationUser,
      readOrganisationRoles: (state) => state.auth.organisationRoles,
      loading: state => state.auth.loading

    })
  }
}
</script>

<style scoped>

</style>