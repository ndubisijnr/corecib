<template>
  <div>
  <div class="py-4 px-4">
    <h4>Bills Payment</h4>
    <span :class="{'spinner-loader':categoryloading}"></span>
  </div>
  <div class="main">
    <div class="section-1">
      <div class="cag-sec">
        <div v-for="i in categories" :key="i" class="biller-box" :class="{'active':activeC == i.categoryName}" @click="readBillers(obj = i.categoryCode, obj2 = i.categoryName), b(), billstate === 'product', activeC = i.categoryName,modal=true">
          <img :src="i.categoryImage" width="30"/>
           <span >{{i.categoryName}}</span>
           <b-icon-arrow-right />
        </div>
      </div>
    </div>
    <div class="section-2">
      <div v-if="billerloading || categoryloading " style="width:100%;display: flex;justify-content: center;align-items: center">
         <span class="spinner-border mt-4" ></span>
      </div>
        <div v-else>
<!--           <span class="text-dark small" style="cursor: pointer" @click="billstate = true,b()">-->
<!--              <b-icon-arrow-return-left  class="" style="font-size:10px"/> Back-->
<!--            </span>-->
          <div class="biller-area">
          <div v-if="billstate == true" v-for="i in billers" :key="i" class="biller-box" @click="readProduct(obj = i.billerCode),billstate = !billstate, billerImage = i.billerImage">
            <img :src="i.billerImage" width="40">
            <span>{{i.billerName | titleCase}}</span>
            </div>
          <div v-if="billstate == false" class="data_bundle">
              <div class="airtime-form airtime animate animate__animated animate__zoomIn"  v-if="category.includes('DATA') || category.includes('CABLE_TV') || category.includes('AIRTIME') || category.includes('ELECTRICITY') || category.includes('BET')">
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
      <div class="d-flex justify-content-center">
      <dashboard-card :currency="'₦'" :showBtn="false" :showBtn1="false" :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'"></dashboard-card>
      </div>
    </div>
  </div>
  <div class="main-mb">
    <div class="section-1" v-if="mobileMode">
      <div class="cag-sec">
        <div v-for="i in categories" :key="i" class="biller-box" :class="{'active':activeC == i.categoryName}" @click="readBillers(obj = i.categoryCode, obj2 = i.categoryName), b(), billstate === 'product',mobileMode=!mobileMode">
          <img :src="i.categoryImage" width="30"/>
           <span >{{i.categoryName}}</span>
           <b-icon-arrow-right />
        </div>
      </div>
    </div>
    <div class="section-2" v-else>
      <div v-if="billerloading || categoryloading " style="width:100%;display: flex;justify-content: center;align-items: center">
         <span class="spinner-border mt-4" ></span>
      </div>
        <div v-else>
          <div class="text-center" style="cursor: pointer;position: absolute;right: 30px;top: 108px">
              <b-icon-arrow-left-circle   style="font-size:30px" @click="mobileMode = true,b()" v-if="billstate"/>
              <b-icon-arrow-left-circle   style="font-size:30px"  @click="billstate = true,b()" v-if="!billstate"/>
          </div>
          <div class="biller-area">
          <div v-if="billstate == true" v-for="i in billers" :key="i" class="biller-box" @click="readProduct(obj = i.billerCode),billstate = !billstate, billerImage = i.billerImage">
            <img :src="i.billerImage" width="40">
            <span>{{i.billerName | titleCase}}</span>
            </div>
          <div v-if="billstate == false" class="data_bundle">
              <div class="airtime-form airtime animate animate__animated animate__zoomIn"  v-if="category.includes('DATA') || category.includes('CABLE_TV') || category.includes('AIRTIME') || category.includes('ELECTRICITY')  || category.includes('BET')">
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
      <div class="d-flex justify-content-center">
      <dashboard-card :currency="'₦'" :showBtn="false" :showBtn1="false" :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'"></dashboard-card>
      </div>
    </div>
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
      mobileMode:true,
      formData:false,
      billerImage:null,
      section3Bg:banner,
      modal:false
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
        console.log(this.products)
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
.main-mb{
  display: none;
}
.main{
  width: 100%;
  display: flex;
  /*border: solid red;*/
  justify-content: center;
  height: 80vh;
}
.section-3{
  width: 20%;
  /*box-shadow: -1px 0 3px 1px rgb(77 77 77 / 12%);*/
  /*background-color: #FFFFFF;*/
  padding-top: 15px;
  /*background-image:url("../../../public/Banner.svg");*/
  /*background-size: cover;*/
  /*background-repeat: no-repeat;*/
  display: block;
  justify-content: center;
}

.biller-box{
  width: 100%;
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
  box-shadow: -1px 0 3px 1px rgb(77 77 77 / 102%);
  transition: .3s ease-in;
}
.card-area {
  display: flex;
  justify-content: space-around;
  /* border: solid yellow; */
  padding: 10px;
  width: 100%;
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
  /*background-color: #236395;*/
  color: black;
}

.data_bundle{
  width: 70%;
  display: flex;
  height: 58vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}

.section-2{
  width: 60%;
  max-height: 100vh;
  overflow-y: scroll;
}

.section-2::-webkit-scrollbar {
  display: none;
}
.section-3{
  width: 40%;
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
  padding: 20px;
  height: 100vh;
  cursor: pointer;
  border-bottom: solid #3F88C5;
  background-color: #236395;
  font-size: 12px;
  color: black;
}

.active{
  background-color: var(--primary);
  color: white;
}

.cag-sec:hover{
  /*background-color: var(--primary);*/
  /*color: white;*/

}

@media (max-width:999px) {
  .main-mb{
    display: block;
  }

  .section-2{
    width: 100%;
  }

  .airtime-form{
    width: 100%;
    height: 70vh;
  }

  .data_bundle{
    width: 90%;
    height: 70vh;
    margin-top: 2%;
  }

  .main{
    display: none;
  }
  .section-3{
    display: none;
  }
  .biller-box{
    width: 90%;
    height: 60px;
    margin: 10px;
    padding: 10px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    color: black;
  }
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

  .section-1{
    width: 100% !important;
    height: 100vh;
    /*background-color: white;*/
    color: black;
  }
  .cag-sec{
    display: block;
    width: 100%;
    padding: 20px;
    cursor: pointer;
    border-bottom: solid #3F88C5;
    font-size: 12px;
  }

}

@media (max-height:600px) {
  .data_bundle{
    width: 90%;
    height: 100vh;
    margin-top: 2%;
  }


}

</style>