import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import ProductDetailView from '../Pages/ProductDetailView.vue';
import Login from '../Pages/Login.vue';
import Cart from '../Pages/Cart.vue';
import ComparisonPage from '../Pages/ComparisonPage.vue';
import Wishlist from '../Pages/Wishlist.vue';
import Checkout from '../Pages/Checkout.vue'; // Use single or double quotes
import Confirmation from '../Pages/Confirmation.vue'; // Use single or double quotes

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/product/:id',
    name: 'ProductDetailView',
    component: ProductDetailView,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/comparison',
    name: 'ComparisonPage',
    component: ComparisonPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    meta: { requiresAuth: true },
  },
  { 
    path: '/checkout',
    name: 'Checkout', // Added name for consistency
    component: Checkout,
    meta: { requiresAuth: true }
  }, 
  { 
    path: '/confirmation',
    name: 'Confirmation', // Added name for consistency
    component: Confirmation 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
