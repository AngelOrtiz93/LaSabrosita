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
    component: ClienteDashboard,
    children: [
      {
        path: '',
        name: 'ClienteDashboardHome',
        component: () => import('@/views/Cliente/ClienteDashboardHome.vue') // Agrega tu vista de inicio aquí
      },
      {
        path: 'profile',
        name: 'ClienteDashboardProfile',
        component: () => import('@/views/Cliente/ClienteDashboardProfile.vue') // Agrega tu vista de perfil aquí
      },
      {
        path: 'products',
        name: 'ClienteDashboardProducts',
        component: () => import('@/views/Cliente/ClienteDashboardProducts.vue') // Vista de productos
      }
    ]
  },
  {
    path: '/empleado-dashboard',
    component: EmpleadoDashboard,
    children: [
      {
        path: '',
        name: 'EmpleadoDashboardHome',
        component: () => import('@/views/Empleado/EmpleadoDashboardHome.vue') // Vista de inicio para empleado
      },
      {
        path: 'tasks',
        name: 'EmpleadoDashboardTasks',
        component: () => import('@/views/Empleado/EmpleadoDashboardTasks.vue') // Vista de inicio para empleado
      },
      {
        path: 'profile',
        name: 'EmpleadoDashboardProfile',
        component: () => import('@/views/Empleado/EmpleadoDashboardProfile.vue') // Vista de perfil para empleado
      }
    ]
  },
  {
    path: '/domiciliario-dashboard',
    component: DomiciliarioDashboard,
    children: [
      {
        path: '',
        name: 'DomiciliarioDashboardHome',
        component: () => import('@/views/Domiciliario/DomiciliarioDashboardHome.vue') // Vista de inicio para domiciliario
      },
      {
        path: 'tareas',
        name: 'DomiciliarioDashboardTasks',
        component: () => import('@/views/Domiciliario/DomiciliarioDashboardTareas.vue') // Vista de inicio para domiciliario
      },
      {
        path: 'perfil',
        name: 'DomiciliarioDashboardPerfil',
        component: () => import('@/views/Domiciliario/DomiciliarioDashboardPerfil.vue') // Vista de perfil para domiciliario
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(baseURL),
  routes
});

export default router;
