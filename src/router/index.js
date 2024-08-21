import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import ProductDetailView from '../Pages/ProductDetailView.vue';
import Login from '../Pages/Login.vue';
import Cart from '../Pages/Cart.vue';
import ComparisonPage from '../Pages/ComparisonPage.vue';
import Wishlist from '../Pages/Wishlist.vue';
import Checkout from '../Pages/Checkout.vue';
import Confirmation from '../Pages/Confirmation.vue';
import DiscountProducts from '../Pages/DiscountProducts.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetailView', component: ProductDetailView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/comparison', name: 'ComparisonPage', component: ComparisonPage, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist, meta: { requiresAuth: true } },
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/confirmation', name: 'Confirmation', component: Confirmation, meta: { requiresAuth: true } },
  { path: '/discount-product/:id', name: 'DiscountProductDetail', component: DiscountProducts, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
