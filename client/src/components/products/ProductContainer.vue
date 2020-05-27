<template>
  <div>
    <div class="row" style="width: 100%">
      <div class="category-content">
        <label for="category" style="margin-right: 10px; font-size: 20px;">
          <font-awesome-icon icon="list" />
        </label>
        <select
          v-model="selectedCategory"
          id="category"
          name="categorySelector"
          class="category-selection"
          @change="filterCategoryProducts"
        >
          <option>All categories</option>
          <option v-for="category in categories" :key="category">{{category}}</option>
        </select>
      </div>
      <div class="input-field">
        <input
          class="input-search"
          placeholder="search..."
          type="text"
          v-model="searchValue"
          @keyup="searchFor"
        />
        <font-awesome-icon v-model="searchValue" class="search-icon" icon="search" />
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
      selectedCategory: "All categories",
      searchValue: ""
    };
  },
  components: {
    appProduct: Product
  },
  computed: {
    ...mapGetters(["products", "categories"])
  },
  created() {
    this.filteredProducts = this.products;
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
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.category-selection {
  background-color: rgb(243, 241, 241);
  font-size: 18px;
  width: 215px;
  outline: none;
}
.input-field {
  margin-left: auto;
  margin-right: 10%;
  background-color: rgb(243, 241, 241);
  border-radius: 20px;
}
.input-field .input-search {
  background-color: rgb(243, 241, 241);
  color: rgba(32, 32, 32, 0.568);
  outline: none;
  margin-left: 10px;
  font-size: 18px;
  height: 37.7px;
  width: 200px;
  border: none;
}
.input-field .search-icon {
  margin: 6px 10px 0 5px;
  font-size: 20px;
}
.search-icon:hover {
  cursor: pointer;
}
.category-content {
  margin-left: 10%;
}
@media only screen and (max-width: 768px) {
  .category-content {
    margin: auto;
    margin-bottom: 10px;
  }
  .input-field {
    display: flex;
    margin-right: auto;
    margin-bottom: 20px;
  }
}
</style>
