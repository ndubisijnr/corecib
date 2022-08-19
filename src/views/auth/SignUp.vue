<template>
    <div class="auth-wrap">
      <signup-form></signup-form>
    </div>
</template>
<script>
import SignupForm from "../../components/form/SignupForm";
// import image from "/@/assets/biz.svg"

export default {
  name:"SignUp",
  components: {
    "signup-form": SignupForm,
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
