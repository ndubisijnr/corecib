<template>
  <div>
    <notifications></notifications>
    <!-- Page content -->
    <div class="auth-wrap">
      <div class="login">
        <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
          <div class="text-center">
            <img
              src="@/assets/bizgemio.svg"
              alt=""
              class="mg-fluid"
              width="80px"
              style="margin-bottom: -35px"
            />
          </div>
          <form
            class="container form-group form-login"
            role="form"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <div class="text-center">
              <img src="" alt="" class="img-fluid" />
              <h4 class="mt-1">Sign in to continue to BizGem</h4>
            </div>
            <div class="form-floating mb-3">
               <input
                type="email"
                class="form-control"
                name="email"
                placeholder="businessname@gmail.com"
                v-model="model.username"
                required
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                name="password"
                placeholder="XXXXX"
                v-model="model.password"
                id="pwd"
                required
              />
              <label for="floatingInput">Password</label>
              <i
                class="fas fa-eye"
                style="
                  position: absolute;
                  right: 30px;
                  top: 25px;
                  cursor: pointer;
                "
                id="eye"
                @click="hide$show()"
              ></i>
            </div>
            <div class="mt-3 mb-3 text-center">
              <span id="error" class="text-danger"></span>
            </div>
            <div class="text-center">
              <button
                id="submitBtn"
                class="btn-login"
                native-type="submit"
                :disabled="loading"
              >
                Login <span :class="{ 'spinner-border': loading }"></span>
              </button>
            </div>
          </form>
        </validation-observer>
        <div class="mt-4">
          <h4 class="forgot-password" @click="forgotPassword()">
            Forgot Password
          </h4>
        </div>
        <span class="text-dark"
          >New To BizGem?
          <span class="join-now-text" @click="signUp()"
            >Create Account</span
          ></span
        >
        <div class="text-center text-dark"><p>© 2020 BizGem.</p></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AuthService from "../../service/AuthService";

export default {
  components: {
    //BaseHeader
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
        // bankCode:'',
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
    hide$show() {
      let b = document.getElementById("pwd");
      let eye = document.getElementById("eye");
      if (b.type === "password") {
        b.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
      } else {
        b.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
      }
    },
    forgotPassword() {
      this.$router.push({ name: "ForgotPassword" });
    },
    onSubmit() {
      const userInfo = {
        username: this.model.username,
        password: this.model.password,
      };
      this.$store.dispatch("logon", userInfo, { root: false });
    },
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
      loading: (state) => state.auth.loading,
      success: (state) => state.auth.success,
    }),
    ...mapActions(["logon"]),
    ...mapGetters([""]),
  },
  watch: {
    errors(newValue) {
      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.error(newValue);
        //this.showDismissibleAlert=true;
      }
    },
    success(newValue) {
      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.success(` Login ${newValue}ful`);
        //this.showDismissibleAlert=true;
      }
    },
  },
  mounted(){
    if(localStorage.getItem("token") !== null){
          return AuthService.callRevalidateApi(localStorage.getItem("token")).then(response => {
            let responseData = response.data
            if(responseData.responseMessage == "00"){
              router.push({name:"GetStarted"})
            }
            else{
              console.log("reload")
            }

          })

        }

      console.log("mounted")
  }
};
</script>
<style lang="css" scoped>
/*body {*/
/*    margin: 0;*/
/*    font-family: Open Sans, sans-serif;*/
/*    font-size: 1rem;*/
/*    font-weight: 400;*/
/*    line-height: 1.5;*/
/*    color: #525f7f;*/
/*    text-align: left;*/
/*    background-color: #525f7f !important;*/
/*}*/
/*a:hover {*/
/*    text-decoration: underline;*/
/*    cursor: pointer;*/
/* }*/

/*.alter-links a {*/
/*    width: 100%;*/
/*    display: block;*/
/*    text-align: center;*/
/*    margin-bottom: 5px;*/
/*    color: #2f2f2a;*/
/*    font-size: 11px;*/
/*}*/
/*@keyframes spinner-border {*/
/*  to { transform: rotate(360deg); }*/
/*}*/

/*.spinner-border {*/
/*    display: inline-block;*/
/*    width: 1rem;*/
/*    height: 1rem;*/
/*    vertical-align: text-bottom;*/
/*    border: .25em solid currentColor;*/
/*    border-right-color: transparent;*/
/*    border-radius: 50%;*/
/*    -webkit-animation: spinner-border .75s linear infinite;*/
/*    animation: spinner-border .75s linear infinite;*/
/*}*/
/*.text-primary {*/
/*    color: #212529!important;*/
/*}*/

/*.img-fluid, .img-thumbnail {*/
/*    max-width: 100%;*/
/*    height: auto;*/
/*}*/
/*img, svg {*/
/*    vertical-align: middle;*/
/*}*/
/*img {*/
/*    border-style: none;*/
/*}*/
/*p {*/
/*    margin-top: 0;*/
/*    margin-bottom: 1rem;*/
/*    font-size: .8rem !important;*/
/*}*/
/*.bg-soft-primary {*/
/*    background-color: rgba(124, 124, 128, 0.25) !important;!* rgba(85,110,230,.25)!important;*!*/
/*}*/
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
