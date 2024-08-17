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
            <a href="#" class="wishlist-btn">
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
          </div>
        </div>
      </div>
    </header>

    <div class="cart-content">
      <h1>Your Cart</h1>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <ul v-else>
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" class="cart-item-image" />
          <div class="cart-item-info">
            <h2 class="cart-item-title">{{ item.title }}</h2>
            <p class="cart-item-price">${{ item.price }} x {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <button @click="clearCart">Clear Cart</button>
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
    };
  },
  methods: {
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      this.updateCart();
    },
    clearCart() {
      this.cartItems = [];
      this.updateCart();
    },
    updateCart() {
      this.cartCount = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      localStorage.setItem('cartCount', JSON.stringify(this.cartCount));
    },
  },
};
</script>

<style scoped>
.header {
  background: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #ddd;
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
  height: auto;
  margin-right: 10px;
}

.header-title {
  font-size: 24px;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.cart-container {
  display: flex;
  align-items: center;
}

.cart {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.cart-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.cart-badge {
  background: #007bff;
  color: #fff;
  border-radius: 50%;
  padding: 0 8px;
  margin-left: 5px;
  font-size: 14px;
  line-height: 24px;
}

.login a {
  color: #007bff;
  text-decoration: none;
}

.cart-content {
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  font-size: 18px;
}

.cart-item-price {
  font-size: 16px;
  color: #333;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

footer {
  background: #f8f9fa;
  padding: 10px;
  text-align: center;
}
</style>
