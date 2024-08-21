<template>
    <div class="product-detail-container" v-if="product">
      <h1>{{ product.title }}</h1>
      <img :src="product.image" :alt="product.title" class="product-detail-image" />
      <p class="original-price"><s>${{ product.originalPrice }}</s></p>
      <p class="discounted-price">${{ product.price }}</p>
      <p class="discount-percentage">{{ product.discountPercentage }}% OFF</p>
      <p class="sale-end-date">Sale ends on: {{ saleEndDate }}</p>
      <p class="product-description">{{ product.description }}</p>
      <button @click="goBack">Back to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null,
        saleEndDate: '',
      };
    },
    mounted() {
      const productId = this.$route.params.id;
      this.fetchProductDetail(productId);
    },
    methods: {
      async fetchProductDetail(productId) {
        const discountedProducts = JSON.parse(localStorage.getItem('discountedProducts')) || [];
        this.product = discountedProducts.find(p => p.id === parseInt(productId));
    
        if (this.product) {
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 1);
          this.saleEndDate = endDate.toDateString();
        }
      },
      goBack() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .product-detail-container {
    padding: 20px;
    text-align: center;
  }
  
  .product-detail-image {
    max-width: 100%;
    height: auto;
  }
  
  .original-price, .discounted-price, .discount-percentage {
    font-size: 18px;
  }
  
  .sale-end-date {
    font-size: 16px;
    color: red;
  }
  
  .product-description {
    margin-top: 20px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  