<template>
  <div>
    <notifications></notifications>
    <div class="m-3">
      <div class="">
        <div class="text-center" style="margin-bottom: -30px">
          <img
            src="@/assets/bizgemio.svg"
            alt=""
            class="mg-fluid p"
            width="80px"
          />
        </div>
        <forgot-password-form/>
      </div>
      
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
