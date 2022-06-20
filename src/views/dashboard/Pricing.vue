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

     <div class="container">
       <div class="table-div m-3">
         <table class="table table-bordered mr-2">
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
             <td>VIRTUAL ACCOUNT CREATION</td>
             <td>₦20.00 Fee<br>
               For each virtual account created
             </td>
           </tr>
           <tr>
             <td>FUNDS TRANSFER (PAYOUT)</td>
             <td>₦20.00 Fee<br>
               For each successful FT outwards.
             </td>
           </tr>
           <tr>
             <td>RECEIVE FUNDS (INWARDS)</td>
             <td>₦0.00 Fee<br>
               For each successful RF inwards.
             </td>
           </tr>
           </tbody>
         </table>
         <table class="table table-bordered mr-2">
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
         <table class="table table-bordered">
           <thead>
           <th style="width:100px">Cable TV</th>
           <th >#</th>
           </thead>
           <tbody>
           <tr>
             <td>DSTV</td>
             <td>1.40% Commission </td>
           </tr>
           <tr>
             <td>GOTV</td>
             <td>1.40% Commission </td>
           </tr>
           <tr>
             <td>STARTIMES</td>
             <td>2.66% Commission </td>
           </tr>
           </tbody>
         </table>
       </div>
       <div class="table-div m-3">
         <table class="table table-bordered mr-2">
           <thead>
           <th style="width:100px">Electricity</th>
           <th >#</th>
           </thead>
           <tbody>
           <tr>
             <td>Ikeja Electric</td>
             <td>0.84% Commission </td>
           </tr>
           <tr>
             <td>Eko Electric</td>
             <td>0.77% Commission </td>
           </tr>
           <tr>
             <td>AEDC (Abuja Electric)</td>
             <td>0.70% Commission </td>
           </tr>
           <tr>
             <td>EEDC (Enugu Electric)</td>
             <td>1.74% Commission <span class="text-info">(coming soon) </span></td>
           </tr>
           <tr>
             <td>PHEDC (Port Harcourt Electric)</td>
             <td>0.84% Commission </td>
           </tr>
           <tr>
             <td>IBEDC (Ibadan Electric)</td>
             <td>0.42% Commission </td>
           </tr>
           <tr>
             <td>KEDCO (Kano Electric)</td>
             <td>0.84% Commission </td>
           </tr>
           <tr>
             <td>KAEDCO (Kaduna Electric)</td>
             <td>0.84% Commission </td>
           </tr>
           <tr>
             <td>JEDC (Jos Electric)</td>
             <td>0.70% Commission </td>
           </tr>
           </tbody>
         </table>
         <table class="table table-bordered border-primary">
           <thead>
           <th style="width:100px">KYC</th>
           <th >#</th>
           </thead>
           <tbody>
           <tr>
             <td>BVN verification for wallet users</td>
             <td>Suspended</td>
           </tr>
           <tr>
             <td>NIN verification for wallet users</td>
             <td>₦100 Fee</td>
           </tr>
           <tr>
             <td>Drivers license verification</td>
             <td>₦100 Fee</td>
           </tr>
           <tr>
             <td>Voters card verification</td>
             <td>₦100 Fee</td>
           </tr>
           </tbody>
         </table>
       </div>
       <div class="table-div m-3">

         <table class="table table-bordered border-primary">
           <thead>
           <th style="width:100px;text-align: center">Betting</th>
           </thead>
           <tbody>
           <tr class="text-center">
             <td>Coming soon</td>
           </tr>
           </tbody>
         </table>
       </div>
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
.table{
  box-shadow: 0 0 1rem 0 rgb(136 152 170 / 15%);
  background-color: white;

}

.subpage-header{
  height: 50vh;
  margin-top: 5px;
  text-align: center;
  padding: 3%;
}

.card{
  width: 40%;
  margin: 3%;
  height: 30vh;
}

.card-footer{
  background-color: #3F88C5;
  color: white;
}

.card-header{
  background-color: #3F88C5;
  color: white;
}

.table-div{
  display: flex;
}

.pricing{
  display: flex;
  justify-content: space-around;
}

@media (max-width: 999px) {
  .pricing{
    display: flex;
    justify-content: start;
    height: auto;
    width: 300%;
  }
  .card{
    width: 100%;
    margin: 3%;
    height: 30vh;
  }
  .mb{
    width: 100%;
    overflow-x: scroll;
  }
}

/*.curve-banner{*/
/*  background-color: #3F88C5;*/
/*  width: 300px;*/
/*  height: 300px;*/
/*  position: fixed;*/
/*  right: 0;*/
/*  top: 40%;*/
/*  letter-spacing: .7rem;*/
/*  z-index: -1;*/
/*  font-size: 50px;*/
/*  border-bottom-left-radius: 60px;*/
/*  border-top-left-radius: 60px;*/
/*  border: 12px solid white;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  justify-content: center;*/
/*}*/

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