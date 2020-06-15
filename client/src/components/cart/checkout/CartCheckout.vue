<template>
<body class="checkout-wrapper">
  <div class="container">
    <div class="py-5 text-center">
      <font-awesome-icon
        class="float-left icon-back"
        icon="arrow-left"
        title="Back to Cart"
        data-toggle="tooltip"
        data-placement="top"
        @click="backToCart"
      />
      <h2>Checkout form</h2>
    </div>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-primary badge-pill">{{ products.length }}</span>
        </h4>
        <ul class="list-group mb-3">
          <li
            class="list-group-item d-flex justify-content-between lh-condensed"
            v-for="(product, index) in products"
            :key="index"
          >
            <div>
              <h6 class="my-0">{{ product.title }}</h6>
              <small class="text-muted">{{ product.description.substr(0,20) }}...</small>
            </div>
            <span class="text-muted">
              {{ product.selectedQuantity }}
              | {{ product.price | currency }}
              = {{ product.price * product.selectedQuantity | currency }}
            </span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>{{ totalPrice() | currency}}</strong>
          </li>
        </ul>
      </div>

      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <form id="form" class="needs-validation" onsubmit="return false">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                id="firstName"
                class="form-control"
                type="text"
                required
                v-model="user.firstName"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                id="lastName"
                class="form-control"
                type="text"
                required
                v-model="user.lastName"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="username">Username</label>
            <input
              id="username"
              class="form-control"
              type="text"
              placeholder="Username"
              required
              v-model="user.username"
            />
          </div>
          <div class="mb-3">
            <label for="email">Email</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">@</span>
              </div>
              <input
                id="email"
                class="form-control"
                type="email"
                placeholder="you@example.com"
                required
                v-model="user.email"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="address">Address</label>
            <input
              id="address"
              class="form-control"
              type="text"
              placeholder="1234 Main St"
              required
              v-model="user.address"
            />
          </div>
          <div class="mb-3">
            <label for="address2">House number</label>
            <input
              id="address2"
              class="form-control"
              type="text"
              placeholder="Apartment, suite, flat..."
              required
              v-model="user.houseNumber"
            />
          </div>
          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Country</label>
              <input
                class="form-control"
                id="country"
                type="text"
                placeholder="Croatia, Italy, Russia..."
                required
                v-model="user.country"
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="state">City</label>
              <input
                id="country"
                class="form-control"
                type="text"
                placeholder="Split, Rome, Moscow..."
                required
                v-model="user.city"
              />
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Zip</label>
              <input id="zip" class="form-control" type="text" required v-model="user.zipCode" />
            </div>
          </div>
          <hr class="mb-4" />

          <h4 class="mb-3">Payment</h4>
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input
                id="credit"
                class="custom-control-input"
                type="radio"
                name="paymentMethod"
                value="Credit card"
                required
                v-model="payment.cardType"
              />
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                id="debit"
                class="custom-control-input"
                type="radio"
                name="paymentMethod"
                value="Debit card"
                required
                v-model="payment.cardType"
              />
              <label class="custom-control-label" for="debit">Debit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input
                id="paypal"
                class="custom-control-input"
                type="radio"
                name="paymentMethod"
                value="Paypal"
                required
                v-model="payment.cardType"
              />
              <label class="custom-control-label" for="paypal">PayPal</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input
                id="cc-name"
                class="form-control"
                type="text"
                required
                v-model="payment.cardOwnerName"
              />
              <small class="text-muted">Full name as displayed on card</small>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input
                id="cc-number"
                class="form-control"
                type="number"
                required
                v-model="payment.cardNumber"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input
                id="cc-expiration"
                class="form-control"
                type="text"
                required
                v-model="payment.expiration"
              />
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input id="cc-cvv" class="form-control" type="number" required v-model="payment.cvv" />
            </div>
          </div>
          <hr class="mb-4" />
          <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
  </div>
</body>
</template>

<script>
import { mapGetters } from "vuex";
import { postOrder } from "./server_comm/cartController";
export default {
  data() {
    return {
      user: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        role: "",
        email: "",
        country: "",
        city: "",
        address: "",
        houseNumber: "",
        zipCode: "",
        image: ""
      },
      payment: {
        cardType: "",
        cardOwnerName: "",
        cardNumber: "",
        expiration: "",
        cvv: ""
      }
    };
  },
  computed: {
    ...mapGetters({ getUser: "userData", products: "selectedProducts" })
  },
  created() {
    const user = localStorage.getItem("user");
    if (this.getUser.username === "" && user != null) {
      this.$store.dispatch("submitUser_Store", JSON.parse(user));
    }
    this.user = { ...this.getUser };
  },
  mounted() {
    const form = document.getElementById("form");
    form.addEventListener("submit", this.submitCheckout);
  },
  methods: {
    backToCart() {
      this.$router.go(-1);
    },
    totalPrice() {
      let total = 0;
      this.products.forEach(product => {
        total += product.selectedQuantity * product.price;
      });
      return total;
    },
    async submitCheckout() {
      const cartProducts = [];
      this.products.forEach(product => {
        const item = {
          id: product.id,
          userId: product.userId,
          quantity: product.selectedQuantity,
          price: product.price
        };
        cartProducts.push(item);
      });
      const order = {
        userId: this.user.id,
        user: {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          country: this.user.country,
          city: this.user.city,
          address: this.user.address,
          houseNumber: this.user.houseNumber,
          zipCode: this.user.zipCode
        },
        products: cartProducts,
        payment: this.payment
      };
      console.log(order);
      // Generate order on db, reduce quantity on db
      const status = await postOrder(order);
      console.log(status);
    }
  }
};
</script>

<style scoped>
.icon-back {
  font-size: 32px;
}
.icon-back:hover {
  cursor: pointer;
}
</style>