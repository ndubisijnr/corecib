<template>
  <div>
    <div class="container-fluid mt-0">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
         <span :class="{ 'spinner-border': loading }"></span>

            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane id="tab-0" :key="1" name="first" label="Profile">
                <b-container class="p-3" v-if="!loading">
                  <b-form class="container card p-3 form-group">
                    <h3 class="text-center">
                      <i class="fa fa-user-circle profile-settings"></i>
                    </h3>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput1"
                        placeholder="name@example.com"
                        :value="null ? '' : userInfo.customerFirstName"
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
                    <base-button title="Update" disabled> </base-button>
                  </b-form>
                </b-container>
              </el-tab-pane>

              <!-- END PROFILE -->

              <el-tab-pane
                id="tab-1"
                :key="2"
                name="second"
                label="Business Profile"
              >
                <div class="m-3" style="display: flex">
                  <div>
                    <div class="form-check" @click="showprofile()">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Profile
                      </label>
                    </div>
                    <i class="fas fa-ellipsis-v"></i>
                    <div class="form-check" @click="showcontact()">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Contact
                      </label>
                    </div>
                    <i class="fas fa-ellipsis-v"></i>
                    <div class="form-check" @click="showdoc()">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                      <label class="form-check-label" for="flexRadioDefault3">
                        Document
                      </label>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center w-100 m-3">
                    <div class="card ">
                      <form
                        class="p-3 form-group"
                        @submit.prevent="updateOrginasation()"
                      >
                        <!-- <h3 class="text-center">
                          <i class="fa fa-user-circle profile-settings"></i>
                        </h3>
                        <h6 class="text-center">
                          <b>Business Details </b>
                          <i class="fa fa-info-circle"></i>
                        </h6> -->
                        <b-container class="" v-if="page =='Profile'">
                          <div class="form-floating mb-3">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput2"
                              placeholder="name@example.com"
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
                            
                              readonly
                            />
                            <label for="floatingInput">Company Email</label>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput1"
                              placeholder="Country"
                            
                              readonly
                            />
                            <label for="floatingInput1">Company Phone</label>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="email"
                              class="form-control"
                              id="floatingInput1"
                              placeholder="Country"
                              readonly
                              :value="userInfo.customerCountry"
                            />
                            <label for="floatingInput1">Country</label>
                          </div>
                        </b-container>

                        <!-- Second layer -->
                        <b-container class="" v-if="edit == 'second'">
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput2"
                              placeholder="!004 Federal Housing Estate, Victoral Island"
                              v-model="
                                updateOrganisationModel.organisationAddress
                              "
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
                              v-model="updateOrganisationModel.organisationCity"
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
                              v-model="
                                updateOrganisationModel.organisationState
                              "
                              required
                            />
                            <label for="floatingInput1">State</label>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              v-model="updateOrganisationModel.organisationType"
                              required
                            >
                              <option>FINTECH</option>
                            </select>
                            <label for="floatingInput3"
                              >Organization Type</label
                            >
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="RC 291837820"
                              v-model="
                                updateOrganisationModel.organisationRegistrationNo
                              "
                              required
                            />
                            <label for="floatingInput"
                              >Business Registration No</label
                            >
                          </div>

                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput1"
                              placeholder="wwww.websiteLink.com"
                              v-model="
                                updateOrganisationModel.organisationWebsite
                              "
                            />
                            <label for="floatingInput1">Company Website</label>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              v-model="
                                updateOrganisationModel.organisationIndustryType
                              "
                              required
                            >
                              <option>FINTECH</option>
                            </select>
                            <label for="floatingInput3"
                              >Organisation Industry Type</label
                            >
                          </div>
                          <base-button title="Update" :loading="loading">
                          </base-button>
                        </b-container>
                      </form>

                      <!-- third phase -->
                      <b-container  v-if="edit == 'second'">
                          <div class="form-floating mb-3 card">
                            <input
                              type="text" 
                              class="form-control"
                              id="floatingInput2"
                              placeholder="1004 Federal Housing Estate, Victoral Island"
                              v-model="
                                updateOrganisationModel.organisationAddress
                              "
                              readonly
                            />
                            <label for="floatingInput2">Address</label>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput1"
                              placeholder="Ikeja"
                              v-model="updateOrganisationModel.organisationCity"
                              readonly
                            />
                            <label for="floatingInput1">City</label>
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput1"
                              placeholder="Lagos"
                              v-model="
                                updateOrganisationModel.organisationState
                              "
                              readonly
                            />
                            <label for="floatingInput1">State</label>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              v-model="updateOrganisationModel.organisationType"
                              disabled
                            >
                              <option>FINTECH</option>
                            </select>
                            <label for="floatingInput3"
                              >Organization Type</label
                            >
                          </div>
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput"
                              placeholder="RC 291837820"
                              v-model="
                                updateOrganisationModel.organisationRegistrationNo
                              "
                              readonly
                            />
                            <label for="floatingInput"
                              >Business Registration No</label
                            >
                          </div>
                      </b-container>

                    <div class="" v-if="edit == 'third'">
                      <h4>Documents</h4>
                      <h5>Please upload all documents {{documents.data.length}}</h5>
                      <br />
                      <div class="card-body">
                        <div v-show="loading" ><p class="text-center"><button class="btn btn-secondary"><span class="spinner-border" ></span>
                        </button>hhh</p></div>
                        <div>
                          <div class="row">
                            <div class="col">
                              <div  v-if="'data' in documents">
                                <!-- Card body -->
                                <div class="row">
                                  <div class="col-lg-6 col-md-6 col-sm-6 col-12" v-for="(doc, index) in documents.data"
                                       :key="index">
                                    <div v-if="'documentStatus' in doc && 'documentUrl' in doc">
                                      <div class="our-team">
                                        <div class="picture">
                                          <img v-if="doc.documentStatus =='PENDING'" class="img-fluid" src="https://coregem-imgs.s3.amazonaws.com/document-amber.png">
                                          <img v-else-if="doc.documentStatus =='APPROVED'" class="img-fluid" src="https://coregem-imgs.s3.amazonaws.com/document-green.png">
                                          <img v-else-if="doc.documentStatus =='REJECTED'" class="img-fluid" src="https://coregem-imgs.s3.amazonaws.com/document-red.png">
                                        </div>
                                        <div class="team-content">
                                          <h6 class="name">{{doc.documentTypeName}}</h6>
                                          <span :class="{ 'text-success': (doc.documentStatus!=='APPROVED'), 'text-warning': (doc.documentStatus==='PENDING'),
                                          'text-danger': (doc.documentStatus==='REJECTED')}">●</span>
                                          <small>{{doc.documentStatus}}</small>

                                        </div>
                                        <ul class="social">
                                          <li><a :href="doc.documentUrl" target="_blank" class="pointer fas fa-cloud-download-alt" data-toggle="tooltip" data-placement="top" title="Download" aria-hidden="true"></a></li>
                                          <li>
                                            <label  class="pointer" data-toggle="tooltip" data-placement="down" title="Update" aria-hidden="true">
                                              <input type="file" :ref="'file-input'+index" accept="application/pdf, image/*" :id="'myfile'+index"  style="display:none; z-index: 1;" @change="handleImages($event,index,doc,'UPDATE')">
                                            <i class="fas fa-edit"></i>
                                            </label></li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div v-else>
                                      <form @submit.prevent="submitDocument(index, doc)" :id="'form'+index" >
                                        <p v-show="errorArr[index]" class="form-error-message"> The File is required </p>
                                        <div class="our-team">
                                          <div class="pic">
                                            <label class="pointer">
                                              <input type="file" :ref="'file-input'+index" style="display: none;" accept="application/pdf, image/*" :id="'myfile'+index"  @change="handleImages($event,index,doc,'CREATE')">
                                              <img class="img-fluid" src="https://coregem-imgs.s3.amazonaws.com/document-grey.png" alt="" />
                                            </label>
                                          </div>
                                          <div class="team-content mt--2">
                                            <small class="name">Click &#x1F446; to upload file</small>

                                           

                                            <h6 class="name">{{doc.documentTypeName}}</h6>
                                          
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
                  </div>
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
                    <b-card
                      header="featured"
                      header-tag="header"
                      header-bg-variant="white"
                      body-class="shadow"
                    >
                      <template #header>
                          <b-container class="text-right">
                             <b-button @click="regenerateApiKey()">Generate Api Key</b-button>
                          </b-container>

                      </template>
                    <div class="d-flex justify-content-center">
                      <api-key-display-form> </api-key-display-form>
                    </div>
                  </b-card>
                </b-card-group>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState} from "vuex";
import ApiKeyDisplayForm from "../../components/form/ApiKeyDisplayForm";
import { DropdownMenu, DropdownItem, Dropdown } from "element-ui";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import ApikeyRequest from "../../model/request/ApiKeyRequest";
import DocumentRequest from "../../model/request/DocumentRequest";
import DocumentResponse from "../../model/reponse/DocumentResponse";

import BaseButton from "../../components/button/BaseButton"
export default {
  name: "Settings",
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    ApiKeyDisplayForm,
    BaseButton,

    //LoadingPanel,
    //NoPage
  },
  data() {
    return {
      updateOrganisationModel: updateOrganisationRequest.updateOrganisation,
      files:[],
      activeName: "first",
      selectedItem: {},
      blacklist: false,
      show: "firstt",
      page: "profile",
      light: "light",
      nav: "false",
      errorArr:[],
      apikeyModel: ApikeyRequest.regenerateApiKey,
      documentModel: DocumentRequest.createDocument,
      //documents: DocumentResponse.readByOrganisationId,
      readDoc: DocumentRequest.readDocument,
      modals: {
        modal0: false,
      },

      bindProps: {
        mode: "international",
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "off",
        preferredCountries: ["NG", "US"],
      },
      tel_options: {
        placeholder: "Phone Number",
        styleClasses: "form-control",
        maxlength: 15,
        name: "telephone",
        required: true,
      },
      dropdown_options: {
        showDialCodeInSelection: true,
        showFlags: true,
        autocomplete: "off",
        showDialCodeInList: true,
      },
      countryCode: "",
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
      loading: (state) => state.auth.loading,
      organisation:state => state.auth.Orginisation,
     documents:(state) => state.document.document

    }),

 
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
  },

  mounted() {
    this.apikeyModel.organisationId = localStorage.organisationId;
    this.readDoc.readAll = 'YES';
    StoreUtils.dispatch(
        StoreUtils.actions.document.readDocument,
        {readAll:this.readDoc.readAll}
    );
    },
  methods: {
    submitDocument(index,doc, action){
      console.log('Testing'+index);
      this.documentModel.fileUpload.username = `${this.currentOrganisation.organisationName}_${doc.documentTypeName.replace(/[^a-zA-Z ]/g, "")}_${Math.random()} `
      this.documentModel.fileUpload.base64 = this.files[index]
      this.documentModel.document.documentDocumentTypeId = doc.documentTypeId
      if(action==='UPDATE'){
        //this.errorArr[index]=true;
        this.documentModel.document.documentId = doc.documentId
        StoreUtils.dispatch(
            StoreUtils.actions.document.updateDocument,
            this.documentModel
        );
      }
      else{
        StoreUtils.dispatch(
            StoreUtils.actions.document.createDocument,
                this.documentModel
        );

        console.log(this.files[index]);
      }
      //console.log(evt);
    },

    handleImages(e,index,doc, action){
      const vm = this;
      const selectedImage = e.target.files[0];
      this.createBase64Images(selectedImage,index,doc, action);
      console.log("Submit");

    },
    createBase64Images(fileObject,index,doc, action){
      const img_reader = new FileReader();
      const vm = this;
      img_reader.onload=(e)=>{
        vm.files[index]=e.target.result;
        console.log(this.files[index])
        vm.submitDocument(index, doc, action)
        //vm.notifyVue("success","Click on Submit");
      }
      img_reader.readAsDataURL(fileObject);
    },
    regenerateApiKey() {
      StoreUtils.dispatch(StoreUtils.actions.apiKey.regenerateApiKey, this.apikeyModel)
    },
   
    closeModal0() {
      this.modals.modal0 = false;
      this.blacklist = false;
    },

    updateOrginasation() {
      this.updateOrganisationModel.organisationId = localStorage.organisationId
      StoreUtils.dispatch(
        StoreUtils.actions.auth.updateOrganisation,
        this.updateOrganisationModel
      ).then(() => {
        this.edit = "third";
        console.log(this.updateOrganisationModel)
      });
    },
    file() {
      this.edit = "second";
    },

    showprofile() {
      this.edit = "first";
      document.getElementById("flexRadioDefault2").classList.add("bg-success");
    },
    showcontact() {
      this.edit = "second";
      document.getElementById("flexRadioDefault1").classList.add("bg-success");
    },
    handleClick(tab, event) {
      //console.log(tab.$vnode.key);
      console.log(tab.label);
      //console.log(tab, event);
    },
    showdoc(){
      this.edit = 'third'
      document.getElementById("flexRadioDefault1").classList.add("bg-success");
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

.in {
  pointer-events: none;
}
.center-block {
  width: 600px;
  height: 560px;
  max-width: 90%;
  margin: 30px auto;
}
.empty-history {
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}
.empty-history span {
  display: block;
  margin-bottom: 7px;
}
.empty-history span svg {
  /* fill: #6e0400; */
  height: 30px;
  width: 30px;
  margin: 0 auto;
  display: block;
}
svg {
  overflow: hidden;
  vertical-align: middle;
}
.empty-history span svg circle {
  fill: #ca0305;
  /* fill: #EFCE4A; */
}
.empty-history span svg line {
  fill: none;
  stroke-width: 2;
  stroke: #fff;
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
.black-list-group {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
}
.black-list-sub {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
.black-list {
  flex: 1;
  display: flex;
}

.tton {
  width: 40px;
  height: 30px;
  position: absolute;
  right: 92px;
  border: none;
  border-radius: 5px;
}

.form-group-b {
  width: 400px;
  margin-top: -70px;
}

.form-group {
  width: 400px;
}

.box {
  border: solid red;
  justify-content: space-between;
  padding: 10px;
  margin: 5px;
}

.form-groups {
  margin-bottom: 0.5rem;
}
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
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
.table-section {
  display: block;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 40px;
  /*max-width: 100%;*/
}
.pointer {
  cursor: pointer;
}

.text-title {
  font-size: 0.875rem;
  font-weight: 600;
}
.item-right {
  padding-left: 90%;
  cursor: pointer;
  margin: 0px 0% -10px 0px;
  float: right !important;
}
.vodal-dialog {
  overflow-y: scroll;
  overflow-x: hidden !important;
  background-color: #fff;
}
.vodal-dialog .card {
  box-shadow: none !important;
}
body {
  overflow-x: hidden !important;
}
.text-title {
  font-size: 0.875rem;
  font-weight: 600;
}
.view-more-customer-info {
  color: #545b62;
}
.view-more-customer-info .view-more-top {
  margin-bottom: 10px;
}
.view-more-top .queue-title {
  margin-bottom: 2px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #9e9e9e;
}
p {
  color: #495057;
}
.view-more-customer-info p {
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 0;
}
.view-more-top .queue-value {
  font-size: 14px;
  line-height: 18px;
  color: #212121;
  margin-bottom: 20px;
}
.view-more-top .queue-title {
  margin-bottom: 2px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #9e9e9e;
}
.view-more-customer-info {
  color: #545b62;
}
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #495057;
}
.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f9fa;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #eff2f7;
}

.card-title {
  font-size: 15px;
  margin: 0 0 7px 0;
  font-weight: 600;
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
.page-table-head:first-child {
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
}
.page-table-head {
  margin-top: -20px;
  padding: 0.05rem 1.5rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.file-label-helper {
  display: block;
  line-height: 1.4;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  color: white;
}

.input-group {
  display: table;
  border-collapse: collapse;
  width: 100%;
}
.input-group > div {
  display: table-cell;
  border: 1px solid #ddd;
  vertical-align: middle; /* needed for Safari */
}
.input-group-icon {
  background: #eee;
  color: #777;
  padding: 0 4px;
  font-size: 0.875rem;
}
.input-group-area {
  width: 100%;
}
.input-group input {
  /*border: 0;*/
  border-radius: 0.25rem;
  display: block;
  width: 100%;
  padding: 8px;
}

.no-data {
  width: 500px;
  max-width: 90%;
  margin: 100px auto;
}
.no-data p {
  margin: 0 auto 10px;
  max-width: 450px;
  line-height: 1.4;
}
.empty-history {
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}
.empty-history span {
  display: block;
  margin-bottom: 7px;
}
.empty-history span svg {
  /* fill: #6e0400; */
  height: 30px;
  width: 30px;
  margin: 0 auto;
  display: block;
}
svg {
  overflow: hidden;
  vertical-align: middle;
}
.empty-history span svg circle {
  fill: #ca0305;
  /* fill: #EFCE4A; */
}
.empty-history span svg line {
  fill: none;
  stroke-width: 2;
  stroke: #fff;
}

hr.solid {
  border-top: 1.5px solid #bbb;
  width: 30px;
  transform: rotate(90deg);
  margin: 17px 14px 0px 14px;
}
.drop-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}


.our-team {
  padding: 30px 0 40px;
  margin-bottom: 30px;
  background-color: #ffffff80;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius:5%;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);
}

.our-team .picture {
  display: inline-block;
  height: 100%;
  width: 100%;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
}

.our-team .picture::before {
  content: "";
  width: 100%;
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
  width: 50%;
  height: 50%;
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

</style>
