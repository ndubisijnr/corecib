<template>
  <div>
    <!-- Page content -->
    <div class="auth-wrap">
        <login-form/>
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
      primaryColor:window.__env.app.primaryColorGradient
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

.auth-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: white; */
}

.long-stroke-left{
  height: 100%;
  width: 20px;
  position: fixed;
  left: 0;
  top: 0;
}
.long-stroke-right{
  height: 100%;
  width: 20px;
  position: fixed;
  right: 0;
  top: 0;
}

</style>
