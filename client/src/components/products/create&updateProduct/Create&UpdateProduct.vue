<template>
  <div class="create-product-wrapper">
    <div class="title-area">
      <font-awesome-icon
        class="float-left icon-back"
        icon="arrow-left"
        title="Back to Profile"
        data-toggle="tooltip"
        data-placement="top"
        @click="backToProfile"
      />
      <h4 class="title">
        Enlist your own product
        <font-awesome-icon icon="plus-circle" />
      </h4>
      <hr />
    </div>

    <form onsubmit="return false" id="form">
      <small class="form-text text-muted">Mandatory fields</small>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputTitle">Title</label>
          <input id="inputTitle" class="form-control" type="text" v-model="product.title" required />
        </div>
        <div class="form-group col-md-2">
          <label for="inputCategory">Category</label>
          <input
            id="inputCategory"
            class="form-control"
            type="text"
            v-model="product.category"
            required
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputPrice">Price $</label>
          <input
            id="inputPrice"
            class="form-control"
            type="number"
            min="1"
            v-model="product.price"
            required
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputQuantity">Quantity</label>
          <input
            id="inputQuantity"
            class="form-control"
            type="number"
            min="1"
            v-model="product.quantity"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputDescription">Description</label>
          <textarea
            id="inputDescription"
            class="form-control"
            type="text"
            rows="4"
            cols="50"
            v-model="product.description"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-11">
          <label for="inputImages">Image Sources</label>
          <input
            id="inputImages"
            class="form-control"
            type="text"
            v-for="(source, index) in product.imageSources"
            :key="index"
            v-model="source.value"
            required
          />
        </div>
        <div class="form-group col-md-1 field-control">
          <font-awesome-icon class="add-field-icon" icon="plus" @click="imageInputField('+')" />
          <font-awesome-icon
            class="remove-field-icon"
            icon="minus"
            v-if="product.imageSources.length-1"
            @click="imageInputField('-')"
          />
        </div>
      </div>
      <div class="form-group col-md-3 float-right create-product-btn">
        <button class="btn btn-primary" type="submit" v-if="!showCreate">Update product</button>
        <button class="btn btn-primary" type="submit" v-if="showCreate">Create product</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  postUserProduct,
  updateUserProduct
} from "../server_comm/productController";
export default {
  data() {
    return {
      product: {
        title: "",
        category: "",
        price: 1,
        quantity: 1,
        description: "",
        imageSources: [{ value: "" }]
      },
      showCreate: true
    };
  },
  computed: {
    ...mapGetters({ user: "userData", storeProduct: "productDetail" })
  },
  created() {
    // Push to frontpage if user is not signed but he is on create product page
    if (!this.user.id) {
      this.$router.push({
        path: "/"
      });
    }
    if (this.$router.currentRoute.params.id) {
      const product = {
        ...this.storeProduct(this.$router.currentRoute.params.id)
      };
      // To set shape of value: img, so that add and remove field work
      let images = [];
      product.imageSources.forEach(img => {
        images.push({ value: img });
      });
      product.imageSources = [...images];
      this.product = product;
      this.showCreate = false;
    }
  },
  mounted() {
    const form = document.getElementById("form");
    form.addEventListener("submit", this.submitProductData);
  },
  methods: {
    backToProfile() {
      this.$router.go(-1);
    },
    imageInputField(value) {
      if (value === "+") this.product.imageSources.push({ value: "" });
      else if (value === "-") this.product.imageSources.pop();
    },
    async submitProductData() {
      const imageArray = [];
      const createProduct = this.showCreate;
      let response = "";

      this.product.imageSources.forEach(element => {
        imageArray.push(element.value);
      });
      const order = {
        title: this.product.title,
        category: this.product.category,
        price: this.product.price,
        quantity: this.product.quantity,
        description: this.product.description,
        imageSources: imageArray,
        username: this.$router.currentRoute.params.username
      };

      if (createProduct) {
        response = await postUserProduct(order);
      } else if (!createProduct) {
        order.id = this.product.id;
        response = await updateUserProduct(order);
      }
      if (response == "success") {
        this.$store.dispatch("initProducts");
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.title-area .icon-back {
  font-size: 32px;
}
.title-area .icon-back:hover {
  cursor: pointer;
}
.title-area .title {
  text-align: center;
}
.form-text {
  margin: 0 0 10px 10px;
}
.form-row .field-control {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  font-size: 32px;
}
.form-row .field-control .add-field-icon {
  margin-bottom: 20px;
  margin-left: auto;
}
.form-row .field-control .add-field-icon:hover {
  cursor: pointer;
}
.form-row .field-control .remove-field-icon {
  margin-left: auto;
}
.form-row .field-control .remove-field-icon:hover {
  cursor: pointer;
}
.form-row:last-child {
  margin-bottom: 10px;
}

@media only screen and (max-width: 768px) {
  .form-row .field-control {
    display: inherit;
    flex-direction: unset;
    margin-top: 0;
  }
  .form-row .field-control .add-field-icon {
    margin-left: 33%;
  }
  .form-row .field-control .remove-field-icon {
    margin-right: 33%;
  }
  .create-product-btn {
    display: flex;
    flex-direction: column;
  }
}
</style>