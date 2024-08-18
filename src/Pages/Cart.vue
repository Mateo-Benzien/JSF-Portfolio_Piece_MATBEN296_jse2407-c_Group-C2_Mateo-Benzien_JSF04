<template>
  <div class="cart-page">
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

    <div class="cart-content">
      <h1>Your Shopping Cart</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="/" class="shop-link">Continue Shopping</a>
      </div>
      <div v-else class="cart-items">
        <ul>
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-info">
              <img :src="item.image" alt="Product Image" class="item-image" />
              <div>
                <h2>{{ item.title }}</h2>
                <p>Price: ${{ item.price }}</p>
                <p>
                  Quantity:
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    min="1"
                    @change="updateQuantity(item.id, item.quantity)"
                    class="quantity-input"
                  />
                </p>
                <button @click="removeItem(item.id)" class="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div class="cart-summary">
          <p>Total Items: {{ cartCount }}</p>
          <p>Total Cost: ${{ totalCost }}</p>
          <button @click="clearCart" class="clear-cart-btn">
            Clear Cart
          </button>
          <button @click="goToCheckout" class="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
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
    };
  },
  computed: {
    cartCount() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    },
    totalCost() {
      return this.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ).toFixed(2);
    },
  },
  watch: {
    cartItems: {
      handler(updatedCart) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('cartCount', JSON.stringify(this.cartCount));
      },
      deep: true,
    },
  },
  methods: {
    updateQuantity(itemId, quantity) {
      const item = this.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    },
    clearCart() {
      this.cartItems = [];
    },
    goToCheckout() {
      localStorage.setItem('cartItemsForCheckout', JSON.stringify(this.cartItems));
      this.$router.push('/checkout');
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Styles for Cart.vue */
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

.cart-content {
  padding: 20px;
}

.empty-cart {
  text-align: center;
}

.shop-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.cart-items ul {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.item-info {
  display: flex;
  align-items: center;
}

.item-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.quantity-input {
  width: 50px;
  margin-left: 10px;
}

.remove-btn {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c00000;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.clear-cart-btn,
.checkout-btn {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.clear-cart-btn {
  background-color: #ff0000;
  color: white;
}

.clear-cart-btn:hover {
  background-color: #c00000;
}

.checkout-btn {
  background-color: #007bff;
  color: white;
}

.checkout-btn:hover {
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
