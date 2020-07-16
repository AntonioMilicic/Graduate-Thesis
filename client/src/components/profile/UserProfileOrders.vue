<template>
  <div class="profile-child-container">
    <div class="list-group">
      <div
        class="list-group-item list-group-item-action list-group-item-light"
        v-for="order in userOrders"
        :key="order.id"
      >
        <div class="float-left">
          <div>Product ID: {{order.productId}}</div>
          <div>Owner ID: {{order.productOwnerId}}</div>
        </div>
        <div class="float-right">
          <div>
            <span>Quantity: {{order.quantity}}</span>
          </div>
          <div>
            <span>Price per: {{order.price | currency}}</span>
          </div>
          <div style="border-top: solid 1px lightgray">
            <span>Total price: {{order.quantity * order.price | currency}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserOrders } from "./server_comm/userController.js";

export default {
  data() {
    return {
      userOrders: []
    };
  },
  computed: {
    ...mapGetters(["userData"])
  },
  created() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const userOrders = await getUserOrders(this.userData.id);
      if (userOrders != "error") {
        this.userOrders = userOrders;
      }
    }
  }
};
</script>

<style scoped>
.profile-child-container {
  margin-top: 2%;
}
</style>