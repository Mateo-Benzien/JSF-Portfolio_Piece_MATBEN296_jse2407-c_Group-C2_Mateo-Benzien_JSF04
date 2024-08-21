<template>
  <div class="checkout-page">
    <header class="header">
      <div class="header-content">
        <div class="brand">
          <img src="/shop.png" alt="Brand Logo" class="brand-logo" />
          <h1 class="header-title">SwiftCart</h1>
        </div>
        <div class="header-right">
          <h3 class="wishlist">
            <a href="/wishlist" class="wishlist-btn">
              <span class="wishlist-icon">🤍</span>
              <span class="wishlist-text">Wishlist</span>
            </a>
          </h3>
          <div class="cart-container">
            <div class="cart">
              <a href="/cart">
                <!-- Cart Icon -->
              </a>
              <span class="cart-badge">{{ cartCount }}</span>
            </div>
            <div class="comparison">
              <a href="/comparison" class="comparison-btn">Compare</a>
            </div>
            <div class="login"><a href="#">Login</a></div>
            <div class="logout">
              <button @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="checkout-content">
      <h1>Checkout</h1>
      <div class="checkout-form">
        <h2>Shipping Information</h2>
        <form @submit.prevent="placeOrder">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              id="name"
              v-model="user.name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">Residential Address:</label>
            <input
              type="text"
              id="address"
              v-model="user.address"
              placeholder="Enter your address"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="user.email"
              placeholder="Enter your email"
              required
            />
          </div>
          <h2>Payment Method</h2>
          <div class="form-group">
            <label for="payment-method">Select Payment Method:</label>
            <select id="payment-method" v-model="paymentMethod" required>
              <option value="" disabled>Select Payment Method</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <h2>Order Summary</h2>
          <ul class="order-summary">
            <li v-for="item in cartItems" :key="item.id">
              {{ item.title }} ({{ item.quantity }}) - ${{ item.price * item.quantity }}
            </li>
          </ul>
          <p class="total-cost">Total: ${{ totalCost }}</p>
          <button type="submit" class="place-order-btn">Place Order</button>
        </form>
      </div>
    </div>

    <footer class="footer">
      <p>© 2024 SwiftCart. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
      user: {
        name: '',
        address: '',
        email: '',
      },
      paymentMethod: '',
    };
  },
  computed: {
    totalCost() {
      return this.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ).toFixed(2);
    },
  },
  mounted() {
    this.fillUserInfo();
  },
  methods: {
    fillUserInfo() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.user = storedUser;
      }
    },
    placeOrder() {
      const order = {
        user: this.user,
        items: this.cartItems,
        total: this.totalCost,
        paymentMethod: this.paymentMethod,
        date: new Date().toLocaleString(),
      };

      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      localStorage.removeItem('cart');
      localStorage.removeItem('cartCount');

      this.$router.push('/confirmation');

      this.sendEmailConfirmation(order);
    },
    sendEmailConfirmation(order) {
      console.log(`Email sent to ${order.user.email} with order details`, order);
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Styles similar to Home.vue for consistency */
.checkout-page {
  font-family: Arial, sans-serif;
}

.header {
  background-color: #f8f9fa;
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-logo {
  height: 40px;
}

.header-title {
  margin-left: 1rem;
  font-size: 1.5rem;
}

.header-right {
  display: flex;
  align-items: center;
}

.wishlist-btn,
.comparison-btn,
.login a,
.logout button {
  margin-left: 1rem;
  text-decoration: none;
  color: #007bff;
}

.place-order-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

.place-order-btn:hover {
  background-color: #0056b3;
}

.checkout-content {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.order-summary {
  list-style: none;
  padding: 0;
}

.footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}
</style>
