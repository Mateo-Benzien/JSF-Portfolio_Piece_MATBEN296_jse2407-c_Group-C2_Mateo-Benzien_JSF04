import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import ProductDetailView from '../Pages/ProductDetailView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', name: 'ProductDetailView', component: ProductDetailView, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;