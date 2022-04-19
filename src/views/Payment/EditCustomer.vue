<template>
<div>
<base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Payment</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Customer</a></li>
              <li class="breadcrumb-item active" aria-current="page">{{}}</li>
            </ol>
          </nav>
        </div>
       
      </div>
      </base-header>
<div class="container-fluid mt--6">
  <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-4 col-12">
        <div class="card">
                <!-- Card body -->
        <div class="card-body">
          <form id="form2" @submit.prevent="submitForm2">
            <!-- List group -->
            <div class="form-groups ">
            <label class="form-control-label">First Name <span class="text-danger">*</span></label> <!--<span class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showInfo ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
      </span>-->
            <input type="text" v-model="selectedItem.firstName" autocomplete="off" name="name" placeholder="First Name" class="form-control" required>
            </div>

            <div class="form-groups ">
            <label class="form-control-label">Last Name <span class="text-danger">*</span></label> <!--<span class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showInfo ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
      </span>-->
            <input type="text" v-model="selectedItem.lastName" autocomplete="off" name="name" placeholder="Last Name" class="form-control" required>
            </div>

            <div class="form-groups ">
            <label class="form-control-label">Phone Number <span class="text-danger">*</span></label> <!--<span class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showInfo ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
      </span>
            <input type="text" v-model="name" autocomplete="off" name="name" placeholder="Email" class="form-control" required>-->
            <!--<VuePhoneNumberInput v-model="phone" :preferred-countries="['FR', 'BE', 'DE']" />-->
            <vue-tel-input v-model="selectedItem.phoneNumber" v-bind="bindProps" :inputOptions="tel_options"
            :dropdownOptions="dropdown_options"
                        v-on:country-changed="countryChanged"></vue-tel-input>
            </div>

            <div class="form-groups ">
            <label class="form-control-label">Email <span class="text-danger">*</span></label> <!--<span class="input-group-text" @click="showPassword = !showPassword">
            <i class="fa" :class="[showInfo ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
      </span>-->
            <input type="text" v-model="selectedItem.email" autocomplete="off" name="name" placeholder="Email" class="form-control" required>
            </div>
                
            <div class="black-list-group mt-3" >
                <div class="black-list-sub">
                    <p class="black-list text-sm mb-1 mt-1 ">
                        Black list this customer
                        <i class="fas fa-info-circle ml-1 mt-1 mr-2"></i>
                        <base-switch v-model="blacklist"></base-switch>
                    </p>
                </div>
            </div>
</form>
 </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-6 text-left">
                <button @click="modals.modal0 = false"  class="btn btn-light">Cancel </button>
            </div>
            <div class="col-6 text-right">
              <button form="form2" type="submit" class="btn btn-primary"> Edit</button>
            </div>
          </div>
           
        </div>
        </div>
          </div>
         <div class="col-lg-8 col-md-8 col-sm-8 col-12">    

          <div>
              <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
  <el-tab-pane id="tab-0" :key='1' name="first" label="Transactions"> 
              
            <div v-if="false">
      
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
            <h3>No transactions</h3>
            <p>
              This customer hasn't made any successful payments
              <br /><br />
              
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
       </el-tab-pane>
  <el-tab-pane id="tab-1" :key='2' name="second"  label=" Subscriptions">
            
            <div v-if="false">
      
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
            <h3>No Subscriptions</h3>
            <p>
              This customer hasn't subscribed to any plans
              <br /><br />
              
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
  </el-tab-pane>
  </el-tabs>  
          

          </div>
          
</div>
     
  </div>

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
                    <a><span @click="closeModal0()"
            ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" style="fill:#171717;" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</span></a></article>
              <!--</div>-->
              <div class="py-2">
            <h5 class="mb-0 text-center">Blacklist this customer</h5>
             </div>
              
           <!-- </div>-->
        </div>
        <!-- Card body -->
        <div class="card-body">
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
            <h3>No Customer</h3>
            <p>
              There're no Customer for this query. Please try another query or clear your filters.
              <br /><br />
              
            </p>
            <!--<p>
              There're no pages for this query. Please try another query or
              clear your filters.
            </p>-->
          </div>
        </div>
      </div>
        
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-6 text-left">
                <button @click="closeModal0()"  class="btn btn-light">Cancel </button>
            </div>
            <div class="col-6 text-right">
              <button form="form1" type="submit" class="btn btn-danger"> Blacklist this Customer</button>
            </div>
          </div>
           
        </div>
        
    <!--</div>-->
            </modal>
   
</div>
</div>
</template>
<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown,Tabs,TabPane} from 'element-ui'
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
          activeName:'first',
          selectedItem:{},
          blacklist:false,
        light:'light',
        modals:{
            modal0:false
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
        bindProps: {
        mode: "international",
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "off",
        preferredCountries:['NG','US'],
        
      },
      tel_options:{
          placeholder:'Phone Number',
          styleClasses:'form-control',
          maxlength:15,
          name: "telephone",
          required:true,

      },
      dropdown_options:{
          showDialCodeInSelection:true,
          showFlags:true,
          autocomplete:'off',
          showDialCodeInList:true

      },
     countryCode:'', 
      
         
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
       ...mapState({customers_resp: state => state.customers.cus_response,}),
    /*success: state => state.report.report_success,userInformation: state => state.auth.userInfo,
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
        closeModal0(){
            this.modals.modal0 = false;
            this.blacklist=false;
        },
         handleClick(tab, event) {
        //console.log(tab.$vnode.key);
        console.log(tab.label);
        //console.log(tab, event);
      },
    readColumn(){
     this.$store.dispatch("readColumn", {
        item:this.item_report
    }, { root: false });
    },
     countryChanged(country) {
     this.countryCode = country.dialCode;
     
    },


/*
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
customers_resp(newValue, oldValue) {
      console.log(`Success from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
     if (newValue !== null) {
         this.selectedItem=this.customers_resp.items;
         //this.notifyVue('success',`${newValue}`);
         //this.modals.modal0 = false;
        //this.showDismissibleAlert=true;
      }
    },
    blacklist(newValue, oldValue) {
        console.log("Outerrrr");
        console.log(newValue);
         if (newValue === true) {
             console.log("Innner");
         this.modals.modal0 = true;
        //this.showDismissibleAlert=true;
      }
    },
    /*errors(newValue, oldValue) {
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
      this.selectedItem=this.customers_resp.items;
      console.log(this.customers_resp);
    }
  }
</script>
<style lang="css" scoped>
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
.black-list-group{
border-radius: 4px;
border: 1px solid rgba(0,0,0,.05);
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

hr.solid {
  border-top: 1.5px solid #bbb;
  width:30px; 
  transform:rotate(90deg);
  margin: 17px 14px 0px 14px;
}
.drop-btn{
    padding: .5rem 1rem;
    font-size: 0.875rem;
}
</style>