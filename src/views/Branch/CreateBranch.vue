<template>
<div>
    <notifications></notifications>
<base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Create Branch</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Branch</a></li>
              <li class="breadcrumb-item active" aria-current="page">Create Branch</li>
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
        <!--<div v-if="option_user.length!==0">-->
          <user-info></user-info>
          </div>
          
         <!-- </div>-->
        <div class="col-lg-8 col-md-8 col-sm-8 col-12">
            <div v-if="option_user.length!==0">
          <card>
    <!-- Card header -->
    <h3 slot="header" class="mb-0">Create Branch</h3>

    <!-- Card body -->
    
    <form @click="resetForm"
          @submit.prevent="submit">
      <div class="row">
       <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Branch Name"
                      name="Branch Name"
                      placeholder="Branch Name"
                      :required='inputRequired'
                      v-model="model.branchName">
          </base-input>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
<base-input label="Branch Type">
                      <el-select class="select-danger" clearable
             placeholder="Branch Type"
             v-model="model.branchType">
    <el-option v-for="option in option_branch_type"
               class="select-danger"
               :value="option.value"
               :label="option.label"
               :key="option.label">
    </el-option>
  </el-select>
  <p v-show="branchCtrl" class="form-error-message"> The Branch Type is Required' </p>
                    </base-input>
        </div>

      </div>

      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Branch Address"
                      name="Branch Address"
                      placeholder="Branch Address"
                      :required='inputRequired'
                      v-model="model.branchAddress">
          </base-input>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
<base-input label="Branch Manager">
                      <el-select class="select-danger" clearable
             placeholder="Branch Manager"
             v-model="model.branchManager">
    <el-option v-for="option in option_user"
               class="select-danger"
               :value="option.value"
               :label="option.label"
               :key="option.label">
    </el-option>
  </el-select>
  <p v-show="branchMgtCtrl" class="form-error-message"> Branch Manager is Required' </p>
                    </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Branch City"
                      name="Branch City"
                      placeholder="Branch City"
                      :required='inputRequired'
                      v-model="model.branchCity">
          </base-input>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Branch Region"
                      name="Branch Region"
                      placeholder="Branch Region"
                      :required='inputRequired'
                      v-model="model.branchRegion">
          </base-input>
        </div>
      </div>

      <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Branch State"
                      name="Branch State"
                      placeholder="Branch State"
                      :required='inputRequired'
                      v-model="model.branchState">
          </base-input>
        </div>
<div class="col-lg-6 col-md-6 col-sm-6 col-12">
<base-input label="Country">
                      <el-select class="select-danger" clearable filterable
             placeholder="Country"
             v-model="model.branchCountry">
    <el-option v-for="option in option_country"
               class="select-danger"
               :value="option.value"
               :label="option.label"
               :key="option.value">
    </el-option>
  </el-select>
  <p v-show="countryCtrl" class="form-error-message"> The Role Name is required </p>
                    </base-input>
        </div>

        
      </div>

      <div class="text-right">
          <base-button icon type="primary" native-type="submit" :class="{disabled:loading_branch}">
     <span class="btn-inner--text">Submit</span>
        <span :class="{'spinner-border': loading_branch}"></span>
     </base-button>
      <!--<base-button type="primary" native-type="submit">Submit form</base-button>-->
      </div>
    </form>
  </card>
  </div>
    <div v-else>
              <LoadingPanel></LoadingPanel>
          </div>
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
import LoadingPanel from '@/components/LoadingPanel';
export default {

    components: {
        BaseHeader,
        UserInfo,
        LoadingPanel,
        //vSelect,
        //[Select.name]: Select,
        //[Option.name]: Option
    },
    data() {
      return {
          //selected_branchCode:{},
          option_user:[],
          option_country:[],
          option_branch_type:[{value:'Unit',label:'Unit'}],
          //option_branch:[{value:'00001',label:'VI'},{value:'00002',label:'Ikeja'}],
          branchCtrl:false,
          countryCtrl:false,
          branchMgtCtrl:false,
          inputRequired:true,
        model: {
            branchName:'',
            branchType:'',
            branchAddress:'',
            branchManager:'',
            branchCity:'',
            branchRegion:'',
            branchState:'',
            branchCountry:''
        }
      }
    },
    methods: {
         resetForm(){
            //console.log(`>>><<<${this.nameCtrl}`);
            this.inputRequired=true;
        },
      submit: function(event) {
          console.log(`>>><<<${this.validateSelect()}`);
          if(this.validateSelect()){

          this.model.branchCreatedBy= this.userInformation.userId;
          this.model.branchLocation="0000,0000"
this.model.branchCategory="A";
this.model.branchMaker= this.userInformation.userId;
this.model.branchBankCode=this.userInformation.userBankCode;
this.model.requestType="create";
this.model.source="CBA"
       console.log(`>>>>>>> Model ${JSON.stringify(this.model)}`);
          this.$store.dispatch("branchcreate", this.model , { root: false });
          this.inputRequired=false;

          this.model={
            branchName:'',
            branchType:'',
            branchAddress:'',
            branchManager:'',
            branchCity:'',
            branchRegion:'',
            branchState:'',
            branchCountry:''
        };
        
          //event.target.reset();

          }   
      },
      validateSelect(){
          if(this.model.branchType===""){
              this.branchCtrl=true;
          }
          else{
              this.branchCtrl=false;
          }
          if(this.model.branchManager===""){
              this.branchMgtCtrl=true;
          }
          else{
              this.branchMgtCtrl=false;
          }
          if(this.model.branchCountry===""){
              this.countryCtrl=true;
          }
          else{
              this.countryCtrl=false;
          }
          return !this.countryCtrl && !this.branchMgtCtrl && !this.branchCtrl;
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
        response_user(newValue, oldValue) {
      //console.log(`Updating from Branch ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`);
       if(Object.keys(this.response_user).length !== 0){
    var user = [];
    user = this.response_user.data;
    this.option_user = user.map((item) => {
            return {
                value: `(${item.userId}) ${item.userFirstName} ${item.userMiddleName} ${item.userLastName}`,
                label: `(${item.userId}) ${item.userFirstName} ${item.userMiddleName} ${item.userLastName}`
            };
        });
        console.log('//////////');
//console.log("&$$$$$&"+this.option_branch);
      
    }
        },
        success_branch(newValue, oldValue) {
     console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.notifyVue("success", `${newValue}`);
        //this.showDismissibleAlert=true;
      }
    },
    error_user(newValue, oldValue) {
      //console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.notifyVue("danger", `${newValue}`);
        //this.showDismissibleAlert=true;
      }
    }
    ,
    error_branch(newValue, oldValue) {
      ///console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.notifyVue("danger", `${newValue}`);
        //this.showDismissibleAlert=true;
      }
    }
    },
   mounted:function (){
    let countries = country;
    this.option_country = countries.map((item) => {
            return {
                value: `${item.name}`,
                label: `${item.name}`
            };
        });
    this.$store.dispatch("userRead", {
              readAll: "YES",
              source:'CBA',
              userBankCode:this.userInformation.userBankCode,
              } , { root: false });
    
    },
    computed:{
           ...mapState({
               //errors: state => state.role.role_errors,loading: state => state.role.role_loading,
    //success: state => state.role.role_success,
    userInformation: state => state.auth.userInfo,
    //response: state => state.role.role_response, response_read: state => state.role.role_read_response,
    response_user: state => state.user.user_response,
    response_branch: state => state.branch.branch_response, loading_branch: state => state.branch.branch_loading,
    success_branch: state => state.branch.branch_success,error_branch: state => state.branch.branch_errors,
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
