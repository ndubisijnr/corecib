<template>
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
    <form class="container form-group form-login" role="form" @submit.prevent="handleSubmit(onSubmit)">
      <div class="text-center">
        <img src="" alt="" class="img-fluid" />
        <h6 class="mt-1">Sign in to continue to BizGem</h6>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" name="email" placeholder="businessname@gmail.com" v-model="model.username" required/>
        <label >Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" name="password" placeholder="XXXXX" v-model="model.password" id="pwd" required/>
        <label >Password</label>
        <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye" @click="hide$show()"></i>
      </div>
      <div class="mt-3 mb-3 text-center">
        <span id="error" class="text-danger"></span>
      </div>
      <div class="text-center">
        <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading">
          Login <span :class="{ 'spinner-border': loading }"></span>
        </button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import AuthenticationRequest from "../../model/request/AuthRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import {mapState} from "vuex";

export default {
  name: "LoginForm",
  components:{

  },
  data(){
    return {
      model: AuthenticationRequest.login,
      notifications: {
        topCenter: false,
      },
      showDismissibleAlert: false,
    }
  },
  methods:{
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
      StoreUtils.dispatch(StoreUtils.actions.auth.logon, this.model)
    },
  },
  computed:{
    ...mapState({
        loading: (state) => state.auth.loading,
    }),
  },
  mounted() {

  }

}
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

  background: rgb(10, 133, 190);
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