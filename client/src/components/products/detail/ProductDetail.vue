<template>
  <div class="product-detail-wrapper outer-container">
    <div class="container-center">
      <div class="user-data">
        <img class="user-image" alt="user-img" :src="imgSrc(owner.image)" v-if="owner.image" />
        <h6>Owner Data</h6>
        <ul class="user-detail">
          <li>
            <b>Owner:</b>
            {{owner.username}}
          </li>
          <li>
            <b>Email:</b>
            {{owner.email}}
          </li>
          <li>
            <b>Country:</b>
            {{owner.country}}
          </li>
          <li>
            <b>City:</b>
            {{owner.city}}
          </li>
          <li>
            <b>ZIP:</b>
            {{owner.zipCode}}
          </li>
        </ul>
        <button class="btn-back" type="button" @click="() => $router.go(-1)">Back</button>
      </div>

      <div class="product-content" v-if="getProductDetail">
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
          <img
            class="product-img"
            alt="product-img"
            :src="imgSrc(getProductDetail.imageSources[0])"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOwnerData } from "./server_comm/productController";
export default {
  data() {
    return {
      quantity: 0,
      owner: {}
    };
  },
  async created() {
    this.owner = await getOwnerData(this.$route.params.id);
  },
  computed: {
    getProductDetail() {
      return this.$store.getters.productDetail(this.$route.params.id);
    }
  },
  methods: {
    imgSrc(url) {
      if (url[0] == "/") return require("../../../assets/images" + url);
      else return url;
    },
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
.outer-container {
  width: 100%;
  min-height: 100%;
  margin: 50px 0;
}
.container-center {
  display: flex;
  max-width: 80%;
  margin-left: 10%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.container-center:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.container-center .user-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.container-center .user-data .user-image {
  width: 200px;
  height: 200px;
  margin-bottom: 25px;
  border-radius: 100px;
}
.container-center .user-data .user-detail {
  list-style-type: none;
  padding: 0;
}
.container-center .user-data .btn-back {
  width: 200px;
  height: 50px;
  margin: 16px 10px;
  outline: none;
  border: none;
  border-radius: 20px;
  font-size: 18px;
  color: white;
  background: linear-gradient(to bottom, #3c74ee, #2b1cb1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.container-center .user-data .btn-back:hover {
  box-shadow: none;
  cursor: pointer;
}
.quantity-field {
  width: 131.5px;
  height: 38px;
  margin-bottom: 10px;
  background-color: rgb(243, 241, 241);
}
.container-center .product-content {
  width: 100%;
  padding: 30px;
}
.container-center .product-content .img-center {
  width: 100%;
}
.container-center .product-content .product-img {
  width: 100%;
  height: 424px;
  margin: 10px 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

@media screen and (max-width: 991px) {
  .container-center {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin-left: 0;
    box-shadow: none;
  }
  .container-center:hover {
    box-shadow: none;
  }
}
</style>
