import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import ClienteDashboard from '@/views/ClienteDashboard.vue';

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
    path: '/administrador-dashboard',
    component: AdminDashboard,
    children: [
      {
        path: '',
        name: 'AdminDashboardHome',
        component: () => import('@/views/Admin/AdminDashboardHome.vue') // Vista de inicio
      },
      {
        path: 'profile/:id',
        name: 'AdminDashboardProfile',
        component: () => import('@/views/Admin/AdminDashboardProfile.vue') // Vista de perfil
      },
      {
        path: 'productos',
        name: 'AdminDashboardProductos',
        component: () => import('@/views/Admin/AdminDashboardProductos.vue') // Vista de productos
      },
      {
        path: 'usuarios',
        name: 'AdminDashboardUsuarios',
        component: () => import('@/views/Admin/AdminDashboardUsuarios.vue') // Vista de usuarios
      },
      {
        path: 'roles',
        name: 'AdminDashboardRoles',
        component: () => import('@/views/Admin/AdminDashboardRoles.vue') // Vista de roles
      },
      {
        path: 'permisos',
        name: 'AdminDashboardPermisos',
        component: () => import('@/views/Admin/AdminDashboardPermisos.vue') // Vista de permisos
      },
      {
        path: 'pedidos',
        name: 'AdminDashboardPedidos',
        component: () => import('@/views/Admin/AdminDashboardPedidos.vue') // Vista de pedidos
      },
      {
        path: 'detalles-pedidos',
        name: 'AdminDashboardDetallesPedidos',
        component: () => import('@/views/Admin/AdminDashboardDetallePedidos.vue') // Vista de detalles de pedidos
      }
    ]
  },
  {
    path: '/cliente-dashboard',
    component: ClienteDashboard,
    children: [
      {
        path: '',
        name: 'ClienteDashboardHome',
        component: () => import('@/views/Cliente/ClienteDashboardHome.vue') // Vista de inicio para cliente
      },
      {
        path: 'pedidos',
        name: 'ClienteDashboardPedidos',
        component: () => import('@/views/Cliente/ClienteDashboardPedidos.vue') // Vista de pedidos para cliente
      },
      {
        path: 'profile/:id',
        name: 'ClienteDashboardProfile',
        component: () => import('@/views/Cliente/ClienteDashboardProfile.vue') // Vista de perfil para cliente
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(baseURL),
  routes
});

export default router;
