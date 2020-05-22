<template>
  <div class="product-detail-container">
    <div class="product-detail-center">
      <div class="product-detail-user" v-show="userData.email">
        <img v-if="userData.image" :src="imgURL(userData.image)" alt="user-img" class="user-image" />
        <ul class="user-detail">
          <li>
            <b>Name:</b>
            {{ userData.firstName }} {{ userData.lastName }}
          </li>
          <li>
            <b>User:</b>
            {{ userData.username }}
          </li>
          <li>
            <b>Email:</b>
            {{ userData.email }}
          </li>
          <li>
            <b>Country:</b>
            {{ userData.country }}
          </li>
          <li>
            <b>City:</b>
            {{ userData.city }}
          </li>
          <li>
            <b>Address:</b>
            {{ userData.address }}, {{ userData.houseNumber }}
          </li>
          <li>
            <b>ZIP:</b>
            {{ userData.zipCode }}
          </li>
        </ul>
        <router-link :to="userData.username+'/Update-Profile'">
          <button type="button" class="btn btn-primary btn-profile-field">Update profile</button>
        </router-link>
        <router-link :to="userData.username+'/Create-Product'">
          <button type="button" class="btn btn-primary btn-profile-field">Create product</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userData"])
  },
  methods: {
    imgURL(url) {
      return require("../../assets/images" + url);
    }
  }
};
</script>

<style scoped>
.btn-profile-field {
  margin: 10px 0 10px 0;
  width: 132px;
}
</style>