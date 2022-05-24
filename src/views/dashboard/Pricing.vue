<template>
  <div>
    <div class="container">
      <div class="text-start m-3">
        <h3>BILLS PAYMENT COMMISSION</h3>
      </div>
      <div class="d-flex m-3">
        <table class="table table-bordered mr-2">
          <thead>
            <th style="width:100px">Airtime & Data</th>
            <th >#</th>
          </thead>
          <tbody>
            <tr>
              <td>GLO</td>
              <td>3.50% Commission Fee</td>
            </tr>
            <tr>
              <td>AIRTEL</td>
              <td>2.00% Commission Fee</td>
            </tr>
            <tr>
              <td>MTN</td>
              <td>2.00% Commission Fee</td>
            </tr>
            <tr>
              <td>9MOBILE</td>
              <td>3.92% Commission Fee</td>
            </tr>
            <tr>
              <td>Smile Network</td>
              <td>4.20% Commission Fee</td>
            </tr>
            <tr>
              <td>Swift Networks</td>
              <td>0.77% Commission Fee</td>
            </tr>
            <tr>
              <td>Spectranet</td>
              <td>3.15% Commission Fee</td>
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
            <td>1.40% Commission Fee</td>
          </tr>
          <tr>
            <td>GOTV</td>
            <td>1.40% Commission Fee</td>
          </tr>
          <tr>
            <td>STARTIMES</td>
            <td>2.66% Commission Fee</td>
          </tr>
          </tbody>
        </table>
    </div>
      <div class="d-flex m-3">
        <table class="table table-bordered mr-2">
          <thead>
          <th style="width:100px">Electricity</th>
          <th >#</th>
          </thead>
          <tbody>
            <tr>
              <td>Ikeja Electric</td>
              <td>0.84% Commission Fee</td>
            </tr>
            <tr>
              <td>Eko Electric</td>
              <td>1.05% Commission Fee</td>
            </tr>
            <tr>
              <td>AEDC (Abuja Electric)</td>
              <td>0.79% Commission Fee</td>
            </tr>
            <tr>
              <td>EDC (Enugu Electric)</td>
              <td>1.74% Commission Fee</td>
            </tr>
            <tr>
              <td>(PHEDC (Port Harcourt Electric)</td>
              <td>1.26% Commission Fee</td>
            </tr>
            <tr>
              <td>(IBEDC (Ibadan Electric)</td>
              <td>0.63% Commission Fee</td>
            </tr>
            <tr>
              <td>(KEDCO (Kano Electric)</td>
              <td>1.33% Commission Fee</td>
            </tr>
            <tr>
              <td>KAEDCO (Kaduna Electric)</td>
              <td>1.05% Commission Fee</td>
            </tr>
            <tr>
              <td>JEDC (Jos Electric)</td>
              <td>0.70% Commission Fee</td>
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
            <td>₦100</td>
          </tr>
          <tr>
            <td>Drivers license verification</td>
            <td>₦100</td>
          </tr>
          <tr>
            <td>Voters card verification</td>
            <td>₦100</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex m-3">
        <table class="table table-bordered mr-2">
          <thead>
          <th style="width:100px">Others</th>
          <th >#</th>
          </thead>
          <tbody>
          <tr>
            <td>Click Bulk SMS</td>
            <td>7.00% Commission Fee</td>
          </tr>
          <tr>
            <td>LCC</td>
            <td>0.77% Commission Fee</td>
          </tr>
          </tbody>
        </table>
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
  name: "Pricing"
}
</script>

<style scoped>
.table{
  box-shadow: 0 0 1rem 0 rgb(136 152 170 / 15%);
  background-color: white;

}
</style>