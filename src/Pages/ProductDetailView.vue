<template>
  <div v-if="product">
    <div class="product-detail">
      <img :src="product.image" :alt="product.title" class="product-detail-image" />
      <h2 class="product-detail-title">{{ product.title }}</h2>
      <p class="product-detail-description">{{ product.description }}</p>
      <p class="product-detail-price">${{ product.price }}</p>
      <p class="product-detail-category">Category: {{ product.category }}</p>
      <div class="rating">
        <span class="star" v-for="star in 5" :key="star" :class="{ 'filled': product.rating.rate >= star }">&#9733;</span>
        <p class="rating-info">{{ product.rating.rate }} / 5 ({{ product.rating.count }} reviews)</p>
      </div>
      <div class="button-container">
        <button class="add-to-cart" @click="toggleCart">
          {{ isInCart ? 'Remove from Cart' : 'Add to Cart' }}
        </button>
        <button class="favorites-btn" @click="toggleFavorites">
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
        <button class="back-to-home" @click="goBackToHome">Back to Home</button>
      </div>
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
      isFavorite: false,
      isInCart: false,
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
    toggleCart() {
      if (this.isInCart) {
        this.removeFromCart();
      } else {
        this.addToCart();
      }
    },
    addToCart() {
      this.$emit('add-to-cart', this.product);
      this.isInCart = true;
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.product.id);
      this.isInCart = false;
    },
    checkCartStatus() {
      // Logic to check if the product is already in the cart.
      this.isInCart = this.$root.cart.some(product => product.id === this.product.id);
    },
    toggleFavorites() {
      this.isFavorite = !this.isFavorite;
    },
    goBackToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
.button-container {
  margin-top: 10px;
}

.add-to-cart, .favorites-btn, .back-to-home {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  margin-right: 10px;
}

.add-to-cart {
  background-color: #007bff;
  color: white;
}

.favorites-btn {
  background-color: #ff4081;
  color: white;
}

.back-to-home {
  background-color: #6c757d;
  color: white;
}

.rating {
  margin-top: 10px;
}

.rating .star {
  color: #ffdd00;
  font-size: 1.2em;
}

.rating .star.filled {
  color: #ffdd00;
}

.rating-info {
  margin-top: 5px;
  font-size: 1em;
}

.product-detail {
  padding: 20px;
}

.product-detail-image {
  width: 100%;
  max-width: 300px;
}

.product-detail-title {
  font-size: 1.5em;
  margin: 10px 0;
}

.product-detail-description {
  font-size: 1em;
  margin-bottom: 10px;
}

.product-detail-price {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.product-detail-category {
  font-size: 1em;
  margin-bottom: 10px;
}
</style>
