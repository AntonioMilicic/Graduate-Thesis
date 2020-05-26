<template>
  <div>
    <h4>
      Enlist your own product
      <font-awesome-icon icon="plus-circle" />
    </h4>
    <hr />

    <form onsubmit="return false" id="form">
      <small class="form-text text-muted" style="margin: 0 0 10px 10px;">Mandatory fields</small>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputTitle">Title</label>
          <input v-model="product.title" type="text" class="form-control" id="inputTitle" required />
        </div>
        <div class="form-group col-md-2">
          <label for="inputCategory">Category</label>
          <input
            v-model="product.category"
            type="text"
            class="form-control"
            id="inputCategory"
            required
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputPrice">Price $</label>
          <input
            v-model="product.price"
            type="number"
            min="1"
            class="form-control"
            id="inputPrice"
            required
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputQuantity">Quantity</label>
          <input
            v-model="product.quantity"
            type="number"
            min="1"
            class="form-control"
            id="inputQuantity"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputDescription">Description</label>
          <textarea
            v-model="product.description"
            type="text"
            rows="4"
            cols="50"
            class="form-control"
            id="inputDescription"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-11">
          <label for="inputImages">Image Sources</label>
          <input
            v-for="(source, index) in product.imageSources"
            :key="index"
            v-model="source.value"
            type="text"
            class="form-control"
            id="inputImages"
            style="margin-bottom: 10px"
            required
          />
        </div>
        <div class="form-group col-md-1 field-control">
          <font-awesome-icon @click="imageInputField('+')" icon="plus" class="add-field-icon" />
          <font-awesome-icon
            @click="imageInputField('-')"
            icon="minus"
            class="remove-field-icon"
            v-if="product.imageSources.length-1"
          />
        </div>
      </div>
      <div class="form-group col-md-3 float-right create-product-btn">
        <button type="submit" class="btn btn-primary">Enlist product</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { postUserProduct } from "./server_comm/userController";
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
      }
    };
  },
  computed: {
    ...mapGetters({ user: "userData" })
  },
  created() {
    // Push to frontpage if user is not signed but he is on create product page
    if (this.user.id == "") {
      this.$router.push({
        path: "/"
      });
    }
  },
  mounted() {
    const form = document.getElementById("form");
    form.addEventListener("submit", this.submitProductData);
  },
  methods: {
    imageInputField(value) {
      if (value === "+") this.product.imageSources.push({ value: "" });
      else if (value === "-") this.product.imageSources.pop();
    },
    async submitProductData() {
      const imageArray = [];
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
        username: this.$router.currentRoute.params.id
      };

      const response = await postUserProduct(order);
      if (response == "success") {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
.field-control {
  font-size: 32px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}
.field-control .add-field-icon {
  margin-bottom: 20px;
}
.field-control .add-field-icon:hover {
  cursor: pointer;
}
.field-control .remove-field-icon:hover {
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .field-control {
    display: inherit;
    flex-direction: unset;
    margin-top: 0;
  }
  .add-field-icon {
    margin: auto;
    margin-right: 30px;
  }
  .create-product-btn {
    display: flex;
    flex-direction: column;
  }
}
</style>