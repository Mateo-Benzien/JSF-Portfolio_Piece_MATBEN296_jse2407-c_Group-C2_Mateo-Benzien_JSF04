<template>
  <div class="app-container">
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <div class="brand">
          <img src="/shop.png" alt="Brand Logo" class="brand-logo" />
          <h1 class="header-title">SwiftCart</h1>
        </div>
        <div class="header-right">
          <div class="header-item">
            <a href="/wishlist" class="wishlist-btn">
              <span class="wishlist-icon">🤍</span>
              <span class="wishlist-count">{{ wishlistCount }}</span>
              <span class="wishlist-text">Wishlist</span>
            </a>
          </div>
          <div class="header-item">
            <a href="/cart" class="cart-btn">
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
              <span class="cart-badge">{{ cartCount }}</span>
            </a>
          </div>
          <div class="header-item">
            <a href="/comparison" class="comparison-btn">Compare</a>
          </div>
          <div class="header-item">
            <a href="#" class="login-btn">Login</a>
          </div>
          <div class="header-item">
            <button @click="logout" class="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Section -->
    <main class="main-content">
      <!-- Discounted Products Carousel -->
      <div class="carousel-container" v-if="discountedProducts.length">
        <h2>Discounted Products</h2>
        <div class="carousel">
          <div
            class="carousel-item"
            v-for="product in discountedProducts"
            :key="product.id"
            @click="goToProduct(product.id)"
          >
            <img :src="product.image" :alt="product.title" class="carousel-image" />
            <div class="carousel-info">
              <h3>{{ product.title }}</h3>
              <p class="original-price"><s>${{ product.originalPrice }}</s></p>
              <p class="discounted-price">${{ product.price }}</p>
              <p class="discount-percentage">{{ product.discountPercentage }}% OFF</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Sort Wrapper -->
      <div class="filter-sort-container">
        <div class="filter">
          <select class="filter-select" v-model="selectedCategory" @change="filterProducts">
            <option value="">Select Category</option>
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
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
    </main>

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
      discountedProducts: [],
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
    fetchCategories() {
      // Replace with your API call to fetch categories
      this.categories = ['Electronics', 'Clothing', 'Accessories'];
    },
    async fetchProducts(category) {
      // Replace with your API call to fetch products
      let products = await fetch('https://fakestoreapi.com/products').then(res => res.json());
      if (category && category !== 'all') {
        products = products.filter(product => product.category === category);
      }
      this.products = products;
      this.applyDiscounts();
    },
    filterProducts() {
      this.fetchProducts(this.selectedCategory);
    },
    sortProducts() {
      this.products.sort((a, b) => {
        if (this.selectedSort === 'asc') {
          return a.price - b.price;
        } else if (this.selectedSort === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });
    },
    goToProduct(productId) {
      this.$router.push(`/product/${productId}`);
    },
    toggleCart(product) {
      const index = this.cart.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      } else {
        this.cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.updateCartCount();
    },
    toggleWishlist(product) {
      const index = this.wishlist.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.wishlist.splice(index, 1);
      } else {
        this.wishlist.push(product);
      }
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      this.updateWishlistCount();
    },
    isInCart(productId) {
      return this.cart.some(p => p.id === productId);
    },
    isInWishlist(productId) {
      return this.wishlist.some(p => p.id === productId);
    },
    updateCartCount() {
      this.cartCount = this.cart.length;
      localStorage.setItem('cartCount', this.cartCount);
    },
    updateWishlistCount() {
      this.wishlistCount = this.wishlist.length;
      localStorage.setItem('wishlistCount', this.wishlistCount);
    },
    applyDiscounts() {
      // Function to apply random discounts to 5 products
      const selectedProducts = [...this.products].sort(() => 0.5 - Math.random()).slice(0, 5);
      selectedProducts.forEach(product => {
        product.discountPercentage = Math.floor(Math.random() * 31) + 10; // Random discount between 10% and 40%
        product.originalPrice = product.price;
        product.price -= product.price * (product.discountPercentage / 100);
      });
      this.discountedProducts = selectedProducts;
    },
    logout() {
      // Handle logout
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
}

.header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-bottom: 2px solid #0056b3;
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
  margin-right: 10px;
}

.header-title {
  font-size: 24px;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-item {
  margin-left: 15px;
  position: relative;
}

.cart-btn, .wishlist-btn, .comparison-btn, .login-btn, .logout-btn {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.cart-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.cart-badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
}

.wishlist-icon, .login-btn {
  margin-right: 5px;
}

.logout-btn {
  background-color: #dc3545;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c82333;
}

.main-content {
  padding: 20px;
}

.carousel-container {
  margin-bottom: 20px;
}

.carousel {
  display: flex;
  overflow-x: scroll;
  gap: 10px;
}

.carousel-item {
  flex: 0 0 auto;
  width: 200px;
  cursor: pointer;
  text-align: center;
}

.carousel-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.carousel-info {
  margin-top: 10px;
}

.original-price {
  text-decoration: line-through;
}

.discounted-price {
  color: red;
}

.discount-percentage {
  color: green;
}

.filter-sort-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter, .sort {
  display: flex;
  align-items: center;
}

.filter-select, .sort-select {
  margin-left: 10px;
}

.product-list-container {
  margin-top: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  text-align: center;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-title {
  font-size: 18px;
  margin: 10px 0;
}

.rating {
  display: flex;
  justify-content: center;
}

.star {
  color: gold;
}

.star.filled {
  color: gold;
}

.product-price {
  font-size: 16px;
  color: red;
}

.product-category {
  font-size: 14px;
  color: #555;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.add-to-cart, .favorites-btn {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart:hover, .favorites-btn:hover {
  background-color: #0056b3;
}

.footer {
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
}
</style>
