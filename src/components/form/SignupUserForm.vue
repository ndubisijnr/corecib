<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }" ref="formValidator">

      <!--------- initiate enrolment ------->
      <div class="initiate-enrollment">
        <form class="form-login" role="form" @submit.prevent="handleSubmit(addUser())">
        <div class="text-center">
          <a href="https://www.bizgem.io/"> <img src="@/assets/img.png" alt="" class="mg-fluid p" width="80px" /></a>
        </div>
        <div class="">
          <h4 class="complete-enrollment-h4">New Customer</h4>
          <div class="form-floating mt-3 mb-3">
            <base-input label="First Name" class="mb-2" name="First Name" :rules="{ required: true }"
                        placeholder="First Name" v-model="model.customerFirstName" required>
            </base-input>
          </div>
          <div class="form-floating mt-3 mb-3">
            <base-input label="Last Name" class="mb-2" name="Last Name" :rules="{ required: true }"
                        placeholder="Last Name" v-model="model.customerLastName" required>
            </base-input>
          </div>

          <div class="form-floating mb-3">
            <base-input label="Country">
              <el-select class="select-danger w-100" filterable placeholder="Country" v-model="model.customerCountry"
                required>
                <el-option v-for="option in option_country" class="select-danger" :value="option.value"
                  :label="option.label" :key="option.value">
                </el-option>
              </el-select>
              <p v-show="countryCtrl" class="form-error-message">
                The Country is required
              </p>
            </base-input>
          </div>
          <b><label>Phone number </label></b>
          <div class="form-floating mb-3" style="display: flex">
            <vue-country-code @onSelect="onSelect" :preferredCountries="['ng', 'us', 'gb']" style="height: 45px"
                              v-model="model.customerCountryCode">
            </vue-country-code>

            <base-input type="tel" class="phone" name="phone number" placeholder="Phone Number"
                        v-model="model.customerPhone" required style="width: 100%">
            </base-input>
          </div>
          <!--<b><label>Phone number </label></b>-->
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="password" placeholder="XXXXX" v-model="model.customerPassword" id="pwd1" required/>
            <label >Password</label>
            <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye" @click="hide$show()"></i>
          </div>
          <!--<b><label>Phone number </label></b>-->
          <div class="form-floating mb-3">
            <input type="password" class="form-control" name="confirm password" placeholder="XXXXX" v-model="model.customerConfirmPassword" id="pwd2" required/>
            <label >Confirm Password</label>
            <i class="fas fa-eye" style=" position: absolute; right: 30px; top: 25px; cursor: pointer;" id="eye1" @click="hide$show()"></i>
          </div>
          <div class="login-footer">
            <button id="submitBtn" class="btn-login" native-type="submit" :disabled="loading" :style="{background:primaryColor}">
              {{ loading ? "Working" : 'Continue' }} <span :class="{ 'spinner-border': loading }"></span>
            </button>
          </div>
        </div>
      </form>
      </div>
      <!--------- end initiate enrolment ------->
    </validation-observer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BaseInput from "../../components/inputs/BaseInput";
import AuthenticationRequest from "../../model/request/AuthRequest";
import StoreUtils from "../../util/baseUtils/StoreUtils";
import country from "@/components/country";
import Swal from "sweetalert2";

export default {
  name: "SignupUser-Form",
  components: {
    BaseInput,
  },
  data() {
    return {
      option_country: [],
      countryCtrl: false,
      model: AuthenticationRequest.createCustomerRequest,
      modelLink: AuthenticationRequest.validateCustomerLinkRequest,
      timerCount: 0,
      primaryColor:window.__env.app.primaryColor,
      notifications: {
        topCenter: false,
      },
      bindProps: {
        mode: "international",
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "on",
        name: "telephone",
        maxLen: 25,
        preferredCountries: ["NG", "US"],
        placeholder: "Phone Number",
      },
      tel_options: {
        placeholder: "Phone Number",
        styleClasses: "form-control",
        maxlength: 15,
        name: "telephone",
        required: true,
      },
      dropdown_options: {
        showDialCodeInSelection: true,
        showFlags: true,
        autocomplete: "off",
        showDialCodeInList: true,
      },
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Logon" });
    },
    hide$show() {
      let b = document.getElementById("pwd");
      let eye = document.getElementById("eye");
      let b2 = document.getElementById("pwd2");
      let eye2 = document.getElementById("eye2");
      if (b.type === "password") {
        b.type = "text";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
      } else {
        b.type = "password";
        eye.classList.add("fa-eye");
        eye.classList.remove("fa-eye-slash");
      }
      if (b2.type === "password") {
        b2.type = "text";
        eye2.classList.remove("fa-eye");
        eye2.classList.add("fa-eye-slash");
      } else {
        b2.type = "password";
        eye2.classList.add("fa-eye");
        eye2.classList.remove("fa-eye-slash");
      }
    },
    hide$show1() {
      let b = document.getElementById("pwd1");
      let eye = document.getElementById("eye1");
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

    onSelect({ dialCode }) {
      this.model.customerCountryCode = dialCode;
    },


    addUser() {
      console.log(JSON.stringify(this.model))
      StoreUtils.dispatch(StoreUtils.actions.auth.createCustomer, this.model);
    },

  },
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading
    }),
  },
  watch: {

  },
  created() {
    console.log("Testing created->  "+this.$route.query.q)
  },
  beforeMount() {
    console.log("Testing Before mounted->  "+this.$route.query.q)
  },
  mounted() {
    console.log("Testing mounted->  "+this.$route.query.q)

    this.model.customerLink = this.$route.query.q;
    this.modelLink.customerLink = this.model.customerLink;
    StoreUtils.dispatch(StoreUtils.actions.auth.validateLink, this.modelLink);
    let countries = country;
    this.option_country = countries.map((item) => {
      return {
        value: `${item.name}`,
        label: `${item.name}`,
      };
    });
  },
};
</script>
<style scoped>
.login-footer {
  width: 450px;
}

.initiate-enrollment{
  margin: 30px auto;
}

.complete-enrollment{
  width: 450px;
  padding: 0;
  margin: 100px auto;
}

.complete-enrollment-h4{
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  margin:2%;
}

.form-login {
  width: 100%;
  font-size: 14px;
  padding: 2%;
  line-height: 1.42857143;
  /*box-shadow: 0 1px 2px hsl(0deg 0% 0% / 30%);*/
}

.btn-login {
  width: 100%;
  border-radius: 5px;
  border: none;
  color: white;
  /*background-color: #3F88C5;*/

}

::placeholder {
  font-size: 10px;
  letter-spacing: 1px;
  padding-left: 0;
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


@media (max-width: 590px){
  .form-login{
    width: 100%;
  }

  .complete-enrollment{
    width: 100%;
    padding: 2%;
    margin: 0;
  }

  .initiate-enrollment{
    margin: 0;
    width: 100%;
    padding: 2%;


  }
}
</style>