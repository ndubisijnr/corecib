<template>
  <div class="main">
    <div class="section-1">
      <div>
        <div v-for="i in categories" :key="i" class="cag-sec" @click="readBillers(obj = i.categoryCode), billstate === 'product'">
           <span>{{i.categoryName}}</span>
           <b-icon-arrow-right />
        </div>
      </div>
    </div>
    <div class="section-2">
<!--      {{products}}-->
<!--      {{products}}-->
<!--      <div class="mb">-->
<!--        <div class="card-area">-->
<!--          <dashboard-card :value="balances.walletBalance.accountBalance | formatAmount" :title="'Wallet Balance'" :currency="'₦'" :showBtn="false" :showBtn1="false"></dashboard-card>-->
<!--          <dashboard-card :value="balances.referralBalance.accountBalance | formatAmount" :title="'Referral Balance'" :showBtn="false" :showBtn1="false" :currency="'₦'"></dashboard-card>-->
<!--        </div>-->
<!--      </div>-->
      <b-button v-b-modal.modal-sm id="pro" hidden></b-button>
      <b-modal id="modal-sm" hide-backdrop  class="w-100"  size="lg" title="Regenerate Api key">

      </b-modal>
      <div v-if="billerloading ||categoryloading " style="width:100%;display: flex;justify-content: center;align-items: center">
         <span class="spinner-border mt-4" ></span>
      </div>
        <div v-else class="biller-area">
          <div v-if="billstate == true" v-for="i in billers" :key="i" class="biller-box" @click="readProduct(obj = i.billerCode)">
            <img :src="i.billerImage" width="50">
            <span>{{i.billerName}}</span>
            </div>
          <div v-if="billstate == false" class="data_bundle">
            <div v-if="i.productBillerCode.includes('AIRTIME')"  v-for="i in products" :key="i" class="airtime-form airtime animate animate__animated animate__zoomIn">
              <form @submit.prevent="payment(obj = i.productCode)" class="form">
              <div class="card-header">
                <h3>Buy({{ i.productBillerCode }})</h3>
              </div>
              <div class="card-body">
                 <label>{{i.billerCustomerIdInputLabel}}</label>
                 <b-input type="tell" required class="mb-2" v-model="productpaymentModdel.billerCustomerId"></b-input>

                 <label>Amount</label>
                 <b-input type="number" required class="mb-2" v-model="productpaymentModdel.amount"></b-input>

                 <label>How often do you want to recharge?</label>
                 <b-select>
                   <b-select-option value="just this once">just this once</b-select-option>
                 </b-select>
              </div>
                <div class="card-footer">
                  <b-button class="mt-2 w-100" type="submit" style="background-color:#3F88C5;color:white" :disabled="paymentLoading">{{paymentLoading ? 'Please Wait...' : 'Buy Airtime'}}</b-button>
                </div>
              </form>
            </div>
              <div v-else class="biller-box">
                <span>{{ i.productBillerCode }}</span><br>
                <span>{{i.productDescription}}</span>
              </div>
          </div>
        </div>
      </div>

    <div class="modal" tabindex="-1" id="myModel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoreUtils from "@/util/baseUtils/StoreUtils";
import BillsPaymentRequest from "@/model/request/BillsPaymentRequest";
// import DashboardView from "../../components/dashboardComponent/DashboardCircle"
import {mapState} from 'vuex'
export default {
  name: "PayBills",
  components:{
    // "dashboard-card": DashboardView,
  },

  data: () => {
    return {
      billersModel:BillsPaymentRequest.readBiller,
      categoriesModel:BillsPaymentRequest.readCategories,
      productModel:BillsPaymentRequest.readProduct,
      productpaymentModdel:BillsPaymentRequest.productPayment,
      billstate:true
    }
  },
  methods:{
    readBillers(obj){
      this.billersModel.categoryCode = obj
      StoreUtils.dispatch(StoreUtils.actions.billspayment.updateBillers,this.billersModel).then(() =>{
        this.billstate = true
      })
    },
    readProduct(obj){
      this.productModel.billerCode = obj
      StoreUtils.dispatch(StoreUtils.actions.billspayment.updateProducts, this.productModel).then(() => {
        // document.getElementById('pro').click()
        this.billstate = !this.billstate
      })
    },
    reference(length) {
      let result = ""
      let characters = 'abcdefghijklmnopgrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789';
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    payment(obj){
      this.productpaymentModdel.reference = `BIZGEM-${this.reference(30)}`
      this.productpaymentModdel.productCode = obj
      StoreUtils.dispatch(StoreUtils.actions.billspayment.updatePayment, this.productpaymentModdel)
    }
  },

  computed:{
    ...mapState({
      categories: state => state.billspayment.categories.data,
      billers: state => state.billspayment.billers.data,
      billerloading:state => state.billspayment.billersloading,
      categoryloading:state => state.billspayment.categoriesloading,
      products:state => state.billspayment.products.data,
      paymentLoading:state => state.billspayment.paymentloading,


    })
  },

  mounted() {
    StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCategories,this.categoriesModel)
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
.biller-box{
  width: 40%;
  height: 88px;
  margin: 10px 10px;
  padding: 10px 10px;
  background: #fff;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: -1px 0 3px 1px rgb(77 77 77 / 12%);
}
.card-area {
  display: flex;
  justify-content: space-around;
  /* border: solid yellow; */
  padding: 10px;
  width: 100%;
}

@media (max-width:999px) {
  .card-area {
    display: flex;
    width: 250%;
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
}

.section-2{
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
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

.form{
  height: 50vh;
  background-color: #FFFFFF;
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

.cag-sec:hover{
  background-color: var(--primary);
  color: white;

}

@media (max-width:999px) {
  .section-1{
    width: 100%;
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


</style>