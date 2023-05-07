<template>
  <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
    <form class="container form-group form-login" role="form" @submit.prevent="handleSubmit(onSubmit)">
      <div class="text-center">
        <a href="#">
        <img src="@/assets/img.png" alt="" class="mg-fluid p" width="180px" /></a>
      </div>
      <div class="">
      <h4 class="login-h4">Sign in to continue</h4>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" name="email" placeholder="businessname@gmail.com" v-model="model.username" required/>
        <label >Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" name="password" placeholder="XXXXX" v-model="model.password" id="pwd" required/>
        <label >Password</label>
        <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye" @click="hide$show()"></i>
      </div>
      <div class="login-footer">
        <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading">{{loading ? 'Loading..' : 'Login in'}} <span :class="{ 'spinner-border': loading }"></span></button>
      </div>
        <div class="text-center mt-3">
          <h5 @click="forgotPassword()" style="cursor: pointer;text-decoration: underline">Forgot Your Password?</h5>
          <h5 class="text-dark mt-1" @click="signUp()" style="cursor: pointer;text-decoration: underline">Create An Account</h5>
        </div>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import AuthenticationRequest from "../../model/request/AuthRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import {mapState} from "vuex";

export default {
  name: "LoginForm",
  data(){
    return {
      model: AuthenticationRequest.login,
      timerCount: 0,
      notifications: {
        topCenter: false,
      },
    }
  },
  methods:{
    signUp() {
      this.$router.push({ name: "SignUp" });
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
    forgotPassword() {
      this.$router.push({ name: "ForgotPassword" });
    },
    onSubmit() {
      StoreUtils.dispatch(StoreUtils.actions.auth.logon, this.model).then(() => {})
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

  computed:{
    ...mapState({
        loading: (state) => state.auth.loading,
    }),
  },

}
</script>

<style lang="css" scoped>


.login-footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-h4{
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  margin:2%;
}



.btn-login {
  width: 100%;
  /*background-color:#faa831;*/
  background-color:#413d52;
  border-radius: 5px;
  border: none;
  color: white;
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
  border-radius: 10px;
  padding: 5%;
  font-size: 14px;
  line-height: 1.42857143;
  /* background: white;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 5%); */
}

@media (max-width: 500px) {
  .form-login {
    width: 100%;
    font-size: 12px;
   background: white;
    /*box-shadow: 0 1px 1px hsl(0deg 0% 0% / 5%);*/
  }
}
</style>