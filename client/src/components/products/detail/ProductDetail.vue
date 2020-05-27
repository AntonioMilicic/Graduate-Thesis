<template>
  <div class="product-detail-wrapper">
    <div class="product-detail-center">
      <div class="product-detail-user">
        <img class="user-image" alt="user-img" :src="getProductDetail.imgSrc" />
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
        <button class="btn-back" type="button" @click="() => $router.go(-1)">Back</button>
      </div>

      <div class="product-content">
        <h2>{{ getProductDetail.title }}</h2>
        <hr />

        <div class="float-left">
          <p>
            Price: {{ getProductDetail.price }} | On Stock:
            {{ getProductDetail.quantity }}
          </p>
          <span>{{ getProductDetail.category }}</span>
          <span>{{ getProductDetail.location }}</span>
          <p class="product-description">{{ getProductDetail.description }}</p>
        </div>

        <div class="float-right">
          <div>
            <input
              class="form-control float-right quantity-field"
              type="number"
              min="0"
              placeholder="Q"
              v-model.number="quantity"
            />
          </div>

          <div class="sell-container">
            <button
              class="btn btn-success add-cart"
              @click="addToCart"
              :disabled="
                quantity === 0 ||
                  quantity > getProductDetail.quantity ||
                  !Number.isInteger(quantity)
              "
            >
              <span>
                Add To Cart
                <font-awesome-icon icon="shopping-cart" />
              </span>
            </button>
          </div>
        </div>

        <div class="img-center">
          <img class="product-img" alt="product-img" :src="getProductDetail.imgSrc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    getProductDetail() {
      return this.$store.getters.productDetail(parseInt(this.$route.params.id));
    }
  },
  methods: {
    addToCart() {
      const orderInfo = {
        productId: this.getProductDetail.id,
        price: this.getProductDetail.price,
        quantitySelected: this.quantity
      };
      this.$store.dispatch("addToCart_Store", orderInfo);
      this.quantity = 0;
    }
  }
};
</script>

<style>
.product-detail-wrapper {
  width: 100%;
  min-height: 100%;
  margin: 50px 0;
}
.product-detail-center {
  display: flex;
  max-width: 80%;
  margin-left: 10%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.product-detail-center:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.product-detail-center .product-detail-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.product-detail-center .product-detail-user .user-image {
  width: 200px;
  height: 200px;
  margin-bottom: 25px;
  border-radius: 100px;
}
.product-detail-center .product-detail-user .user-detail {
  list-style-type: none;
  padding: 0;
}
.product-detail-center .product-detail-user .btn-back {
  width: 200px;
  height: 50px;
  padding: 10px;
  margin: 16px 10px;
  border-radius: 20px;
  font-size: 18px;
  color: white;
  background: linear-gradient(to bottom, #3c74ee, #2b1cb1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.product-detail-center .product-detail-user .btn-back :hover {
  box-shadow: none;
  cursor: pointer;
}
.quantity-field {
  width: 131.5px;
  height: 38px;
  margin-bottom: 10px;
  background-color: rgb(243, 241, 241);
}
.product-detail-center .product-content {
  padding: 30px;
}
.product-detail-center .product-content .img-center {
  width: 100%;
}
.product-detail-center .product-content .product-img {
  max-width: 100%;
  height: 424px;
  margin: 10px 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

@media screen and (max-width: 991px) {
  .product-detail-center {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-left: 0;
    box-shadow: none;
  }
  .product-detail-center :hover {
    box-shadow: none;
  }
  .product-detail-center .product-content .product-img {
    margin-left: 5%;
  }
}
@media screen and (max-width: 767px) {
  .product-detail-center .product-content .product-img {
    margin-left: 0;
  }
}
</style>
