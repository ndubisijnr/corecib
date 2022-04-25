<template>
<div>
  <div class="text-center" style="margin-bottom: -30px">
            <img src="@/assets/bizgemio.svg" alt="" class="mg-fluid p" width="80px" />
  </div>
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
      <form
        class="container form-group form-login"
        role="form"
        @submit.prevent="handleSubmit(onInitiateEnrollment())"
        v-if="screen == 'register'"
      >
        <div class="form-floating mt-3 mb-3">
          <base-input label="Country">
            <el-select
              class="select-danger"
              filterable
              placeholder="Country"
              v-model="initiateModel.customerCountry"
              required
            >
              <el-option
                v-for="option in option_country"
                class="select-danger"
                :value="option.value"
                :label="option.label"
                :key="option.value"
              >
              </el-option>
            </el-select>
            <p v-show="countryCtrl" class="form-error-message">
              The Country is required
            </p>
          </base-input>
        </div>
        <div class="form-floating mt-3 mb-3">
          <base-input
            prependIcon="fa fa-info-circle"
            title="Business name must contain two words (eg. Dangote Groups)"
            label="Business Name"
            class="mb-2"
            name="Business Name"
            :rules="{ required: true }"
            placeholder="eg. Amanda Limited"
            v-model="initiateModel.customerBusinessName"
            required
          >
          </base-input>
        </div>
        <div class="form-floating mt-3 mb-3">
          <base-input
            label="First Name"
            class="mb-2"
            name="First Name"
            :rules="{ required: true }"
            placeholder="First Name"
            v-model="initiateModel.customerFirstName"
            required
          >
          </base-input>
        </div>
        <div class="form-floating mt-3 mb-3">
          <base-input
            label="Last Name"
            class="mb-2"
            name="Last Name"
            :rules="{ required: true }"
            placeholder="Last Name"
            v-model="initiateModel.customerLastName"
            required
          >
          </base-input>
        </div>
        <div class="form-floating mt-3 mb-3">
          <base-input
            label="Email"
            class="mb-2"
            name="Email"
            type="email"
            :rules="{ required: true }"
            placeholder="Email"
            v-model="initiateModel.customerEmail"
            required
          >
          </base-input>
        </div>

        <b><label>Phone number </label></b>
        <div class="form-floating mb-3" style="display: flex">
          <vue-country-code
            @onSelect="onSelect"
            :preferredCountries="['ng', 'us', 'gb']"
            style="height: 38px"
            v-model="initiateModel.customerCountryCode"
          >
          </vue-country-code>

          <base-input
            type="tel"
            class="phone"
            name="phone number"
            placeholder="Phone Number"
            v-model="initiateModel.customerPhone"
            required
            style="width: 100%"
          >
          </base-input>
        </div>
        <div class="text-center">
          <button
            id="submitBtn"
            class="btn-login"
            native-type="submit"
            :class="{ disabled: loading }"
          >
            Sign Up <span :class="{ 'spinner-border': loading }"></span>
          </button>
        </div>
        <div class="mt-2">
          <div class="text-center">
            <p>
              Already have an account?
              <a class="text-primary" @click="login()" style="cursor: pointer"
                >Login</a
              >
            </p>
          </div>
        </div>
      </form>
      <form
        class="p-3 form-group form-login"
        role="form"
        v-if="screen == 'otp'"
        @submit.prevent="handleSubmit(onCompleteEnrollment())"
      >
        <h4 class="text-center m-4">Complete Registration</h4>
        <div class="text-center">
          <span>Enter OTP</span><br />
          <vue-fake-input
            :length="6"
            :fontSize="40"
            inputColor="#ffc107"
            fontColor="#ffc107"
            :allowPaste="false"
            v-model="completeModel.customerOtp"
            required
          /><br /><br />
          <b
            ><span v-if="timerCount > 0"> {{ timerCount }} secs left </span></b
          >
          <h6
            style="cursor: pointer"
            @click="resendOtp()"
            v-if="timerCount == 0"
            class=""
            id="otp"
          >
            Resend OTP
          </h6>
        </div>
        <div class="form-floating mt-2 mb-3">
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="XXXXX"
            v-model="completeModel.customerPassword"
            id="pwd"
            required
          />
          <label>Password</label>
          <i
            class="fas fa-eye"
            style="position: absolute; right: 30px; top: 25px; cursor: pointer"
            id="eye"
            @click="hide$show()"
          ></i>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            name="Comfirm password"
            placeholder="XXXXX"
            v-model="completeModel.customerConfirmPassword"
            id="pwd1"
            required
          />
          <label>Comfirm Password</label>
          <i
            class="fas fa-eye"
            style="position: absolute; right: 30px; top: 25px; cursor: pointer"
            id="eye1"
            @click="hide$show1()"
          ></i>
        </div>
        <div class="text-center">
          <span id="passmisMatched" class="text-danger text-center"></span>
          <div class="text-center">
            <button
              class="btn-login"
              native-type="submit"
              :class="{ disabled: loading }"
            >
              Proceed
              <span :class="{ 'spinner-border': loading }"></span>
            </button>
          </div>
        </div>
        <div class="wrapper mt-3 mb-2 text-center m-t-sm text-sm">
          By clicking the “Proceed” button, you agree to BizGem’s
          <a class="text-primary">terms of acceptable use</a>.
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

    async resendOtp() {
      this.resendOtpModel.customerEmail = this.initiateModel.customerEmail;
      await StoreUtils.dispatch(StoreUtils.actions.auth.resendOtp, this.resendOtpModel)
      console.log("Timer...");
      this.timerCount = 30;
    },
    onInitiateEnrollment() {
      StoreUtils.dispatch( StoreUtils.actions.auth.initialEnrollment, this.initiateModel);
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
    onCompleteEnrollment() {
      if (
        this.completeModel.customerPassword ===
        this.completeModel.customerConfirmPassword
      ) {;
        this.completeModel.customerEmail = this.initiateModel.customerEmail;
        this.completeModel.customerBusinessName = this.initiateModel.customerBusinessName;
        this.completeModel.customerReferralCode = localStorage.referralCode;
        StoreUtils.dispatch( StoreUtils.actions.auth.completeEnrollment,this.completeModel);
      } else {
        document.getElementById("passmisMatched").innerText = "Passwords are not the same";
        setTimeout(() => {
          document.getElementById("passmisMatched").style.display = "none";
        }, 2000);
        if (document.getElementById("passmisMatched").style.display == "none") {
          document.getElementById("passmisMatched").style.display = "block";
        }
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
    this.startTimer();
    this.timerCount = 30;
  },
};
</script>
<style scoped>
.forgot-password {
  color: black;
  cursor: pointer;
}

.join-now-text {
  color: black;
  cursor: pointer;
}

.btn-login {
  width: 332px;
  height: 43px;
  left: 51px;
  top: 601px;

  background: rgb(10, 133, 190);
  border-radius: 25px;
  border: none;
  color: white;
}

/* .phone{
  width:100%;
  border-top-left-radius: 0 !important;
} */

/* */

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
  border-radius: 10px;
  padding-top: 10px;
  font-size: 14px;
  line-height: 1.42857143;
  padding-bottom: 20px;
  background: white;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 30%);
}
</style>