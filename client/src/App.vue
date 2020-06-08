<template>
  <div class="main-container">
    <app-header />
    <div class="container container-fluid">
      <transition name="slide" mode="out-in">
        <router-view class="container-design" />
      </transition>
    </div>
    <transition name="slide" mode="out-in">
      <div class="back-to-top-container" @click="goToTop" v-if="windowScrollVisible">
        <font-awesome-icon icon="angle-double-up" class="back-to-top-button" />
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "./components/TheHeader.vue";

export default {
  data() {
    return {
      windowScrollVisible: false
    };
  },
  components: {
    appHeader: Header
  },
  async beforeCreate() {
    await this.$store.dispatch("initProducts");
    if (window.localStorage.user != null) {
      this.$store.dispatch(
        "submitUser_Store",
        JSON.parse(localStorage.getItem("user"))
      );
    }
    if (window.sessionStorage.cart != null) {
      this.$store.dispatch(
        "persistToCart_Store",
        JSON.parse(sessionStorage.getItem("cart"))
      );
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
  },
  methods: {
    goToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    scrollEvent() {
      if (window.pageYOffset > window.innerHeight / 3) {
        this.windowScrollVisible = true;
      } else this.windowScrollVisible = false;
    }
  }
};
</script>

<style>
body {
  min-width: 475px;
}
.container-design {
  margin: 0 20px;
}
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}
.back-to-top-container {
  position: sticky;
  bottom: 30px;
  float: right;
  margin-right: 5%;
  z-index: 2;
  height: 80px;
  width: 60px;
  opacity: 0.75;

  border-radius: 30px;
  background-color: rgb(243, 241, 241);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.back-to-top-container:hover {
  opacity: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.back-to-top-button {
  margin-left: 22.5%;
  margin-top: 22.5%;
  z-index: 2;
  color: rgba(0, 0, 0, 0.6);
  font-size: 48px;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
