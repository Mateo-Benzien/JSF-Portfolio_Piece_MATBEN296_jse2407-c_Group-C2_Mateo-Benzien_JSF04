<template>
  <div v-if="product">
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

    <div class="product-detail-container">
      <div class="product-detail">
        <img :src="product.image" :alt="product.title" class="product-image" />
        <div class="product-info">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">
            <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice }}</span>
            ${{ product.price }}
          </p>
          <div class="rating">
            <span class="star" :class="{ 'filled': product.rating >= 1 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 2 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 3 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 4 }">&#9733;</span>
            <span class="star" :class="{ 'filled': product.rating >= 5 }">&#9733;</span>
          </div>
          <p class="review-count">{{ product.reviewCount }} reviews</p>
          <button @click="toggleCart">{{ isInCart ? 'Remove from Cart' : 'Add to Cart' }}</button>
          <button @click="toggleFavorites">{{ isFavorite ? 'Unfavorite' : 'Add to Favorites' }}</button>
          <button class="compare-btn" @click.stop="addToComparison(product)">
            Compare
          </button>
          <button @click="goBackToHome">Back to Home</button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>© 2024 SwiftCart. All rights reserved.</p>
    </footer>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
      isFavorite: false,
      isInCart: false,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0,
      comparisonList: JSON.parse(localStorage.getItem('comparisonList')) || [],
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const id = this.$route.params.id;
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      this.product = data;
      this.checkCartStatus();
    },
    checkCartStatus() {
      if (this.product) {
        this.isInCart = this.cart.some(item => item.id === this.product.id);
      }
    },
    toggleCart() {
      if (this.isInCart) {
        this.removeFromCart();
      } else {
        this.addToCart();
      }
    },
    addToCart() {
      const existingProduct = this.cart.find(p => p.id === this.product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...this.product, quantity: 1 });
      }
      this.updateCart();
      this.syncCartWithServer();
    },
    removeFromCart() {
      this.cart = this.cart.filter(product => product.id !== this.product.id);
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
    toggleFavorites() {
      this.isFavorite = !this.isFavorite;
    },
    goBackToHome() {
      this.$router.push({ name: 'Home' });
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

.product-detail-container {
  padding: 20px;
}

.product-detail {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-image {
  max-width: 300px;
  border-radius: 10px;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 24px;
}

.product-description {
  margin: 20px 0;
}

.product-price {
  font-size: 20px;
  color: #333;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
}

.rating {
  display: flex;
  align-items: center;
}

.star {
  color: #ffd700;
  font-size: 24px;
}

.star.filled {
  color: #ffd700;
}

.review-count {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.compare-btn {
  background-color: #28a745;
}

.footer {
  padding: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
}
</style>
