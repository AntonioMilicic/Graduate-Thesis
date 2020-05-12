<template>
  <div class="product-detail-container">
    <div class="product-detail-center">
      <div class="product-detail-user">
        <img :src="getProductDetail.imgSrc" alt="user-img" class="user-image" />
        <ul class="user-detail">
          <li>
            <b>Name:</b> Test Ime
          </li>
          <li>
            <b>Email:</b> test@mail.com
          </li>
          <li>
            <b>Posts:</b> 104
          </li>
        </ul>
        <button type="button" class="btn-back" @click="()=>$router.go(-1)">Back</button>
      </div>
      <div class="product-content">
        <h2>{{getProductDetail.title}}</h2>
        <hr />
        <p>Price: {{getProductDetail.price}} | Max.Quantity: {{getProductDetail.quantity}}</p>
        <span>{{getProductDetail.category}}</span>
        <span>{{getProductDetail.location}}</span>
        <p class="product-description">{{getProductDetail.description}}</p>
        <div class="img-center">
          <img :src="getProductDetail.imgSrc" alt="product-img" class="product-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getProductDetail() {
      return this.$store.getters.productDetail(parseInt(this.$route.params.id));
    }
  }
};
</script>

<style scoped>
.product-detail-container {
  min-height: 100%;
  width: 100%;
  margin: 50px 0;
}
.product-detail-center {
  display: flex;
  max-width: 80%;
  margin-left: 10%;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.product-detail-center:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.product-detail-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.product-detail-user .user-detail {
  list-style-type: none;
  padding: 0;
}
.product-detail-user .user-image {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-bottom: 25px;
}
.product-detail-user .btn-back {
  width: 200px;
  height: 50px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-size: 18px;
  color: white;
  background: linear-gradient(to bottom, #3c74ee, #2b1cb1);
  padding: 10px;
  margin: 16px 10px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.product-detail-user .btn-back :hover {
  box-shadow: none;
  cursor: pointer;
}
.product-content {
  padding: 30px;
}
.product-content .product-img {
  width: 568px;
  height: 424px;
  margin: 10px 0;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.product-content .img-center {
  width: 100%;
}

@media screen and (max-width: 1000px) {
  .product-detail-center {
    max-width: 100%;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
  .product-detail-center :hover {
    box-shadow: none;
  }
}
.product-content .product-img {
  max-width: 100%;
}
</style>