<template>
    <div class="auth-wrap">
      <signup-user-form></signup-user-form>
    </div>
</template>
<script>
import SignupUserForm from "../../components/form/SignupUserForm";
// import image from "/@/assets/biz.svg"

export default {
  name:"SignUp",
  components: {
    "signup-user-form": SignupUserForm,
  },
  data(){
    return{
      primaryColor:window.__env.app.primaryColorGradient,
      // image:image
    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
};
</script>
<style lang="css" scoped>
.auth-wrap {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
}

@media (max-width: 500px) {
  .auth-wrap {
    width: 100%;
    display: block;
    height: 100vh;
  }
}


</style>
