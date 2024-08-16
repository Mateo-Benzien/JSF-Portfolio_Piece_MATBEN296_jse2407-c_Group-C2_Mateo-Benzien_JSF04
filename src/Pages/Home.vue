<template>
  <div>
    <!-- Header Section -->
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
              <span class="wishlist-count">{{ wishlistCount }}</span>
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

    <!-- Filter and Sort Wrapper -->
    <div class="filter-sort-container">
      <!-- Filter Section -->
      <div class="filter">
        <select class="filter-select" v-model="selectedCategory" @change="filterProducts">
          <option value="">Select Category</option>
          <option value="all">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <!-- Sort Section -->
      <div class="sort">
        <label for="sort-select" class="sort-label">Sort by:</label>
        <select id="sort-select" class="sort-select" v-model="selectedSort" @change="sortProducts">
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>

    <!-- Product List Section -->
    <div class="product-list-container">
      <div class="product-list">
        <div
          class="product-card"
          v-for="product in products"
          :key="product.id"
          @click="goToProduct(product.id)"
        >
          <img :src="product.image" :alt="product.title" class="product-image" />
          <h2 class="product-title">{{ product.title }}</h2>
          <div class="rating">
            <span class="star" :class="{ 'filled': product.rating >= 1 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 2 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 3 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 4 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 5 }">&#9733;</span>
          </div>
          <p class="product-price">${{ product.price }}</p>
          <p class="product-category">{{ product.category }}</p>
          <div class="button-group">
            <button class="add-to-cart" @click.stop="toggleCart(product)">
              {{ isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart' }}
            </button>
            <button class="favorites-btn" @click.stop="toggleWishlist(product)">
              <span class="favorites-icon">{{ isInWishlist(product.id) ? '💖' : '🤍' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="footer">
      <p>© 2024 SwiftCart. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: '',
      selectedSort: '',
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
      cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
      wishlistCount: JSON.parse(localStorage.getItem('wishlistCount')) || 0,
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts('all');
    this.updateCartCount();
    this.updateWishlistCount();
  },
  methods: {
    async fetchProducts(category) {
      let url = 'https://fakestoreapi.com/products';
      if (category && category !== 'all') {
        url += `/category/${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      this.products = data.map((product) => ({
        ...product,
        rating: Math.floor(Math.random() * 5) + 1, // Random rating
      }));
      this.sortProducts();
    },
    async fetchCategories() {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      this.categories = data;
    },
    filterProducts() {
      this.fetchProducts(this.selectedCategory);
    },
    sortProducts() {
      if (this.selectedSort === 'asc') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (this.selectedSort === 'desc') {
        this.products.sort((a, b) => b.price - a.price);
      }
    },
    toggleCart(product) {
      if (this.isInCart(product.id)) {
        this.removeFromCart(product.id);
      } else {
        this.addToCart(product);
      }
    },
    addToCart(product) {
      const existingProduct = this.cart.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.updateCart();
      this.syncCartWithServer();
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(product => product.id !== productId);
      this.updateCart();
      this.syncCartWithServer();
    },
    updateCart() {
      this.cartCount = this.cart.reduce((acc, product) => acc + product.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem('cartCount', JSON.stringify(this.cartCount));
    },
    syncCartWithServer() {
      const token = localStorage.getItem('token');
      if (!token) return;

      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.cart),
      }).catch(error => console.error('Failed to sync cart:', error));
    },
    updateCartCount() {
      this.cartCount = this.cart.reduce((acc, product) => acc + product.quantity, 0);
    },
    isInCart(productId) {
      return this.cart.some(product => product.id === productId);
    },
    toggleWishlist(product) {
      if (this.isInWishlist(product.id)) {
        this.removeFromWishlist(product.id);
      } else {
        this.addToWishlist(product);
      }
    },
    addToWishlist(product) {
      this.wishlist.push(product);
      this.updateWishlist();
      this.syncWishlistWithServer();
    },
    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter(product => product.id !== productId);
      this.updateWishlist();
      this.syncWishlistWithServer();
    },
    updateWishlist() {
      this.wishlistCount = this.wishlist.length;
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      localStorage.setItem('wishlistCount', JSON.stringify(this.wishlistCount));
    },
    syncWishlistWithServer() {
      const token = localStorage.getItem('token');
      if (!token) return;

      fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(this.wishlist),
      }).catch(error => console.error('Failed to sync wishlist:', error));
    },
    updateWishlistCount() {
      this.wishlistCount = this.wishlist.length;
    },
    isInWishlist(productId) {
      return this.wishlist.some(product => product.id === productId);
    },
    goToProduct(productId) {
      this.$router.push({ path: `/product/${productId}` });
    },
  },
};
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.brand-logo {
  height: 40px;
  width: auto;
}

.header-title {
  margin-left: 10px;
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

.product-list-container {
  padding: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.product-card {
  padding: 20px; /* Increased padding for a bit more height */
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  transition: box-shadow 0.2s;
  background-color: #fff;
}

.product-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 300px; /* Increased height for a taller image */
  object-fit: cover;
}

.product-title {
  font-size: 16px;
  margin: 10px 0;
}

.rating {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.star {
  font-size: 14px;
  margin: 0 2px;
}

.star.filled {
  color: #f39c12;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.product-category {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.add-to-cart,
.favorites-btn {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart {
  background-color: #007bff;
  color: #fff;
}

.add-to-cart:hover {
  background-color: #0463c9;
}

.favorites-btn {
  background-color: #fff;
  border: 1px solid #ddd;
}

.favorites-btn:hover {
  background-color: #f8f8f8;
}

.footer {
  text-align: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  color: #7f8c8d;
  border-top: 1px solid #ddd;
}

.wishlist-container {
  display: flex;
  align-items: center;
}

.wishlist-btn {
  text-decoration: none;
  color: inherit;
}

.wishlist-icon {
  font-size: 20px;
  margin-right: 5px;
}

.wishlist-count {
  font-weight: bold;
}
</style>
