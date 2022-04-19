<template>
<div>
<base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Pages</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Page</a></li>
              <li class="breadcrumb-item active" aria-current="page">Pages</li>
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
    <!--<div class="col-lg-4 col-md-4 col-sm-4 col-12">
        <user-info></user-info>
          </div>-->
         <div class="col-lg-12 col-md-12 col-sm-12 col-12">    

             <card class="no-border-card" body-classes="px-1 pb-1" footer-classes="pb-2">
          <div class="page-table-head">
            <!--<h3 class="mb-0">View Report</h3>-->
            <div class="row">

      <div class="col-6 text-left mt-3">
        <base-input   input-classes="form-control-sm"
                      name="Report Name"
                      placeholder="Search"
                     v-model="filter">
          </base-input>
      </div>
<div  class="col-6 text-right mt-3">
     <base-button size="sm"  type="primary" @click="showPagesOption">
  <i class="fa fa-plus "></i>New Page
  </base-button>
<!--<p><span><button @click="readColumn" class="btn btn-secondary mr-1">Query this report </button></span></p>-->
</div>
    </div> 
          </div>
          <div>        
            <div v-if="false">
              
  <!--<b-container class="table-container">--> <!--class="over-flow">-->
  <div class="form-body">
      <div class="table-section col-12">
    <!-- User Interface controls -->
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
          :total-rows="items.length"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <div>
    <b-table striped hover fixed
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
<template #head()="data">
        <span v-for="n in data.label.split(' ')" :key="n" >
              <span>{{n}}</span>
              <br>
          </span>
      </template>
      <template #cell()="data">
        <span v-for="n in data.value.toString().split(' ')" :key="n" >
              <span>{{n}}</span>
              <br>
          </span>
      </template>
<template #cell(sn)="data">
        {{ data.index + 1 }}
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


      

  </div>
  <!--</b-container>-->
          </div>
            </div>
          <div v-else>
            <!--<LoadingPanel></LoadingPanel>-->
            <div class="container-fluid mt-2">
      <div class="row">
        <div class="col">
          <div class="no-data text-center ">
            <div  class="empty-history">
              <span >
                <svg
                  
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                >
                  <circle  cx="25" cy="25" r="25"></circle>
                  <line
                    
                    x1="25"
                    y1="10"
                    x2="25"
                    y2="32"
                    class="a"
                  ></line>
                  <line
                    
                    x1="25"
                    y1="37"
                    x2="25"
                    y2="39"
                    class="a"
                  ></line></svg
              ></span>
             </div>
            <h3>Payment Pages</h3>
            <p>
              The easiest way to accept payments. Simply create a page, share
              the link to your customers and start accepting payments.
              <br /><br />
              <base-button type="primary">
  <i class="fa fa-plus "></i>New Page
  </base-button>
              
            </p>
            <!--<p>
              There're no pages for this query. Please try another query or
              clear your filters.
            </p>-->
          </div>
        </div>
      </div>
    </div>
          </div>
          

          </div>
          </card>


        </div>
      <!-------------One time--------------->

      <!-------------End of One Time-------->

    <!------------------------One Times--------------------->
    <!--Form modal-->
            <modal1 :show.sync="modals.modal3"
                   body-classes="p-1"
                   modal-classes="modal-dialog-centered modal-md">
               <!--<div class="card">-->
        <!-- Card header -->
        <div class="card-head">
            <!-- Title -->
            <!--<div class="row">-->
              <!--<div class="col-12">-->
             <article class="item-right" ><!-- @click="displayDetail()">-->
                    <a><span @click="modals.modal3 = false"
            ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="fill:#171717;" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</span></a></article>
              <!--</div>-->
              <div class="py-2">
            <h5 class="h3 mb-0 text-left">New Payment Page</h5>
             </div>
              
           <!-- </div>-->
        </div>
        <!-- Card body -->
        <div class="card-body">
          <form id="form1" @submit.prevent="submitForm1">
            <!-- List group -->
            <div class="form-group ">
            <label class="form-control-label">Page name <span class="text-danger">*</span></label> <!--<span class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showInfo ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
      </span>-->
            <input type="text" v-model="name" autocomplete="off" name="name" placeholder="Name of your page" class="form-control" required>
            </div>
            <div class="form-group ">
            <label class="form-control-label">Description <span class="text-danger"></span></label>
            <textarea class="form-control" placeholder="Page description and other instructions"  v-model="description" rows="4" cols="50"></textarea>
            </div>
            <div class="form-group ">
            <label class="form-control-label">SEO Image (Optional)<span class="text-danger"></span></label>
            <span class="file-label-helper">
              This image will show when the page is shared on social media. We recommend a 1024 x 512 pixel JPG or PNG, under 1 MB in size.
            </span>
            <b-form-file accept="image/*" id="myfile"  @change="handleImage"
              v-model="logo"
                placeholder="Choose a file ..."
                ></b-form-file>
            </div>
            <div class="form-group ">
            <label class="form-control-label">Currency</label>
            <el-select class="select-danger" filterable size="small"
             placeholder="Currency of payment"
             v-model="currency">
    <el-option v-for="option in option_currency"
               class="select-danger"
               :value="option.value"
               :label="option.label"
               :key="option.value">
    </el-option>
  </el-select>
  <p v-show="currencyCtrl" class="form-error-message"> The Currency is required </p>
            </div>
        <div class="form-group">
         <base-checkbox class="mb-3" v-model="unchecked">
      I want a fixed payment amount on this page
  </base-checkbox>
  <base-checkbox class="mb-3" v-model="unchecked">
      Collect phone numbers on this page
  </base-checkbox>
</div>

  <div class="form-group">
    <div class="text-center">
      <button @click="collapseController" class="btn btn-secondary"><i v-if="collapse" class="ni ni-bold-up"></i>
      <i v-else class="ni ni-bold-down"></i> {{(!collapse)?'Show Advance Option':'Hide Advanced Option'}}
    </button>
      <!--<button v-b-toggle.my-collapse>Toggle Collapse</button>-->
    </div>

    <b-collapse id="collapse-4" v-model="collapse" class="mt-2">
        <div class="form-group">
          <label class="form-control-label">Use your custom link</label>
  <div class="input-group">
  <div class="input-group-icon">https://bizgem.com/pay/</div>
  <div class="input-group-area"><input id="msg" type="text" class="form-control" name="msg" placeholder="[Your URL]"></div>
</div>
</div>
<div class="form-group ">
            <label class="form-control-label">Redirect after payment</label>
            <input type="text" v-model="name" autocomplete="off" name="Test" placeholder="http://redirect.link" class="form-control" required>
</div>

<div class="form-group ">
            <label class="form-control-label">Success Message</label>
            <input type="text" v-model="name" autocomplete="off" name="Test" placeholder="Mesage to show after payment" class="form-control" required>
            </div>
<div class="form-group ">
            <label class="form-control-label">Send Notifications To</label>
            <span class="file-label-helper">
              If provided, this email address will get transaction notices
            </span>
            <input type="text" v-model="name" autocomplete="off" name="Test" placeholder="Email Address" class="form-control" required>
            </div>
<div class="form-group">
          <label class="form-control-label">Do you want to collect any extra information?</label>
  <div class="input-group">
  <div class="input-group-icon">FieldName</div>
  <div class="input-group-area"><input id="msg" type="text" class="form-control" name="msg" placeholder="eg ID Number"></div>
</div>
</div>
<div class="text-center">
  <a class="text-primary text-sm"><i class="fa fa-plus"></i> Add Another Field</a>
</div>

    </b-collapse>
  </div>
</form>
 </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-6 text-left">
                <button @click="modals.modal3 = false"  class="btn btn-light">Cancel </button>
            </div>
            <div class="col-6 text-right">
              <button form="form1" type="submit" class="btn btn-primary"> Authorize</button>
            </div>
          </div>
           
        </div>
    <!--</div>-->
            </modal1>
    <!--------------------------End pf Time----------------->



        <!--Form modal-->
            <modal :show.sync="modals.modal0"
                   body-classes="p-1"
                   modal-classes="modal-dialog-centered modal-md">
               <!--<div class="card">-->
        <!-- Card header -->
        <div class="card-head">
            <!-- Title -->
            <!--<div class="row">-->
              <!--<div class="col-12">-->
             <article class="item-right" ><!-- @click="displayDetail()">-->
                    <a><span @click="modals.modal0 = false"
            ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="fill:#171717;" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</span></a></article>
              <!--</div>-->
              <div class="py-2">
            <h5 class="h3 mb-0 text-left">New Payment Page</h5>
             </div>
              
           <!-- </div>-->
        </div>
        <!-- Card body -->
        <div class="card-body">
          <div v-if="!subscriptionPay" >
            <!-- List group -->
            <ul class="list-group list-group-flush list my--3">
                <li v-for="item in pageItems"
                    :key="item.image"
                    class="list-group-item px-0">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <!-- Avatar -->
                            <a @click="showForm(item.item)" class="avatar rounded-circle">
                                <img alt="Image placeholder" :src="item.image">
                            </a>
                        </div>
                        <div class="col ml--2">
                            <h4 class="mb-0">
                                <a @click="showForm(item.item)">{{item.item}}</a>
                            </h4>
                            <!--<span :class="`text-${item.statusType}`">● </span>-->
                            <small>{{item.item_text}}</small>
                        </div>
                        <div class="col-auto">
                            <button type="button"  @click="showForm(item.item)"  class="btn btn-sm btn-primary">Choose</button>
                        </div>
                    </div>
                </li>
            </ul>
          </div>
          <div v-else>
              <div class="p-5 text-center">
        <img class="mb-2" src="/img/theme/subscription.svg" alt="Subscription">
        <div class="mb-2 text-lg ">Subscription Payment</div>
        <div class="mt-0 mb-2 text-sm text-muted">What do you want your customers to subscribe to?</div>
        <a class="btn btn-light mb-2"  @click="createPage('custom-plan'); closeThisDialog();" >One of my existing plans</a>
        <br>
        <a class="btn btn-light mb-2"  @click="createPage('new-plan'); closeThisDialog();">I want to create a new plan</a>
        <br>
        <a class="btn btn-light mb-2"  @click="createPage('custom-plan'); closeThisDialog();">Let my customers create the plan</a>
        <br>
        <a class="btn btn-light btn-text text-muted button--small mb-2" @click="closeSubscriptionModal()">Cancel</a>
    </div>
          </div>
        </div>
        
    <!--</div>-->
            </modal>
  </div>
   
</div>
</div>
</template>
<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
import { mapState, mapActions, mapGetters } from "vuex";
import BaseHeader from '@/components/BaseHeader';
import LoadingPanel from '@/components/LoadingPanel';
import NoPage from '@/components/NoPage';

  export default {
    components: { 
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
      //LoadingPanel,
      //NoPage
       
      
    },
    data() {
      return {
        showInfo:false,
        subscriptionPay:false,
        collapse:false,
        description:'',
        currency:'',
        currencyCtrl:false,
        logoCtrl:false,
        unchecked:false,
        option_currency:[{value:'NGN',label:'NGN'},{value:'GBP',label:'GBP'},{value:'USD',label:'USD'}],
        test:'',
        logo:[],
         light:'light',
        modals:{
            modal0:false,
            modal3:false,
        },
        items:[],
         fields: [
        { key: 'sn', label: 'S/N', sortable: true, sortDirection: 'desc' },
          /*{ key: 'accountId', label: 'Account Id', sortable: true, class: 'text-left' },
          { key: 'accountCustomerId', label: 'Account Customer Id', sortable: true, class: 'text-left' },
          { key: 'accountName', label: 'Account Number', sortable: true, class: 'text-left' },
          { key: 'accountName', label: 'Account Name', sortable: true, class: 'text-left' },
          { key: 'accountClass', label: 'Account Class', sortable: true, class: 'text-left' },
          { key: 'accountType', label: 'Account Type', sortable: true, class: 'text-left' },
          { key: 'accountBalance', label: 'Account Balance', sortable: true, class: 'text-left' },
         {key: 'accountCurrency',label: 'Account Currency',sortable: true,class: 'text-left'},*/
         // { key: 'action', label: 'Action' }
         
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
        },
         pageItems: [
          {
            item: 'One-time Payment',
            item_text: 'Create a simple page for your customers to pay you',
            image: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-1.jpg',
          },
          {
           item: 'Subscription Payment',
            item_text: 'Create a page for recurring payments and subscriptions',
            image: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-2.jpg'
          },
          {
           item: 'Product Payment',
            item_text: 'Create a page to sell one or more products from your inventory',
            image: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-3.jpg'
          },
         
         
        ]
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
    /*   ...mapState({errors: state => state.report.report_errors,loading: state => state.report.report_loading,
    success: state => state.report.report_success,userInformation: state => state.auth.userInfo,
    loading1: state => state.report.report_loading1,
    item_report: state => state.report.report_item,
    response1: state => state.report.report_response1,
    response: state => state.report.report_response,response_user: state => state.user.user_response,
    }),
    ...mapActions(['branchReadAll','branchUpdate']),
    ...mapGetters(["getBranchResponse"]),
    */
    
    },
    /*mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },*/
    methods: {
      createPage(){
        this.modals.modal0=!true;
                setTimeout(() => this.modals.modal3=true, 1000);
      },
      closeThisDialog(){
        this.modals.modal0=!true;
               // setTimeout(() => this.modals.modal3=true, 1000);
      },
      closeSubscriptionModal(){
        this.subscriptionPay=!true;
      },
      collapseController(){
        this.collapse = (this.collapse)?false:true;
      },
      submitForm1(){
        alert("Testing");
      },
      showPagesOption(){
        this.subscriptionPay=!true;
        this.modals.modal0=true;
      },
      showForm(itemClicked){
        if(itemClicked==='One-time Payment'){
        this.modals.modal0=!true;
                setTimeout(() => this.modals.modal3=true, 1000);
        }
        else if(itemClicked==='Subscription Payment'){
            this.subscriptionPay=true; 
        }
        else{
            this.modals.modal0=!true;
                setTimeout(() => this.modals.modal3=true, 1000);
        }
      },
      handleImage(){

      },
/*readColumn(){
     this.$store.dispatch("readColumn", {
        item:this.item_report
    }, { root: false });


},
spinalCase(str) {
  let lowercase = str.trim()
  let regEx = /\W+|(?=[A-Z])|_/g
  let result = lowercase.split(regEx).join(" ").toUpperCase()
  return result;
},

viewInfo(item,index){
    this.$store.dispatch("reportReadSingle", {
        readCount: "ALL",
reportBankCode:item.reportBankCode,
reportCondition: "",
reportFieldList: "",
reportName: item.reportName
    }, { root: false });
},
*/
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
/*success(newValue, oldValue) {
      console.log(`Success from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
         this.notifyVue('success',`${newValue}`);
         this.modals.modal0 = false;
        //this.showDismissibleAlert=true;
      }
    },
    errors(newValue, oldValue) {
      console.log(`Success from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
         this.notifyVue('danger',`${newValue}`);
         
        //this.showDismissibleAlert=true;
      }
    },
    
    response1(newValue, oldValue){
        if(Object.keys(this.response1).length !== 0){
         if ('reports' in this.response1){
             if(this.response1.reports.length!==0 || this.response1.reports!==[]){
    var data = []; 
    data = JSON.parse((this.response1.reports));
    //console.log("&$$$$$&"+this.response.data);
    var count = 1
    this.items =data;
    var header= data.map(x => Object.keys(x));
    console.log(header[0]);
    for (const keys of header[0]) {
console.log(keys);
this.fields.push({
            key: keys, 
             label: this.spinalCase(keys),
            sortable: true, 
            class: 'text-left' 
        })
}
         }
         else{
             this.items = [];
              this.notifyVue('danger','No Report(s) on Your Query Condition(s)');
         }
         }
         else{
             this.notifyVue('danger','No Report(s) on Your Query Condition(s)');
         }
}
else{
             this.notifyVue('danger','No Report(s) on Your Query Condition(s)');
         }
    }
    */
  }
  ,
    updated() {
        //this.data = this.$store.getters.getPrivilageResponse;
        //console.log("{{{{{{{{{{{{&&&&&&&&&&&&&&&&&&&&");
    },
    created:function (){
    },
    mounted:function (){
      
    }
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
.hand{
    cursor: pointer;
}


.text-title{
  font-size: 0.875rem;
    font-weight: 600;
}
.item-right {
   padding-left: 90%; 
  cursor: pointer;
  margin:0px 0% -10px 0px;
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
    color: #a4a59a;
}

.input-group{
  display: table;
  border-collapse: collapse;
  width:100%;
}
.input-group > div{
  display: table-cell;
  border: 1px solid #ddd;
  vertical-align: middle;  /* needed for Safari */
}
.input-group-icon{
  background:#eee;
  color: #777;
  padding: 0 4px;
  font-size: 0.875rem;
}
.input-group-area{
  width:100%;
}
.input-group input{
  /*border: 0;*/
  border-radius: 0.25rem;
  display: block;
  width: 100%;
  padding: 8px;
}

.no-data {
    width: 500px;
    max-width: 90%;
    margin: 40px auto;
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
</style>