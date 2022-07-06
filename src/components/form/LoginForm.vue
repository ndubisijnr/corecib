<template>
  <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
    <form class="container form-group form-login" role="form" @submit.prevent="handleSubmit(onSubmit)">
      <div class="text-center">
        <a href="https://bizgem.io/"> 
        <img src="@/assets/biz.svg" alt="" class="mg-fluid p" width="80px" /></a>  
      </div>
      <div class="p-3">
      <h4 class="text-center">Sign in to continue to BizGem</h4>
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
          <div class="text-center">
          <a class="forgot-password" @click="forgotPassword()">
            Forgot Your Password?
          </a><br/>
          <span class="text-dark mt-1">New To BizGem?<a class="join-now-text" @click="signUp()" > Create Account</a></span>
        </div>
        <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading">
          {{loading ? "Loging in" : 'Login'}} <span :class="{ 'spinner-border': loading }"></span>
        </button>
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
      StoreUtils.dispatch(StoreUtils.actions.auth.logon, this.model)
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



.btn-login {
  width: 132px;
  background-color:#3F88C5;
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



.forgot-password {
  color: var(--primary);
  cursor: pointer;
}


.join-now-text {
  color: var(--primary);
  cursor: pointer;
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
    width: 450px;
    border-radius: 10px;
    padding: 10%;
    font-size: 12px;
    /* background: white;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 5%); */
  }
}
</style>