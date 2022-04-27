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
               <div style="width:100%;display:flex;justify-content:center;">

                  <b-form class="container p-3 form-group" style="width:400px">
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
               </div>
                </b-container>
              </el-tab-pane>

              <!-- END PROFILE -->

              <el-tab-pane
                id="tab-1"
                :key="2"
                name="second"
                label="Business Profile"
              >
                <div class="m-3">
                   
                  <div class="d-flex w-100">
                     <div style="width:18%">
                      <step-progress :steps="mySteps" 
                      :active-thickness=1 
                      :passive-thickness=1 
                      :current-step="currentStep"
                        icon-class="fa fa-check" 
                        active-color="var(--primary)"
                        :line-thickness=1
                        
                        >
                      </step-progress>
                      


                  </div>
                    <div style="width:70%;display:flex;justify-content:center;" v-if="currentStep == 1 && organisation.organisationCity == null" >
                      <form
                        class="form-group"
                        @submit.prevent="updateOrginasation()"
                        style="width:400px"
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
                         

        
                         <div style="display:flex; justify-content:space-between">
                          <base-button title="Update" :loading="loading" :disabled="true ? checkInputfield.organisationWebsite : false" :class="{'not-allowed' : checkInputfield.organisationWebsite}"> 
                          </base-button>
                          <b-button @click="nextStep()" title="" style="background-color:grey;border:none">Next</b-button>
                         </div>
                        </div>
                      </form>

                    </div>

                    <!-- show edited form -->
                  <div style="width:70%;display:flex;justify-content:center;" v-if="currentStep == 1 && organisation.organisationCity !== null" >
                      <form
                        class="form-group"
                        style="width:400px"
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
                              readonly
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
                               readonly
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
                               readonly
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
                              readonly

                            >
                              <option>FINTECH</option>
                            </select>
                            <label for="floatingInput3"
                              >Organization Type</label
                            >
                          </div>
                          

        
                         <div style="display:flex; justify-content:space-between">
                          <!-- <base-button title="Update" :loading="loading" :disabled="true ? checkInputfield.organisationWebsite : false" :class="{'not-allowed' : checkInputfield.organisationWebsite}"> 
                          </base-button> -->
                          <b-button @click="nextStep()" title="" style="background-color:grey;border:none">Next</b-button>
                         </div>
                        </div>
                      </form>

                    </div>
                    <!-- end show edited form -->

                      <!-- third phase -->
                    

                    <div style="width:70%;display:flex;justify-content:center;" v-else>
                      <div>
                        <div class="text-center">
                          <i class="fa fa-user-circle profile-settings"></i>
                          <br>
                          <b>Business Details </b>
                          <i class="fa fa-info-circle"></i>
                        </div>
                      <div class="text-center">  
                      <!--<h5>Please upload all {{documents.data.length}} documents </h5>-->
                      <b-button @click="currentStep = 1" title="" style="background-color:var(--primary);border:none">Back</b-button>

                      </div>
                      <br />
                      <div class="">
                        <span :class="{'spinner-loader':loading}"></span>
                        <div>
                        
                              <div  v-if="'data' in documents">
                                <!-- Card body -->

                                <div class="" style="display:flex;align-items:center;flex-wrap:nowrap">
                                  <div class="" v-for="(doc, index) in documents.data"
                                       :key="index">
                                    <div v-if="'documentStatus' in doc && 'documentUrl' in doc">
                                      <!--<span>{{progressBarArr[index].value}}</span>-->
                                      <div class="our-team">
                                        <progress-bar v-show="progressBarArr[index].value"></progress-bar>
                                        <div class="picture">
                                          <img v-if="doc.documentStatus =='PENDING'" class="img-fluid img-size " src="https://coregem-imgs.s3.amazonaws.com/document-amber.png">
                                          <img v-else-if="doc.documentStatus =='APPROVED'" class="img-fluid img-size" src="https://coregem-imgs.s3.amazonaws.com/document-green.png">
                                          <img v-else-if="doc.documentStatus =='REJECTED'" class="img-fluid img-size" src="https://coregem-imgs.s3.amazonaws.com/document-red.png">
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
                                        <!--<p v-show="progressBarArr[index]" class="form-error-message"> The File is required </p>-->
                                        <div class="our-team">
                                          <progress-bar v-show="progressBarArr[index].value"></progress-bar>
                                          <div class="picture">
                                            <label class="pointer">
                                              <input type="file" :ref="'file-input'+index" style="display: none;" accept="application/pdf, image/*" :id="'myfile'+index"  @change="handleImages($event,index,doc,'CREATE')">
                                              <img class="img-fluid img-size" src="https://coregem-imgs.s3.amazonaws.com/document-grey.png" alt=""/>
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
import StepProgress from 'vue-step-progress';
import 'vue-step-progress/dist/main.css';
import Swal from "sweetalert2";
import BaseButton from "../../components/button/BaseButton"
import OrganisationRequest from "../../model/request/OrganisationRequest";
import ProgressBar from "@/components/ProgressBar";
export default {
  name: "Settings",
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    ApiKeyDisplayForm,
    BaseButton,
    'step-progress': StepProgress,
    ProgressBar
  },
  data() {
    return {
      updateOrganisationModel: OrganisationRequest.updateOrganisation,
      files:[],
      selectedItem: {},
      blacklist: false,
      show: "first",
      page: "profile",
      light: "light",
      nav: "false",
      edit: "null",
      progressBarArr:[],
      organisation: JSON.parse(JSON.stringify(StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization))),
      mySteps:["Profile", "Document Upload"],
      currentStep:1,
      apikeyModel: ApikeyRequest.regenerateApiKey,
      documentModel: DocumentRequest.createDocument,
      readDoc: DocumentRequest.readDocument,
  };
  },

  props:['Step 1', 'Step 2','icon-class','active-color','active-thickness','passive-thickness','line-thickness'],
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
      loadingDoc: (state) => state.document.loading,
     //documents:(state) => state.document.document

    }),
    documents: () =>{
      console.log("progressBarArr")
      let vm = this
      let doc = StoreUtils.rootGetters(StoreUtils.getters.document.getDocuments);
      console.log("progressBarArr",doc.data.length)
      //vm.progressBarArr = [...Array(doc.data.length)].fill(false)
      /*for(let i = 0; i < doc.data.length; i++){
        vm.progressBarArr[i] = false
        console.log("progressBarArr",i)
      }*/
      return doc
      },

    checkInputfield: () => {
      let organization = StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
      return organization
    },
    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },

  },
  watch:{
  documents(newValue){
    console.log("progressBarArrNew",newValue.data.length)
    this.progressBarArr=[];
    //this.progressBarArr = [...Array(newValue.data.length)].fill(false)
    for(let i = 0; i < newValue.data.length; i++){
      this.progressBarArr.push({
        value:false
      })
      console.log("progressBarArr",i)
    }
  }
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
    nextStep(){
      if(this.organisation.organisationState != null){
        this.currentStep = 2
      }else{
       Swal.fire({ text: "Please Fill Out All required Field", icon: 'error', }).then(() => { })
      }
    },
    submitDocument(index,doc, action){
      console.log('Testing'+index);
      this.documentModel.fileUpload.username = `${this.currentOrganisation.organisationName}_${doc.documentTypeName.replace(/[^a-zA-Z ]/g, "")}_${Math.random()} `
      this.documentModel.fileUpload.base64 = this.files[index]
      this.documentModel.document.documentDocumentTypeId = doc.documentTypeId
      if(action==='UPDATE'){
        this.progressBarArr[index].value=true;
        console.log("Conditions>> ",this.progressBarArr[index].value)
        this.documentModel.document.documentId = doc.documentId
        StoreUtils.dispatch(
            StoreUtils.actions.document.updateDocument,
            this.documentModel
        );
      }
      else{
        this.progressBarArr[index].value=true;
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
      this.organisation.organisationId = localStorage.organisationId
      this.organisation.organisationLogo = "company Logo"
      StoreUtils.dispatch(
        StoreUtils.actions.auth.updateOrganisation,
        this.organisation
      ).then(()=>{
        localStorage.taged = "YES"
      })
      console.log( this.organisation)
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

.not-allowed{
  cursor:not-allowed;
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

.our-team {
  padding: 40px;
  width: 100%;
  height: 25vh;
  background-color: #ffffff80;
  text-align: center;
  overflow: hidden;
  position: relative;
  border-radius:5%;
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
.img-size{
    width: 32px !important;
    height: 32px !important;
}


</style>
