<template>
    <div class="cart-page">
      <header class="header">
        <div class="header-content">
          <div class="brand">
            <img src="/shop.png" alt="Brand Logo" class="brand-logo" />
            <h1 class="header-title">SwiftCart</h1>
            <button class="back-to-home-btn" @click="goBackToHome">Back to Home</button>
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
              <div class="login"><a href="#">Login</a></div>
            </div>
          </div>
        </div>
      </header>
  
      <div class="cart-container">
        <h2 class="cart-title">Your Cart</h2>
        <div class="cart-items">
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <img :src="item.image" :alt="item.title" class="cart-item-image" />
            <div class="cart-item-details">
              <h3 class="cart-item-title">{{ item.title }}</h3>
              <p class="cart-item-price">${{ item.price }} × {{ item.quantity }}</p>
              <button class="remove-from-cart" @click="removeFromCart(item.id)">
                Remove
              </button>
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total: ${{ totalPrice }}</p>
          <button class="checkout-btn" @click="checkout">Checkout</button>
          <button class="clear-cart-btn" @click="clearCart">Clear Cart</button>
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
      };
    },
    mounted() {
      this.updateCartCount();
    },
    methods: {
      extractUserIdFromToken(token) {
        // Example logic: Decode base64 and parse JSON
        const payload = token.split('.')[1]; // Get payload part of the token
        const decoded = atob(payload); // Decode base64
        const data = JSON.parse(decoded); // Parse JSON
        return data.userId; // Extract user ID
      },
      addToCart(product) {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to log in first!');
          return;
        }
  
        const userId = this.extractUserIdFromToken(token);
  
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id && item.userId === userId);
  
        if (existingItem) {
          existingItem.quantity += 1; // Update quantity if item exists
        } else {
          cart.push({ ...product, userId, quantity: 1 }); // Add new item
        }
  
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCart();
      },
      getCartItems() {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to log in first!');
          this.$router.push({ name: 'Login' });
          return;
        }
  
        const userId = this.extractUserIdFromToken(token);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartItems = cart.filter(item => item.userId === userId);
      },
      updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.updateCartCount();
      },
      updateCartCount() {
        this.cartCount = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        localStorage.setItem('cartCount', JSON.stringify(this.cartCount));
      },
      removeFromCart(itemId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        this.updateCart();
      },
      updateQuantity(itemId, newQuantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.id === itemId);
        if (item) {
          item.quantity = newQuantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          this.updateCart();
        }
      },
      clearCart() {
        localStorage.removeItem('cart');
        this.updateCart();
      },
      checkout() {
        alert('Checkout feature is not implemented yet.');
      },
      goBackToHome() {
        this.$router.push({ name: 'Home' });
      }
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
      }
    }
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
  }
  
  .cart-page {
    padding: 20px;
  }
  
  .cart-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  
  .cart-item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 10px;
  }
  
  .cart-item-details {
    flex: 1;
  }
  
  .cart-item-title {
    font-size: 18px;
  }
  
  .cart-item-price {
    font-size: 16px;
    margin: 5px 0;
  }
  
  .remove-from-cart {
    background: #dc3545;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .remove-from-cart:hover {
    background: #c82333;
  }
  
  .cart-summary {
    margin-top: 20px;
  }
  
  .checkout-btn {
    background: #28a745;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background: #218838;
  }
  
  .clear-cart-btn {
    background: #ffc107;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .clear-cart-btn:hover {
    background: #e0a800;
  }
  
  .back-to-home-btn {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .back-to-home-btn:hover {
    background: #0056b3;
  }
  
  .footer {
    background: #f8f9fa;
    padding: 10px;
    text-align: center;
    border-top: 1px solid #ddd;
  }
  </style>
  