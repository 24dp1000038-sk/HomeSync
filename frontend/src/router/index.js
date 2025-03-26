import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import ProRegister from '@/views/ProRegister.vue';
import UserRegister from '@/views/UserRegister.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about', 
      component:AboutView,
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
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound,
    },
  ],
})

export default router
