<template>
  <!--<div class="content">
     
    <div class="card">-->
        
      <div>
          <notifications></notifications>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
          <template slot="header">
            <h3 class="mb-0">All Internal Account</h3>
          </template>
          <div>
            <div v-if="Object.keys(response).length !== 0">
              
  <!--<b-container class="table-container">--> <!--class="over-flow">-->
  <div class="form-body">
      <div class="table-section col-12">
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Initial sort"
          label-for="initial-sort-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="initial-sort-select"
            v-model="sortDirection"
            :options="['asc', 'desc', 'last']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="roleId">ID</b-form-checkbox>
            <b-form-checkbox value="roleName">Role Name</b-form-checkbox>
            <b-form-checkbox value="creator">Creator</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

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
        <div class="pointer" @click="modalsDisplay(row.item, row.index)">
        <el-tooltip content="View more info" placement="left">

          <!--<i class="ni ni-zoom-split-in"></i>
          <span class="ml-1">Info</span>-->
        <i class="fas fa-info-circle"></i>
        </el-tooltip>
        </div>
      </template>

      <template #cell(cqStatus)="row">
       <!-- {{ row.value }} {{ row.value}}{{ row.value}}-->
        <template >
                    <badge class="badge-dot mr-4" type="">
                      <div v-if="row.value==='AUTHORIZED'">
                        <badge type="success" size="lg">AUTHORIZED</badge>
                        </div>
                        <div v-else-if="row.value==='PENDING'">
                        <badge type="warning" size="lg">PENDING</badge>
                        </div>
                        <div v-else>
                        <badge type="danger" size="lg">REJECTED</badge>
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
            <h4 class="card-title mb-4">Internal Account Info</h4>
            <div class="row">
              <div class="col-sm-6">
                <p class="queue-title">Maker</p>
                <p class="queue-value"> {{model.cqMaker}} </p></div>
                <div class="col-sm-6">
                  <p class="queue-title">Created At</p>
                  <p class="queue-value"> {{model.cqCreatedAt}} </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="queue-title">Bank Code</p>
                    <p class="queue-value"> {{model.cqBankCode}} </p>
                    </div>
                    <div class="col-sm-6">
                      <p class="queue-title">Status</p>
                      <p class="queue-value">
                        <span v-if="model.cqStatus==='AUTHORIZED'" class="badge badge-pill font-size-12 badge-success">AUTHORIZED</span>
                        <span v-else-if="model.cqStatus==='PENDING'" class="badge badge-pill font-size-12 badge-warning">PENDING</span>
                        <span v-else class="badge badge-pill font-size-12 badge-danger">REJECTED</span>
                        </p></div></div></div>
                        <div class="view-more-base">
                          <div class="table-responsive">
                            <table class="table mb-0">
                              <tbody>
                                <tr>
                                  <td><p class="view-more-base-tag"> BranchName </p></td>
                                  <td><p class="view-more-base-value"> {{model.cqJson1.branchName}} </p></td>
                                  </tr>
                                  <tr>
                                    <td><p class="view-more-base-tag"> BranchType </p></td>
                                    <td><p class="view-more-base-value">{{model.cqJson1.branchType}}</p></td>
                                    </tr>
                                    <tr>
                                      <td><p class="view-more-base-tag"> BranchAddress </p></td>
                                      <td><p class="view-more-base-value">{{model.cqJson1.branchAddress}}</p></td>
                                      </tr>
                                      <tr>
                                        <td><p class="view-more-base-tag"> BranchManager </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchManager}} </p></td>
                                        </tr>
                                        <tr><td><p class="view-more-base-tag"> BranchCity </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchCity}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchRegion </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchRegion}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchState </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchState}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchCountry </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchCountry}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchCreatedBy </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchCreatedBy}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchLocation </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchLocation}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchCategory </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchCategory}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchMaker </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchMaker}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> BranchBankCode </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.branchBankCode}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> RequestType </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.requestType}} </p></td></tr>
                                        <tr><td><p class="view-more-base-tag"> Source </p></td>
                                        <td><p class="view-more-base-value"> {{model.cqJson1.source}} </p></td></tr>

                                        </tbody></table>
                                            </div></div>
                                            <p v-if="model.cqStatus==='PENDING'" class="text-right"><span>
                                              <span class="reject-btn mr-2"><button @click="modals.modal0 = !false; modals.modal3 = false" :class="{disabled:loading}" class="btn btn-light mr-1">
                                                <i class="fas fa-times"></i> Reject </button>
                                                </span><span class="authorize-btn"><button  :class="{disabled:loading}" @click="authorizeUser" class="btn btn-primary mr-1"><i v-if="!loading" class="fas fa-check"></i> Authorize
                                                <span :class="{'spinner-border': loading}"></span> </button>
                                                </span></span></p>
                                            </div></div></div>
  </div>
    <!---</card>
                                                </div></div>-->

               </div>
            
        </modal>
        <modal modal-classes="modal-sm" :show.sync="modals.modal0">
     <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">Reject Reason</h5>
     </template>
     <div>
       <form id="form_reason" @submit.prevent="submitReason">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <base-input label="Reason"
                      name="reason"
                      placeholder="Reason"
                      required
                      v-model="model.cqReason">
          </base-input>
        </div>
      </div>
       </form>
     </div>
     <template slot="footer">
         <!--<base-button type="secondary" @click="modals.modal0 = false">No</base-button>-->
         <base-button :class="{disabled:loading}" type="primary" native-type="submit" form="form_reason" >Submit <span :class="{'spinner-border': loading}"></span></base-button>
     </template>
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
import Loader from '@/components/Loader';

  export default {
    components: { 
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      LoadingPanel,
      //Loader
      
    },
    data() {
      return {
          light:'light',
          reset_resp:'',
        model:{
          cqUpdateAt:'',
          cqId:'',
          cqStatus:'',
          userPhone:'',
          cqBankCode:'',
          userFirstName:'',
          cqAction:'',
          cqReason:'',
          cqMaker:'',
          cqChecker:'',
          cqName:'',
          cqCreatedAt:'',
          userLastName:'',
          cqType:'',
          userMiddleName:'',
          userEmail:'',
          cqJson:{},
           cqJson1:{}
},
        modals:{
          modal3:false,
          modal0:false,
          modal1:false,
        },
        items:[],
        fields: [
          { key: 'sn', label: 'S/N', sortable: true, sortDirection: 'desc' },
          { key: 'cqMaker', label: 'Maker', sortable: true, class: 'text-left' },
          { key: 'cqName', label: 'Name', sortable: true, class: 'text-left' },
          { key: 'cqUpdateAt', label: 'Update At', sortable: true, class: 'text-left' },
          { key: 'cqCreatedAt', label: 'Created At', sortable: true, class: 'text-left' },
          {key: 'cqStatus',label: 'Status',sortable: true,class: 'text-left'},
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
    response: state => state.branch.branch_response,
    errors1: state => state.branch.branch_errors1,
    success1: state => state.branch.branch_success1
    }),
    ...mapActions(['internalAccountChecker']),
    ...mapGetters([""]),
    
    },
    /*mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },*/
    methods: {

        submitReason(){
     // alert('this.model.username');
let payload = {
              cqType: this.model.cqType,
              cqMode: "REJECTED",
              cqBankCode:this.model.cqBankCode,
              cqReason: this.model.cqReason,
              cqId:this.model.cqId,
              cqChecker:this.model.cqMaker,
              } ;
            payload.cqJson = this.model.cqJson;
            console.log(payload)
        //Object.assign(state.selectedBiller, this.model.cqJson);
         this.$store.dispatch("branchCheckerType", payload, { root: false });

      },
      authorizeUser(){
     let payload = {
              cqType:this.model.cqType,
              cqMode: "AUTHORIZE",
              cqBankCode:this.model.cqBankCode,
              cqChecker:this.model.cqMaker,
              cqId:this.model.cqId,
              cqJson:this.model.cqJson
              } ;
        this.$store.dispatch("branchCheckerType", payload, { root: false });
  },

        modalsDisplay(item, index){
        this.modals.modal3 = true;
        this.model.cqUpdateAt=item.cqUpdateAt;
        this.model.cqCreatedAt=item.cqCreatedAt;
        this.model.cqStatus=item.cqStatus;
        this.model.cqMaker=item.cqMaker;
        this.model.cqName=item.cqName;
        let cq_obj=this.response.data.find(obj => ((obj.cqName === this.model.cqName)&&(obj.cqCreatedAt===this.model.cqCreatedAt)));
        //console.log(`>>???${JSON.stringify(cq_obj)}`);
        this.model.cqId=cq_obj.cqId;
          this.model.userPhone=cq_obj.userPhone;
          this.model.cqBankCode=cq_obj.cqBankCode;
          this.model.userFirstName=cq_obj.userFirstName;
          this.model.cqAction=cq_obj.cqAction;
          this.model.cqReason=cq_obj.cqReason;
          this.model.cqChecker=cq_obj.cqChecker;
          this.model.cqType=cq_obj.cqType;
          this.model.userMiddleName=cq_obj.userMiddleName;
          this.model.userEmail=cq_obj.userEmail;
          this.model.cqJson=cq_obj.cqJson;
          this.model.cqJson1=JSON.parse((cq_obj.cqJson));
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
        this.$store.dispatch("branchChecker", {
cqBankCode: this.userInformation.userBankCode,
cqMode: "READ",
cqType: "BRANCH"
     
              } , { root: false });

        //this.showDismissibleAlert=true;
      }
    },
    success(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
         this.notifyVue('success',` Role Created ${newValue}fully`);
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
      if(Object.keys(this.response).length !== 0){
    var data = []; 
    data = this.response.data;
    console.log("&$$$$$&"+this.response.data);
    var count = 1;
    this.items = data.map((item) => {
            return {
                sn:count++,
                cqMaker: item.cqMaker,
                cqName: item.cqName,
                cqUpdateAt: item.cqUpdateAt,
                cqCreatedAt: item.cqCreatedAt,
                cqStatus: item.cqStatus,
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
this.$store.dispatch("branchChecker", {
cqBankCode: this.userInformation.userBankCode,
cqMode: "READ",
cqType: "BRANCH"
     
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
    overflow-x: hidden;
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
    overflow-x: auto;
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
.table-section tbody {
    max-width: 500px;
    overflow-x: scroll;
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