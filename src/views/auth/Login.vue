<template>
  <div>
    <notifications></notifications>
    <!-- Page content -->
    <div class="auth-wrap">
      <div class="login">
        <login-form/>
        <div class="mt-4">
          <h6 class="forgot-password" @click="forgotPassword()">
            Forgot Password
          </h6>
        </div>
        <span class="text-dark">New To BizGem?<span class="join-now-text" @click="signUp()" >Create Account</span></span>
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
  /*background-color: rgba(2, 32, 61, 0.99);*/
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
