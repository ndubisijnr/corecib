<!--suppress ALL -->
<template>
  <div>

    <div class="check-for-email" v-if="passwordResetScreen === 'email'">
      <form  class="form-login" role="form"
      @submit.prevent="initiatePassword" style="margin-top:0px">
      <div class="text-center">
        <!--        <a href="#">-->
<!--          <img src="@/assets/img.png" alt="" class="mg-fluid p" width="180px" /></a>-->
      </div>
      <div class="">
        <h4 class="forgot-password-h4">Password Reset</h4>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" name="email" placeholder="businessEmail@gmail.com"
              v-model="initiateModel.customerEmail" required />
            <label>Email address</label>
          </div>
          <div class="login-footer">
            <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading" :style="{background:primaryColor}">
              {{ loading ? "Checking" : 'Check' }} <span :class="{ 'spinner-border': loading }"></span>
            </button>
          </div>
          <div class="m-3 text-center">
            <h5 class="text-dark" style="cursor:pointer;text-decoration: underline" @click="login()">Remembered your password?</h5>
          </div>
      </div>
    </form>
    </div>
    <form v-if="passwordResetScreen === 'otp'" class="container form-group form-login" role="form"
      @submit.prevent="completePassword">
      <div class="text-center">
        <a href="#">
          <img src="@/assets/img.png" alt="" class="mg-fluid p" width="180px" /></a>
      </div>
      <div class="p-3">
        <h4 class="forgot-password-h4">Almost Done!</h4>
        <div class="form-floating mb-3">
          <input type="tel" class="form-control" maxlength="6"
            style="font-size:30px; padding-left:10px;letter-spacing:7px;" name="email"
            placeholder="Enter Your OTP Number" v-model="completeModel.customerOtp" required />
          <label>Enter Your OTP Number</label>
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
            v-model="completeModel.customerPasswordConfirmation" id="pwd2" required />
          <label>Confirm Password</label>
          <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye2"
            @click="hide$show()"></i>
        </div>

        <div class="login-footer">
          <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading" :style="{background:primaryColor}">
            {{ loading ? "Reseting" : 'Reset' }} <span :class="{ 'spinner-border': loading }"></span>
          </button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import { mapState } from "vuex";
// import VueFakeInput from "vue-fake-input";
import AuthenticationRequest from "../../model/request/AuthRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";

export default {
  name: "ForgotPasswordForm",
  components: {
    // VueFakeInput,
  },
  data() {
    return {
      initiateModel: AuthenticationRequest.initiatePasswordReset,
      completeModel: AuthenticationRequest.completePasswordReset,
      resendOtpModel: AuthenticationRequest.resendOtp,
      timerCount: 0,
      primaryColor:window.__env.app.primaryColor
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
    login() {
      this.$router.push({ name: "Logon" });
    },
    initiatePassword() {
      StoreUtils.dispatch(
        StoreUtils.actions.auth.initiatePasswordReset,
        this.initiateModel
      )

    },
    completePassword() {
      this.completeModel.customerEmail = this.initiateModel.customerEmail;
      StoreUtils.dispatch(
        StoreUtils.actions.auth.completePasswordReset,
        this.completeModel
      ).then(() => {
        Object.keys(this.completeModel).forEach(key => {
          this.completeModel[key] = null;
        });
      })

    },
    resendOtp() {
      this.resendOtpModel.customerEmail = this.initiateModel.customerEmail;
      StoreUtils.dispatch(
        StoreUtils.actions.auth.resendOtp,
        this.resendOtpModel
      );
      this.startTimer()
      this.timerCount = 30

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
  },
};
</script>

<style lang="css" scoped>
.forgot-password {
  color: black;
  cursor: pointer;
}

.login-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-login {
  width: 100%;
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

.join-now-text {
  cursor: pointer;
  color: var(--primary);

}

.forgot-password-h4{
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  margin:2%;
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

  /* background-color: whitesmoke; */
}



.form-login {
  width: 450px;
  border-radius: 10px;
  padding-top: 10px;
  font-size: 14px;
  line-height: 1.42857143;
  padding-bottom: 20px;
  /* background: white;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 30%); */
}

@media (max-width: 400px) {
  .form-login{
    width: 100%;
  }

  .check-for-email{
    width: 100%;
    display: flex;
    height: 100vh;
    align-items:center;
    padding: 2%;
  }

}
</style>