<template>
  <div>
    <notifications></notifications>

    <div class="" style="display: flex; justify-content: center">

      <div class="m-3">
        <signup-form></signup-form>
      </div>
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
.forgot-password {
  color: black;
  cursor: pointer;
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

/* .phone{
  width:100%;
  border-top-left-radius: 0 !important;
} */

/* */

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
  padding-top: 10px;
  font-size: 14px;
  line-height: 1.42857143;
  padding-bottom: 20px;
  background: white;
  box-shadow: 0 1px 2px hsl(0deg 0% 0% / 30%);
}
</style>
