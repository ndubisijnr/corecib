<template>
    <div class="form">
      <div class="card-header">
        <img :src="billerImage" width="40" />
      </div>
      <!-- handle Cable TV payment -->
        <div v-if="products[0].productBillerCode.includes('CABLE') || products[0].productBillerCode.includes('ELECTRIC')">
          <form @submit.prevent="customerEnq(product_code = products[0].productBillerCode)">
          <div class="card-body">
            <div>
                  <!-- Smart card number and meter number -->
                  <label v-if="products[0].productBillerCode.includes('CABLE')" class="small">Smart Card Number</label>
                  <label v-if="products[0].productBillerCode.includes('ELECTRIC')" class="small">Meter Number</label>
                  <b-input v-if="products[0].productBillerCode.includes('CABLE')" type="number" placeholder="Enter your smart card number" id="smartcardInput" v-model="customerEnqModel.billerCustomerId" :disabled="!Object.values(customerEnquiryData).every((o) => o === null)" required></b-input>
                  <b-input v-if="products[0].productBillerCode.includes('ELECTRIC')" type="number" placeholder="Enter your meter number" id="smartcardInput" v-model="customerEnqModel.billerCustomerId" :disabled="!Object.values(customerEnquiryData).every((o) => o === null)" required></b-input>
                  <span class="small" v-if="!Object.values(customerEnquiryData).every((o) => o === null)"><span class="small">Customer:</span> <b>{{ customerEnquiryData.customerName }}</b> <br><span @click="clearEnq()"><span class="text-primary" style="cursor: pointer">Not me?</span></span></span>
            </div>
            <p class="small text-danger" id="err"></p>
            <div v-if="!Object.values(customerEnquiryData).every((o) => o === null)">
              <div v-if="products[0].productPrice !== 'VARIABLE'">
                <label class="small">Select Plan</label>
                <b-select v-model="productpaymentModdel.productCode">
                  <b-select-option  v-for="i in products" :key="i" :value="i.productPrice + ' ' + i.productCode">{{i.productCode}} @ {{i.productPrice | formatAmount}}</b-select-option>
                </b-select>
              </div>
              <div v-if="products[0].productPrice == 'VARIABLE'">
                <div>
                <label class="small">Amount</label>
                <b-input type="number" required class="mb-2" v-model="productpaymentModdel.amount" />
                </div>
                <div>
              <label class="small">Select Option</label>
              <b-select v-model="productpaymentModdel.productCode">
                <b-select-option  v-for="i in products" :key="i" :value="i.productCode">{{i.productCode.replace('_', ' ') | titleCase}}</b-select-option>
              </b-select>
                </div>
              </div>
              <div class="mt-2">
                <label class="small">Email</label>
                <b-input type="email" :value="currentOrganisation.organisationEmail" id="organisationEmail"></b-input>
              </div>
            </div>

          </div>
            <div class="card-footer">
              <b-button class="mt-2 w-100" v-if="!Object.values(customerEnquiryData).every((o) => o === null)" type="submit" @click="action = 'pay'" style="background-color:#3F88C5;color:white" :disabled="paymentLoading">{{paymentLoading ? 'Please Wait...' : 'Pay'}}</b-button>
              <b-button class="mt-2 w-100" v-else type="submit" style="background-color:#3F88C5;color:white" :disabled="customerEnquiryLoading" @click="action = 'validate'">{{customerEnquiryLoading ? 'Please Wait...' : 'Validate'}}</b-button>
                </div>
          </form>
        </div>
      <!-- end handle Cable TV payment -->

      <!-- handle AIRTIME and DATA purchase -->
      <form @submit.prevent="payment(obj = productCode)" v-if="products[0].productBillerCode.includes('AIRTIME') || products[0].productBillerCode.includes('DATA')">
        <div class="card-body">
              <div class="mb-2"  v-for="i in products" :key="i">
                <div v-if="i.productBillerCode.includes('AIRTIME')">
                <div>
                  <!-- area for AIRTIME -->
                    <div v-for="i in products" :key="i">
                      <div>
                        <label class="small">{{billerCustomerIdInputLabel}}</label>
                        <b-input type="tell" required class="mb-2"
                                 v-model="productpaymentModdel.billerCustomerId" placeholder="Enter mobile number">
                        </b-input>
                      </div>
                      <div v-if="i.productPrice == 'VARIABLE'">
                        <div>
                          <label class="small">Amount</label>
                          <b-input type="number" required class="mb-2" v-model="productpaymentModdel.amount">
                          </b-input>

<!--                          <b-input :value="i.productCode" v-model="productpaymentModdel.productCode" ></b-input>-->
                        </div>
                      </div>
                    </div>
                </div>
                </div>

              </div>
        <!-- end area for AIRTIME -->

        <!-- Area for DATA BUNDLE -->
            <div v-if="products[0].productBillerCode.includes('DATA')">
              <div>
                <label class="small">{{billerCustomerIdInputLabel}}</label>
                <b-input type="tell" required class="mb-2"
                         v-model="productpaymentModdel.billerCustomerId" placeholder="Enter mobile number">
                </b-input>
              </div>
              <div>
                <label class="small">Select Plan</label>
                <b-select v-model="productpaymentModdel.productCode">
                   <b-select-option  v-for="i in products" :key="i" :value="i.productPrice + ' ' + i.productCode">{{i.productDescription}} @ {{i.productPrice | formatAmount}}</b-select-option>
                </b-select>
              </div>
          </div>
          <div class="mt-2">
            <label class="small">Email</label>
            <b-input type="email" :value="currentOrganisation.organisationEmail" id="organisationEmail"></b-input>
          </div>
        </div>

        <div class="card-footer">
          <b-button class="mt-2 w-100" type="submit" style="background-color:#3F88C5;color:white" :disabled="paymentLoading">{{paymentLoading ? 'Please Wait...' : 'Proceed'}}</b-button>
        </div>
      </form>
      <!-- End Area for DATA BUNDLE -->
    </div>
</template>

<script>
import {mapState} from "vuex";
import StoreUtils from "@/util/baseUtils/StoreUtils";
import BillsPaymentRequest from "@/model/request/BillsPaymentRequest";
import AuthenticationResponse from "@/model/reponse/AuthenticationResponse";

export default {
  name: "PaybillsForm",
  data(){
    return{
      productpaymentModdel:BillsPaymentRequest.productPayment,
      customerEnqModel:BillsPaymentRequest.customerEnquiry,
      action:null,
      code:this.productCode,
      emailModel:AuthenticationResponse.organisation
    }
  },

  props:{
    billerCustomerIdInputLabel: String,
    productBillerCode:String,
    productCode:String,
    productPrice:String,
    billerImage:String,
    // payment:Function

  },
  methods:{
    customerEnq(product_code, action){
      //checks if users is using the validate
      if(this.action == 'validate'){
        this.customerEnqModel.billerCode = product_code
        StoreUtils.dispatch(StoreUtils.actions.billspayment.updateCustomerEnq, this.customerEnqModel).then(() => {
          if(this.error_msg == '00'){
              document.getElementById("smartcardInput").style.border = "solid green"
          }else{
            //checks to know what error to display either smart card or meter number
            if(product_code.includes('ELECTRIC')) {
              document.getElementById("err").innerHTML = "Invalid meter number"
              document.getElementById("smartcardInput").style.border = "solid red"
            }else{
              document.getElementById("err").innerHTML = "Invalid smart card number"
              document.getElementById("smartcardInput").style.border = "solid red"
            }
            //clears error text makes it disappear
            setTimeout(() => {
              document.getElementById("err").innerHTML = ""
            },2000)

          }
        })
      }else{
        //calls payment api
        if(product_code.includes('CABLE')){
          let price = this.productpaymentModdel.productCode.split(" ")[0]
          let code = this.productpaymentModdel.productCode.split(" ")[1]
          this.productpaymentModdel.amount = price
          this.productpaymentModdel.productCode = code
          this.productpaymentModdel.billerCustomerId= this.customerEnqModel.billerCustomerId
          this.productpaymentModdel.reference = `BIZGEM-${this.reference(30)}`
          this.productpaymentModdel.email = document.getElementById('organisationEmail').value
        }else{
          this.productpaymentModdel.billerCustomerId= this.customerEnqModel.billerCustomerId
          this.productpaymentModdel.reference = `BIZGEM-${this.reference(30)}`
          this.productpaymentModdel.email = document.getElementById('organisationEmail').value
        }

      console.log(this.productpaymentModdel)
      // StoreUtils.dispatch(StoreUtils.actions.billspayment.updatePayment, this.productpaymentModdel)
      }
    },
    clearEnq(){
      Object.keys(this.customerEnquiryData).forEach(key => this.customerEnquiryData[key] = null)
    },
    payment(){
      if(this.products[0].productBillerCode.includes('DATA') || this.products[0].productBillerCode.includes('CABLE_TV')){
        let price = this.productpaymentModdel.amount.split(" ")[0]
        let code = this.productpaymentModdel.amount.split(" ")[1]
        this.productpaymentModdel.amount = price
        this.productpaymentModdel.productCode = code
        this.productpaymentModdel.email = document.getElementById('organisationEmail').value
      }
      this.productpaymentModdel.productCode = this.productCode
      this.productpaymentModdel.reference = `BIZGEM-${this.reference(30)}`
      this.productpaymentModdel.email = document.getElementById('organisationEmail').value
      console.log(this.productpaymentModdel)
      // StoreUtils.dispatch(StoreUtils.actions.billspayment.updatePayment, this.productpaymentModdel).then(() => {
      //   StoreUtils.dispatch(StoreUtils.actions.auth.readDashboardStats)
      // })
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
  },
  computed:{
    ...mapState({
      categories: state => state.billspayment.categories.data,
      billers: state => state.billspayment.billers.data,
      billerloading:state => state.billspayment.billersloading,
      categoryloading:state => state.billspayment.categoriesloading,
      products:state => state.billspayment.products.data,
      paymentLoading:state => state.billspayment.paymentloading,
      customerEnquiryData:state => state.billspayment.customerEnq,
      customerEnquiryLoading: state => state.billspayment.customerEnqloading,
      error_msg:state => state.billspayment.errorMsg,
    }),

    currentOrganisation(){
      return StoreUtils.rootGetters(StoreUtils.getters.auth.getCurrentOrganization)
    }
  },
}
</script>

<style scoped>
.form{
  height: auto;
  width: 50%;
  background-color: #FFFFFF;
  box-shadow:0 0 1rem 0 rgb(136 152 170 / 15%);
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;

}
.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media (max-width: 999px) {
  .form{
    height: auto;
    width: 90%;
    background-color: #FFFFFF;
    box-shadow:0 0 1rem 0 rgb(136 152 170 / 15%);
    border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;

  }
}
</style>