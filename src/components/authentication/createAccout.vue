<template>
  <div>
    <h4>
      Please enter your credentials
      <font-awesome-icon icon="user-shield" />
    </h4>
    <hr />
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail">Email</label>
          <input v-model="email" type="email" class="form-control" id="inputEmail4" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword">Password</label>
          <input v-model="password" type="password" class="form-control" id="inputPassword4" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputAddress">Address</label>
          <input
            v-model="adress"
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputAddress2">Address 2</label>
          <input
            v-model="adress2"
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">City</label>
          <input v-model="city" type="text" class="form-control" id="inputCity" />
        </div>
        <div class="form-group col-md-4">
          <label for="inputCountry">Country</label>
          <select v-model="country" id="inputCountry" class="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="inputZip">Zip</label>
          <input v-model="zip" type="text" class="form-control" id="inputZip" />
        </div>
      </div>
      <button class="btn btn-primary" @click="submitCredentials">Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      adress: "",
      adress2: "",
      city: "",
      country: "",
      zip: ""
    };
  },
  methods: {
    submitCredentials() {
      console.log("wait");
      // const orderInfo = {
      //   email: this.email,
      //   password: this.password,
      //   adress: this.adress,
      //   adress2: this.adress2,
      //   city: this.city,
      //   country: this.country,
      //   zip: this.zip
      // };
      // this.$store.dispatch("submitCredentials_Store", orderInfo);
    }
  }
};
</script>