<template>
  <div class="confirmation-page">
    <header class="header">
      <div class="header-content">
        <div class="brand">
          <img src="/shop.png" alt="Brand Logo" class="brand-logo" />
          <h1 class="header-title">SwiftCart</h1>
        </div>
      </div>
    </header>

    <div class="confirmation-content">
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase, {{ order.user.name }}!</p>
      <p>Your order has been placed successfully.</p>
      <h2>Order Details</h2>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          {{ item.title }} - ${{ item.price }} x {{ item.quantity }}
        </li>
      </ul>
      <p><strong>Total Cost:</strong> ${{ order.total }}</p>
      <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
      <p><strong>Date:</strong> {{ order.date }}</p>
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
      order: JSON.parse(localStorage.getItem('orders')).slice(-1)[0],
    };
  },
};
</script>

<style scoped>
/* Similar styles to Checkout.vue for consistency */
.header {
  background-color: #f8f9fa;
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  width: 50px;
  height: 50px;
}

.header-title {
  margin-left: 10px;
  font-size: 1.5em;
}

.confirmation-content {
  padding: 20px;
  text-align: center;
}

.confirmation-content h1 {
  margin-bottom: 20px;
}

.confirmation-content p {
  margin-bottom: 10px;
}

.footer {
  text-align: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  color: #7f8c8d;
  border-top: 1px solid #ddd;
  margin-top: 20px;
}
</style>
