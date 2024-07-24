import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import ClienteDashboard from '@/views/ClienteDashboard.vue';
import EmpleadoDashboard from '@/views/EmpleadoDashboard.vue';
import DomiciliarioDashboard from '@/views/DomiciliarioDashboard.vue';

// Define the base URL explicitly
const baseURL = '';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    props: true 
  },
  {
    path: '/cliente-dashboard',
    name: 'ClienteDashboard',
    component: ClienteDashboard
  },
  {
    path: '/empleado-dashboard',
    name: 'EmpleadoDashboard',
    component: EmpleadoDashboard
  },
  {
    path: '/domiciliario-dashboard',
    name: 'DomiciliarioDashboard',
    component: DomiciliarioDashboard
  }
];

const router = createRouter({
  history: createWebHistory(baseURL),
  routes
});

export default router;
