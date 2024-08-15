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

    <!-- Comparison List Section -->
    <div v-if="comparisonList.length" class="comparison-section">
      <h2>Comparison List</h2>
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in comparisonList" :key="index">
            <td><img :src="item.image" :alt="item.title" class="comparison-image" /></td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>${{ item.price }}</td>
            <td>{{ item.rating }} ★</td>
            <td><button @click="removeFromComparison(item.id)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <button @click="clearComparisonList">Clear List</button>
    </div>
    <div v-else>
      <p>No items in comparison list.</p>
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
      comparisonList: JSON.parse(localStorage.getItem('comparisonList')) || [],
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
      headers: ['Image', 'Title', 'Description', 'Price', 'Rating', 'Actions'],
    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts('all');
    this.updateCartCount();
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
      this.cartCount = this.cart.reduce((total, product) => total + product.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      localStorage.setItem('cartCount', this.cartCount);
    },
    isInCart(productId) {
      return this.cart.some(product => product.id === productId);
    },
    updateCartCount() {
      this.cartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
    },
    addToComparison(product) {
      if (this.comparisonList.length >= 5) {
        alert('You can only compare up to 5 items.');
        return;
      }
      if (!this.comparisonList.some(item => item.id === product.id)) {
        this.comparisonList.push(product);
        localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
      }
    },
    removeFromComparison(productId) {
      this.comparisonList = this.comparisonList.filter(item => item.id !== productId);
      localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
    },
    clearComparisonList() {
      this.comparisonList = [];
      localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
    },
    goToProduct(productId) {
      this.$router.push({ name: 'ProductPage', params: { id: productId } });
    },
    async syncCartWithServer() {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        try {
          await fetch('https://fakestoreapi.com/user/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(this.cart),
          });
        } catch (error) {
          console.error('Error syncing cart with server:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Styles for your ComparisonPage.vue component */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.brand {
  display: flex;
  align-items: center;
}
.brand-logo {
  width: 50px;
  height: auto;
}
.header-title {
  margin-left: 10px;
  font-size: 24px;
}
.header-right {
  display: flex;
  align-items: center;
}
.wishlist {
  margin-right: 20px;
}
.wishlist-btn {
  display: flex;
  align-items: center;
}
.wishlist-icon {
  font-size: 20px;
}
.wishlist-text {
  margin-left: 5px;
}
.cart-container {
  display: flex;
  align-items: center;
}
.cart {
  position: relative;
}
.cart-icon {
  width: 24px;
  height: 24px;
}
.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}
.login a {
  margin-left: 20px;
}
.product-list-container {
  padding: 20px;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
}
.product-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  width: 200px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.product-card:hover {
  background-color: #f0f0f0;
}
.product-image {
  width: 100%;
  height: auto;
}
.product-title {
  font-size: 18px;
  margin: 10px 0;
}
.rating {
  display: flex;
}
.star {
  font-size: 16px;
  color: #ffd700;
}
.filled {
  color: #ffd700;
}
.product-price {
  font-size: 16px;
  color: #333;
}
.product-category {
  font-size: 14px;
  color: #666;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
.add-to-cart,
.compare-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.add-to-cart {
  background-color: #007bff;
  color: white;
}
.compare-btn {
  background-color: #28a745;
  color: white;
}
.comparison-section {
  padding: 20px;
}
.comparison-image {
  width: 50px;
  height: auto;
}
.footer {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
}
</style>
