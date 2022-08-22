<template>
  <div class="body">
    <blocker-loader v-if="loading && loadingOtp && payoutloading && loadingDoc" :message="'Setting up Settings Environment'"></blocker-loader>
    <div class="container mt-0" v-else>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
            <el-tabs type="card" @tab-click="handleClick">
              <el-tab-pane id="tab-0" :key="1" label="Profile" :class="!loading ? 'card': ''">
                <div v-if="loading" class="accordion skeletonLoader" role="tablist" style="background-color:#f8f9fe; transition: all 200ms ease-in-out;">
                  <div no-body class="mb-1 add-bank-form">
                    <div header-tag="header" class="p-1" role="tab">
                      <div block v-b-toggle.accordion-1 variant="none" class="p-3" style="color:black;">
                        <h3 class="animateSkeleton"></h3>
                        <p  class="animateSkeleton"></p>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div no-body class="mb-1">
                    <div header-tag="header" class="p-1" role="tab">
                      <div block v-b-toggle.accordion-2 variant="none" class="p-3" style="color:black;">
                        <h3 class="animateSkeleton"></h3>
                        <p  class="animateSkeleton"></p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div no-body class="mb-1">
                    <div header-tag="header" class="p-1" role="tab">
                      <div block v-b-toggle.accordion-3 variant="none" class="p-3" style="color:black;">
                        <h3 class="animateSkeleton"></h3>
                        <p  class="animateSkeleton"></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion" role="tablist" v-else>
                  <div no-body class="mb-1 add-bank-form">
                    <div header-tag="header" class="p-1" role="tab">
                      <div block v-b-toggle.accordion-1 variant="none" class="p-3" style="color:black;">
                        <h3>
                          Personal Info 🔽
                        </h3>
                        <p>You can update your personal info here.</p>
                      </div>
                    </div>
                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                      <div>
                        <div class="p-3" v-if="!loading">
                          <div class="personal-profile">
                            <b-form class="container p-3 form-group">
                              <div class="form-floating mb-3">
                                <input type="email" class="form-control"
                                  placeholder="name@example.com" :value="
                                    null ? '' : userInfo.customerFirstName
                                  " readonly />
                                <label for="floatingInput1">First Name</label>
                              </div>
                              <div class="form-floating mb-3">
                                <input type="email" class="form-control"
                                  placeholder="name@example.com" :value="null ? '' : userInfo.customerLastName"
                                  readonly />
                                <label for="floatingInput2">Last Name</label>
                              </div>
                              <div class="form-floating mb-3">
                                <input type="tel" class="form-control"
                                  placeholder="name@example.com" :value="null ? '' : userInfo.customerPhone" readonly />
                                <label for="floatingInput3">Phone Number</label>
                              </div>
                              <div class="form-floating mb-3">
                                <input type="email" class="form-control"
                                  placeholder="name@example.com" :value="null ? '' : userInfo.customerEmail" readonly />
                                <label for="floatingInput">Email</label>
                              </div>
                              <base-button title="Update" disabled></base-button>
                            </b-form>
                          </div>
                        </div>
                      </div>
                    </b-collapse>
                  </div>
                  <hr />
                  <div no-body class="mb-1">
                    <div header-tag="header" class="p-1" role="tab">
                      <div block v-b-toggle.accordion-2 variant="none" class="p-3" style="color:black;">
                        <h3>
                          Business Information 🔽
                        </h3>
                        <p>
                          Update your business information here
                        </p>
                      </div>
                    </div>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" >
                        <UpdateBusinessProfile></UpdateBusinessProfile>
                    </b-collapse>
                  </div>
                  <hr />
                  <div no-body class="mb-1">
                    <div header-tag="header" class="p-1" role="tab">
                      <div block v-b-toggle.accordion-3 variant="none" class="p-3" style="color:black;">
                        <h3>
                          Document upload 🔽
                        </h3>
                        <p>
                          Submit important documents about your business. This will help us verify your business and have your account upgraded.
                        </p>
                      </div>
                    </div>
                    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                      <div>
                        <div style="
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color:black;
                          ">
                          <div>
                            <div class="">
                              <span :class="{ 'spinner-border': loadingDoc }"></span>
                              <div class="doc">
                                <div v-if="'data' in documents">
                                  <!-- Card body -->

                                  <div class="document">
                                    <div class="" v-for="(doc, index) in documents.data" :key="index">
                                      <div v-if="
                                        'documentStatus' in doc &&
                                        'documentUrl' in doc
                                      ">
                                        <!--<span>{{progressBarArr[index].value}}</span>-->
                                        <div class="our-team">
                                          <progress-bar v-show="progressBarArr[index].value"></progress-bar>
                                          <div class="picture">
                                            <img v-if="
                                              doc.documentStatus == 'PENDING'
                                            " class="img-fluid img-size"
                                              src="https://coregem-imgs.s3.amazonaws.com/document-amber.png" />
                                            <img v-else-if="
                                              doc.documentStatus == 'APPROVED'
                                            " class="img-fluid img-size"
                                              src="https://coregem-imgs.s3.amazonaws.com/document-green.png" />
                                            <img v-else-if="
                                              doc.documentStatus == 'REJECTED'
                                            " class="img-fluid img-size"
                                              src="https://coregem-imgs.s3.amazonaws.com/document-red.png" />
                                          </div>
                                          <div class="team-content">
                                            <h6 class="name">
                                              {{ doc.documentTypeName }}
                                            </h6>
                                            <span :class="{
                                              'text-success':
                                                doc.documentStatus ===
                                                'APPROVED',
                                              'text-warning':
                                                doc.documentStatus ===
                                                'PENDING',
                                              'text-danger':
                                                doc.documentStatus ===
                                                'REJECTED',
                                            }">●</span>
                                            <small>{{
                                                doc.documentStatus
                                            }}</small>
                                          </div>
                                          <ul class="social">
                                            <li>
                                              <a :href="doc.documentUrl" target="_blank" class="
                                                  pointer
                                                  fas
                                                  fa-cloud-download-alt
                                                " data-toggle="tooltip" data-placement="top" title="Download"
                                                aria-hidden="true"></a>
                                            </li>
                                            <li v-show="
                                              doc.documentStatus !==
                                              'APPROVED'
                                            ">
                                              <label class="pointer" data-toggle="tooltip" data-placement="down"
                                                title="Update" aria-hidden="true">

                                              <input type="file" :ref="'file-input' + index"
                                                accept="application/pdf, image/*" :id="'myfile' + index" style="
                                                    display: none;
                                                    z-index: 1;
                                                  " @change="
                                                    handleImages(
                                                      $event,
                                                      index,
                                                      doc,
                                                      'UPDATE'
                                                    )
                                                  " />
                                              <i class="fas fa-edit"></i>
                                              </label>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div v-else>
                                        <form @submit.prevent="submitDocument(index, doc)" :id="'form' + index">
                                          <!--<p v-show="progressBarArr[index]" class="form-error-message"> The File is required </p>-->
                                          <div class="our-team">
                                            <progress-bar v-show="
                                              progressBarArr[index].value
                                            "></progress-bar>
                                            <div class="picture">
                                              <!-- <label class="pointer">
                                              <img class="img-fluid img-size"
                                                  src="https://coregem-imgs.s3.amazonaws.com/document-grey.png"
                                                  alt="" />
                                              </label> -->
                                              <!-- <input type="file" :ref="'file-input' + index" style="display: none"
                                                accept="application/pdf, image/*" :id="'myfile' + index" @change="
                                                  handleImages(
                                                    $event,
                                                    index,
                                                    doc,
                                                    'CREATE'
                                                  )
                                                " /> -->
                                              <label class="pointer">
                                                <input type="file" :ref="'file-input' + index" style="display: none;"  accept="application/pdf, image/*" :id="'myfile' + index" @change="
                                                  handleImages(
                                                    $event,
                                                    index,
                                                    doc,
                                                    'CREATE'
                                                  )
                                                "/>
                                              <img class="img-fluid img-size" src="https://coregem-imgs.s3.amazonaws.com/document-grey.png" alt=""/>
                                            </label>
                                            </div>
                                            <div class="team-content mt--2">
                                              <small class="name">Click &#x1F446; to upload
                                                file</small>

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

              <el-tab-pane id="tab-8" :key="8" name="eight" label="Change Password">
                <div class="settings-wrap">
                <div>
                  <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_msdmfngy.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop  autoplay></lottie-player>
                </div>
                  <div class="settings-wrap-2nd">
                    <form @submit.prevent="changePassword()" class="password-form">
                      <div class="form-floating mb-3">
                        <i class="fa fa-eye" style="position: absolute;right: 10px;top: 5px;cursor: pointer" @click="hide$show"id="eye"></i>
                        <input type="password" class="form-control"  id="pwd" v-model="changePasswordModel.customerOldPassword" required>
                        <label>Old password</label>
                      </div>
                         <div class="form-floating mb-3">
                           <input type="password" class="form-control"  id="pwd2" v-model="changePasswordModel.customerPassword" required>
                        <label>New password</label>
                      </div>
                       <div class="form-floating mb-3">
                         <input type="password" class="form-control"  id="pwd3" v-model="changePasswordModel.customerPasswordConfirmation" required>
                        <label>Confirm new password</label>
                      </div>
                      <div class="">
                      <base-button type="submit" title='Change':loading="loadingOtp"></base-button>
                          </div>
                    </form>
                    </div>
                </div>
              </el-tab-pane>

              <el-tab-pane id="tab-5" :key="5" name="five" label=" API Keys and Webhooks">
                <div style="display: flex;justify-content: flex-end;margin-bottom: 2%">
                  <b-button :style="{
                            backgroundColor:primaryColor,
                            border: 'none',
                            color: '#fff'}"
                            v-b-modal.modal-sm>Regenerate Api Key
                  </b-button>
                </div>
                <div class="settings-wrap">
                  <div>
                  <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_z3pnisgt.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop  autoplay></lottie-player>
                  </div>
                  <div class="settings-wrap-2nd">
                    <div>
                      <api-key-display-form> </api-key-display-form>
                    </div>
                  </div>
                  <b-modal id="modal-sm" hide-backdrop size="sm" title="Regenerate Api key">
                    You are about to regenerate new API keys.
                    Proceeding with this action will invalidate your existing API keys and subsequent
                    request headers must be passed with your newly generated keys
                    <template #modal-footer="{ cancel }">
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button size="sm" variant="success" @click="regenerateApiKey()" :disabled="apikeyloading">
                        {{ apikeyloading ? 'Regenerating..' : 'Proceed'}}
                      </b-button>
                      <b-button size="sm" variant="danger" @click="cancel()">
                        Cancel
                      </b-button>
                      <!-- Button with custom close trigger value -->
                    </template>
                  </b-modal>

                </div>
              </el-tab-pane>

              <el-tab-pane id="tab-6" :key="6" name="six" label=" Bank Account">
                <div style="display: flex;justify-content: flex-end;margin-bottom: 2%" v-if="!Object.values(payoutAccount).every((o) => o === null)">
                  <b-button @click="showedit()" :style="{backgroundColor:primaryColor,color:'#fff'}"> {{!edit ? 'Update' : 'Cancel' }}</b-button>
                </div>
                <div class="settings-wrap">
                  <div>
                    <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_kK73MQ.json"  background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop  autoplay></lottie-player>
                  </div>
                  <div class="settings-wrap-2nd">
                    <div class="text-center p-3" v-if="payoutloading" style="
                        display: flex;
                        width: 100%;
                        height: 60vh;
                        justify-content: center;
                        align-items: center;
                      ">
                      <div>
                        <h5>Please wait! Bizgem is checking your bank details.</h5>
                      </div>
                    </div>

                    <div v-if="!Object.values(payoutAccount).every((o) => o === null)">
                      <div class="p-3" v-if="!payoutloading">
                        <div>
                          <div class="text-center" v-if="edit == false">
                            <i class="fa fa-university" style="font-size: 50px"></i>
                            <h4>Current bank details</h4>
                          </div>
                          <div class="text-center" v-else>
                            <i class="fa fa-university" style="font-size: 50px"></i>
                            <h4>Edit bank details</h4>
                          </div>
                          <div v-if="edit == false">
                              <div style="width: 100%;">
                                  <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput1"
                                      placeholder="name@example.com" :value="
                                        null ? '' : readonlybank.accountBankName
                                      " readonly />
                                    <label for="floatingInput1">Bank Name</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="floatingInput2"
                                      placeholder="name@example.com" :value="null ? '' : readonlybank.accountName"
                                      readonly />
                                    <label for="floatingInput2">Bank Holder Name</label>
                                  </div>
                                  <div class="form-floating mb-3">
                                    <input type="tel" class="form-control" id="floatingInput3"
                                      placeholder="name@example.com" :value="
                                        null ? '' : readonlybank.accountNumber
                                      " readonly />
                                    <label for="floatingInput3">Bank Account Number</label>
                                  </div>
                              </div>
                          </div>
                        <div  v-else>
                          <form class="bformedit" @submit.prevent="editBank()">
                            <label class="">Select Payout Bank</label>
                            <base-input >
                                <el-select class="select-danger w-100" filterable placeholder="Bank Name" required
                                  v-model="createPayoutAccountModel.accountBankCode">
                                  <el-option v-for="bank in banks" class="select-danger" :value="bank.value"
                                    :label="bank.label" :key="bank.value">
                                  </el-option>
                                </el-select>
                              </base-input>
                            <label class="mt-3">Account Number</label>
                              <b-form-input  id="input-4" type="text" placeholder="Account Number"
                                v-model="createPayoutAccountModel.accountNumber" class="mr-2 mb-3" required></b-form-input>
                              <label class="">Account Name</label>
                              <b-form-input id="input-5" type="number" placeholder="Account Name"
                                v-model="createPayoutAccountModel.accountName" class="mr-2 mb-3" required>
                              </b-form-input>
                              <div class="d-flex mb-3">
                                <b-form-input id="input-5" type="text" placeholder="OTP" class="mr-2" required
                                  v-model="createPayoutAccountModel.otp"></b-form-input>
                                <span v-if="timerCount > 0" class="m-2 small text-dark" style="width: 30%">Resend OTP in {{ timerCount }}</span>
                                <b-button @click="sendOtp()" v-else style="width: 30%">{{ loadingOtp ? "Sending" : "Send OTP" }}
                                  <span :class="{ 'spinner-border': loadingOtp }"></span>
                                </b-button>
                              </div>
                            <b-button class="w-100 text-white" :style="{backgroundColor:primaryColor,color:'#fff'}" type="submit">{{
                                createloader ? "Updating" : "Update Bank"
                            }}
                              <span :class="{ 'spinner-border': createloader }"></span>
                            </b-button>
                          </form>
                        </div>
                        </div>
                      </div>
                    </div>


                    <div v-else>
                      <div class="text-center p-3" v-if="!payoutloading" style="
                          display: flex;
                          width: 100%;
                          height: 60vh;
                          justify-content: center;
                          align-items: center;
                        ">
                        <add-bank @closeCreateBank="updateCreateBank" :showCreateBank="show"></add-bank>

                        <div>
                          <i class="fa fa-ban" aria-hidden="true" style="font-size: 46px; margin: 10px"></i>
                          <h5>You do not have any payout bank account added.</h5>
                          <b-button @click="show = true">Add Bank</b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>

            </el-tabs>

          </div>
        </div>
      </div>
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
import BaseButton from "../../components/button/BaseButton";
import AuthenticationRequest from "../../model/request/AuthRequest";
import AccountPayoutRequest from "../../model/request/AccountPayoutRequest";
import ProgressBar from "@/components/ProgressBar";
import AddBank from "../../components/form/AddBankForm";
import BlockerLoader from "../../components/BlockerLoader";
import ChangePasswordRequest from "@/model/request/ChangePasswordRequest";
import Toast from "../../../toastNotification";
import UpdateBusinessProfile from "../../components/UpdateBusinessProfile";
export default {
  name: "Settings",
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    ApiKeyDisplayForm,
    BaseButton,
    ProgressBar,
    AddBank,
    BlockerLoader,
    UpdateBusinessProfile
  },
  data() {
    return {
      show: false,
      primaryColor:window.__env.app.primaryColor,
      showModalDirector1:false,
      showModalDirector2:false,
      sendOtpModel: AuthenticationRequest.resendOtp,
      readbanklistModel: VirtualAccountRequest.getBankList,
      createPayoutAccountModel: AccountPayoutRequest.createAccountPayout,
      readPayoutAccountModel: AccountPayoutRequest.readAccountPayoutById,
      changePasswordModel:ChangePasswordRequest.changePassword,
      files: [],
      banks: [],
      progressBarArr: [],
      apikeyModel: ApikeyRequest.regenerateApiKey,
      documentModel: DocumentRequest.createDocument,
      readDoc: DocumentRequest.readDocument,
      timerCount: 0,
      edit: false,
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
      createloader: (state) => state.accountPayout.addbankloading,
      apikeyloading: (state) => state.apiKey.loading,
      // documents:(state) => state.document.document
    }),
    getStatus() {
      return localStorage.taged
    },
    documents: () => {
      // console.log("progressBarArr");
      let vm = this;
      let doc = StoreUtils.rootGetters(
        StoreUtils.getters.document.getDocuments
      );
      // console.log("progressBarArr", doc.data.length);
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
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
  },
  watch: {
    documents(newValue) {
      // console.log("progressBarArrNew", newValue.data.length);
      this.progressBarArr = [];
      //this.progressBarArr = [...Array(newValue.data.length)].fill(false)
      for (let i = 0; i < newValue.data.length; i++) {
        this.progressBarArr.push({
          value: false,
        });
        // console.log("progressBarArr", i);
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
      // console.log(
      //   `Updating from Branch ${JSON.stringify(oldValue)} to ${JSON.stringify(
      //     newValue
      //   )}`
      // );
      // console.log("$$$$$$$%%%%%>>>>\n " + JSON.stringify(this.bankList));
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

    const userToken = localStorage.getItem('token')
    StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, userToken)
    StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationById)

    //clear console
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

    StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationById)
  },

  methods: {
    updateCreateBank(value) {
      this.show = value;
    },
    showedit() {
      this.edit = !this.edit;
    },

    changePassword() {
      this.changePasswordModel.customerEmail = this.userInfo.customerEmail
      StoreUtils.dispatch(StoreUtils.actions.auth.changePassword, this.changePasswordModel)
    },

    handleImages(e, index, doc, action) {
      const vm = this;
      const selectedImage = e.target.files[0];
      this.createBase64Images(selectedImage, index, doc, action);
      // console.log("Submit");
    },
    createBase64Images(fileObject, index, doc, action) {
      const img_reader = new FileReader();
      const vm = this;
      img_reader.onload = (e) => {
        vm.files[index] = e.target.result;
        // console.log(this.files[index]);
        vm.submitDocument(index, doc, action);
        //vm.notifyVue("success","Click on Submit");
      };
      img_reader.readAsDataURL(fileObject);
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
        this.createPayoutAccountModel.accountName = null;
        this.createPayoutAccountModel.accountBankName = null;
        this.createPayoutAccountModel.accountBankCode = null;
        this.createPayoutAccountModel.accountNumber = null

        this.readPayoutAccountModel.accountOrganisationId =
          localStorage.organisationId;
        StoreUtils.dispatch(
          StoreUtils.actions.accountPayout.readAddedBanks,
          this.readPayoutAccountModel
        );
        this.edit = false
      });
    },

    sendOtp() {
      this.sendOtpModel.customerEmail = this.userInfo.customerEmail;
      StoreUtils.dispatch(
        StoreUtils.actions.auth.resendOtp,
        this.sendOtpModel
      ).then(() => {
        Toast.fire({
          text: `Otp Sent to ${this.userInfo.customerEmail}`,
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
      // console.log("Testing" + index);
      this.documentModel.fileUpload.username = `${this.currentOrganisation.organisationName
        }_${doc.documentTypeName.replace(/[^a-zA-Z ]/g, "")}_${Math.random()} `;
      this.documentModel.fileUpload.base64 = this.files[index];
      this.documentModel.document.documentDocumentTypeId = doc.documentTypeId;
      this.documentModel.document.documentName = doc.documentTypeName
      if (action === "UPDATE") {
        this.progressBarArr[index].value = true;
        // console.log("Conditions>> ", this.progressBarArr[index].value);
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

        // console.log(this.files[index]);
      }
    },


    regenerateApiKey() {
      StoreUtils.dispatch(
        StoreUtils.actions.apiKey.regenerateApiKey,
        this.apikeyModel
      ).then(() => {
        this.$bvModal.hide("modal-sm");
      });
    },

    closeModal0() {
      this.modals.modal0 = false;
      this.blacklist = false;
    },

    file() {
      this.edit = "second";
    },

    handleClick(tab, event) {
      //console.log(tab.$vnode.key);
      // console.log(tab.label);
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
    showUploadModal(_director){
      if (_director === 1){
        this.showModal = !this.showModal
      }else{
        this.showModal = !this.showModal
      }

    },
    hide$show() {
      let b = document.getElementById("pwd");
      let eye = document.getElementById("eye");
      let b2 = document.getElementById("pwd2");
      let b3 = document.getElementById("pwd3");
      if (b.type === "password") {
        b.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
      } else {
        b.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
      }
      if (b2.type === "password") {
        b2.type = "text";
        b3.type = "text";
      } else {
        b2.type = "password";
        b3.type = "password";

      }
    },
    // hide$show1() {
    //   let b = document.getElementById("pwd1");
    //   let eye = document.getElementById("eye1");
    //   if (b.type === "password") {
    //     b.type = "text";
    //     eye.classList.remove("fa-eye");
    //     eye.classList.add("fa-eye-slash");
    //   } else {
    //     b.type = "password";
    //     eye.classList.add("fa-eye");
    //     eye.classList.remove("fa-eye-slash");
    //   }
    // },
  },

  created: function () { },
};
</script>
<style lang="css" scoped>

h2 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

h2 span {
  background:#fff;
  padding:0 10px;
}

.settings-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255,255,255);
}

.body {
  min-height: 80vh
}

.skeletonLoader{}

.animateSkeleton{
  width:50%;
  height: 30px;
  /*background-color: gray;*/
  background:linear-gradient(90deg, rgba(55, 255, 255, 0.01) 0, rgba(255, 255, 255, 0.16) 20%, rgba(248, 247, 247, 0.5) 60%, rgb(255, 255, 255));
  animation: blink 1s infinite;
}

@keyframes blink {
  100% {
    transform: translateX(100%);
  }
}

@media screen and (prefers-reduced-motion: reduce) {
  .animateSkeleton::after {
    animation: none;
  }
}

.doc{
  overflow-x: scroll;
}


@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}


/*input::-webkit-outer-spin-button,*/
/*input::-webkit-inner-spin-button {*/
/*  -webkit-appearance: none;*/
/*  margin: 0;*/
/*}*/


.bformedit {
  width: 100%;
  margin-top: 2%;
}

.document{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color:black;
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
  /*box-shadow: 0 0 1rem 0 rgb(136 152 170 / 15%);*/
}


.password-form {
  width: 100%;
  padding: 20px;

}

.personal-profile{
  width: 100%;
  display: flex;
  justify-content: center;
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

.form-group{
  width: 90%;
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
.settings-wrap-2nd{
  width: 60%;
}


@media (max-width:999px) {
  .settings-wrap-2nd{
    width: 100%;
  }
  .document{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    color:black;
    width: 300px;
  }

  .bformedit {
    width: 100%;
    margin: 2%;
  }
  form{
    width: 100% !important;
  }
  .form-group{
    width: 100%;
  }
  .password-form {
    width: 100%;
    padding: 20px;

  }
  .settings-wrap {
    flex-direction: column-reverse;
  }
}

</style>
