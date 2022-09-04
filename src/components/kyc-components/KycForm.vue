<template>
  <div>

  <modal-1 :show="showKycForm && showModal">
      <div>
        <div class="card-head">
          <div class="text-end">
            <button type="button" class="btn-close p-2 m-2" @click="closeModal()"></button>
          </div>
          <h4 class="text-center">KYC Verification Request</h4>
        </div>
        <div class="card-body">
          <KycLists @openEachKycForm="showKycForm2"></KycLists>
        </div>
      </div>
  </modal-1>
  <modal-1 :show="showModal2">
      <div>
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="text-center m-2">{{kycVerificationType}}</h4>
            <button type="button" class="btn-close" @click="closeModal2()"></button>
          </div>
          <div>
            <h4 class="text-center m-4">Tell us about who you want to verify</h4>
          </div>
        <div class="">
          <b-form @submit.prevent="kycVerificationAction">
            <div v-if="kycVerificationType == 'Corporate affairs commission'">
            <b-form-group label="Type">
              <b-form-select v-model="KycRequest_corporate_affairsModal.type" required>
                <b-form-select-option value="business">Business</b-form-select-option>
                <b-form-select-option value="limited_company">Limited Company</b-form-select-option>
                <b-form-select-option value="incorprated_trustee">Incorporated Trustee</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group label="RcNumber">
              <b-form-input v-model="KycRequest_corporate_affairsModal.rcNumber" required></b-form-input>
            </b-form-group>
            </div>



            <!-- Bank verification number -->

            <div v-else-if="kycVerificationType === 'Bank verification number'">
              <b-form-group  label="First Name">
                <b-form-input v-model="KycRequest_bank_verificationModal.firstName"  required></b-form-input>
              </b-form-group>
              <b-form-group  label="Last Name">
                <b-form-input  v-model="KycRequest_bank_verificationModal.lastName"   required></b-form-input>
              </b-form-group>
              <b-form-group label="Date Of Birth">
                  <b-form-input
                      v-model="KycRequest_bank_verificationModal.dob"
                      type="date"
                      placeholder="DD-MM-YYYY"
                      maxLength="10"
                      required
                  ></b-form-input>
                </b-form-group>
              <b-form-group label="Bank verification number">
                <b-form-input v-model="KycRequest_bank_verificationModal.bvn"  maxLength="11" required></b-form-input>
              </b-form-group>
            </div>

            <!-- End Bank verification number -->



            <div v-else-if="kycVerificationType === 'National identity'">
              <b-form-group  label="First Name">
                <b-form-input v-model="KycRequest_national_identityModal.firstName"required></b-form-input>
              </b-form-group>
              <b-form-group  label="Last Name">
                <b-form-input v-model="KycRequest_national_identityModal.lastName" required></b-form-input>
              </b-form-group>
              <b-form-group label="Date Of Birth">
                <b-form-input
                    v-model="KycRequest_national_identityModal.dob"
                    type="date"
                    placeholder="DD-MM-YYYY"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="ID Number">
                <b-form-input v-model="KycRequest_national_identityModal.idNumber" required></b-form-input>
              </b-form-group>
            </div>
            <div v-else-if="kycVerificationType === 'Drivers license'">
              <b-form-group  label="First Name">
                <b-form-input v-model="KycRequest_drivers_licenceModal.firstName" required></b-form-input>
              </b-form-group>
              <b-form-group  label="Last Name">
                <b-form-input v-model="KycRequest_drivers_licenceModal.lastName" required></b-form-input>
              </b-form-group>
              <b-form-group label="Date Of Birth">
                <b-form-input
                    v-model="KycRequest_drivers_licenceModal.dob"
                    type="date"
                    placeholder="DD-MM-YYYY"
                    required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="License Number">
                <b-form-input v-model="KycRequest_drivers_licenceModal.licenseNumber" required></b-form-input>
              </b-form-group>
            </div>
            <div v-else-if="kycVerificationType === 'Tax identification number'">
              <b-form-group label="Tax Identification Number">
                <b-form-input v-model="KycRequest_tax_identification_numberModal.taxIdentificationNumber" required></b-form-input>
              </b-form-group>
            </div>
            <div v-else-if="kycVerificationType === 'Voters card'">
              <b-form-group  label="First Name">
                <b-form-input v-model="KycRequest_voter_cardModal.firstName" required></b-form-input>
              </b-form-group>
              <b-form-group  label="Last Name">
                <b-form-input v-model="KycRequest_voter_cardModal.lastName" required></b-form-input>
              </b-form-group>
              <b-form-group label="Date Of Birth">
                <b-form-input
                    v-model="KycRequest_voter_cardModal.dob"
                    type="date"
                    placeholder="DD-MM-YYYY"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="ID Number">
                <b-form-input v-model="KycRequest_voter_cardModal.idNumber" required></b-form-input>
              </b-form-group>
            </div>
            <b-button type="submit" :style="{backgroundColor:primaryColor}" class="kycButton" :disabled="loading">{{loading ? 'Please Wait' : 'Proceed'}}</b-button>
          </b-form>
        </div>
      </div>
  </modal-1>

  </div>
</template>

<script>
import KycLists from "../../components/kyc-components/KycLists";
import KycRequest from "../../model/request/KycRequest";
import {mapState} from "vuex";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import router from "../../router";

export default {
  name: "KycForm",
  props: {
    showKycForm: Boolean,
  },
  components: {
    KycLists,
  },

  data() {
    return {
      showModal2: false,
      showModal: true,
      formatted: null,
      primaryColor: window.__env.app.primaryColor,
      KycRequest_corporate_affairsModal: KycRequest.corporate_affairs,
      KycRequest_bank_verificationModal: JSON.parse(JSON.stringify(KycRequest.bank_verification)),
      KycRequest_tax_identification_numberModal: KycRequest.tax_identification_number,
      KycRequest_voter_cardModal: KycRequest.voter_card,
      KycRequest_drivers_licenceModal: KycRequest.drivers_licence,
      KycRequest_national_identityModal: KycRequest.national_identity,
      BankValidation:{
        first_name:false,
        last_name:false,
        dob:false,
        bvn:false
      }

    }
  },

  methods: {
    kycVerificationAction() {
      if (this.kycVerificationType === 'Corporate affairs commission') {
        this.KycRequest_corporate_affairsModal.reference = `BIZGEM-${this.reference(30)}`
        StoreUtils.dispatch(StoreUtils.actions.kycVerification.UpdateCorporateAffairs, this.KycRequest_corporate_affairsModal).then(() => {
          this.closeModal()
          this.closeModal2()
        })
      }

      else if (this.kycVerificationType === 'Bank verification number') {
        let date = new Date(this.KycRequest_bank_verificationModal.dob).toLocaleDateString().replaceAll('/','-')
        this.KycRequest_bank_verificationModal.dob = date
        this.KycRequest_bank_verificationModal.reference = `BIZGEM-${this.reference(30)}`
        StoreUtils.dispatch(StoreUtils.actions.kycVerification.UpdateBvn, this.KycRequest_bank_verificationModal).then(() => {
          this.closeModal()
          this.closeModal2()
        })
      }

      else if (this.kycVerificationType === 'National identity') {
        let date = new Date(this.KycRequest_national_identityModal.dob).toLocaleDateString().replaceAll('/','-')
        this.KycRequest_national_identityModal.dob = date
        this.KycRequest_national_identityModal.reference = `BIZGEM-${this.reference(30)}`
        StoreUtils.dispatch(StoreUtils.actions.kycVerification.UpdateNationalIdentity, this.KycRequest_national_identityModal).then(() => {
          this.closeModal()
          this.closeModal2()
        })
      }

      else if (this.kycVerificationType === 'Drivers license') {
        let date = new Date(this.KycRequest_drivers_licenceModal.dob).toLocaleDateString().replaceAll('/','-')
        this.KycRequest_drivers_licenceModal.dob = date
        this.KycRequest_drivers_licenceModal.reference = `BIZGEM-${this.reference(30)}`
        StoreUtils.dispatch(StoreUtils.actions.kycVerification.UpdateDriversLicense, this.KycRequest_drivers_licenceModal).then(() => {
          this.closeModal()
          this.closeModal2()
        })
      }

      else if (this.kycVerificationType === 'Tax identification number') {
        this.KycRequest_tax_identification_numberModal.reference = `BIZGEM-${this.reference(30)}`
        StoreUtils.dispatch(StoreUtils.actions.kycVerification.UpdateTax, this.KycRequest_tax_identification_numberModal).then(() => {
          this.closeModal()
          this.closeModal2()
        })
      }

      else if (this.kycVerificationType === 'Voters card') {
        this.KycRequest_voter_cardModal.reference = `BIZGEM-${this.reference(30)}`
        StoreUtils.dispatch(StoreUtils.actions.kycVerification.UpdateVoterCard, this.KycRequest_voter_cardModal).then(() => {
          this.closeModal()
          this.closeModal2()
        })
      }
    },

    closeModal() {
      //close modal form
      this.showModal = false;
      this.$emit("closeKycForm", false);
      this.showModal = true;
    },

    closeModal2() {
      this.showModal = true;
      this.showModal2 = false;
    },

    showKycForm2(modelValue) {
      this.showModal2 = modelValue
      this.showModal = false;
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

    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
      console.log(this.formatted)
    }

  },

  computed: {
    ...mapState({
      kycVerificationType: state => state.kycVerification.kycType,
      loading: state => state.kycVerification.loading
    }),

    // BnvValidationState() {
    //   if (JSON.stringify(this.KycRequest_bank_verificationModal.bvn)) {
    //     return JSON.stringify(this.KycRequest_bank_verificationModal.bvn.length) == 11 ? this.BankValidation.bvn = true : this.BankValidation.bvn = false
    //   }
    //   if (JSON.stringify(this.KycRequest_bank_verificationModal.firstName)) {
    //     return JSON.stringify(this.KycRequest_bank_verificationModal.firstName.length) > 2 ? this.BankValidation.first_name = true : this.BankValidation.first_name = false
    //   }
    //   if (this.KycRequest_bank_verificationModal.lastName !== null) {
    //     return this.KycRequest_bank_verificationModal.lastName.length > 2 ? this.BankValidation.last_name = true : this.BankValidation.last_name = false
    //   }
    //   if (this.KycRequest_bank_verificationModal.dob !== null){
    //     return this.KycRequest_bank_verificationModal.dob.length > 7 ? this.BankValidation.dob  = true : this.BankValidation.dob = false
    //   }
    // }
  }
}
</script>

<style scoped>

.kycButton{
  color:white !important;
  width: 100% !important;
}

</style>