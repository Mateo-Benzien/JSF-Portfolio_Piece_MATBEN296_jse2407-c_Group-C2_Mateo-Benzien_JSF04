<template>
  <div v-if="product">
    <!-- Header Component -->
    <header class="header">
      <div class="header-content">
        <div class="brand">
          <img src="" alt="Brand Logo" class="brand-logo">
          <h1 class="header-title">SwiftCart</h1>
        </div>
        <div class="header-right">
          <h3 class="wishlist">
            <a href="#" class="wishlist-btn">
              <span class="wishlist-icon">♡</span>
              <span class="wishlist-text">Wishlist</span>
            </a>
          </h3>
          <div class="cart">
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cart-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </a>
            <span class="cart-badge">{{ cartCount }}</span>
          </div>
          <div class="login"><a href="#">Login</a></div>
        </div>
      </div>
    </header>

    <!-- Product Detail Content -->
    <div class="product-detail">
      <img :src="product.image" :alt="product.title" class="product-detail-image">
      <h2 class="product-detail-title">{{ product.title }}</h2>
      <p class="product-detail-description">{{ product.description }}</p>
      <p class="product-detail-price">${{ product.price }}</p>
      <p class="product-detail-category">Category: {{ product.category }}</p>
      <div class="rating">
        <span class="star" :class="{ 'filled': product.rating >= 1 }">&#9733;</span>
        <span class="star" :class="{ 'filled': product.rating >= 2 }">&#9733;</span>
        <span class="star" :class="{ 'filled': product.rating >= 3 }">&#9733;</span>
        <span class="star" :class="{ 'filled': product.rating >= 4 }">&#9733;</span>
        <span class="star" :class="{ 'filled': product.rating >= 5 }">&#9733;</span>
      </div>
      <button class="back-to-home" @click="goBackToHome">Back to Home</button>
    </div>
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
      cartCount: 0,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    this.product = await response.json();
  },
  methods: {
    addToCart() {
      this.cartCount++;
    },
    goBackToHome() {
      this.$router.push('/');
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

.cart-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.cart-badge {
  background: #007bff;
  color: #fff;
  border-radius: 50%;
  padding: 0 10px;
  margin-left: 5px;
}

.login a {
  color: #007bff;
  text-decoration: none;
}

.product-detail {
  padding: 20px;
  text-align: center;
}

.product-detail-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 20px;
}

.product-detail-title {
  font-size: 24px;
  color: #333;
}

.product-detail-description {
  margin: 10px 0;
  font-size: 16px;
  color: #666;
}

.product-detail-price {
  font-size: 18px;
  color: #007bff;
}

.product-detail-category {
  font-size: 14px;
  color: #777;
}

.back-to-home {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-to-home:hover {
  background-color: #0056b3;
}

.rating {
  margin: 10px 0;
}

.star {
  color: #ffd700;
  font-size: 20px;
}

.star.filled {
  color: #ffd700;
}
</style>
