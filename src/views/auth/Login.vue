<template>
  <div>
    <notifications></notifications>
    <!-- Page content -->
    <div class="auth-wrap">
      <div class="login">
        <login-form/>
        <div class="mt-4">
          <a class="forgot-password" @click="forgotPassword()">
            Forgot Password
          </a>
        </div>
        <span class="text-dark">New To BizGem?<a class="join-now-text" @click="signUp()" > Create Account</a></span>
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from "../../components/form/LoginForm";

export default {
  components: {
    LoginForm
  },
  data() {
    return {

    }
  },
  methods: {
    signUp() {
      this.$router.push({ name: "SignUp" });
    },
    forgotPassword() {
      this.$router.push({ name: "ForgotPassword" });
    },
  },
};
</script>
<style lang="css" scoped>
.forgot-password {
  color: rgb(10, 133, 190);
  cursor: pointer;
}


.join-now-text {
  color: rgb(10, 133, 190);
  cursor: pointer;
}

.btn-login {
  width: 332px;
  height: 43px;
  left: 51px;
  top: 601px;
  background-color: rgb(10, 133, 190);
  border-radius: 25px;
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
.login {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: whitesmoke;
}

.auth-wrap {
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: whitesmoke;
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
