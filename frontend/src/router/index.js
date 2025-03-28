import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ProRegister from '@/views/ProRegister.vue';
import UserRegister from '@/views/UserRegister.vue';
import NotFound from '@/views/NotFound.vue';
import CustomerView from '@/views/CustomerView.vue';
import ProView from '@/views/ProView.vue';
import AdminView from '@/views/AdminView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login', 
      component:LoginView,
    },
    {
      path: '/pro-register',
      name: 'pro-register', 
      component:ProRegister,
    },
    {
      path: '/user-register',
      name: 'user-register', 
      component:UserRegister,
    },
    {
      path: '/pro_page',
      name: 'por_page', 
      component:ProView,
    },
    {
      path: '/admin_page',
      name: 'admin_page', 
      component:AdminView,
    },
    {
      path: '/user_page',
      name: 'user_page', 
      component:CustomerView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound,
    },
  ],
})

export default router
