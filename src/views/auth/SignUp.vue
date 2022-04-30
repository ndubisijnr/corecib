<template>
  <div>
    <notifications></notifications>

   
         <div class="auth-wrap">

        <signup-form></signup-form>
      </div>
    </div>
</template>
<script>
import SignupForm from "../../components/form/SignupForm";

export default {
  name:"SignUp",
  components: {
    "signup-form": SignupForm,
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
};
</script>
<style lang="css" scoped>
.auth-wrap {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh;
  /* background-color: white; */
}


</style>
