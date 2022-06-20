<template>
  <div class="main">
    <div class="section-1">
      <div>
        <div v-for="i in categories" :key="i" class="cag-sec" :class="{'active':activeC == i.categoryName}" @click="readBillers(obj = i.categoryCode, obj2 = i.categoryName), b(), billstate === 'product', activeC = i.categoryName">
           <span >{{i.categoryName}}</span>
           <b-icon-arrow-right />
        </div>
      </div>
    </div>
    <div class="section-2">
      <div class="container pl-3 pr-5 p-3" style="display:flex;justify-content: space-between;align-items: center">
            <span class="text-dark small" style="cursor: pointer" @click="billstate = true,b()" v-if=" billstate == false">
              <b-icon-arrow-return-left  class="" style="font-size:10px"/> Back
            </span>
        <span class="small">{{activeC}}</span>
      </div>
      <div v-if="billerloading ||categoryloading " style="width:100%;display: flex;justify-content: center;align-items: center">
         <span class="spinner-border mt-4" ></span>
      </div>
        <div v-else>
          <div class="biller-area">
          <div v-if="billstate == true" v-for="i in billers" :key="i" class="biller-box" @click="readProduct(obj = i.billerCode),billstate = !billstate, billerImage = i.billerImage">
            <img :src="i.billerImage" width="40">
            <span>{{i.billerName | titleCase}}</span>
            </div>
          <div v-if="billstate == false" class="data_bundle">
              <div class="airtime-form airtime animate animate__animated animate__zoomIn"  v-if="category.includes('DATA') || category.includes('CABLE_TV') || category.includes('AIRTIME') || category.includes('ELECTRICITY')">
                <paybills-form
                    :billerCustomerIdInputLabel="products[0].billerCustomerIdInputLabel | titleCase"
                    :productBillerCode="products[0].productBillerCode.toLowerCase().replace('_',' ')"
                    :productpaymentModdel="productpaymentModdel.amount"
                    :billerImage="billerImage"
                    :product-code="products[0].productCode">
                </paybills-form>
              </div>
              </div>
          </div>
        </div>
        </div>
    <div class="section-3">
      <dashboard-card :currency="'₦'" :showBtn="false" :showBtn1="false"
                         :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'"></dashboard-card>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/util/baseUtils/StoreUtils";
import BillsPaymentRequest from "@/model/request/BillsPaymentRequest";
import DashboardView from "../../components/dashboardComponent/DashboardCircle"
import PaybillsForm from "@/components/form/PaybillsForm";
import banner from "@/assets/Banner.svg"
import {mapState} from 'vuex'
export default {
  name: "PayBills",
  components:{
    "dashboard-card": DashboardView,
    PaybillsForm
  },

  data: () => {
    return {
      billersModel:BillsPaymentRequest.readBiller,
      category:null,
      activeC:null,
      categoriesModel:BillsPaymentRequest.readCategories,
      productModel:BillsPaymentRequest.readProduct,
      productpaymentModdel:BillsPaymentRequest.productPayment,
      productPrice:null,
      productCode:null,
      productName:null,
      productreference:null,
      biller:null,
      billstate:true,
      formData:false,
      billerImage:null,
      section3Bg:banner,
    }
  },
  methods:{
    b(){
      Object.keys(this.customerEnquiryData).forEach(key => this.customerEnquiryData[key] = null)
    },
    readBillers(obj, obj2){
      this.billersModel.categoryCode = obj
      StoreUtils.dispatch(StoreUtils.actions.billspayment.updateBillers,this.billersModel).then(() =>{
        this.billstate = true
        this.category = obj
        console.log(this.category)
      })
    },
    readProduct(obj){
      this.productModel.billerCode = obj
      StoreUtils.dispatch(StoreUtils.actions.billspayment.updateProducts, this.productModel).then(() => {
        // document.getElementById('pro').click()
      })
    },

  },

  computed:{
    ...mapState({
      categories: state => state.billspayment.categories.data,
      billers: state => state.billspayment.billers.data,
      billerloading:state => state.billspayment.billersloading,
      categoryloading:state => state.billspayment.categoriesloading,
      products:state => state.billspayment.products.data,
      paymentLoading:state => state.billspayment.paymentloading,
      balances: state => state.auth.balances,
      customerEnquiryData:state => state.billspayment.customerEnq,

    })
  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories,this.categoriesModel)
    StoreUtils.dispatch(StoreUtils.actions.auth.readDashboardStats)
    this.billstate = true
    Object.keys(this.billers).forEach(key => {
      this.billers[key] = null
    })
  }

}
</script>

<style scoped>
.main{
  width: 100%;
  display: flex;
  /*border: solid red;*/
  /*justify-content: center;*/
  height: 80vh;
}
.section-3{
  width: 40%;
  /*box-shadow: -1px 0 3px 1px rgb(77 77 77 / 12%);*/
  background-color: #FFFFFF;
  padding-top: 15px;
  /*background-image:url("../../../public/Banner.svg");*/
  /*background-size: cover;*/
  /*background-repeat: no-repeat;*/
  display: flex;
  justify-content: center;
}

.biller-box{
  width: 40%;
  height: 60px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
}
.biller-box:hover{
  box-shadow: -1px 0 3px 1px rgb(77 77 77 / 12%);
  transition: .3s ease-in;
}
.card-area {
  display: flex;
  justify-content: space-around;
  /* border: solid yellow; */
  padding: 10px;
  width: 100%;
}


@media (max-width: 999px){
  .section-3{
    display: none;
  }
  .biller-box{
    width: 90%;
    height: 60px;
    margin: 10px;
    padding: 10px;
    text-align: center;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
  }
}
.biller-area{
  display: flex;
  height: auto;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  /*border: solid firebrick;*/
}

.airtime-form{
  width: 100%;
  height: 50vh;
  margin-top: 2%;
  display: flex;
  align-items: center;
}
.section-1{
  width: 30%;
  height: 100vh;
  background-color: #236395;
  color: black;
}

.data_bundle{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.section-2{
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
}

.section-2::-webkit-scrollbar {
  display: none;
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
.airtime{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cag-sec{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-bottom: solid #3F88C5;
  background-color: #236395;
  font-size: 12px;
  color: white;
}

.active{
  background-color: var(--primary);
  color: white;
}

.cag-sec:hover{
  background-color: var(--primary);
  color: white;

}

@media (max-width:999px) {
  .section-1{
    width: 35%;
    height: 100vh;
    /*background-color: white;*/
    color: black;
  }
  .cag-sec{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    border-bottom: solid #3F88C5;
    font-size: 12px;
  }
}
@media (max-width:999px) {
  .card-area {
    display: flex;
    width: 250%;
  }
  .biller-area{
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

}

</style>