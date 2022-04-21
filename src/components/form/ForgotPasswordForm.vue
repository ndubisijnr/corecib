<!--suppress ALL -->
<template>
  <div>
    <form
      v-if="passwordResetScreen === 'email'"
      class="container form-group form-login"
      role="form"
      @submit.prevent="initiatePassword"
    >
      <div class="text-center"><h4 class="mt-3">Password Reset</h4></div>
      <div>
        <base-input
          label="Email"
          class="mb-2"
          name="Email"
          type="email"
          :rules="{ required: true }"
          placeholder="Email"
          v-model="initiateModel.customerEmail"
        >
        </base-input>
        <div class="text-center">
          <button
            id="submitBtn"
            class="btn-login"
            native-type="submit"
            :class="{ disabled: loading }"
          >
            Password Reset<span :class="{ 'spinner-border': loading }"></span>
          </button>
        </div>
      </div>
    </form>

    <form
      v-if="passwordResetScreen === 'otp'"
      class="container form-group form-login"
      role="form"
      @submit.prevent="completePassword"
    >
      <div class="completeEnrollment">
        <div style="" class="mb-1 text-center m-3">
          <h4>Enter OTP</h4>
          <vue-fake-input
            required
            :length="6"
            :fontSize="40"
            inputColor="#ffc107"
            fontColor="#ffc107"
            :allowPaste="false"
            v-model="completeModel.customerOtp"
          />
          <br /><br />
          <b
            ><span v-if="timerCount > 0"> {{ timerCount }} secs left </span></b
          >
          <h6
            style="cursor: pointer"
            @click="resendOtp()"
            v-if="timerCount === 0"
            class=""
            id="otp"
          >
            Resend OTP
          </h6>
        </div>
        <base-input
          label="New Password"
          class="mb-2"
          name="Password"
          :rules="{ required: true }"
          type="password"
          placeholder="Password"
          v-model="completeModel.customerPassword"
          required
        >
        </base-input>
        <base-input
          label="Confirm New Password"
          class="mb-2"
          name="Confirm Password"
          :rules="{ required: true }"
          type="password"
          placeholder="Confirm Password"
          v-model="completeModel.customerPasswordConfirmation"
          required
        >
        </base-input>
        <div class="text-center">
          <div class="text-center">
            <button
              class="btn-login"
              native-type="submit"
              :class="{ disabled: loading }"
            >
              Password Reset<span :class="{ 'spinner-border': loading }"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <div class="mt-2">
      <div class="text-center">
        <div class="alter-links">
          <span>
            Remember your password?<a @click="login()" class="join-now-text">
              Login</a
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueFakeInput from "vue-fake-input";
import AuthenticationRequest from "../../model/request/AuthRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "ForgotPasswordForm",
  components: {
    VueFakeInput,
  },
  data() {
    return {
      initiateModel: AuthenticationRequest.initiatePasswordReset,
      completeModel: AuthenticationRequest.completePasswordReset,
      resendOtpModel: AuthenticationRequest.resendOtp,
      timerCount: 0,
      notifications: {
        topCenter: false,
      },
      showDismissibleAlert: false,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
      loading: (state) => state.auth.loading,
      userInfo: (state) => state.auth.userInfo,
      screen: (state) => stateauth.auth.screen,
      passwordResetScreen: (state) => state.auth.passwordResetScreen,
      stage: (state) => state.stage,
    }),
  },
  methods: {
    login() {
      this.$router.push({ name: "Logon" });
    },
    initiatePassword() {
      StoreUtils.dispatch(
        StoreUtils.actions.auth.initiatePasswordReset,
        this.initiateModel
      );
    },
    completePassword() {
      this.completeModel.customerEmail = this.initiateModel.customerEmail;
      StoreUtils.dispatch(
        StoreUtils.actions.auth.completePasswordReset,
        this.completeModel
      );
    },
    resendOtp() {
      this.resendOtpModel.customerEmail = this.initiateModel.customerEmail;
      StoreUtils.dispatch(
        StoreUtils.actions.auth.resendOtp,
        this.resendOtpModel
      );
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
    },
  },
  mounted() {
    StoreUtils.commit(
      StoreUtils.mutations.auth.updatePasswordResetScreen,
      "email"
    );
    this.startTimer();
    this.timerCount = 30;
  },
};
</script>

<style lang="css" scoped>
.forgot-password {
  color: black;
  cursor: pointer;
}

.img-fluid,
.img-thumbnail {
  max-width: 100%;
  height: auto;
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

.img-fluid,
.img-thumbnail {
  max-width: 100%;
  height: auto;
}

img,
svg {
  vertical-align: middle;
}

img {
  border-style: none;
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

.login {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /*background-color: rgba(2, 32, 61, 0.99);*/

  background-color: whitesmoke;
}

.auth-wrap {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  /* background-color: rgba(2, 32, 61, 0.99); */
  background-color: whitesmoke;

  /*background-color: var(--sidebar-bg-color);*/
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