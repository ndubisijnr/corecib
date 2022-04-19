<template>
  <div>
    <notifications></notifications>

    <div class="" style="display: flex; justify-content: center">
      <div class="m-3">
        <div class="text-center" style="margin-bottom: -30px">
          <img
            src="@/assets/bizgemio.svg"
            alt=""
            class="mg-fluid p"
            width="80px"
          />
        </div>
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <form
            class="container form-group form-login"
            role="form"
            @submit.prevent="handleSubmit(onInitiateEnrollment())"
            v-if="formCheck === 'first'"
          >
            <div class="form-floating mt-3 mb-3">
              <base-input label="Country">
                <el-select
                  class="select-danger"
                  filterable
                  placeholder="Country"
                  v-model="model.customerCountry"
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
              <span class="small text-danger"
                >Business name must contain two words (eg. Dangote Groups)</span
              >
              <base-input
                label="Business Name"
                class="mb-2"
                name="Business Name"
                :rules="{ required: true }"
                placeholder="eg. Amanda Limited"
                v-model="model.customerBusinessName"
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
                v-model="model.customerFirstName"
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
                v-model="model.customerLastName"
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
                v-model="model.customerEmail"
                required
              >
              </base-input>
            </div>

            <b><label>Phone number </label></b>
            <div class="form-floating mb-3" style="display: flex">
              <vue-country-code
                @onSelect="onSelect"
                :preferredCountries="['ng', 'us', 'gb']"
                style="height:46px"
                v-model="model.customerCountryCode"
              >
              </vue-country-code>

              <base-input
                :label="Phonenumber"
                type="tel"
                class="phone"
                name="phone number"
                placeholder="Phone Number"
                v-model="model.customerPhone"
                required
                style="width:100%;"
              >
              </base-input>
            </div>
            <!-- <div class="form-group mb-2">
                     <label for="username" class="form-control-label"
                      >Are you a software developer?</label
                    >
                    <b-form-radio-group
                      v-model="model.type"
                      :options="[
                        { item: 'Yes, I am ', name: 'Yes, I am ' },
                        { item: 'No, I am not', name: 'No, I am not' },
                      ]"
                      class="mb-2"
                      value-field="item"
                      text-field="name"
                      name="radio-inline"
                      disabled-field="notEnabled"
                    >
                    </b-form-radio-group>
                  </div>-->
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
            <!--                  <div class="text-center">-->
            <!--                    <base-button-->
            <!--                      icon-->
            <!--                      type="primary"-->
            <!--                      native-type="submit"-->
            <!--                      :class="{ disabled: loading }"-->
            <!--                      class="my-4 mb-2"-->

            <!--                    >-->
            <!--                      <span class="btn-inner&#45;&#45;text">Sign Up</span>-->
            <!--                      <span :class="{ 'spinner-border': loading }"></span>-->
            <!--                    </base-button>-->
            <!--                  </div>-->
            <div class="mt-2">
              <div class="text-center">
                <p>
                  Already have an account?
                  <a
                    class="text-primary"
                    @click="login()"
                    style="cursor: pointer"
                    >Login</a
                  >
                </p>
              </div>
            </div>
          </form>
          <form
            class="p-3 form-group form-login"
            role="form"
            v-if="formCheck === 'second'"
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
                v-model="otpValue"
                required
              /><br /><br />
              <b
                ><span v-if="timerCount > 0">
                  {{ timerCount }} secs left
                </span></b
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
            <!--                    <base-input-->
            <!--                      label="OTP"-->
            <!--                      class="mb-2"-->
            <!--                      name="otp"-->
            <!--                      :rules="{ required: true }"-->
            <!--                      type="text"-->
            <!--                      placeholder="OTP"-->
            <!--                      v-model="otpValue"-->
            <!--                      required-->
            <!--                    >-->
            <!--                    </base-input>-->
              <div class="form-floating mt-2 mb-3">
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="XXXXX"
                v-model="password"
                id="pwd"
                required
              />
              <label for="floatingInput">Password</label>
              <i
                class="fas fa-eye"
                style="
                  position: absolute;
                  right: 30px;
                  top: 25px;
                  cursor: pointer;
                "
                id="eye"
                @click="hide$show()"
              ></i>
            </div>
            <!-- <base-input
              label="Password"
              class="mb-2 mt-3"
              name="Password"
              :rules="{ required: true }"
              type="password"
              placeholder="Password"
              v-model="password"
              required
            >
            </base-input> -->
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                name="Comfirm password"
                placeholder="XXXXX"
                v-model="comFirmPassword"
                id="pwd1"
                required
              />
              <label for="floatingInput">Comfirm Password</label>
              <i
                class="fas fa-eye"
                style="
                  position: absolute;
                  right: 30px;
                  top: 25px;
                  cursor: pointer;
                "
                id="eye1"
                @click="hide$show1()"
              ></i>
            </div>
            <!-- <base-input
              label="Confirm Password"
              class="mb-2"
              name="Confirm Password"
              :rules="{ required: true }"
              type="password"
              placeholder="Confirm Password"
              v-model="comFirmPassword"
              required
            >
            </base-input> -->
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
              <!--                      <base-button-->
              <!--                        icon-->
              <!--                        type="primary"-->
              <!--                        native-type="submit"-->
              <!--                        :class="{ disabled: loading }"-->
              <!--                        class="my-4 mb-2"-->
              <!--                      >-->
              <!--                        <span class="btn-inner&#45;&#45;text">Proceed</span>-->
              <!--                        <span :class="{ 'spinner-border': loading }"></span>-->
              <!--                      </base-button>-->
            </div>
            <div class="wrapper mt-3 mb-2 text-center m-t-sm text-sm">
              By clicking the “Proceed” button, you agree to BizGem’s
              <a class="text-primary">terms of acceptable use</a>.
            </div>
          </form>
        </validation-observer>
      </div>
    </div>

    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="enterOtp text-center">-->
    <!--      <div>-->
    <!--        <h3 class="m-3 text-white">An OTP Was Sent To {{getEmail.customerEmail}}</h3>-->

    <!--        <button @click="collectOtp()" class="btn btn-primary mt-3">Proceed</button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import country from "@/components/country";
import EnrollmentRequest from "@/model/request/enrollmentRequest";
import BaseInput from "../../components/Inputs/BaseInput.vue";
// import VueFakeInput from 'vue-fake-input';

// import { VueTelInput } from "vue-tel-input";

export default {
  components: {
    BaseInput,
    // VueTelInput,
    // VueFakeInput
  },
  data() {
    return {
      option_country: [],
      countryCtrl: false,
      otpValue: "",
      model: new EnrollmentRequest().enrollmentRequest(),
      password: "",
      comFirmPassword: "",

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

      //disableBtn:false,
      //spinner:false,
      // showForm1: true,
      // showForm2: false,
      showDismissibleAlert: false,
    };
  },
  methods: {
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
    login() {
      this.$router.push({ name: "Login" });
    },
    onSelect({name, iso2, dialCode}) {
       console.log(name, iso2, dialCode);
     },
    countryChanged(country) {
      this.model.countryCode = country.dialCode;
    },
    collectOtp() {
      const otp = this.fullValue;
      this.$store.dispatch("processOtp", otp, { root: false });
    },
    resendOtp() {
      const userEmailForResendOtp = {
        customerEmail: this.model.customerEmail,
        source: this.model.source,
      };
      this.$store
        .dispatch("resendOtp", userEmailForResendOtp, { root: false })
        .then(() => {
          console.log("Timer...");
          this.timerCount = 30;
        });
    },
    onInitiateEnrollment() {
      const userInfo = this.model;
      // console.log(userInfo)
      if (userInfo) {
        this.$store.dispatch("initialEnrollment", userInfo, { root: false });
      } else {
        console.log("error");
      }
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
      if (this.password === this.comFirmPassword) {
        const finalValue = {
          customerOtp: this.otpValue,
          customerPassword: this.password,
          customerConfirmPassword: this.comFirmPassword,
          customerEmail: this.model.customerEmail,
          customerBusinessName: this.model.customerBusinessName,
        };
        this.$store.dispatch("completeEnrollment", finalValue, { root: false });
      } else {
        document.getElementById("passmisMatched").innerText =
          "Passwords are not the same";
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
      errors: (state) => state.auth.errors,
      loading: (state) => state.auth.loading,
      success: (state) => state.auth.success,
      formCheck: (state) => state.auth.enrollForm,
      getEmail: (state) => state.auth.response,
      // getOtp: (state) => state.auth.otp,
      isresendOtp: (state) => state.auth.resendOpt,
    }),
    ...mapActions(["logon"]),
    ...mapGetters([""]),
  },
  watch: {
    errors(newValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.error(newValue);
        //this.showDismissibleAlert=true;
      }
    },
    success(newValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.success(` Login ${newValue}`);
        //this.showDismissibleAlert=true;
      }
    },
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
  mounted: function () {
    let countries = country;
    this.option_country = countries.map((item) => {
      return {
        value: `${item.name}`,
        label: `${item.name}`,
      };
    });
    this.startTimer();
    this.timerCount = 30;
    const data = this.$store.getters.getResponse;
    this.model.customerBusinessName = data.customerBusinessName;
    this.model.customerEmail = data.customerEmail;
    this.model.source = data.source;
  },
};
</script>
<style lang="css" scoped>
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

  background: #053c57;
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
