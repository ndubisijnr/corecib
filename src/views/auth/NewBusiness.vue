<template>
  <div class="j">
    <form class="container form1">
      <div class="text-center">
        <h4>New Business</h4>
        <p>Another one? Alright!</p>
      </div>
      <div class="card p-4">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Create a new business
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Duplicate an existing business
          </label>
        </div>
      </div>

      <div class="card p-4">
        <label class="text-start">Country </label>
        <div class="form-group">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option selected>Open this select menu</option>
            <option value="1">Nigeria</option>
            <option value="2">Ghana</option>
            <option value="3">South Africa</option>
          </select>
        </div>
        <label class="text-start">Business Name</label>

        <div class="form-group">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Business Name</label>
          </div>
        </div>

        <h4>What type of business do you own?</h4>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Started Buisness
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Registered Businesss
          </label>
        </div>
      </div>
      <div style="display:flex;width;100%;justify-content:space-between">
        <button class="btn btn-light">Cancle</button>
        <button class="btn btn-success">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "new-business",
};
</script>

<style>
.j {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form1 {
  width: 450px;
}
</style>