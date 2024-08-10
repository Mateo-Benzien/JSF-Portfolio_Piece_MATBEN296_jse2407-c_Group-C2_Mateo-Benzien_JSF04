import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import ProductDetailView from '../Pages/ProductDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'ProductDetailView',
    component: ProductDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
