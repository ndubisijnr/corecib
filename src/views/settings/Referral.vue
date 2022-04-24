<template>
  <div>
    <div class="container-fluid mt-0">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane id="tab-0" :key="1" name="first" label="Profile">
                <span :class="{ 'spinner-border': loading }"></span>
                <div class="center-block" v-if="!loading">
                  <form class="form-group px-2 bg-white p-5 m-5 shadow">
                    <h3 class="text-center settings-profile-header">
                      Your Profile
                    </h3>
                    <div class="form-floating mb-3">
                      <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                      />
                      <label for="floatingInput">First Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                      />
                      <label for="floatingInput">Last Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                      />
                      <label for="floatingInput">Phone Number</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                      />
                      <label for="floatingInput">Email</label>
                    </div>
                    <button
                        type="submit"
                        class="btn btn-success"
                        disabled
                        style="cursor: not-allowed; width: 100%"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </el-tab-pane>

              <!-- END PROFILE -->

              <el-tab-pane
                  id="tab-1"
                  :key="2"
                  name="second"
                  label="Business Profile"
              >
                <span :class="{ 'spinner-border': loading }"></span>

                <div
                    style="position: absolute; top: 0; left: 10%"
                    v-if="!loading"
                >
                  <div class="form-check" @click="showprofile()">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Profile
                    </label>
                  </div>
                  <i class="fas fa-ellipsis-v"></i>
                  <div class="form-check" @click="showcontact()">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      Contact
                    </label>
                  </div>
                  <i class="fas fa-ellipsis-v"></i>
                  <div class="form-check" @click="showdoc()">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                    />
                    <label class="form-check-label" for="flexRadioDefault3">
                      Document
                    </label>
                  </div>
                </div>

                <div class="d-flex justify-content-center" v-if="!loading">
                  <div
                      class="shadow bg-white"
                      style="width: 400px; padding: 20px"
                  >
                    <div>
                      <div class="" v-if="page == 'profile'">
                        <div>
                          <span>Country</span>
                          <h3>user.customerCountry</h3>
                        </div>
                        <div>
                          <span>Industry</span>
                          <h3>Non-profits</h3>
                        </div>
                        <div>
                          <span>Category</span>
                          <h3>NGOs</h3>
                        </div>
                        <div>
                          <span> Trading Name</span>
                          <h3>organisation.organisationName</h3>
                        </div>
                        <div>
                          <span>Size</span>
                          <h3>5-10 people</h3>
                        </div>
                        <div>
                          <span>Description</span>
                          <h3>Description</h3>
                        </div>
                        <div>
                          <span> Business Type</span>
                          <h3>Registered Business</h3>
                        </div>
                        <div>
                          <span>Legal Name</span>
                          <h3>organisation.organisationName</h3>
                        </div>
                        <div>
                          <span>Registration Type</span>
                          <h3>Incorporated Company</h3>
                        </div>
                        <div
                            style="display:flex;width;100%;justify-content:space-between"
                        >
                          <button
                              class="btn btn-outline-light"
                              @click="showedit()"
                          >
                            Edit
                          </button>
                          <button
                              class="btn btn-outline-light"
                              @click="showcontact()"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                      <div class="" v-if="edit == 'first' && !loading">
                        <div class="">
                          <div class="">
                            <form class="px-2">
                              <h4
                                  class="
                                  text-center
                                  mt-4
                                  mb-4
                                  settings-profile-header
                                "
                              >
                                Your Business Profile
                              </h4>
                              <div></div>
                              <div class="form-group">
                                <div class="row">
                                  <div class="col-md-12 mb-3">
                                    <label for="inputEmail4" class="form-label"
                                    >Country</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputEmail4"
                                    />
                                  </div>
                                  <div class="col-md-12 mb-3">
                                    <label
                                        for="inputPassword4"
                                        class="form-label"
                                    >Industry</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        value="Industry"
                                        id="inputPassword4"
                                    />
                                  </div>
                                  <div class="col-12 mb-3">
                                    <label
                                        for="inputAddress"
                                        class="form-label mt-2"
                                    >Category</label
                                    >
                                    <input
                                        type="email"
                                        class="form-control"
                                        value="NGOs"
                                        id="inputAddress"
                                    />
                                  </div>
                                  <div class="col-12 mb-3">
                                    <label class="form-label mt-2"
                                    >Trading Name</label
                                    >
                                    <input
                                        type="tel"
                                        class="form-control"
                                        id="inputAddress"
                                    />
                                  </div>

                                  <div class="form-group">
                                    <label class="form-label mt-2"
                                    >Company size</label
                                    >
                                    <select
                                        class="form-select form-select-lg mb-3"
                                        aria-label=".form-select-sm example"
                                    >
                                      <option value="1">5-10 people</option>
                                      <option value="2">20-50 people</option>
                                      <option value="3">S50-100 people</option>
                                    </select>
                                  </div>
                                  <div class="col-12 mb-3">
                                    <label class="form-label mt-2"
                                    >Description</label
                                    >
                                    <textarea
                                        type="tel"
                                        class="form-control"
                                        id="inputAddress"
                                    />
                                  </div>

                                  <div class="mt-3">
                                    <button
                                        type="submit"
                                        class="btn btn-success"
                                        disabled
                                        style="cursor: not-allowed; width: 100%"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- contact -->

                    <div class="" v-if="page == 'contact' && !loading">
                      <div>
                        <span>Email</span>
                        <h3>organisation.organisationEmail</h3>
                      </div>
                      <div>
                        <span>Phone Number</span>
                        <h3>organisation.organisationPhone</h3>
                      </div>
                      <div>
                        <span>Business Address</span>
                        <h3>Business Address</h3>
                      </div>
                      <div
                          style="display:flex;width;100%;justify-content:space-between"
                      >
                        <button
                            class="btn btn-outline-light"
                            @click="showedit2()"
                        >
                          Edit
                        </button>
                        <button
                            class="btn btn-outline-light"
                            @click="showdoc()"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <div class="" v-if="edit == 'second' && !loading">
                      <div class="">
                        <div class="">
                          <form class="px-2">
                            <h4
                                class="
                                text-center
                                mt-4
                                mb-4
                                settings-profile-header
                              "
                            >
                              Your Business Contact
                            </h4>
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-12 mb-3">
                                  <label for="inputEmail4" class="form-label"
                                  >Email</label
                                  >
                                  <input
                                      type="text"
                                      class="form-control"
                                      id="inputEmail4"
                                  />
                                </div>
                                <div class="col-md-12 mb-3">
                                  <label for="inputPassword4" class="form-label"
                                  >Phone</label
                                  >
                                  <input
                                      type="text"
                                      class="form-control"
                                      id="inputPassword4"
                                  />
                                </div>
                                <div class="col-12 mb-3">
                                  <label
                                      for="inputAddress"
                                      class="form-label mt-2"
                                  >Business Address</label
                                  >
                                  <input
                                      type="email"
                                      class="form-control"
                                      value="Business Address"
                                      id="inputAddress"
                                  />
                                </div>

                                <div class="mt-3">
                                  <button
                                      type="submit"
                                      class="btn btn-success"
                                      disabled
                                      style="cursor: not-allowed; width: 100%"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div class="" v-if="page == 'document'">
                      <h4>Documents</h4>
                      <h5>Please upload all documents</h5>
                      <br />
                      <div class="mb-3">
                        <i class="fas fa-info-circle text-danger"></i>
                        <label for="formFileMultiple" class="form-label"
                        >Form CAC</label
                        >
                        <input
                            class="form-control"
                            type="file"
                            id="formFileMultiple"
                            multiple
                        />
                      </div>

                      <div class="mb-3">
                        <i class="fas fa-info-circle text-danger"></i>
                        <label for="formFileMultiple" class="form-label"
                        >Certificate of Incorporation</label
                        >
                        <input
                            class="form-control"
                            type="file"
                            id="formFileMultiple"
                            multiple
                        />
                      </div>
                      <div class="mb-3">
                        <i class="fas fa-info-circle text-danger"></i>
                        <label for="formFileMultiple" class="form-label"
                        >RC Number</label
                        >
                        <input
                            class="form-control"
                            type="file"
                            id="formFileMultiple"
                            multiple
                        />
                      </div>
                      <div class="mb-3">
                        <i class="fas fa-info-circle text-danger"></i>
                        <label for="formFileMultiple" class="form-label"
                        >Tax Identification Number</label
                        >
                        <input
                            class="form-control"
                            type="file"
                            id="formFileMultiple"
                            multiple
                        />
                      </div>
                      <div class="mt-3">
                        <button
                            type="submit"
                            class="btn btn-success"
                            disabled
                            style="cursor: not-allowed; width: 100%"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane
                  id="tab-5"
                  :key="5"
                  name="five"
                  label=" API Keys and Webhooks"
              >
                <b-card-group deck class="APIWebhooks">
                  <b-card
                      header="featured"
                      header-tag="header"
                      header-bg-variant="white"
                      body-class="shadow"
                  >
                    <template #header>
                      <b-container class="text-right">
                        <b-button>Generate Api Key</b-button>
                      </b-container>

                    </template>
                    <div class="d-flex justify-content-center">
                      <api-key-display-form> </api-key-display-form>
                    </div>

                  </b-card>

                </b-card-group>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Referral"
}
</script>

<style scoped>

</style>