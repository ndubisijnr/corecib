<template>
  <div>
    <span :class="{ 'spinner-border': loading }"></span>
    <div class="container-fluid mt-0">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
            <el-tabs type="card" @tab-click="handleClick">
              <el-tab-pane id="tab-0" :key="1" label="Profile" class="card">
                <div class="accordion" role="tablist">
                  <div no-body class="mb-1 add-bank-form">
                    <div header-tag="header" class="p-1" role="tab">
                      <div
                        block
                        v-b-toggle.accordion-1
                        variant="none"
                        class="p-3"
                      >
                        <h3>
                          <b-icon-check-circle
                            style="font-size: 25px"
                          ></b-icon-check-circle>
                          Personal Info
                        </h3>
                      </div>
                    </div>
                    <b-collapse
                      id="accordion-1"
                      visible
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <div>
                        <b-container class="p-3" v-if="!loading">
                          <div
                            style="
                              width: 100%;
                              display: flex;
                              justify-content: center;
                            "
                          >
                            <b-form
                              class="container p-3 form-group"
                              style="width: 400px"
                            >
                              <h3 class="text-center">
                                <i
                                  class="fa fa-user-circle profile-settings"
                                ></i>
                              </h3>
                              <div class="form-floating mb-3">
                                <input
                                  type="email"
                                  class="form-control"
                                  id="floatingInput1"
                                  placeholder="name@example.com"
                                  :value="
                                    null ? '' : userInfo.customerFirstName
                                  "
                                  readonly
                                />
                                <label for="floatingInput1">First Name</label>
                              </div>
                              <div class="form-floating mb-3">
                                <input
                                  type="email"
                                  class="form-control"
                                  id="floatingInput2"
                                  placeholder="name@example.com"
                                  :value="null ? '' : userInfo.customerLastName"
                                  readonly
                                />
                                <label for="floatingInput2">Last Name</label>
                              </div>
                              <div class="form-floating mb-3">
                                <input
                                  type="tel"
                                  class="form-control"
                                  id="floatingInput3"
                                  placeholder="name@example.com"
                                  :value="null ? '' : userInfo.customerPhone"
                                  readonly
                                />
                                <label for="floatingInput3">Phone Number</label>
                              </div>
                              <div class="form-floating mb-3">
                                <input
                                  type="email"
                                  class="form-control"
                                  id="floatingInput4"
                                  placeholder="name@example.com"
                                  :value="null ? '' : userInfo.customerEmail"
                                  readonly
                                />
                                <label for="floatingInput">Email</label>
                              </div>
                              <base-button title="Update" disabled>
                              </base-button>
                            </b-form>
                          </div>
                        </b-container>
                      </div>
                    </b-collapse>
                  </div>
                  <hr />

                  <div no-body class="mb-1">
                    <div header-tag="header" class="p-1" role="tab">
                      <div
                        block
                        v-b-toggle.accordion-2
                        variant="none"
                        class="p-3"
                      >
                        <h3>
                          <b-icon-check-circle
                            style="font-size: 25px"
                          ></b-icon-check-circle>
                          Business Information
                        </h3>
                        <p>
                          Enter your merchant information, so we can verify your
                          account and deposit your earnings.
                        </p>
                      </div>
                    </div>
                    <b-collapse
                      id="accordion-2"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <div
                        style="
                          width: 100%;
                          display: flex;
                          justify-content: center;
                        "
                      >
                        <form
                          class="form-group"
                          @submit.prevent="updateOrginasation()"
                          style="width: 400px"
                        >
                          <h3 class="text-center">
                            <i class="fa fa-user-circle profile-settings"></i>
                          </h3>
                          <h4 class="text-center">
                            <b>Your Business Information</b>
                          </h4>
                          <div>
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput2"
                                placeholder="name@example.com"
                                v-model="organisation.organisationName"
                                readonly
                              />
                              <label for="floatingInput2">Business Name</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input
                                type="email"
                                class="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                v-model="organisation.organisationEmail"
                                readonly
                              />
                              <label for="floatingInput">Company Email</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input
                                type="tel"
                                class="form-control"
                                id="floatingInput1"
                                placeholder="Country"
                                v-model="organisation.organisationPhone"
                                readonly
                              />
                              <label for="floatingInput1">Company Phone</label>
                            </div>
                          </div>

                          <!-- Second layer -->
                          <div class="">
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput2"
                                placeholder="1004 Federal Housing Estate, Victoral Island"
                                v-model="organisation.organisationAddress"
                                required
                              />
                              <label for="floatingInput2">Address</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput1"
                                placeholder="Ikeja"
                                v-model="organisation.organisationCity"
                                required
                              />
                              <label for="floatingInput1">City</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input
                                type="text"
                                class="form-control"
                                id="floatingInput1"
                                placeholder="Lagos"
                                v-model="organisation.organisationState"
                                required
                              />
                              <label for="floatingInput1">State</label>
                            </div>
                            <div class="form-floating mb-3">
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                required
                                v-model="organisation.organisationType"
                              >
                                <option>FINTECH</option>
                              </select>
                              <label for="floatingInput3"
                                >Organization Type</label
                              >
                            </div>

                            <div>
                              <base-button title="Update" :loading="loading">
                              </base-button>
                              <!-- <b-button @click="nextStep()" title="" style="background-color:grey;border:none;color:white">Next</b-button> -->
                            </div>
                          </div>
                        </form>
                      </div>
                    </b-collapse>
                  </div>
                  <hr />
                  <div no-body class="mb-1">
                    <div header-tag="header" class="p-1" role="tab">
                      <div
                        block
                        v-b-toggle.accordion-3
                        variant="none"
                        class="p-3"
                      >
                        <h3>
                          <b-icon-check-circle
                            style="font-size: 25px"
                          ></b-icon-check-circle>
                          Document upload
                        </h3>
                        <p>
                          Please upload the following documents, so we can
                          authenticate your account.
                        </p>
                      </div>
                    </div>
                    <b-collapse
                      id="accordion-3"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <div>
                        <div
                          style="
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <div>
                            <div class="">
                              <span
                                :class="{ 'spinner-border': loadingDoc }"
                              ></span>
                              <div>
                                <div v-if="'data' in documents">
                                  <!-- Card body -->

                                  <div
                                    class=""
                                    style="
                                      display: flex;
                                      align-items: center;
                                      flex-wrap: nowrap;
                                    "
                                  >
                                    <div
                                      class=""
                                      v-for="(doc, index) in documents.data"
                                      :key="index"
                                    >
                                      <div
                                        v-if="
                                          'documentStatus' in doc &&
                                          'documentUrl' in doc
                                        "
                                      >
                                        <!--<span>{{progressBarArr[index].value}}</span>-->
                                        <div class="our-team">
                                          <progress-bar
                                            v-show="progressBarArr[index].value"
                                          ></progress-bar>
                                          <div class="picture">
                                            <img
                                              v-if="
                                                doc.documentStatus == 'PENDING'
                                              "
                                              class="img-fluid img-size"
                                              src="https://coregem-imgs.s3.amazonaws.com/document-amber.png"
                                            />
                                            <img
                                              v-else-if="
                                                doc.documentStatus == 'APPROVED'
                                              "
                                              class="img-fluid img-size"
                                              src="https://coregem-imgs.s3.amazonaws.com/document-green.png"
                                            />
                                            <img
                                              v-else-if="
                                                doc.documentStatus == 'REJECTED'
                                              "
                                              class="img-fluid img-size"
                                              src="https://coregem-imgs.s3.amazonaws.com/document-red.png"
                                            />
                                          </div>
                                          <div class="team-content">
                                            <h6 class="name">
                                              {{ doc.documentTypeName }}
                                            </h6>
                                            <span
                                              :class="{
                                                'text-success':
                                                  doc.documentStatus !==
                                                  'APPROVED',
                                                'text-warning':
                                                  doc.documentStatus ===
                                                  'PENDING',
                                                'text-danger':
                                                  doc.documentStatus ===
                                                  'REJECTED',
                                              }"
                                              >●</span
                                            >
                                            <small>{{
                                              doc.documentStatus
                                            }}</small>
                                          </div>
                                          <ul class="social">
                                            <li>
                                              <a
                                                :href="doc.documentUrl"
                                                target="_blank"
                                                class="
                                                  pointer
                                                  fas
                                                  fa-cloud-download-alt
                                                "
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Download"
                                                aria-hidden="true"
                                              ></a>
                                            </li>
                                            <li>
                                              <label
                                                class="pointer"
                                                data-toggle="tooltip"
                                                data-placement="down"
                                                title="Update"
                                                aria-hidden="true"
                                              >
                                                <input
                                                  type="file"
                                                  :ref="'file-input' + index"
                                                  accept="application/pdf, image/*"
                                                  :id="'myfile' + index"
                                                  style="
                                                    display: none;
                                                    z-index: 1;
                                                  "
                                                  @change="
                                                    handleImages(
                                                      $event,
                                                      index,
                                                      doc,
                                                      'UPDATE'
                                                    )
                                                  "
                                                />
                                                <i class="fas fa-edit"></i>
                                              </label>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div v-else>
                                        <form
                                          @submit.prevent="
                                            submitDocument(index, doc)
                                          "
                                          :id="'form' + index"
                                        >
                                          <!--<p v-show="progressBarArr[index]" class="form-error-message"> The File is required </p>-->
                                          <div class="our-team">
                                            <progress-bar
                                              v-show="
                                                progressBarArr[index].value
                                              "
                                            ></progress-bar>
                                            <div class="picture">
                                              <label class="pointer">
                                                <input
                                                  type="file"
                                                  :ref="'file-input' + index"
                                                  style="display: none"
                                                  accept="application/pdf, image/*"
                                                  :id="'myfile' + index"
                                                  @change="
                                                    handleImages(
                                                      $event,
                                                      index,
                                                      doc,
                                                      'CREATE'
                                                    )
                                                  "
                                                />
                                                <img
                                                  class="img-fluid img-size"
                                                  src="https://coregem-imgs.s3.amazonaws.com/document-grey.png"
                                                  alt=""
                                                />
                                              </label>
                                            </div>
                                            <div class="team-content mt--2">
                                              <small class="name"
                                                >Click &#x1F446; to upload
                                                file</small
                                              >

                                              <h6 class="name">
                                                {{ doc.documentTypeName }}
                                              </h6>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-collapse>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane
                id="tab-5"
                :key="5"
                name="five"
                label=" API Keys and Webhooks"
              >
                <b-card-group deck class="APIWebhooks">
                  <b-card header="featured" header-tag="header">
                    <template #header>
                      <b-container class="text-right">
                        <b-button
                          style="
                            background-color: var(--primary);
                            border: none;
                            color: white;
                          "
                          >Regenerate Api Key</b-button
                        >
                      </b-container>
                    </template>
                    <div class="d-flex justify-content-center">
                      <api-key-display-form> </api-key-display-form>
                    </div>
                  </b-card>
                </b-card-group>
              </el-tab-pane>

              <el-tab-pane
                id="tab-6"
                :key="6"
                name="six"
                label=" Bank Account"
                class="cardd"
              >
                <div class="p-3" v-if="payoutAccount">
                  <div>
                    <div
                      class="carddd 3 text-dark py-3 px-3 p-3"
                      style="position: absolute; top: 0; left: 0"
                    >
                      <h3 class="text-dark">Current Added Bank</h3>
                      <span class="text-dark"
                        >Bank Name: {{ readonlybank.accountBankCode }}</span
                      ><br />
                      <span class="text-dark"
                        >Bank Holder Name: {{ readonlybank.accountName }}</span
                      ><br />
                      <span class="mb-3 text-dark"
                        >Bank Account Number:
                        {{ readonlybank.accountNumber }}</span
                      >
                    </div>

                    <b-form class="bformedit" @submit.prevent="editBank()">
                      <b-form-group
                        id="input-group-3"
                        label="Bank Name"
                        label-for="input-3"
                      >
                        <base-input>
                          <el-select
                            class="select-danger"
                            filterable
                            placeholder="Bank Name"
                            required
                            v-model="createPayoutAccountModel.accountBankCode"
                          >
                            <el-option
                              v-for="bank in banks"
                              class="select-danger"
                              :value="bank.value"
                              :label="bank.label"
                              :key="bank.value"
                            >
                            </el-option>
                          </el-select>
                        </base-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-4"
                        label="Account Number"
                        label-for="input-4"
                      >
                        <b-form-input
                          id="input-4"
                          type="text"
                          placeholder="Account Number"
                          v-model="createPayoutAccountModel.accountNumber"
                          class="mr-2"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-5"
                        label="Account Name"
                        label-for="input-5"
                      >
                        <b-form-input
                          id="input-5"
                          type="text"
                          placeholder="Account Name"
                          v-model="createPayoutAccountModel.accountName"
                          class="mr-2"
                          required
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group
                        id="input-group-5"
                        label="Enter OTP"
                        label-for="input-5"
                      >
                        <div class="d-flex">
                          <b-form-input
                            id="input-5"
                            type="text"
                            placeholder="OTP"
                            class="mr-2"
                            required
                            v-model="createPayoutAccountModel.otp"
                          ></b-form-input>
                          <span
                            v-if="timerCount > 0"
                            class="m-2 small w-100 text-dark"
                            >Resend OTP in {{ timerCount }}
                          </span>
                          <!-- <b-button class="w-50" v-if="timerCount > 0" disabled></b-button> -->
                          <b-button class="w-100" @click="sendOtp()" v-else
                            >{{ loadingOtp ? "Sending" : "Send OTP" }}
                            <span
                              :class="{ 'spinner-border': loadingOtp }"
                            ></span
                          ></b-button>
                        </div>
                      </b-form-group>
                      <b-button
                        class="w-100 text-white"
                        style="background-color: var(--primary)"
                        type="submit"
                        >{{ payoutloading ? "Updating" : "Update Bank" }}
                        <span
                          :class="{ 'spinner-border': payoutloading }"
                        ></span
                      ></b-button>
                    </b-form>
                  </div>
                </div>
                <div
                  class="text-center p-3"
                  v-else
                  style="
                    display: flex;
                    width: 100%;
                    height: 60vh;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <div>
                    <i
                      class="fa fa-ban"
                      aria-hidden="true"
                      style="font-size: 46px; margin: 10px"
                    ></i>
                    <h5>You seem to not have any bank account added.</h5>
                    <b-button
                      v-b-modal.modal-no-backdrop
                      @click="openPayaccountmodal()"
                      >Add Bank</b-button
                    >
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

      <b-modal
        centered
        title="Add Payout Account"
        id="modal-no-backdrop"
        hide-backdrop
        content-class="shadow"
        hide-footer
      >
        <div style="display: flex; justify-content: center" v-if="loading">
          <p :class="{ 'spinner-border': loading }"></p>
        </div>
        <div class="form" v-if="!loading">
          <b-form class="bform" @submit.prevent="addBank()">
            <b-form-group
              id="input-group-3"
              label="Bank Name"
              label-for="input-3"
            >
              <base-input>
                <el-select
                  class="select-danger"
                  filterable
                  placeholder="Bank Name"
                  required
                  v-model="createPayoutAccountModel.accountBankCode"
                >
                  <el-option
                    v-for="bank in banks"
                    class="select-danger"
                    :value="bank.value"
                    :label="bank.label"
                    :key="bank.value"
                  >
                  </el-option>
                  <el-option v-if="loading">loading... </el-option>
                </el-select>
              </base-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Account Number"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                type="text"
                placeholder="Account Number"
                v-model="createPayoutAccountModel.accountNumber"
                class="mr-2"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Account Name"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                type="text"
                placeholder="Account Name"
                v-model="createPayoutAccountModel.accountName"
                class="mr-2"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-5"
              label="Enter OTP"
              label-for="input-5"
            >
              <div class="d-flex">
                <b-form-input
                  id="input-5"
                  type="text"
                  placeholder="OTP"
                  class="mr-2"
                  required
                  v-model="createPayoutAccountModel.otp"
                ></b-form-input>
                <span v-if="timerCount > 0" class="m-2 small w-100 text-dark"
                  >Resend OTP in {{ timerCount }}
                </span>
                <!-- <b-button class="w-50" v-if="timerCount > 0" disabled></b-button> -->
                <b-button class="w-100" @click="sendOtp()" v-else
                  >{{ loadingOtp ? "Sending" : "Send OTP" }}
                  <span :class="{ 'spinner-border': loadingOtp }"></span
                ></b-button>
              </div>
            </b-form-group>
            <b-button
              class="w-100 text-white"
              style="background-color: var(--primary)"
              type="submit"
              >{{ payoutloading ? "Adding" : "Add Bank" }}
              <span :class="{ 'spinner-border': payoutloading }"></span
            ></b-button>
          </b-form>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ApiKeyDisplayForm from "../../components/form/ApiKeyDisplayForm";
import { DropdownMenu, DropdownItem, Dropdown } from "element-ui";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import ApikeyRequest from "../../model/request/ApiKeyRequest";
import DocumentRequest from "../../model/request/DocumentRequest";
import VirtualAccountRequest from "../../model/request/VirtualAccountRequest";
import "vue-step-progress/dist/main.css";
import Swal from "sweetalert2";
import BaseButton from "../../components/button/BaseButton";
import OrganisationRequest from "../../model/request/OrganisationRequest";
import AuthenticationRequest from "../../model/request/AuthRequest";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  name: "Settings",
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    ApiKeyDisplayForm,
    BaseButton,
  },
  data() {
    return {
      updateOrganisationModel: OrganisationRequest.updateOrganisation,
      sendOtpModel: AuthenticationRequest.resendOtp,
      readbanklistModel: VirtualAccountRequest.getBankList,
      createPayoutAccountModel: AccountPayoutRequest.createAccountPayout,
      readPayoutAccountModel: AccountPayoutRequest.readAccountPayoutById,
      files: [],
      banks: [],
      progressBarArr: [],
      organisation: JSON.parse(
        JSON.stringify(
          StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
        )
      ),
      apikeyModel: ApikeyRequest.regenerateApiKey,
      documentModel: DocumentRequest.createDocument,
      readDoc: DocumentRequest.readDocument,
      timerCount: 0,
    };
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    ...mapState({
      userInfo: (state) => state.auth.userInfo,
      loading: (state) => state.virtualAccount.loading,
      loadingOtp: (state) => state.auth.loading,
      loadingDoc: (state) => state.document.loading,
      bankList: (state) => state.virtualAccount.bankList,
      payoutAccount: (state) => state.accountPayout.addedBanks,
      payoutloading: (state) => state.accountPayout.accloading,
      readonlybank: (state) => state.accountPayout.readOnlyAddedBanks,
      //documents:(state) => state.document.document
    }),
    documents: () => {
      console.log("progressBarArr");
      let vm = this;
      let doc = StoreUtils.rootGetters(
        StoreUtils.getters.document.getDocuments
      );
      console.log("progressBarArr", doc.data.length);
      //vm.progressBarArr = [...Array(doc.data.length)].fill(false)
      /*for(let i = 0; i < doc.data.length; i++){
        vm.progressBarArr[i] = false
        console.log("progressBarArr",i)
      }*/
      return doc;
    },

    checkInputfield: () => {
      let organization = StoreUtils.rootGetters(
        StoreUtils.getters.auth.getCurrentOrganization
      );
      return organization;
    },
    currentOrganisation() {
      return StoreUtils.rootGetters(
        StoreUtils.getters.auth.getCurrentOrganization
      );
    },
  },
  watch: {
    documents(newValue) {
      console.log("progressBarArrNew", newValue.data.length);
      this.progressBarArr = [];
      //this.progressBarArr = [...Array(newValue.data.length)].fill(false)
      for (let i = 0; i < newValue.data.length; i++) {
        this.progressBarArr.push({
          value: false,
        });
        console.log("progressBarArr", i);
      }
    },
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      //immediate: true, // This ensures the watcher is triggered upon creation
    },
    bankList(newValue, oldValue) {
      console.log(
        `Updating from Branch ${JSON.stringify(oldValue)} to ${JSON.stringify(
          newValue
        )}`
      );
      console.log("$$$$$$$%%%%%>>>>\n " + JSON.stringify(this.bankList));
      if (this.bankList.length !== 0) {
        //if(this.bankList.data.length!==0){
        let bank = [];
        bank = this.bankList;
        this.banks = bank.map((item) => {
          return {
            value: `${item.name} ${item.code}`,
            label: `${item.name}`,
          };
        });
        /* }
                    else{
                      this.option_bank=[{value:'',label:'No Record'}];
                  }*/
      }
    },
  },

  mounted() {
    //Call in read documents actions
    this.apikeyModel.organisationId = localStorage.organisationId;
    this.readDoc.readAll = "YES";
    StoreUtils.dispatch(StoreUtils.actions.document.readDocument, {
      readAll: this.readDoc.readAll,
    });

    //Call in banks payout account//
    this.readPayoutAccountModel.accountOrganisationId =
      localStorage.organisationId;
    StoreUtils.dispatch(
      StoreUtils.actions.accountPayout.readAddedBanks,
      this.readPayoutAccountModel
    );

    StoreUtils.dispatch(
      StoreUtils.actions.virtualAccount.updateReadBankList,
      this.readbanklistModel
    );
  },
  methods: {
    openPayaccountmodal() {
      StoreUtils.dispatch(
        StoreUtils.actions.virtualAccount.updateReadBankList,
        this.readbanklistModel
      );

      if (this.bankLists) {
        let bankLists = this.bankList;
        this.banks = bankLists.map((item) => {
          return {
            value: `${item.name} ${item.code}`,
            label: `${item.name}`,
          };
        });
      }
    },

    addBank() {
      let bankcode =
        this.createPayoutAccountModel.accountBankCode.split(" ")[0];
      let bankName =
        this.createPayoutAccountModel.accountBankCode.split(" ")[1];
      this.createPayoutAccountModel.accountCountry =
        this.userInfo.customerCountry;
      this.createPayoutAccountModel.accountOrganisationId =
        this.organisation.customerOrganisationCustomerId;
      this.createPayoutAccountModel.username =
        this.organisation.organisationEmail;
      this.createPayoutAccountModel.accountBankCode = bankcode;
      this.createPayoutAccountModel.accountBankName = bankName;
      StoreUtils.dispatch(
        StoreUtils.actions.accountPayout.createAddedBanks,
        this.createPayoutAccountModel
      ).then(() => {
        Object.keys(this.createPayoutAccountModel).forEach((key) => {
          this.createPayoutAccountModel[key] = null;
        });
      });
    },

    editBank() {
      let bankcode =
        this.createPayoutAccountModel.accountBankCode.split(" ")[0];
      let bankName =
        this.createPayoutAccountModel.accountBankCode.split(" ")[1];
      this.createPayoutAccountModel.accountCountry =
        this.userInfo.customerCountry;
      this.createPayoutAccountModel.accountOrganisationId =
        this.organisation.customerOrganisationCustomerId;
      this.createPayoutAccountModel.username =
        this.organisation.organisationEmail;
      this.createPayoutAccountModel.accountBankCode = bankcode;
      this.createPayoutAccountModel.accountBankName = bankName;
      StoreUtils.dispatch(
        StoreUtils.actions.accountPayout.editAddedBanks,
        this.createPayoutAccountModel
      ).then(() => {
        this.createPayoutAccountModel.otp = null;
        window.location = "/settings/settings"
      });
    },

    sendOtp() {
      this.sendOtpModel.customerEmail = this.organisation.organisationEmail;
      StoreUtils.dispatch(
        StoreUtils.actions.auth.resendOtp,
        this.sendOtpModel
      ).then(() => {
        Toast.fire({
          text: `Otp Sent to ${this.organisation.organisationEmail}`,
          icon: "success",
        });
        this.timerCount = 30;
        this.startTimer();
      });
    },

    startTimer(duration) {
      let timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timer = minutes + ":" + seconds;
        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    },
    submitDocument(index, doc, action) {
      console.log("Testing" + index);
      this.documentModel.fileUpload.username = `${
        this.currentOrganisation.organisationName
      }_${doc.documentTypeName.replace(/[^a-zA-Z ]/g, "")}_${Math.random()} `;
      this.documentModel.fileUpload.base64 = this.files[index];
      this.documentModel.document.documentDocumentTypeId = doc.documentTypeId;
      if (action === "UPDATE") {
        this.progressBarArr[index].value = true;
        console.log("Conditions>> ", this.progressBarArr[index].value);
        this.documentModel.document.documentId = doc.documentId;
        StoreUtils.dispatch(
          StoreUtils.actions.document.updateDocument,
          this.documentModel
        );
      } else {
        this.progressBarArr[index].value = true;
        StoreUtils.dispatch(
          StoreUtils.actions.document.createDocument,
          this.documentModel
        );

        console.log(this.files[index]);
      }
    },

    handleImages(e, index, doc, action) {
      const vm = this;
      const selectedImage = e.target.files[0];
      this.createBase64Images(selectedImage, index, doc, action);
      console.log("Submit");
    },
    createBase64Images(fileObject, index, doc, action) {
      const img_reader = new FileReader();
      const vm = this;
      img_reader.onload = (e) => {
        vm.files[index] = e.target.result;
        console.log(this.files[index]);
        vm.submitDocument(index, doc, action);
        //vm.notifyVue("success","Click on Submit");
      };
      img_reader.readAsDataURL(fileObject);
    },
    regenerateApiKey() {
      StoreUtils.dispatch(
        StoreUtils.actions.apiKey.regenerateApiKey,
        this.apikeyModel
      ).then(() => {
        this.$bvModal.hide("modal-no-backdrop");
      });
    },

    closeModal0() {
      this.modals.modal0 = false;
      this.blacklist = false;
    },

    updateOrginasation() {
      this.organisation.organisationId = localStorage.organisationId;
      this.organisation.organisationLogo = "company Logo";
      StoreUtils.dispatch(
        StoreUtils.actions.auth.updateOrganisation,
        this.organisation
      ).then(() => {
        localStorage.taged = "YES";
      });
      console.log(this.organisation);
    },
    file() {
      this.edit = "second";
    },

    handleClick(tab, event) {
      //console.log(tab.$vnode.key);
      console.log(tab.label);
      //console.log(tab, event);
    },

    readColumn() {
      this.$store.dispatch(
        "readColumn",
        {
          item: this.item_report,
        },
        { root: false }
      );
    },
  },

  created: function () {},
};
</script>
<style lang="css" scoped>
.APIWebhooks {
  display: flex;
  justify-content: center;
  height: 100vh;
}
.profile-settings {
  font-size: 100px;
  color: var(--primary);
}
.settings-profile-header {
  color: #919191;
  font-weight: 700;
}

.not-allowed {
  cursor: not-allowed;
}

.carddd {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 20%);
  background-color: white;
}

.cardd {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  background-color: white;
  height: 80vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.center-block {
  width: 600px;
  height: 560px;
  max-width: 90%;
  margin: 30px auto;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
.form {
  display: flex;
  justify-content: center;
}

.bform {
  width: 100%;
  margin: 20px;
}

.bformedit {
  width: 100%;
  margin-top: 2%;
}
.our-team {
  padding: 40px;
  width: 100%;
  height: 25vh;
  background-color: #ffffff80;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius: 5%;
  box-shadow: 0 0 1rem 0 rgb(136 152 170 / 15%);
}

.our-team .picture {
  display: inline-block;
  /* height: 20%;
  width: 20%; */
  margin-bottom: 10px;
  z-index: 1;
}

.our-team .picture::before {
  content: "";
  /* width: 20%; */
  height: 0;
  border-radius: 0%;
  background-color: #1369ce;
  position: absolute;
  bottom: 135%;
  right: 0;
  left: 0;
  opacity: 0.9;
  transform: scale(3);
  transition: all 0.3s linear 0s;
}

.our-team .pic img {
  /* width: 10%;
  height: 20%; */
  border-radius: 0%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
}

.our-team .picture img {
  width: 50%;
  height: 50%;
  border-radius: 0%;
  transform: scale(1);
  transition: all 0.9s ease 0s;
}

.our-team .title {
  display: block;
  font-size: 15px;
  color: #4e5052;
  text-transform: capitalize;
}

.our-team .social {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #56585c;
  position: absolute;
  bottom: -100px;
  left: 0;
  transition: all 0.5s ease 0s;
}

.our-team:hover .social {
  bottom: 0;
}

.our-team .social li {
  display: inline-block;
}

.our-team .social li a {
  display: block;
  padding: 10px;
  font-size: 17px;
  color: white;
  transition: all 0.3s ease 0s;
  text-decoration: none;
}

.our-team .social li a:hover {
  color: #56585c;
  background-color: #f7f5ec;
}

.card-head:first-child {
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
}
.card-head {
  padding: 0.25rem 0.5rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.form-error-message {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #fb6340;
}

.top-area {
  display: flex;
  margin-top: 0px !important;
  justify-content: space-between;
  align-items: center;
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

.pointer {
  cursor: pointer;
}
.img-size {
  width: 32px !important;
  height: 32px !important;
}
</style>
