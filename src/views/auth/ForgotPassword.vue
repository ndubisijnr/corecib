<template>
  <div>
    <notifications></notifications>
    <div class="auth-wrap">
        <forgot-password-form/>
      </div>
      
  </div>
  <!--    </div>-->
  <!--  </div>-->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ForgotPasswordForm from "../../components/form/ForgotPasswordForm";

export default {
  components: {
    ForgotPasswordForm
  },
  data() {
    return {
      timerCount: 0,

      model: {
        customerEmail: "",
        customerPassword: "",
        customerOtp: "",
        customerPasswordConfirmation: "",
        rememberMe: false,
      },

      notifications: {
        topCenter: false,
      },
      //disableBtn:false,
      //spinner:false,
      showDismissibleAlert: false,
    };
  },
  methods: {
    signUp() {
      this.$router.push({ name: "SignUp" });
    },
    forgotPassword() {},
   
    oninitiatePassword() {
      const user = {
        customerEmail: this.model.customerEmail,
        source: "web",
      };
      this.$store.dispatch("initiatePasswordRest", user, { root: false });
    },
    oncompletePassword() {
      const user = {
        customerEmail: this.model.customerEmail,
        customerPassword: this.model.customerPassword,
        customerPasswordConfirmation: this.model.customerPasswordConfirmation,
        customerOtp: this.model.customerOtp,
      };
      this.$store.dispatch("completePasswordRest", user, { root: false });
    },
    resendOtp() {
      const userEmailForResendOtp = {
        customerEmail: this.model.customerEmail,
        source: "web",
      };
      this.$store
        .dispatch("resendOtp", userEmailForResendOtp, { root: false })
        .then(() => {
          this.timerCount = 30;
        });
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
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      checkForm: (state) => state.auth.enrollForm,
    }),
    ...mapActions(["logon"]),
    ...mapGetters([""]),
  },
  watch: {
    errors(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.error(newValue);
        //this.showDismissibleAlert=true;
      }
    },
    success(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.success(newValue);
        //this.showDismissibleAlert=true;
      }
    },
      timerCount: {
    handler(value) {
      if (value > 0) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },
    //immediate: true, // This ensures the watcher is triggered upon creation
  },
  },

  mounted: function() {
    this.startTimer();
    this.timerCount = 30;
  },
};
</script>
<style lang="css" scoped>

.auth-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  /* background-color: white; */
}


@media (max-width: 500px) {
  .auth-wrap {
    width: 100%;
    display: block;
    height: 100vh;

  }
}


</style>
