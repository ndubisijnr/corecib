<template>
   <div class="mb">
     <div class="container alert alert-white" role="alert">
       <div class="small container text-left mb-2">
         <span class="text-info">Commission:</span><br>
         <span>Commission is the amount to be earned by the business from the transaction amount.
           EX: For a transaction amount of N1000 airtime with a 2% commission your business will earn 2% of N1000 (this being N20) upon a successful transaction.
           This principle will apply to all your commission-based transactions.</span>
       </div>
       <div class="small container text-left">
       <span class="text-info">Fee:</span><br>
       <span>This is a fixed charge amount to be paid by the business for the intended service.
         EX: Your business will be charged N20 for any virtual account created.</span>
     </div>

     </div>
     <div class="container table-parent">
         <table class="table table-bordered">
           <thead>
           <th>Services</th>
           <th>Prices</th>
           </thead>
           <tbody>
           <tr>
             <td>CREATE WALLET</td>
             <td>₦10.00 Fee<br>
               For each wallet created
             </td>
           </tr>
           <tr>
             <td>VIRTUAL ACCOUNT <br />CREATION</td>
             <td>₦20.00 Fee<br>
               For each virtual account created
             </td>
           </tr>
           <tr>
             <td>FUNDS TRANSFER <br />(PAYOUT)</td>
             <td>₦20.00 Fee<br>
               For each successful FT outwards.
             </td>
           </tr>
           <tr>
             <td>RECEIVE FUNDS <br />(INWARDS)</td>
             <td>₦0.00 Fee<br>
               For each successful RF inwards.
             </td>
           </tr>
           </tbody>
         </table>
         <table class="table table-bordered">
           <thead>
           <th style="width:100px">Airtime & Data</th>
           <th>#</th>
           </thead>
           <tbody>
           <tr>
             <td>GLO</td>
             <td>3.50% Commission </td>
           </tr>
           <tr>
             <td>AIRTEL</td>
             <td>2.00% Commission </td>
           </tr>
           <tr>
             <td>MTN</td>
             <td>2.00% Commission </td>
           </tr>
           <tr>
             <td>9MOBILE</td>
             <td>3.92% Commission </td>
           </tr>
           <tr>
             <td>Smile Network</td>
             <td>4.20% Commission </td>
           </tr>
           <tr>
             <td>Swift Networks</td>
             <td>0.77% Commission </td>
           </tr>
           <tr>
             <td>Spectranet</td>
             <td>3.15% Commission </td>
           </tr>
           </tbody>
         </table>
<!--         <table class="table table-bordered">-->
<!--           <thead>-->
<!--           <th style="width:100px">Cable TV</th>-->
<!--           <th >#</th>-->
<!--           </thead>-->
<!--           <tbody>-->
<!--           <tr>-->
<!--             <td>DSTV</td>-->
<!--             <td>1.40% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>GOTV</td>-->
<!--             <td>1.40% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>STARTIMES</td>-->
<!--             <td>2.66% Commission </td>-->
<!--           </tr>-->
<!--           </tbody>-->
<!--         </table>-->
<!--         <table class="table table-bordered">-->
<!--           <thead>-->
<!--           <th style="width:100px">KYC</th>-->
<!--           <th >#</th>-->
<!--           </thead>-->
<!--           <tbody>-->
<!--           <tr>-->
<!--             <td>BVN verification for wallet users</td>-->
<!--             <td>₦20 Fee</td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>NIN verification for wallet users</td>-->
<!--             <td>₦100 Fee</td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>Drivers license verification</td>-->
<!--             <td>₦100 Fee</td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>Voters card verification</td>-->
<!--             <td>₦100 Fee</td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>Corporate affairs commission</td>-->
<!--             <td>₦100 Fee</td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>Tax identification number</td>-->
<!--             <td>₦100 Fee</td>-->
<!--           </tr>-->
<!--           </tbody>-->
<!--         </table>-->
<!--         <table class="table table-bordered">-->
<!--           <thead>-->
<!--           <th style="width:100px">Electricity</th>-->
<!--           <th >#</th>-->
<!--           </thead>-->
<!--           <tbody>-->
<!--           <tr>-->
<!--             <td>Ikeja Electric</td>-->
<!--             <td>0.84% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>Eko Electric</td>-->
<!--             <td>0.77% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>AEDC (Abuja Electric)</td>-->
<!--             <td>0.70% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>EEDC (Enugu Electric)</td>-->
<!--             <td>1.74% Commission <br /><span class="text-info">(coming soon) </span></td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>PHEDC (Port Harcourt Electric)</td>-->
<!--             <td>0.84% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>IBEDC (Ibadan Electric)</td>-->
<!--             <td>0.42% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>KEDCO (Kano Electric)</td>-->
<!--             <td>0.84% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>KAEDCO (Kaduna Electric)</td>-->
<!--             <td>0.84% Commission </td>-->
<!--           </tr>-->
<!--           <tr>-->
<!--             <td>JEDC (Jos Electric)</td>-->
<!--             <td>0.70% Commission </td>-->
<!--           </tr>-->
<!--           </tbody>-->
<!--         </table>-->
<!--         <table class="table table-bordered">-->
<!--             <thead>-->
<!--             <th style="width:100px;text-align: center">Betting</th>-->
<!--             <th style="width:100px;text-align: center">#</th>-->
<!--             </thead>-->
<!--             <tbody>-->
<!--             <tr>-->
<!--               <td>BET9JA</td>-->
<!--               <td>₦30 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>ZOOMLIFESTYLE</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>WINNER GOLDEN CHANCE</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>CASHTOKEN</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>MLOTTO</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>WESTERN LOTTO</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>ALLCITYBET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>BANGBET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>NAIRABET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>SUPABET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>BETKING</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>WINNERS GOLDEN BET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>BETWAY</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>LIVESCOREBET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>NAIJABET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>1XBET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>MERRYBET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>BETLAND</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>CLOUDBET</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>B9</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>GREENLOTTO</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             <tr>-->
<!--               <td>ELIESTLOTTO</td>-->
<!--               <td>₦20 Fee</td>-->
<!--             </tr>-->
<!--             </tbody>-->
<!--           </table>-->
     </div>
    </div>
</template>

<script>
export default {
  name: "Pricing",

  data(){
    return{
      showFee:true,
      showCom:true,
    }
  },

  methods:{
    clickFee(){this.showFee = false},
    clickCom(){this.showCom = false},
  }
}
</script>

<style scoped>
.mb{}
.table{
  box-shadow: 0 0 1rem 0 rgb(136 152 170 / 15%);
  background-color: white;

}

.table-parent{
  display: grid;
  grid-template-columns: repeat(2,2fr);
  gap: 10px;
}


@media (max-width: 999px) {
  .mb{
    width: 100%;
    overflow-x: scroll;
  }
  .table-parent{
    display: grid;
    gap: 10px;
    max-width:100%
  }

  table{
    width: 100%;
  }
}


.curve-banner h1{
  color: white !important;

}

@media (max-width:999px) {
  .table-div{
    display: flex;
    flex-direction: column;
  }
}
</style>