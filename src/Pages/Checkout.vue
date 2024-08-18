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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="cart-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
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
      // Assuming user information is stored in localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        this.user = storedUser;
      }
    },
    placeOrder() {
      // Simulate order placement
      const order = {
        user: this.user,
        items: this.cartItems,
        total: this.totalCost,
        paymentMethod: this.paymentMethod,
        date: new Date().toLocaleString(),
      };

      // Save order to local storage
      let orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart after order
      localStorage.removeItem('cart');
      localStorage.removeItem('cartCount');

      // Redirect to confirmation page
      this.$router.push('/confirmation');

      // Send confirmation email
      this.sendEmailConfirmation(order);
    },
    sendEmailConfirmation(order) {
      // Simulate email sending (you would use an actual email service in production)
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
.header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
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
  width: 50px;
  height: 50px;
}

.header-title {
  margin-left: 10px;
  font-size: 1.5em;
}

.header-right {
  display: flex;
  align-items: center;
}

.cart-container {
  display: flex;
  align-items: center;
}

.cart-icon {
  height: 24px;
  width: 24px;
}

.cart-badge {
  background-color: #ff0000;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 50%;
  font-size: 12px;
  margin-left: -10px;
  margin-top: -10px;
}

.wishlist-btn {
  text-decoration: none;
  color: inherit;
}

.logout button {
  margin-left: 20px;
  background: none;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout button:hover {
  background-color: #007bff;
  color: white;
}

.checkout-content {
  padding: 20px;
}

.checkout-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.order-summary {
  margin: 20px 0;
  padding: 0;
  list-style-type: none;
}

.order-summary li {
  font-size: 16px;
  margin-bottom: 10px;
}

.total-cost {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
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

.footer {
  text-align: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  color: #7f8c8d;
  border-top: 1px solid #ddd;
  margin-top: 20px;
}
</style>
