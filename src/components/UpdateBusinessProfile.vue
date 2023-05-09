<template>
  <div class="business-profile">
    <form class="form-group" @submit.prevent="ReupdateOrginasation()">
      <div>
        <div class="row">
          <div class="col mb-3">
            <label for="floatingInput2">Business Name</label>
            <input type="text" class="form-control" id="organisationName"  :value="organisationRes.organisationName" :readonly="organisationRes.organisationName" />
          </div>
          <div class="col mb-3">
            <label for="floatingInput">Company Email</label>
            <input type="email" class="form-control" id="organisationEmail"  :value="organisationRes.organisationEmail" :readonly="organisationRes.organisationEmail" />
          </div>
          <div class="col mb-3">
            <label for="floatingInput1">Company Phone</label>
            <input type="tel" class="form-control" id="organisationPhone" :value="organisationRes.organisationPhone" :readonly="organisationRes.organisationPhone" />
          </div>
        </div>
      </div>
        <section class="section-1">
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput1">City</label>
              <input type="text" class="form-control"  placeholder="Ikeja" v-model="organisationRes.organisationCity" required />
            </div>
            <div class="col mb-3">
              <label for="floatingInput2">Address</label>
              <input type="text" class="form-control" placeholder="1004 Federal Housing Estate, Victoral Island"  id="organisationAddress" v-model="organisationRes.organisationAddress" required />
            </div>
            <div class="col mb-3">
              <label for="floatingInput1">State</label>
              <input type="text" class="form-control"  placeholder="Lagos" v-model="organisationRes.organisationState" id="organisationState" required />
            </div>
          </div>
        </section>
      <!---------------------------------------------  Second layer ------------------------------------------------------>
      <section class="section-2">
        <div class="row">
          <div class="col mb-3">
            <label for="floatingInput3">Organization Type</label>
            <select class="form-select form-control" aria-label="Default select example" v-model="organisationRes.organisationType">
              <option data-v-00a70ddc="" value="Agric produce">
                Agric produce
              </option>
              <option data-v-00a70ddc="" value="Betting/Lottery">
                Betting / Lottery
              </option>
              <option data-v-00a70ddc="" value="Book Stores">
                Book Stores
              </option>
              <option data-v-00a70ddc="" value="Bus Lines">
                Bus Lines
              </option>
              <option data-v-00a70ddc="" value="Cable/Satellite/Pay Television">
                Cable / Satellite / Pay Television
              </option>
              <option data-v-00a70ddc="" value="Clothing and Accessories">
                Clothing and Accessories
              </option>
              <option data-v-00a70ddc="" value="Commercial footware">
                Commercial footware
              </option>
              <option data-v-00a70ddc="" value="Credit Lending Companies">
                Credit Lending Companies
              </option>
              <option data-v-00a70ddc="" value="Cryptocurrency">
                Cryptocurrency
              </option>
              <option data-v-00a70ddc="" value="Department Stores">
                Department Stores
              </option>
              <option data-v-00a70ddc="" value="Digital Goods/Entertainment">
                Digital Goods / Entertainment
              </option>
              <option data-v-00a70ddc="" value="Education">
                Education
              </option>
              <option data-v-00a70ddc="" value="Electronics Stores">
                Electronics Stores
              </option>
              <option data-v-00a70ddc="" value="Financial Institutions/Fund Manager/Investment">
                Financial Institutions / Fund Manager /
                Investment
              </option>
              <option data-v-00a70ddc="" value="General Contractors">
                General Contractors
              </option>
              <option data-v-00a70ddc="" value="General Merchandise Stores">
                General Merchandise Stores
              </option>
              <option data-v-00a70ddc="" value="Grocery Stores and Supermarkets">
                Grocery Stores and Supermarkets
              </option>
              <option data-v-00a70ddc="" value="Hospitality/Lodging">
                Hospitality / Lodging
              </option>
              <option data-v-00a70ddc="" value="Insurance">
                Insurance
              </option>
              <option data-v-00a70ddc="" value="Money Transfer">
                Money Transfer
              </option>
              <option data-v-00a70ddc="" value="Non-Financial Institution">
                Non-Financial Institution
              </option>
              <option data-v-00a70ddc="" value="Professional Services">
                Professional Services
              </option>
              <option data-v-00a70ddc="" value="Real Estate/Facility Management">
                Real Estate / Facility Management
              </option>
              <option data-v-00a70ddc="" value="Religious Organizations">
                Religious Organizations
              </option>
              <option data-v-00a70ddc="" value="Security Broker/Dealer_Custom">
                Security Broker / Dealer_Custom
              </option>
              <option data-v-00a70ddc="" value="Security Brokers/Dealers">
                Security Brokers / Dealers
              </option>
              <option data-v-00a70ddc="" value="Tax/Accounting/Audit">
                Tax / Accounting / Audit
              </option>
              <option data-v-00a70ddc="" value="Taxicabs">
                Taxicabs
              </option>
              <option data-v-00a70ddc="" value="Telecommunication">
                Telecommunication
              </option>
              <option data-v-00a70ddc="" value="Ticketing/Events">
                Ticketing / Events
              </option>
              <option data-v-00a70ddc="" value="Transportation Services">
                Transportation Services
              </option>
              <option data-v-00a70ddc="" value="Travel/Airlines">
                Travel / Airlines
              </option>
              <option data-v-00a70ddc="" value="Travel Agencies/Tour">
                Travel Agencies / Tour
              </option>
              <option data-v-00a70ddc="" value="Utilities/Electric/Gas">
                Utilities / Electric / Gas
              </option>
              <option data-v-00a70ddc="" value="Video Game Arcades/Establishments">
                Video Game Arcades / Establishments
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label for="floatingInput1">Organisation Website</label>
            <input type="text" class="form-control"  placeholder=" Website" v-model="organisationRes.organisationWebsite"  id="organisationWebsite"/>
          </div>
          <div class="col mb-3">
            <label for="floatingInput1">RC / BN Number</label>
            <input type="text" class="form-control" placeholder="Organisation RC / BN Number" id="organisationRegistrationNo" v-model="organisationRes.organisationRegistrationNo"  />
          </div>
        </div>
      </section>

      <section class="section-3">
        <div>
          <div class="text-center mt-3 mb-3">
            <h2 class="mt-2"><span>Director 1</span></h2>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Full Name <span style="color: red">*</span></label>
              <input type="text" class="form-control" id="organisationDirectorName" placeholder="Directors Full name"  required v-model="organisationRes.organisationDirectorName"  />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Dob <span style="color: red">*</span></label>
              <input type="date" class="form-control" id="organisationDirectorDob"  required v-model="organisationRes.organisationDirectorDob"/>
            </div>
            <div class="col mb-3">
              <label for="floatingInput">BVN <span style="color: red">*</span></label>
              <input type="number" class="form-control" id="organisationDirectorBvn" placeholder="Bank Verification Number"  required v-model="organisationRes.organisationDirectorBvn"/>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2"> ID Card Type<span style="color: red">*</span></label>
              <select @change="showModalDirector1 = !showModalDirector1" class="form-select form-control" aria-label="Default select example" required id="organisationDirectorIdCardType" v-model="organisationRes.organisationDirectorIdCardType">
                <option value="national_id_card">National ID Card</option>
                <option value="international_passport">International Passport</option>
                <option value="permanent_voters_card">Permanent Voters Card(PVC)</option>
                <option value="drivers_licence">Drivers Licence</option>
              </select>
            </div>
            <div class="col mb-3" style="padding-top:30px ">
              <div v-if="!organisationRes.organisationDirectorIdCard">
                <label for="floatingInput">{{ !uploadState1 ? 'Upload ID Card' : organisationRes.organisationDirectorIdCardType + ' Uploaded' }}<span style="color: red">*</span></label><br/>
                <b-button :style="{backgroundColor:primaryColor,color:'#FFF'}" @click="showModalDirector1 = !showModalDirector1" disabled>{{!uploadState1 ? 'Upload file' : 'File Uploaded' }}</b-button>
              </div>
              <a v-else :href="organisationRes.organisationDirectorIdCard" target="_blank"><b-button>View Uploaded ID</b-button></a>
            </div>
          </div>
        </div>
      </section>

      <section class="section-4">
        <div>
          <div class="text-center mt-3 mb-3">
            <h2 class="mt-2"><span>Director 2</span></h2>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Full Name </label>
              <input type="text" class="form-control"  placeholder="Director's Full name" v-model="organisationRes.organisationDirectorName2" />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2">Dob</label>
              <input type="date" class="form-control" id="organisationDirectorDob2"  v-model="organisationRes.organisationDirectorDob2" />
            </div>
            <div class="col mb-3">
              <label for="floatingInput">BVN </label>
              <input type="number" class="form-control" id="organisationDirectorBvn2"   placeholder="Bank Verification Number" v-model="organisationRes.organisationDirectorBvn2" />
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <label for="floatingInput2"> ID Card Type</label>
              <select @change="showModalDirector2 = !showModalDirector2" class="form-select form-control" aria-label="Default select example"  id="organisationDirectorIdCardType2" v-model="organisationRes.organisationDirectorIdCardType2">
                <option value="national_id_card">National ID Card</option>
                <option value="international_passport">International Passport</option>
                <option value="permanent_voters_card">Permanent Voters Card(PVC)</option>
                <option value="drivers_licence">Drivers Licence</option>
              </select>
            </div>
            <div class="col mb-3" style="padding-top:30px ">
              <div v-if="!organisationRes.organisationDirectorIdCardType2">
                <label for="floatingInput">{{!uploadState2 ? 'Upload ID Card' : organisationRes.organisationDirectorIdCardType2 + ' Uploaded' }} <span style="color: red">*</span></label><br/>
                <b-button :style="{backgroundColor:primaryColor,color:'#FFF'}" @click="showModalDirector2 = !showModalDirector2" disabled>{{!uploadState2 ? 'Upload file' : 'File Uploaded' }}</b-button>
              </div>
              <a v-else :href="organisationRes.organisationDirectorIdCard2" target="_blank"><b-button>View Uploaded ID</b-button></a>
            </div>
          </div>
        </div>
      </section>

        <div class="mt-3">
          <button type="submit" :loading="loadingOtp" :style="{backgroundColor:primaryColor, color:'#FFF', width:'100%',height:'40px'}">Update</button>
        </div>
    </form>
    <upload-image-modal
        :show="showModalDirector1"
        :is-loading="loadingDoc"
        upload-type="document/uploadDocument"
        :upload-data="this.files"
        :file-name="organisationRes.organisationDirectorIdCardType"
        :director-type="1"
    >
    </upload-image-modal>
    <upload-image-modal
        :show="showModalDirector2"
        :is-loading="loadingDoc"
        upload-type="document/uploadDocument"
        :upload-data="this.files"
        :file-name="organisationRes.organisationDirectorIdCardType2"
        :director-type="2"
    >

    </upload-image-modal>
  </div>
</template>

<script>
import StoreUtils from "../util/baseUtils/StoreUtils";
import {mapState} from "vuex";
import UploadImageModal from "@/components/UploadImageModal";
import BaseButton from "./button/BaseButton";

export default {
  name: "UpdateBusinessProfile",

  components:{
    UploadImageModal,
    BaseButton
  },

  data(){
    return{
      isEditState:false,
      files: [],
      showModalDirector1:false,
      showModalDirector2:false,
      uploadState1:false,
      uploadState2:false,
      primaryColor:window.__env.app.primaryColor,


    }
  },

  methods:{
    disableAllFieldsIfNotEmpty(){
      let formInput =  document.querySelectorAll('section input')
      let formSelect =  document.querySelectorAll('section select')

      for(let i = 0; i < formInput.length; i++){
        if(!formInput[i].value){
          formInput[i].disabled = false;
        }else{
          formInput[i].disabled = true;
        }
      }
      for(let i = 0; i < formSelect.length; i++){
        if(!formSelect[i].value){
          formSelect[i].disabled = false;
        }else{
          formSelect[i].disabled = true;
        }
      }

    },


    ReupdateOrginasation(){
      this.organisationRes.organisationDirectorIdCard = this.director1
      this.organisationRes.organisationDirectorIdCard2 = this.director2
      this.organisationRes.organisationLogo = "companyLogo"
      this.organisationRes.organisationName = this.organisationRes.organisationName
      this.organisationRes.organisationPhone = this.organisationRes.organisationPhone
      this.organisationRes.organisationEmail = this.organisationRes.organisationEmail
      StoreUtils.dispatch(StoreUtils.actions.auth.updateOrganisation, this.organisationRes).then(() => {
        const userToken = localStorage.getItem('token')
        StoreUtils.dispatch(StoreUtils.actions.auth.revalidateUser, userToken)
        StoreUtils.dispatch(StoreUtils.actions.auth.readOrganisationById)
      });
    },

    isEdit(){
      this.isEditState = !this.isEditState
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

    file() {
      this.edit = "second";
    },

    showUploadModal(_director){
      if (_director === 1){
        this.showModal = !this.showModal
      }else{
        this.showModal = !this.showModal
      }

    },

    handleClick(tab, event) {
      //console.log(tab.$vnode.key);
      // console.log(tab.label);
      //console.log(tab, event);
    },
  },

  computed:{
    ...mapState({
      director1:state => state.document.directorIdCard1.url,
      director2:state => state.document.directorIdCard2.url,
      organisationRes:state => JSON.parse(JSON.stringify(state.auth.readOrganisation)),
      loadingOtp: (state) => state.auth.loading,
      loadingDoc: (state) => state.document.loading,
      uploadStateDirectorIdCard1:state => state.document.upload1,
      uploadStateDirectorIdCard2:state => state.document.upload2
    }),
    currentOrganisation() {
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    },
  },

  watch:{
    uploadStateDirectorIdCard1(){
      if(this.uploadStateDirectorIdCard1 === 'success'){
        this.uploadState1 = true
      }
    },
    uploadStateDirectorIdCard2(){
      if(this.uploadStateDirectorIdCard2 === 'success'){
        this.uploadState2 = true
      }
    }
  },

  mounted() {
    this.disableAllFieldsIfNotEmpty()
  }

}
</script>

<style scoped>
.form-group{
  width: 90%;
}

.business-profile{
  width: 100%;
  display: flex;
  justify-content: center;
  margin:10px;
  overflow-x: scroll;
}

@media (max-width:999px) {
  .form-group {
    width: 100%;
  }
}
</style>