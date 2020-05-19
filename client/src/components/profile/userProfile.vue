<template>
  <div class="product-detail-container">
    <div class="product-detail-center">
      <div class="product-detail-user">
        <img :src="imgURL(userData.image)" alt="user-img" class="user-image" />
        <ul class="user-detail">
          <li>
            <b>Name:</b> {{ userData.first_name }} {{ userData.last_name }}
          </li>
          <li><b>Email:</b> {{ userData.email }}</li>
          <li><b>Country:</b> {{ userData.country }}</li>
          <li><b>City:</b> {{ userData.city }}</li>
          <li>
            <b>Address:</b> {{ userData.address }}, {{ userData.house_number }}
          </li>
          <li><b>ZIP:</b> {{ userData.zip_code }}</li>
        </ul>
        <button type="button" class="btn-back" @click="() => $router.go(-1)">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userData"]),
  },
  methods: {
    imgURL(url) {
      return require("../../assets/images" + url);
    },
  },
};
</script>
