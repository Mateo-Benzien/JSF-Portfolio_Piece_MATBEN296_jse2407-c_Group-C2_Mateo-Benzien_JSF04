<template>
    <div>
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <div class="brand">
            <img src="/shop.png" alt="Brand Logo" class="brand-logo" />
            <h1 class="header-title">SwiftCart</h1>
          </div>
          
          <div class="header-right">
            <div class="header-actions">
              <a href="/wishlist" class="header-btn">
                <span class="icon">🤍</span>
                <span class="badge">{{ wishlistCount }}</span>
                <span class="text">Wishlist</span>
              </a>
              <a href="/cart" class="header-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span class="badge">{{ cartCount }}</span>
              </a>
              <a href="/comparison" class="header-btn">
                <span class="text">Compare</span>
              </a>
              <a href="/login" class="header-btn">
                <span class="text">Login</span>
              </a>
            </div>
          </div>
        </div>
      </header>
  
      <div class="wishlist-container">
        <h2>Your Wishlist</h2>
        <div class="wishlist-summary">
          <p>Total items: {{ wishlist.length }}</p>
          <button @click="clearWishlist">Clear Wishlist</button>
        </div>
  
        <div class="wishlist-sort-filter">
          <!-- Sort and filter options -->
          <select v-model="selectedSort" @change="sortWishlist">
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
  
          <select v-model="selectedCategory" @change="filterWishlist">
            <option value="">Filter by Category</option>
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
  
        <div v-if="wishlist.length">
          <div v-for="item in filteredWishlist" :key="item.id" class="wishlist-item">
            <img :src="item.image" alt="" />
            <h3>{{ item.title }}</h3>
            <p>${{ item.price }}</p>
            <button @click="removeFromWishlist(item.id)">Remove</button>
            <button @click="moveToCart(item)">Add to Cart</button>
          </div>
        </div>
        <p v-else>Your wishlist is empty.</p>
      </div>
  
      <!-- Footer -->
      <footer class="footer">
        <p>© 2024 SwiftCart. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        selectedSort: '',
        selectedCategory: '',
        categories: [], // Initially empty
        wishlistCount: 0,
        cartCount: 0,
      };
    },
    computed: {
      filteredWishlist() {
        let filtered = this.wishlist;
  
        if (this.selectedCategory && this.selectedCategory !== 'all') {
          filtered = filtered.filter(item => item.category === this.selectedCategory);
        }
  
        if (this.selectedSort === 'asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (this.selectedSort === 'desc') {
          filtered.sort((a, b) => b.price - a.price);
        }
  
        return filtered;
      },
    },
    methods: {
      async fetchCategories() {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        this.categories = data;
      },
      removeFromWishlist(id) {
        this.wishlist = this.wishlist.filter(item => item.id !== id);
        this.updateWishlist();
      },
      moveToCart(item) {
        const existingProduct = this.cart.find(p => p.id === item.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          this.cart.push({ ...item, quantity: 1 });
        }
        this.updateCart();
        this.removeFromWishlist(item.id);
      },
      updateWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.wishlistCount = this.wishlist.length;
      },
      updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.cartCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      clearWishlist() {
        this.wishlist = [];
        this.updateWishlist();
      },
      sortWishlist() {
        if (this.selectedSort === 'asc') {
          this.wishlist.sort((a, b) => a.price - b.price);
        } else if (this.selectedSort === 'desc') {
          this.wishlist.sort((a, b) => b.price - a.price);
        }
      },
      filterWishlist() {
        // Filtering logic is handled by computed property
      },
    },
    mounted() {
      this.fetchCategories();
      this.wishlistCount = this.wishlist.length;
      this.cartCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    },
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
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
    font-size: 1.5em;
    color: #333;
  }
  
  .header-right {
    display: flex;
    align-items: center;
  }
  
  .header-actions {
    display: flex;
    gap: 15px;
  }
  
  .header-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    color: #333;
    font-size: 1em;
  }
  
  .icon {
    width: 24px;
    height: 24px;
  }
  
  .badge {
    background-color: #e74c3c;
    color: #fff;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 0.75em;
  }
  
  .text {
    font-size: 0.9em;
  }
  
  .wishlist-container {
    padding: 20px;
  }
  
  .wishlist-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .wishlist-item img {
    height: 100px;
    width: 100px;
    margin-right: 20px;
  }
  
  .wishlist-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .wishlist-sort-filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  footer {
    text-align: center;
    padding: 10px;
    background-color: #f8f8f8;
    color: #7f8c8d;
    border-top: 1px solid #ddd;
  }
  </style>
  