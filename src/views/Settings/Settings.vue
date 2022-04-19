<template>
  <div>
    <!--<base-header class="pb-6" type="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Payment</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-home"></i></router-link></li>
              <li class="breadcrumb-item"><a href="#">Customer</a></li>
              <li class="breadcrumb-item active" aria-current="page">{{}}</li>
            </ol>
          </nav>
        </div>

      </div>
      </base-header>--->
    <div class="container-fluid mt-0">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <div>
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane id="tab-0" :key="1" name="first" label="Profile">
                <span :class="{ 'spinner-border': loading }"></span>

                <!-- 
                    <div class="" style="display:flex; justify-content:center">
                      <div>
                      <div class="bg-white shadow" style="
                        width: 300px;
                        padding: 20px;
                        color: black;
                        border-radius:30px;   
                      " 
                       v-if="show == 'firstt'">
                        <span>Email</span><br />
                        <b>
                          <span>{{ user.customerEmail }}</span></b
                        ><br /><br />

                        <span>Full Name</span><br />
                        <b>
                          <span
                            >{{ user.customerFirstName }}
                            {{ user.customerLastName }}</span
                          ></b
                        ><br /><br />

                        <span>Phone Number</span><br />
                        <b>
                          <span>{{ user.customerPhone }} </span></b
                        ><br /><br />
                        <div class="">
                      
                          <div
                            style="display:flex;width;100%;justify-content:space-between"
                          >
                            <button
                              class="btn btn-outline-light"
                              @click="showedit()"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div> -->
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
                        :value="user.customerFirstName"
                      />
                      <label for="floatingInput">First Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        :value="user.customerLastName"
                      />
                      <label for="floatingInput">Last Name</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        :value="user.customerPhone"
                      />
                      <label for="floatingInput">Phone Number</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        :value="user.customerEmail"
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

                <div style="position: absolute; top: 0; left: 10%" v-if="!loading">
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
                          <h3>{{ user.customerCountry }}</h3>
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
                          <h3>{{ organisation.organisationName }}</h3>
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
                          <h3>{{ organisation.organisationName }}</h3>
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
                                      :value="user.customerCountry"
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
                                      :value="
                                        organisation.organisationName
                                      "
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
                                      :value="user.customerPhone"
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
                        <h3>{{ organisation.organisationEmail }}</h3>
                      </div>
                      <div>
                        <span>Phone Number</span>
                        <h3>{{ organisation.organisationPhone }}</h3>
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
                                    :value="organisation.organisationEmail
                                    "
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
                                    :value="
                                      organisation.organisationPhone
                                    "
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
                       <i class="fas fa-info-circle text-danger"></i> <label for="formFileMultiple" class="form-label"
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
                       <i class="fas fa-info-circle text-danger"></i> <label for="formFileMultiple" class="form-label"
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
                        <i class="fas fa-info-circle text-danger"></i> <label for="formFileMultiple" class="form-label"
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
                        <i class="fas fa-info-circle text-danger"></i> <label for="formFileMultiple" class="form-label"
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
              <!--  <el-tab-pane id="tab-2" :key='2' name="second"  label=" Payout Accounts">-->

              <!--            <div v-if="false">-->

              <!--            </div>-->
              <!--          <div v-else>-->
              <!--            &lt;!&ndash;<LoadingPanel></LoadingPanel>&ndash;&gt;-->
              <!--            <div class="container-fluid mt-2">-->
              <!--      <div class="row">-->
              <!--        <div class="col">-->
              <!--          <div class="no-data text-center ">-->
              <!--            <div  class="empty-history">-->
              <!--              <span >-->
              <!--                <svg-->

              <!--                  xmlns="http://www.w3.org/2000/svg"-->
              <!--                  viewBox="0 0 50 50"-->
              <!--                >-->
              <!--                  <circle  cx="25" cy="25" r="25"></circle>-->
              <!--                  <line-->

              <!--                    x1="25"-->
              <!--                    y1="10"-->
              <!--                    x2="25"-->
              <!--                    y2="32"-->
              <!--                    class="a"-->
              <!--                  ></line>-->
              <!--                  <line-->

              <!--                    x1="25"-->
              <!--                    y1="37"-->
              <!--                    x2="25"-->
              <!--                    y2="39"-->
              <!--                    class="a"-->
              <!--                  ></line></svg-->
              <!--              ></span>-->
              <!--             </div>-->
              <!--            <h3>No Subscriptions</h3>-->
              <!--            <p>-->
              <!--              This customer hasn't subscribed to any plans-->
              <!--              <br /><br />-->

              <!--            </p>-->
              <!--            &lt;!&ndash;<p>-->
              <!--              There're no pages for this query. Please try another query or-->
              <!--              clear your filters.-->
              <!--            </p>&ndash;&gt;-->
              <!--          </div>-->
              <!--        </div>-->
              <!--      </div>-->
              <!--    </div>-->
              <!--          </div>-->
              <!--  </el-tab-pane>-->

              <!--    <el-tab-pane id="tab-3" :key='3' name="Third"  label=" Team">-->

              <!--            <div v-if="false">-->

              <!--            </div>-->
              <!--          <div v-else>-->
              <!--            &lt;!&ndash;<LoadingPanel></LoadingPanel>&ndash;&gt;-->
              <!--            <div class="container-fluid mt-2">-->
              <!--      <div class="row">-->
              <!--        <div class="col">-->
              <!--          <div class="no-data text-center ">-->
              <!--            <div  class="empty-history">-->
              <!--              <span >-->
              <!--                <svg-->

              <!--                  xmlns="http://www.w3.org/2000/svg"-->
              <!--                  viewBox="0 0 50 50"-->
              <!--                >-->
              <!--                  <circle  cx="25" cy="25" r="25"></circle>-->
              <!--                  <line-->

              <!--                    x1="25"-->
              <!--                    y1="10"-->
              <!--                    x2="25"-->
              <!--                    y2="32"-->
              <!--                    class="a"-->
              <!--                  ></line>-->
              <!--                  <line-->

              <!--                    x1="25"-->
              <!--                    y1="37"-->
              <!--                    x2="25"-->
              <!--                    y2="39"-->
              <!--                    class="a"-->
              <!--                  ></line></svg-->
              <!--              ></span>-->
              <!--             </div>-->
              <!--            <h3>No Subscriptions</h3>-->
              <!--            <p>-->
              <!--              This customer hasn't subscribed to any plans-->
              <!--              <br /><br />-->

              <!--            </p>-->
              <!--            &lt;!&ndash;<p>-->
              <!--              There're no pages for this query. Please try another query or-->
              <!--              clear your filters.-->
              <!--            </p>&ndash;&gt;-->
              <!--          </div>-->
              <!--        </div>-->
              <!--      </div>-->
              <!--    </div>-->
              <!--          </div>-->
              <!--  </el-tab-pane>-->

              <!--    <el-tab-pane id="tab-4" :key='4' name="four"  label=" Preferences">-->

              <!--            <div v-if="false">-->

              <!--            </div>-->
              <!--          <div v-else>-->
              <!--            &lt;!&ndash;<LoadingPanel></LoadingPanel>&ndash;&gt;-->
              <!--            <div class="container-fluid mt-2">-->
              <!--      <div class="row">-->
              <!--        <div class="col">-->
              <!--          <div class="no-data text-center ">-->
              <!--            <div  class="empty-history">-->
              <!--              <span >-->
              <!--                <svg-->

              <!--                  xmlns="http://www.w3.org/2000/svg"-->
              <!--                  viewBox="0 0 50 50"-->
              <!--                >-->
              <!--                  <circle  cx="25" cy="25" r="25"></circle>-->
              <!--                  <line-->

              <!--                    x1="25"-->
              <!--                    y1="10"-->
              <!--                    x2="25"-->
              <!--                    y2="32"-->
              <!--                    class="a"-->
              <!--                  ></line>-->
              <!--                  <line-->

              <!--                    x1="25"-->
              <!--                    y1="37"-->
              <!--                    x2="25"-->
              <!--                    y2="39"-->
              <!--                    class="a"-->
              <!--                  ></line></svg-->
              <!--              ></span>-->
              <!--             </div>-->
              <!--            <h3>No Subscriptions</h3>-->
              <!--            <p>-->
              <!--              This customer hasn't subscribed to any plans-->
              <!--              <br /><br />-->

              <!--            </p>-->
              <!--            &lt;!&ndash;<p>-->
              <!--              There're no pages for this query. Please try another query or-->
              <!--              clear your filters.-->
              <!--            </p>&ndash;&gt;-->
              <!--          </div>-->
              <!--        </div>-->
              <!--      </div>-->
              <!--    </div>-->
              <!--          </div>-->
              <!--  </el-tab-pane>-->

              <el-tab-pane
                id="tab-5"
                :key="5"
                name="five"
                label=" API Keys and Webhooks"
              >
                <div v-if="true">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card center-block p-3">
                        <h4
                          class="text-center mt-4 mb-4 settings-profile-header"
                        >
                          API Configuration - <span v-if="isSwitched == false">Test</span> <span v-if="isSwitched == true">Live</span> Mode
                        </h4>
                        <div
                          class="alert alert-danger d-flex align-items-center"
                          role="alert"
                          v-if="isSwitched == true"
                        >
                          <svg
                            class="bi flex-shrink-0 me-2"
                            width="24"
                            height="24"
                            role="img"
                            aria-label="Danger:"
                          >
                            <use xlink:href="#exclamation-triangle-fill" />
                          </svg>
                          <div>
                            These keys are for testing only. Please DO NOT use
                            them in production.
                          </div>
                        </div>
                         <div
                          class="alert alert-success text-center"
                          role="alert"
                          v-if="isSwitched == false"

                        >
                          <!-- <svg
                            class="bi flex-shrink-0 me-2"
                            width="24"
                            height="24"
                            role="img"
                            aria-label="Danger:"
                          >
                            <use xlink:href="#exclamation-triangle-fill" />
                          </svg> -->
                          <div>
                            These keys are for Live
                          </div>
                        </div>

                        <div
                          class="
                            d-flex
                            justify-content-center
                            align-items-center
                            ml-3
                          "
                        >
                          <label class="form-label mt-2 pr-3"
                            >Test Secret Key
                          </label>
                          <input
                            type="password"
                            class="form-control form-control-sm w-50 p-3"
                            id="pwd"
                            :value="api[0].apikeyTestSK"
                            disabled="true"
                          />
                          <i
                            class="fas fa-eye ml-1"
                            id="eye"
                            @click="hide$show()"
                          ></i>
                        </div>
                        <p style="padding-left: 210px; font-size: 12px">
                          <a href="">Generate new secret key </a
                          ><i
                            class="fas fa-info-circle"
                            title="this is some info, i dey vex."
                          ></i>
                        </p>

                        <div
                          class="
                            d-flex
                            justify-content-center
                            mt-2
                            align-items-center
                          "
                        >
                          <label class="form-label mt-2 pr-3"
                            >Test Public Keys</label
                          >
                          <input
                            type="text"
                            class="form-control form-control-sm w-50"
                            id="copy"
                            :value="api[0].apikeyTestPK"
                          />
                          <button
                            class="tton"
                            @click="myFunction()"
                            onmouseout="outFunc()"
                          >
                            <i class="fas fa-copy"></i>
                            <span class="tooltiptext" id="myTooltip"></span>
                          </button>
                        </div>

                        <div
                          class="
                            d-flex
                            justify-content-center
                            mt-2
                            align-items-center
                          "
                        >
                          <label
                            for="inputAddress"
                            class="form-label mt-2 pr-1"
                          >
                            Test Callback URL</label
                          >
                          <input
                            type="email"
                            class="form-control form-control-sm w-50"
                            id="inputAddress"
                            placeholder="Test Callback URL"
                          />
                        </div>

                        <div
                          class="
                            d-flex
                            justify-content-center
                            mt-2
                            align-items-center
                          "
                        >
                          <label for="inputAddress" class="form-label mt-2 pr-1"
                            >Test Webhook URL</label
                          >
                          <input
                            type="email"
                            class="form-control form-control-sm w-50"
                            id="inputAddress"
                            placeholder="Test Webhook URL"
                          />
                        </div>
                        <div class="m-5">
                          <button
                            type="submit"
                            class="btn btn-outline-success"
                            disabled
                            style="width: 100%"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <!--<LoadingPanel></LoadingPanel>-->
                  <div class="container-fluid mt-2">
                    <div class="row">
                      <div class="col">
                        <div class="no-data text-center">
                          <div class="empty-history">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                              >
                                <circle cx="25" cy="25" r="25"></circle>
                                <line
                                  x1="25"
                                  y1="10"
                                  x2="25"
                                  y2="32"
                                  class="a"
                                ></line>
                                <line
                                  x1="25"
                                  y1="37"
                                  x2="25"
                                  y2="39"
                                  class="a"
                                ></line></svg
                            ></span>
                          </div>
                          <h3>No Subscriptions</h3>
                          <p>
                            This customer hasn't subscribed to any plans
                            <br /><br />
                          </p>
                          <!--<p>
              There're no pages for this query. Please try another query or
              clear your filters.
            </p>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

      <!--Form modal-->
      <modal
        :show.sync="modals.modal0"
        body-classes="p-1"
        modal-classes="modal-dialog-centered modal-md"
      >
        <!--<div class="card">-->
        <!-- Card header -->
        <div class="card-head">
          <!-- Title -->
          <!--<div class="row">-->
          <!--<div class="col-12">-->
          <article class="item-right">
            <!-- @click="displayDetail()">-->
            <a
              ><span @click="closeModal0()"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  style="fill: #171717"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg> </span
            ></a>
          </article>
          <!--</div>-->
          <div class="py-2">
            <h5 class="mb-0 text-center">Blacklist this customer</h5>
          </div>

          <!-- </div>-->
        </div>
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="no-data text-center">
                <div class="empty-history">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                      <circle cx="25" cy="25" r="25"></circle>
                      <line x1="25" y1="10" x2="25" y2="32" class="a"></line>
                      <line
                        x1="25"
                        y1="37"
                        x2="25"
                        y2="39"
                        class="a"
                      ></line></svg
                  ></span>
                </div>
                <h3>No Customer</h3>
                <p>
                  There're no Customer for this query. Please try another query
                  or clear your filters.
                  <br /><br />
                </p>
                <!--<p>
              There're no pages for this query. Please try another query or
              clear your filters.
            </p>-->
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-6 text-left">
              <button @click="closeModal0()" class="btn btn-light">
                Cancel
              </button>
            </div>
            <div class="col-6 text-right">
              <button form="form1" type="submit" class="btn btn-danger">
                Blacklist this Customer
              </button>
            </div>
          </div>
        </div>

        <!--</div>-->
      </modal>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tabs,
  TabPane,
} from "element-ui";
import BaseHeader from "@/components/BaseHeader";
import LoadingPanel from "@/components/LoadingPanel";
import NoPage from "@/components/NoPage";

export default {
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,

    //LoadingPanel,
    //NoPage
  },
  data() {
    return {
      activeName: "first",
      selectedItem: {},
      blacklist: false,
      show: "firstt",
      page: "profile",
      light: "light",
      nav: "false",
      edit: "null",
      modals: {
        modal0: false,
      },
      items: [],
      fields: [
        { key: "sn", label: "S/N", sortable: true, sortDirection: "desc" },
        /*{ key: 'accountId', label: 'Account Id', sortable: true, class: 'text-left' },
          { key: 'accountCustomerId', label: 'Account Customer Id', sortable: true, class: 'text-left' },
          { key: 'accountName', label: 'Account Number', sortable: true, class: 'text-left' },
          { key: 'accountName', label: 'Account Name', sortable: true, class: 'text-left' },
          { key: 'accountClass', label: 'Account Class', sortable: true, class: 'text-left' },
          { key: 'accountType', label: 'Account Type', sortable: true, class: 'text-left' },
          { key: 'accountBalance', label: 'Account Balance', sortable: true, class: 'text-left' },
         {key: 'accountCurrency',label: 'Account Currency',sortable: true,class: 'text-left'},*/
        // { key: 'action', label: 'Action' }
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      bindProps: {
        mode: "international",
        enabledCountryCode: true,
        enabledFlags: true,
        autocomplete: "off",
        preferredCountries: ["NG", "US"],
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
      countryCode: "",
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },

    ...mapState({
      user: (state) => state.auth.userInfo,
      organisation: state => state.auth.organisation,
      api: (state) => state.readApikey.readApikey,
      loading: (state) => state.readApikey.loading,
      loading: (state) => state.auth.loading,
      error: (state) => state.readApikey.error,
      isSwitched: (state) => state.auth.switchmode
    }),
    /*success: state => state.report.report_success,userInformation: state => state.auth.userInfo,
    loading1: state => state.report.report_loading1,
    item_report: state => state.report.report_item,
    response1: state => state.report.report_response1,
    response: state => state.report.report_response,response_user: state => state.user.user_response,
    }),
    ...mapActions(['branchReadAll','branchUpdate']),
    */
    ...mapGetters(["getToken"]),
  },
  /*mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },*/
  methods: {
    notifyVue(type = "default", msg) {
      console.log(type);
      this.$notify({
        message: `<b>${msg}</b>`,
        timeout: 5000,
        icon: "ni ni-bell-55",
        type,
      });
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
    closeModal0() {
      this.modals.modal0 = false;
      this.blacklist = false;
    },

    showcontact() {
      this.page = "contact";
      this.edit = "null";
      document.getElementById("flexRadioDefault2").classList.add("bg-success");
    },
    nav() {
      this.nav = "true";
    },
    showprofile() {
      this.page = "profile";
      this.edit = "null";
      document.getElementById("flexRadioDefault1").classList.add("bg-success");
    },
    showfourth() {
      this.show = "fourth";
      this.edit = "null";
    },
    showdoc() {
      this.page = "document";
      this.edit = "null";
      document.getElementById("flexRadioDefault3").classList.add("bg-success");
    },
    showedit() {
      this.edit = "first";
      this.page = "null";
    },
    showedit2() {
      this.edit = "second";
      this.page = "null";
    },
    myFunction() {
      var copyText = document.getElementById("copy");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);

      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copied: " + copyText.value;
    },

    outFunc() {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copy to clipboard";
    },
    handleClick(tab, event) {
      //console.log(tab.$vnode.key);
      console.log(tab.label);
      //console.log(tab, event);
    },
    readColumn() {
      this.$store.dispatch(
        "readColumn",
        {
          item: this.item_report,
        },
        { root: false }
      );
    },

    countryChanged(country) {
      this.countryCode = country.dialCode;
    },

    /*
spinalCase(str) {
  let lowercase = str.trim()
  let regEx = /\W+|(?=[A-Z])|_/g
  let result = lowercase.split(regEx).join(" ").toUpperCase()
  return result;
},

viewInfo(item,index){
    this.$store.dispatch("reportReadSingle", {
        readCount: "ALL",
reportBankCode:item.reportBankCode,
reportCondition: "",
reportFieldList: "",
reportName: item.reportName
    }, { root: false });
},
*/
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },

  watch: {
    error(newValue, oldValue) {
      console.log(`Success from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue !== null) {
        this.$toast.error(`${newValue}`);

        //this.showDismissibleAlert=true;
      }
    },

    /*
    response1(newValue, oldValue){
        if(Object.keys(this.response1).length !== 0){
         if ('reports' in this.response1){
             if(this.response1.reports.length!==0 || this.response1.reports!==[]){
    var data = [];
    data = JSON.parse((this.response1.reports));
    //console.log("&$$$$$&"+this.response.data);
    var count = 1
    this.items =data;
    var header= data.map(x => Object.keys(x));
    console.log(header[0]);
    for (const keys of header[0]) {
console.log(keys);
this.fields.push({
            key: keys,
             label: this.spinalCase(keys),
            sortable: true,
            class: 'text-left'
        })
}
         }
         else{
             this.items = [];
              this.notifyVue('danger','No Report(s) on Your Query Condition(s)');
         }
         }
         else{
             this.notifyVue('danger','No Report(s) on Your Query Condition(s)');
         }
}
else{
             this.notifyVue('danger','No Report(s) on Your Query Condition(s)');
         }
    }
    */
  },
  updated() {
    //this.data = this.$store.getters.getPrivilageResponse;
    //console.log("{{{{{{{{{{{{&&&&&&&&&&&&&&&&&&&&");
  },
  created: function () {},
  mounted: function () {
    const organazationId = this.user.customerId;
    this.$store.dispatch(
      "readApiKey",
      { apikeyOrganisationId: organazationId },
      { root: false }
    );
  },
};
</script>
<style lang="css" scoped>
.settings-profile-header {
  color: #919191;
  font-weight: 700;
}
.center-block {
  width: 600px;
  height: 560px;
  max-width: 90%;
  margin: 30px auto;
}
.empty-history {
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}
.empty-history span {
  display: block;
  margin-bottom: 7px;
}
.empty-history span svg {
  /* fill: #6e0400; */
  height: 30px;
  width: 30px;
  margin: 0 auto;
  display: block;
}
svg {
  overflow: hidden;
  vertical-align: middle;
}
.empty-history span svg circle {
  fill: #ca0305;
  /* fill: #EFCE4A; */
}
.empty-history span svg line {
  fill: none;
  stroke-width: 2;
  stroke: #fff;
}

.card-head:first-child {
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
}
.card-head {
  padding: 0.25rem 0.5rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.black-list-group {
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 20px;
}
.black-list-sub {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}
.black-list {
  flex: 1;
  display: flex;
}

.tton {
  width: 40px;
  height: 30px;
  position: absolute;
  right: 92px;
  border: none;
  border-radius: 5px;
}

.form-groups {
  margin-bottom: 0.5rem;
}
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
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
.table-section {
  display: block;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 40px;
  /*max-width: 100%;*/
}
.hand {
  cursor: pointer;
}

.text-title {
  font-size: 0.875rem;
  font-weight: 600;
}
.item-right {
  padding-left: 90%;
  cursor: pointer;
  margin: 0px 0% -10px 0px;
  float: right !important;
}
.vodal-dialog {
  overflow-y: scroll;
  overflow-x: hidden !important;
  background-color: #fff;
}
.vodal-dialog .card {
  box-shadow: none !important;
}
body {
  overflow-x: hidden !important;
}
.text-title {
  font-size: 0.875rem;
  font-weight: 600;
}
.view-more-customer-info {
  color: #545b62;
}
.view-more-customer-info .view-more-top {
  margin-bottom: 10px;
}
.view-more-top .queue-title {
  margin-bottom: 2px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #9e9e9e;
}
p {
  color: #495057;
}
.view-more-customer-info p {
  font-size: 13px;
  font-weight: 600;
  line-height: 16px;
  margin-bottom: 0;
}
.view-more-top .queue-value {
  font-size: 14px;
  line-height: 18px;
  color: #212121;
  margin-bottom: 20px;
}
.view-more-top .queue-title {
  margin-bottom: 2px;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #9e9e9e;
}
.view-more-customer-info {
  color: #545b62;
}
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #495057;
}
.table-section tbody {
  max-width: 500px;
  overflow-x: scroll;
}
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f8f9fa;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #eff2f7;
}

.card-title {
  font-size: 15px;
  margin: 0 0 7px 0;
  font-weight: 600;
}
.card-head:first-child {
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
}
.card-head {
  padding: 0.25rem 0.5rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.page-table-head:first-child {
  border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
}
.page-table-head {
  margin-top: -20px;
  padding: 0.05rem 1.5rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.file-label-helper {
  display: block;
  line-height: 1.4;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #a4a59a;
}

.input-group {
  display: table;
  border-collapse: collapse;
  width: 100%;
}
.input-group > div {
  display: table-cell;
  border: 1px solid #ddd;
  vertical-align: middle; /* needed for Safari */
}
.input-group-icon {
  background: #eee;
  color: #777;
  padding: 0 4px;
  font-size: 0.875rem;
}
.input-group-area {
  width: 100%;
}
.input-group input {
  /*border: 0;*/
  border-radius: 0.25rem;
  display: block;
  width: 100%;
  padding: 8px;
}

.no-data {
  width: 500px;
  max-width: 90%;
  margin: 100px auto;
}
.no-data p {
  margin: 0 auto 10px;
  max-width: 450px;
  line-height: 1.4;
}
.empty-history {
  height: 100px;
  width: 100%;
  padding: 10px 10px;
}
.empty-history span {
  display: block;
  margin-bottom: 7px;
}
.empty-history span svg {
  /* fill: #6e0400; */
  height: 30px;
  width: 30px;
  margin: 0 auto;
  display: block;
}
svg {
  overflow: hidden;
  vertical-align: middle;
}
.empty-history span svg circle {
  fill: #ca0305;
  /* fill: #EFCE4A; */
}
.empty-history span svg line {
  fill: none;
  stroke-width: 2;
  stroke: #fff;
}

hr.solid {
  border-top: 1.5px solid #bbb;
  width: 30px;
  transform: rotate(90deg);
  margin: 17px 14px 0px 14px;
}
.drop-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>
