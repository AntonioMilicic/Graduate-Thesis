<template>
  <div>
    <app-header />
    <!-- <ul class="crumb-list">
      <router-link :to="pathCrumb" v-for="path in splitPath" :key="path.id" tag="li">
        <pre><a>{{pathCrumb}}</a> > </pre>
      </router-link>
    </ul>-->
    <div class="container container-fluid">
      <transition name="slide" mode="out-in">
        <router-view class="container-design" />
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";

export default {
  // data() {
  //   return {
  //     pathCrumb: "",
  //     splitPath: []
  //   };
  // },
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch("initProducts");
  },
  // methods: {
  //   splitCrumbs() {
  //     let subCrumb = [];
  //     let subWord = "";
  //     for (let i = 0; i < this.pathCrumb.length; i++) {
  //       subWord = subWord + this.pathCrumb[i];
  //       if (
  //         (i != 0 && this.pathCrumb[i] == "/") ||
  //         (i != 0 && i == this.pathCrumb.length - 1)
  //       ) {
  //         if (this.pathCrumb[i] == "/") {
  //           subWord = subWord.slice(0, -1);
  //         }
  //         subCrumb.push(subWord);
  //         subWord = "";
  //       } else if (i == 0 && this.pathCrumb[i] == "/") {
  //         subWord = "";
  //       }
  //     }
  //     return (this.splitPath = subCrumb);
  //   }
  // },
  watch: {
    $route() {
      this.pathCrumb = this.$route.path;
      // this.splitCrumbs();
    }
  }
};
</script>

<style>
body {
  min-width: 450px;
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
/* .crumb-list {
  list-style: none;
  display: flex;
  margin-left: 10%;
  margin-bottom: 20px;
  font-size: 20px;
} */

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
