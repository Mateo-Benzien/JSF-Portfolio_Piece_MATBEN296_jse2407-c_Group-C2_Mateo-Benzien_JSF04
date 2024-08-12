<template>
  <div>
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <div class="brand">
          <img src="" alt="Brand Logo" class="brand-logo" />
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
              <a href="#">
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
            <button class="favorites-btn">
              <span class="favorites-icon">❤️</span>
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
      cart: [],
      cartCount: 0,
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts('all');
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
      this.cart.push(product);
      this.cartCount++;
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(product => product.id !== productId);
      this.cartCount--;
    },
    isInCart(productId) {
      return this.cart.some(product => product.id === productId);
    },
    goToProduct(id) {
      this.$router.push({ name: 'ProductDetailView', params: { id } });
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

.filter-sort-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.product-list-container {
  padding: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px; /* Increased padding for more space */
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px; /* Increased height for taller cards */
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-title {
  font-size: 14px; /* Adjust font size for titles */
  margin: 10px 0;
}

.rating {
  margin: 5px 0;
}

.star {
  font-size: 16px;
  color: #ddd;
}

.star.filled {
  color: #ffcc00;
}

.product-price {
  font-size: 16px; /* Adjust font size for price */
  color: #333;
  margin-bottom: 5px;
}

.product-category {
  font-size: 12px; /* Adjust font size for category */
  color: #666;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.add-to-cart,
.favorites-btn {
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #007bff;
  padding: 5px;
  cursor: pointer;
  width: 48%;
  font-size: 12px; /* Adjust font size for buttons */
}

.add-to-cart:hover,
.favorites-btn:hover {
  background-color: #0056b3;
}

.favorites-icon {
  color: red;
}

.footer {
  background: #f8f9fa;
  padding: 15px;
  text-align: center;
  border-top: 1px solid #ddd;
}

.footer p {
  margin: 0;
  color: #333;
}
</style>
