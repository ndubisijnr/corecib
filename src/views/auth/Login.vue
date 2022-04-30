<template>
  <div>
    <notifications></notifications>
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

</style>
