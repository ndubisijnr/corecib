<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form class="container form-group form-login" role="form" @submit.prevent="handleSubmit(onInitiateEnrollment())"
        v-if="screen == 'register'">
        <div class="text-center">
          <a href="https://www.bizgem.io/"> <img src="@/assets/biz.svg" alt="" class="mg-fluid p" width="80px" /></a>
        </div>
        <div class="p-3">
          <h4 class="text-center">Create A Business Account</h4>
          <div class="form-floating mt-3 mb-3">
            <base-input label="Country">
              <el-select class="select-danger" filterable placeholder="Country" v-model="initiateModel.customerCountry"
                required>
                <el-option v-for="option in option_country" class="select-danger" :value="option.value"
                  :label="option.label" :key="option.value">
                </el-option>
              </el-select>
              <p v-show="countryCtrl" class="form-error-message">
                The Country is required
              </p>
            </base-input>
          </div>
          <div class="form-floating mt-3 mb-3">
            <base-input prependIcon="fa fa-info-circle"
              title="Business name must contain two words (eg. Dangote Groups)" label="Business Name" class="mb-2"
              name="Business Name" :rules="{ required: true }" placeholder="eg. Amanda Limited"
              v-model="initiateModel.customerBusinessName" required>
            </base-input>
          </div>
          <div class="form-floating mt-3 mb-3">
            <base-input label="First Name" class="mb-2" name="First Name" :rules="{ required: true }"
              placeholder="First Name" v-model="initiateModel.customerFirstName" required>
            </base-input>
          </div>
          <div class="form-floating mt-3 mb-3">
            <base-input label="Last Name" class="mb-2" name="Last Name" :rules="{ required: true }"
              placeholder="Last Name" v-model="initiateModel.customerLastName" required>
            </base-input>
          </div>
          <div class="form-floating mt-3 mb-3">
            <base-input label="Email" class="mb-2" name="Email" type="email" :rules="{ required: true }"
              placeholder="Email" v-model="initiateModel.customerEmail" required>
            </base-input>
          </div>

          <b><label>Phone number </label></b>
          <div class="form-floating mb-3" style="display: flex">
            <vue-country-code @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px"
              v-model="initiateModel.customerCountryCode">
            </vue-country-code>

            <base-input type="tel" class="phone" name="phone number" placeholder="Phone Number"
              v-model="initiateModel.customerPhone" required style="width: 100%">
            </base-input>
          </div>
          <div class="login-footer">
            <div class="text-center">
              <span class="text-dark"> I already have an account.</span>
              <br />
              <a class="forgot-password" @click="login()" style="cursor:pointer"> Login</a>
            </div>
            <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading">
              {{ loading ? "working" : 'Proceed' }} <span :class="{ 'spinner-border': loading }"></span>
            </button>
          </div>

        </div>
      </form>
      <form class="p-3 form-group form-login" role="form" v-if="screen == 'otp'"
        @submit.prevent="handleSubmit(onCompleteEnrollment())">
        <div class="text-center">
          <a href="https://www.bizgem.io/"> <img src="@/assets/biz.svg" alt="" class="mg-fluid p" width="80px" /></a>
        </div>
        <div class="p-3">
          <h4 class="text-center">Complete Registration!</h4>
          <div class="form-floating mb-3">
            <input type="tel" class="form-control" maxlength="6"
              style="font-size:30px; padding-left:10px;letter-spacing:7px;" name="email"
              placeholder="Enter Your OTP Number" v-model="completeModel.customerOtp" required />
            <label> Enter Your OTP </label>
            <span v-if="timerCount > 0" class="m-2"> {{ timerCount }} secs left </span>
            <h5 style="cursor: pointer" @click="resendOtp()" v-if="timerCount === 0" class="m-2" id="otp"><i
                class="fas fa-redo"></i> Resend OTP </h5>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="password" placeholder="XXXXX"
              v-model="completeModel.customerPassword" id="pwd" required />
            <label>Password</label>
            <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye"
              @click="hide$show()"></i>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="password" placeholder="XXXXX"
              v-model="completeModel.customerConfirmPassword" id="pwd2" required />
            <label>Confirm Password</label>
            <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye2"
              @click="hide$show()"></i>
          </div>
        </div>

        <div class="login-footer">
          <div class="">
            <a class="forgot-password text-dark">
              By clicking the “Proceed” button, you agree to BizGem’s
              <a class="text-primary" style="cursor:pointer">terms of acceptable use</a>.
            </a><br />
          </div>
          <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading">
            {{ loading ? "working." : 'Create' }} <span :class="{ 'spinner-border': loading }"></span>
          </button>
        </div>

      </form>
    </validation-observer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BaseInput from "../../components/inputs/BaseInput";
import AuthenticationRequest from "../../model/request/AuthRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import country from "@/components/country";
import Swal from "sweetalert2";

export default {
  name: "Signup-Form",
  components: {
    BaseInput,
  },
  data() {
    return {
      option_country: [],
      countryCtrl: false,
      initiateModel: AuthenticationRequest.initiateEnrollment,
      completeModel: AuthenticationRequest.completeEnrollment,
      resendOtpModel: AuthenticationRequest.resendOtp,
      timerCount: 0,

      notifications: {
        topCenter: false,
      },
      bindProps: {
        mode: "international",
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "on",
        name: "telephone",
        maxLen: 25,
        preferredCountries: ["NG", "US"],
        placeholder: "Phone Number",
      },
      tel_options: {
        placeholder: "Phone Number",
        styleClasses: "form-control",
        maxlength: 15,
        name: "telephone",
        required: true,
      },
      dropdown_options: {
        showDialCodeInSelection: true,
        showFlags: true,
        autocomplete: "off",
        showDialCodeInList: true,
      },
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Logon" });
    },
    hide$show() {
      let b = document.getElementById("pwd");
      let eye = document.getElementById("eye");
      let b2 = document.getElementById("pwd2");
      let eye2 = document.getElementById("eye2");
      if (b.type === "password") {
        b.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
      } else {
        b.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
      }
      if (b2.type === "password") {
        b2.type = "text";
        eye2.classList.remove("fa-eye");
        eye2.classList.add("fa-eye-slash");
      } else {
        b2.type = "password";
        eye2.classList.add("fa-eye");
        eye2.classList.remove("fa-eye-slash");
      }
    },
    hide$show1() {
      let b = document.getElementById("pwd1");
      let eye = document.getElementById("eye1");
      if (b.type === "password") {
        b.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
      } else {
        b.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
      }
    },

    onSelect({ dialCode }) {
      this.initiateModel.customerCountryCode = dialCode;
    },


    onInitiateEnrollment() {
      StoreUtils.dispatch(StoreUtils.actions.auth.initialEnrollment, this.initiateModel);
    },
    startTimer(duration) {
      let timer = duration,
        minutes,
        seconds;
      setInterval(function () {
        minutes = parseInt((timer / 60).toString(), 10);
        seconds = parseInt((timer % 60).toString(), 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.timer = minutes + ":" + seconds;
        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    },
    resendOtp() {
      this.resendOtpModel.customerEmail = this.initiateModel.customerEmail;
      StoreUtils.dispatch(StoreUtils.actions.auth.resendOtp, this.resendOtpModel)
      this.startTimer();
      this.timerCount = 30

    },

    onCompleteEnrollment() {
      if (
        this.completeModel.customerPassword ===
        this.completeModel.customerConfirmPassword
      ) {
        ;
        this.completeModel.customerEmail = this.initiateModel.customerEmail;
        this.completeModel.customerBusinessName = this.initiateModel.customerBusinessName;
        this.completeModel.customerReferralCode = localStorage.referralCode;
        StoreUtils.dispatch(StoreUtils.actions.auth.completeEnrollment, this.completeModel);
      } else {
        Swal.fire({ text: 'Password Are Not The Same.', icon: 'error', }).then(() => { })
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      screen: (state) => state.auth.screen,
    }),
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      //immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  mounted() {
    let countries = country;
    this.option_country = countries.map((item) => {
      return {
        value: `${item.name}`,
        label: `${item.name}`,
      };
    });
  },
};
</script>
<style scoped>
.login-footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.btn-login {
  width: 132px;
  background-color: var(--primary);
  border-radius: 5px;
  border: none;
  color: white;
}

::placeholder {
  font-size: 10px;
  letter-spacing: 1px;
  padding-left: 0;
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

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

.btn-login:hover {
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 30%);
}

.form-login {
  width: 450px;
  /*width: 100%;*/
  border-radius: 10px;
  padding-top: 10px;
  font-size: 14px;
  line-height: 1.42857143;
  padding-bottom: 20px;

  /* background: white;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 30%); */
}

@media (max-width: 390px){
  .form-login{
    width: 100%;
  }
}
</style>