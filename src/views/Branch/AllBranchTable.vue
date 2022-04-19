<template>
  <!--<div class="content">
     
    <div class="card">-->
        
      <div>
          <notifications></notifications>
        <card class="no-border-card" body-classes="px-3 pb-1" footer-classes="pb-2">
          <template slot="header">
            <h3 class="mb-0">Branches</h3>
          </template>
          <div>
            <div v-if="Object.keys(response).length !== 0">
              
  <!--<b-container class="table-container">--> <!--class="over-flow">-->
  <div class="form-body">
      <div class="table-section col-12">
    <!-- User Interface controls -->
    <div class="row">

      <div class="col-lg-6 col-md-6 col-sm-6 col-12">
<base-input label="Search"
                      name="search"
                      placeholder="Search"
                      v-model="filter">
          </base-input>
        </div>
</div>
<b-row>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="response.data.length"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div>
    <b-table striped hover  
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="lg"
      show-empty
      large
      :head-variant="light"
      @filtered="onFiltered"
    >
      
      <template #cell(action)="row">
                <template>
                    <el-dropdown trigger="click" class="dropdown">
                    <span class="btn btn-sm btn-icon-only text-dark">
                      <i class="fas fa-ellipsis-v mt-2"></i>
                      <!--<i class="ni ni-settings"></i>-->
                    </span>
                        <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                          <a class="dropdown-item" @click="editBranch(row.item, row.index)">
                             <!-- <i class="far fa-edit"></i>-->
                             <i class="fas fa-user-edit"></i>
                             <!--<i class="ni ni-ruler-pencil"></i>-->
                              Edit</a>
                            <!--<a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
      </template>

      <template #cell(branchStatus)="row">
       <!-- {{ row.value }} {{ row.value}}{{ row.value}}-->
        <template >
                    <badge class="badge-dot mr-4" type="">
                      <div v-if="row.value==='ACTIVE'">
                        <badge type="success" size="lg">ACTIVE</badge>
                        </div>
                        <div v-else>
                        <badge type="danger" size="lg">INACTIVE</badge>
                        </div>
                        <!--<i :class="[row.value == 'ACTIVE' ? 'bg-success' : 'bg-danger']"></i>
                        <span class="status">{{row.value}}</span>-->
                    </badge>
                </template>
      </template>
<template #cell(branchType)="row">
       <template >
                    <badge class="badge-dot mr-4" type="">
                      <div v-if="row.value==='Unit'">
                        <badge type="default" size="lg">UNIT</badge>
                        </div>
                        <div v-else>
                        <badge type="danger" size="lg">UNIT</badge>
                        </div>
                        <!--<i :class="[row.value == 'ACTIVE' ? 'bg-success' : 'bg-danger']"></i>
                        <span class="status">{{row.value}}</span>-->
                    </badge>
                </template>
      </template>

      
      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    </div>

<modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-md">
               <div class="vodal-dialog" style="width: 500px; height: 450px; animation-duration: 300ms;">
                     <article class="item-right" ><!-- @click="displayDetail()">-->
                    <a><span @click="modals.modal3 = false"
            ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="fill:#171717;" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</span></a></article>
<!---<div class="card">-->
  <div class="card-body">
    <div>
      <div class="view-more-customer-info">
        <div class="view-more-customer-info-wrap">
          <div class="view-more-top">
            <h4 class="card-title mb-4">Edit Branch</h4>
            </div>
                        <div class="view-more-base">
                          <div class="table-responsive">
                            <form id="form_update"   @click="resetForm"
          @submit.prevent="submitForm">
                                <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Bank Name"
                      name="Bank Name"
                      placeholder="Bank Name"
                      :required='inputRequired'
                      v-model="model.branchName">
          </base-input>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="Branch Type"
                      name="Branch Type"
                      placeholder="Branch Type"
                      :required='inputRequired'
                      v-model="model.branchType">
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
          <base-input label="Branch Transaction Limit"
                      name="Branch Transaction Limit"
                      placeholder="Branch Transaction Limit"
                      :required='inputRequired'
                      v-model="model.branchTransactionLimit">
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
          <base-input label="City"
                      name="City"
                      placeholder="City"
                      :required='inputRequired'
                      v-model="model.branchCity">
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
  <p v-show="countryCtrl" class="form-error-message"> The Country is required </p>
                    </base-input>
        </div>
      </div>

       <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
          <base-input label="BranchState"
                      name="BranchState"
                      placeholder="BranchState"
                      :required='inputRequired'
                      v-model="model.branchState">
          </base-input>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
           <base-input label="Branch Status">
          <el-select class="select-danger" clearable
             placeholder="Branch Status"
             v-model="model.branchStatus">
    <el-option v-for="option in option_branch_status"
               class="select-danger"
               :value="option.value"
               :label="option.label"
               :key="option.value">
    </el-option>
  </el-select>
  <p v-show="statusCtrl" class="form-error-message"> The Branch Type is Required' </p>
   </base-input>
        </div>
      </div>
                            </form>
                       </div></div>
                    <p class="text-right"><span>
                <span class="authorize-btn"><button  :class="{disabled:loading}" type="submit" form="form_update" class="btn btn-primary mr-1"><i v-if="!loading" class="fas fa-check"></i>Update
                         <span :class="{'spinner-border': loading}"></span> </button>
                                    </span></span></p>
                                            </div></div></div>
  </div>
    <!---</card>
                                                </div></div>-->

               </div>
            
        </modal>
      
</div>
  </div>
  <!--</b-container>-->
          </div>
          <div v-else>
            <LoadingPanel></LoadingPanel>
          </div>
          </div>
          </card>
      </div>
   <!-- </div>
    
  </div>-->
</template>

<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
import { mapState, mapActions, mapGetters } from "vuex";
import LoadingPanel from '@/components/LoadingPanel';
import country from '@/components/country';
import Loader from '@/components/Loader';
import BaseInput from '../../components/Inputs/BaseInput.vue';

  export default {
    components: { 
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      LoadingPanel,
        BaseInput,
      //Loader
      
    },
    data() {
      return {
          option_branch_status:[{value:'ACTIVE',label:'ACTIVE'},{value:'INACTIVE',label:'INACTIVE'}],
          option_user:[],
          option_country:[],
          light:'light',
         inputRequired:true,
         statusCtrl:false,
         branchMgtCtrl:false,
         countryCtrl:false,
        model:{
          branchID:"",
         branchCode:"",
         branchBankCode:"",
         branchLocation:"",
         branchAddress:"",
         branchCity:"",
         branchState:"",
         branchType:"",
         branchCategory:"",
         branchManager:"",
         branchRegion:"",
         branchSource:"",
         branchStatus:"",
         branchCreatedBy:"",
         branchCreatedAt:"",
         branchUpdatedAt:"",
         branchTransactionLimit:"",
         branchCountry:"",
         branchName:"",
         branchMaker:""
},
        modals:{
          modal3:false,
          modal0:false,
          modal1:false,
        },
        items:[],
        fields: [
          { key: 'sn', label: 'S/N', sortable: true, sortDirection: 'desc' },
          { key: 'branchCode', label: 'Branch Code', sortable: true, class: 'text-left' },
          { key: 'branchName', label: 'Branch Name', sortable: true, class: 'text-left' },
          { key: 'bankCode', label: 'Bank Code', sortable: true, class: 'text-left' },
          { key: 'branchManager', label: 'Manager', sortable: true, class: 'text-left' },
          {key: 'branchType',label: 'Type',sortable: true,class: 'text-left'},
          {key: 'branchCity',label: 'City',sortable: true,class: 'text-left'},
          {key: 'branchStatus',label: 'Status',sortable: true,class: 'text-left'},
          //{ key: 'cqType', label: 'Type', sortable: true, class: 'text-left' },
          //{ key: 'cqBankCode', label: 'BankCode  ', sortable: true, class: 'text-left' },
          { key: 'action', label: 'Action' }
       
        ],

        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
       ...mapState({errors: state => state.branch.branch_errors,loading: state => state.branch.branch_loading,
    success: state => state.branch.branch_success,userInformation: state => state.auth.userInfo,
    response: state => state.branch.branch_response,response_user: state => state.user.user_response,
    errors1: state => state.branch.branch_errors1,
    success1: state => state.branch.branch_success1
    }),
    ...mapActions(['branchReadAll','branchUpdate']),
    ...mapGetters(["getBranchResponse"]),
    
    },
    /*mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },*/
    methods: {
         resetForm(){
            //console.log(`>>><<<${this.nameCtrl}`);
            this.inputRequired=true;
        },
        submitForm(){
     // alert('this.model.username');
     if(this.validateSelect()){
        this.inputRequired=false;
         this.$store.dispatch("branchUpdate", this.model, { root: false });
        /* this.model={
          branchID:"",
         branchCode:"",
         branchBankCode:"",
         branchLocation:"",
         branchAddress:"",
         branchCity:"",
         branchState:"",
         branchType:"",
         branchCategory:"",
         branchManager:"",
         branchRegion:"",
         branchSource:"",
         branchStatus:"",
         branchCreatedBy:"",
         branchCreatedAt:"",
         branchUpdatedAt:"",
         branchTransactionLimit:"",
         branchCountry:"",
         branchName:"",
         branchMaker:""
};*/
     }
      },
validateSelect(){
          if(this.model.branchStatus===""){
              this.statusCtrl=true;
          }
          else{
              this.statusCtrl=false;
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
          
          return !this.statusCtrl && !this.branchMgtCtrl&&!this.countryCtrl;
      },

        editBranch(item, index){
           // branchBankCode
        this.modals.modal3 = true;
        this.model.branchStatus=item.branchStatus;
        this.model.branchName=item.branchName;
        this.model.branchCode=item.branchCode;
        this.model.branchBankCode=item.bankCode;
        this.model.branchManager=item.branchManager;
        this.model.branchType=item.branchType;
        let branch_obj=this.response.data.find(obj => ((obj.branchName === this.model.branchName)&&(obj.branchManager===this.model.branchManager)));
        //console.log(`>>???${JSON.stringify(branch_obj)}`);
        this.model.branchID=branch_obj.branchID;
        this.model.branchUpdateAt=branch_obj.branchUpdateAt;
        this.model.branchCreatedAt=branch_obj.branchCreatedAt;
        this.model.branchRegion=branch_obj.branchRegion;
         this.model.branchSource=branch_obj.branchSource;
         this.model.branchCreatedBy=branch_obj.branchCreatedBy;
         this.model.branchTransactionLimit=branch_obj.branchTransactionLimit;
         this.model.branchCountry=branch_obj.branchCountry;
         this.model.branchState=branch_obj.branchState;
         this.model.branchCity=branch_obj.branchCity;
         this.model.branchAddress=branch_obj.branchAddress;
         this.model.branchMaker=branch_obj.branchMaker;
         this.model.branchLocation=branch_obj.branchLocation;
         this.model.branchCategory=branch_obj.branchCategory;
          //console.log(`>>???${JSON.stringify(this.model.cqJson1)}`);
       
      },
      
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
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
    
    watch: {

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

    errors(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
         this.notifyVue('danger',newValue);
        //this.showDismissibleAlert=true;
      }
    },
    errors1(newValue, oldValue) {
      console.log(`Updating from >>?????? ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
        this.notifyVue('danger',newValue);
        //this.showDismissibleAlert=true;
      }
    },
    success1(newValue, oldValue) {
      console.log(`Updating from >>?????? ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
        this.notifyVue('success',newValue);
        this.modals.modal3 = !true;
        var dataObj =this.$store.getters.getBranchResponse;//this.response;

        var dataArray = dataObj.data;
        var removeIndex = dataArray.map(item => item.branchID).indexOf(this.model.branchID);

        ~removeIndex && dataArray.splice(removeIndex, 1);
        dataArray.splice(removeIndex, 0, this.model);
        console.log(`Helloooooo>>>>> ${JSON.stringify(dataArray)}`);
        dataObj['data'] = dataArray;
        console.log(`Datatatatataat>>>>> ${JSON.stringify(dataObj)}`);


        let data = []; 
    data = dataObj.data;
    console.log("&$$$$$&"+dataObj.data);
    var count = 1;
    this.items = data.map((item) => {
            return {
                sn:count++,
                branchCode:item.branchCode,
                branchName	: item.branchName,
                bankCode: item.branchBankCode,
                branchManager: item.branchManager,
                branchType: item.branchType,
                branchCity: `${item.branchCity}/${item.branchState} `,
                branchStatus: item.branchStatus,
                //cqType: item.cqType,
                //cqBankCode:item.cqBankCode,
     
            };
          });

     this.totalRows = this.items.length;
      //this.items = data;
   


        //state.branch_response = dataObj;
        //this.$store.dispatch("updatedBranch",dataObj, { root: false });

        /*this.$store.dispatch("branchReadAll", {
        branchBankCode: this.userInformation.userBranchCode,
        readAll: "YES",
        source: "CBA"
     
              } , { root: false });*/
console.log("Updated");
        //this.showDismissibleAlert=true;
      }
    },
    success(newValue, oldValue) {
      console.log(`Success from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
         this.notifyVue('success',`${newValue}`);
          this.modals.modal3=false;
         this.modals.modal0=false;
         
        //this.showDismissibleAlert=true;
      }
    },
    sucess_reset(newValue, oldValue){
      console.log(`%%%%%%Updating from ${oldValue} to ${newValue}`);
      if (newValue !== null) {
    this.reset_resp = newValue;
         this.modals.modal1=true;
      }
    
    },
    response(newValue, oldValue){
         console.log("<><<><><><"+this.response.data);
      if(Object.keys(this.response).length !== 0){
         
    var data = []; 
    data = this.response.data;
    console.log("&$$$$$&"+this.response.data);
    var count = 1;
    this.items = data.map((item) => {
            return {
                sn:count++,
                branchCode:item.branchCode,
                branchName	: item.branchName,
                bankCode: item.branchBankCode,
                branchManager: item.branchManager,
                branchType: item.branchType,
                branchCity: `${item.branchCity}/${item.branchState} `,
                branchStatus: item.branchStatus,
                //cqType: item.cqType,
                //cqBankCode:item.cqBankCode,
     
            };
          });

     // this.totalRows = this.items.length;
      //this.items = data;
    }
    }
   
  },
    updated() {
        //this.data = this.$store.getters.getPrivilageResponse;
        //console.log("{{{{{{{{{{{{&&&&&&&&&&&&&&&&&&&&");
    },
    created:function (){
    },
    mounted:function (){
  this.$store.dispatch("branchReadAll", {
branchBankCode: this.userInformation.userBankCode,
readAll: "NO",
source: "CBA"
     
              } , { root: false });


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
  }
</script>
<style lang="css" scoped>
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


.text-title{
  font-size: 0.875rem;
    font-weight: 600;
}
.item-right {
   padding-left: 90%; 
  cursor: pointer;
  margin:0px 0% 5px 0px;
    float:right!important;
}
 .vodal-dialog {
    overflow-y: scroll;
    overflow-x: hidden !important;
    background-color: #fff;
}
.vodal-dialog .card {
    box-shadow: none !important;
}
body{
  
  overflow-x: hidden !important;
}
.text-title{
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
    color: #9E9E9E;
}
p{
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
    color: #9E9E9E;
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
.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #eff2f7;
}
.view-more-base .view-more-base-tag {
    margin-bottom: 0;
}

.view-more-base .view-more-base-value {
    margin-bottom: 0;
    font-size: 13px;
    line-height: 16px;
    color: #556ee6;
    font-weight: 600;
}
.card-title {
    font-size: 15px;
    margin: 0 0 7px 0;
    font-weight: 600;
}
</style>