<template>
  <div class="product-container-wrapper">
    <div class="row product-controller">
      <div class="category-content">
        <label class="category-label" for="category">
          <font-awesome-icon icon="list" />
        </label>
        <select
          id="category"
          class="category-selection"
          name="categorySelector"
          v-model="selectedCategory"
          @change="filterCategoryProducts"
        >
          <option v-if="filteredProducts.length == 0">Select category</option>
          <option>All categories</option>
          <option v-for="category in categories" :key="category">{{category}}</option>
        </select>
      </div>
      <div class="input-field">
        <input
          class="input-search"
          type="text"
          placeholder="search..."
          v-model="searchValue"
          @keyup="searchFor"
        />
        <font-awesome-icon class="search-icon" icon="search" />
      </div>
    </div>
    <hr />

    <div class="row row-cols-1 row-cols-lg-4 row-cols-md-2">
      <app-product v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import Product from "./ProductContainerProduct.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      filteredProducts: [],
      selectedCategory: "Select category",
      searchValue: ""
    };
  },
  components: {
    appProduct: Product
  },
  computed: {
    ...mapGetters(["categories", "products"])
  },
  created() {
    this.filteredProducts = this.products;
    if (this.filteredProducts.length) {
      this.selectedCategory = "All categories";
    }
  },
  methods: {
    filterCategoryProducts() {
      if (this.selectedCategory === "All categories") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = [
          ...this.products.filter(product =>
            product.category.includes(this.selectedCategory)
          )
        ];
      }
    },
    searchFor() {
      if (this.selectedCategory != "Select category") {
        if (this.selectedCategory === "All categories") {
          this.filteredProducts = this.products.filter(product =>
            product.title.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        } else {
          this.filteredProducts = this.products.filter(
            product =>
              product.title
                .toLowerCase()
                .includes(this.searchValue.toLowerCase()) &&
              product.category.includes(this.selectedCategory)
          );
        }
      }
    }
  }
};
</script>

<style scoped>
.row .category-content {
  margin-left: 10%;
}
.row .category-content .category-label {
  margin-right: 10px;
  font-size: 20px;
}
.row .category-content .category-selection {
  width: 215px;
  font-size: 18px;
  height: 37.7px;
  background-color: rgb(243, 241, 241);
  outline: none;
}
.row .input-field {
  margin-left: auto;
  margin-right: 10%;
  border-radius: 20px;
  background-color: rgb(243, 241, 241);
}
.row .input-field .input-search {
  width: 200px;
  height: 37.7px;
  margin-left: 10px;
  font-size: 18px;
  color: rgba(32, 32, 32, 0.568);
  background-color: rgb(243, 241, 241);
  outline: none;
  border: none;
}
.row .input-field .search-icon {
  margin: 6px 10px 0 5px;
  font-size: 20px;
}

@media only screen and (max-width: 768px) {
  .product-controller {
    display: flex;
    flex-direction: column;
  }
  .row .category-content {
    margin: auto;
    margin-bottom: 10px;
  }
  .row .input-field {
    margin-right: auto;
  }
}
</style>
