<template>
<div>
    <notifications></notifications>
<base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Create Bank</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Bank</a></li>
              <li class="breadcrumb-item active" aria-current="page">Create Bank</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
      </base-header>
<div class="container-fluid mt--6">
      <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-4 col-12">
       
          <user-info></user-info>
         
          </div>
        <div class="col-lg-8 col-md-8 col-sm-8 col-12">
            <card>
    <!-- Card header -->
    <h3 slot="header" class="mb-0">Upload Bank Logo</h3>

    <!-- Card body -->
    
    <form 
          @submit.prevent="submitForm">
      <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <base-input label="Bank Logo">
          <b-form-file accept="image/*" id="myfile"  @change="handleImage"
      v-model="model.logo"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <p v-show="logoCtrl" class="form-error-message"> The Bank Logo is required </p>
                </base-input>
    
        </div>
      </div>

      <div class="text-right">
          <base-button icon type="primary" native-type="submit" :class="{disabled:loading_bank}">
     <span class="btn-inner--text">Submit</span>
       <span :class="{'spinner-border': loading_bank}"></span>
     </base-button>
      <!--<base-button type="primary" native-type="submit">Submit form</base-button>-->
      </div>
    </form>
  </card>
  
        </div>
      </div>
</div>
</div>
</template>
<script>
import BaseHeader from '@/components/BaseHeader';
import country from '@/components/country';
import UserInfo from './UserInfo.vue';
import vSelect from 'vue-select';
import { Select, Option } from 'element-ui';
import { mapState, mapActions, mapGetters } from "vuex";
export default {

    components: {
        BaseHeader,
        UserInfo,
      },
    data() {
      return {
          //selected_bankCode:{},
          //option_bank:[{value:'00001',label:'VI'},{value:'00002',label:'Ikeja'}],
          logoCtrl:false,
          image_data:{},
        model: {
            logo:[],
           
        }
      }
    },
    methods: {
        handleImage(e){
    const selectedImage = e.target.files[0];
    this.createBase64Image(selectedImage);
},
createBase64Image(fileObject){
    const reader = new FileReader();
    reader.onload=(e)=>{
        this.model.logo[0]=e.target.result;
    }
    reader.readAsDataURL(fileObject);
},



        getBase64(file) {
    //var result;
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
    // console.log(reader.result);
     return reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
     return error;
   };
  // return result;
},


 submitForm() {
if(this.validateSelect()){
console.log(this.model.logo[0]);
   this.$store.dispatch("bankLogos", {
              username:`bankLogo_${this.userInformation.userBankCode}`,
              base64:this.model.logo[0],
              region:"us-east-1",
              source:'quickgem',
              s3bucket:'quikgem-repo',
              bankCreatedBy:this.userInformation.userId,
              bankLogoMaker:this.userInformation.userId,
              bankCode:this.userInformation.userBankCode
              } , { root: false });

          }
},
         resetForm(){
            //console.log(`>>><<<${this.nameCtrl}`);
            this.inputRequired=true;
        },
      submit: function(event) {
          console.log(`>>><<<${this.validateSelect()}`);
          if(this.validateSelect()){

          }
      },
      validateSelect(){
          if( document.getElementById("myfile").files.length == 0 ){
   this.logoCtrl=true;
}
else{
              this.logoCtrl=false;
          }
          
          return !this.logoCtrl;
      },
      notifyVue(type = 'default',msg) {
        console.log(type);
        this.$notify({
          message:`<b>${msg}</b>`,
          timeout: 5000,
          icon: 'ni ni-bell-55',
          type
        });
      },
    },
    watch:{
    image_data(){
        console.log(JSON.stringify(this.image_data))
        
    },

    error_bank(newValue, oldValue) {
      ///console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.notifyVue("danger", `${newValue}`);
        //this.showDismissibleAlert=true;
      }
    },
    success_bank(newValue, oldValue) {
      ///console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.notifyVue("success", `${newValue}`);
        //this.showDismissibleAlert=true;
      }
    }
    },
   mounted:function (){
    
    },
    computed:{
           ...mapState({
              userInformation: state => state.auth.userInfo,
        response_user: state => state.user.user_response,
    response_bank: state => state.bank.bank_response, loading_bank: state => state.bank.bank_loading,
    success_bank: state => state.bank.bank_success,error_bank: state => state.bank.bank_errors,
    error_user: state => state.user.user_error
    
    }),
    ...mapActions(['userRead']),
    ...mapGetters([""]),
    
    }
  }
</script>
<style lang="css" scoped>
@keyframes spinner-border {
  to { transform: rotate(360deg); }
}

.spinner-border {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: text-bottom;
    border: .25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
    animation: spinner-border .75s linear infinite;
}
 .form-error-message {
   width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #fb6340;
}
</style>
