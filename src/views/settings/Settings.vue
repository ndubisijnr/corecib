<template>
  <div>
    <div class="container-fluid mt-0">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
         <span :class="{ 'spinner-border': loading }"></span>

            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane id="tab-0" :key="1"  label="Profile">
                <b-container class="p-3" v-if="!loading">
                  <b-form class="container p-3 form-group">
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
                  <div class="d-flex justify-content-center w-100">
                    <div class="">
                      <form
                        class="form-group"
                        @submit.prevent="updateOrginasation()"
                      >
                        <h3 class="text-center">
                          <i class="fa fa-user-circle profile-settings"></i>
                        </h3>
                        <h6 class="text-center">
                          <b>Business Details </b>
                          <i class="fa fa-info-circle"></i>
                        </h6>
                        <div>
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
                            />
                            <label for="floatingInput1">Country</label>
                          </div>
                        </div>

                        <!-- Second layer -->
                        <div class="">
                          <div class="form-floating mb-3">
                            <input
                              type="text"
                              class="form-control"
                              id="floatingInput2"
                              placeholder="!004 Federal Housing Estate, Victoral Island"
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
                             
                              required
                            />
                            <label for="floatingInput1">State</label>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              class="form-select"
                              aria-label="Default select example"
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
                             
                            />
                            <label for="floatingInput1">Company Website</label>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                             
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
                        </div>
                      </form>

                      <!-- third phase -->
                      <div>
                          <div class="form-floating mb-3 card">
                            <input
                              type="text" 
                              class="form-control"
                              id="floatingInput2"
                              placeholder="1004 Federal Housing Estate, Victoral Island"
                        
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
                             
                              readonly
                            />
                            <label for="floatingInput1">State</label>
                          </div>
                          <div class="form-floating mb-3">
                            <select
                              class="form-select"
                              aria-label="Default select example"
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
                             
                              readonly
                            />
                            <label for="floatingInput"
                              >Business Registration No</label
                            >
                          </div>
                      </div>

                    <div class="" >
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
                    >
                      <template #header>
                          <b-container class="text-right">
                             <b-button @click="regenerateApiKey()" style="background-color:var(--primary);border:none;">Generate Api Key</b-button>
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
import OrganisationRequest from "../../model/request/OrganisationRequest";
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
      updateOrganisationModel: OrganisationRequest.updateOrganisation,
      files:[],
      activeName: "first",
      selectedItem: {},
      blacklist: false,
      show: "first",
      page: "profile",
      light: "light",
      nav: "false",
      edit: "null",
      errorArr:[],
      apikeyModel: ApikeyRequest.regenerateApiKey,
      documentModel: DocumentRequest.createDocument,
      readDoc: DocumentRequest.readDocument,
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
  },

  mounted() {
    console.log(this.apikeyModel)
    this.apikeyModel.organisationId = localStorage.organisationId;
    console.log("hello before", this.apikeyModel)

    this.apikeyModel.organisationId = "1";
    this.readDoc.readAll = 'YES';
    StoreUtils.dispatch(
        StoreUtils.actions.document.readDocument,
        {readAll:this.readDoc.readAll}
    );
    console.log("hello after")
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



</style>
