  import { createRouter, createWebHistory } from 'vue-router';
  import Login from '@/views/Login.vue';
  import Register from '@/views/Register.vue';
  import ForgotPassword from '@/views/ForgotPassword.vue';
  import ResetPassword from '@/views/ResetPassword.vue';
  import AdminDashboard from '@/views/AdminDashboard.vue';
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
      path: '/administrador-dashboard',
      component: AdminDashboard,
      children: [
        {
          path: '',
          name: 'AdminDashboardHome',
          component: () => import('@/views/Admin/AdminDashboardHome.vue') // Agrega tu vista de inicio aquí
        },
        {
          path: 'profile',
          name: 'AdminDashboardProfile',
          component: () => import('@/views/Admin/AdminDashboardProfile.vue') // Agrega tu vista de perfil aquí
        },
        {
          path: 'products',
          name: 'AdminDashboardProducts',
          component: () => import('@/views/Admin/AdminDashboardProducts.vue') // Vista de productos
        },
        {
          path: 'clientes',
          name: 'AdminDashboardClientes',
          component: () => import('@/views/Admin/AdminDashboardClientes.vue') // Vista de productos
        },
        {
          path: 'empleados',
          name: 'AdminDashboardEmpleados',
          component: () => import('@/views/Admin/AdminDashboardEmpleados.vue') // Vista de productos
        },
        {
          path: 'roles',
          name: 'AdminDashboardRoles',
          component: () => import('@/views/Admin/AdminDashboardRoles.vue') // Vista de productos
        },
        {
          path: 'permisos',
          name: 'AdminDashboardPermisos',
          component: () => import('@/views/Admin/AdminDashboardPermisos.vue') // Vista de productos
        },
        {
          path: 'domiciliarios',
          name: 'AdminDashboardDomiciliarios',
          component: () => import('@/views/Admin/AdminDashboardDomiciliarios.vue') // Vista de productos
        },
        {
          path: 'pedidos',
          name: 'AdminDashboardPedidos',
          component: () => import('@/views/Admin/AdminDashboardPedidos.vue') // Vista de productos
        },
        {
          path: 'detalles-pedidos',
          name: 'AdminDashboardDetallesPedidos',
          component: () => import('@/views/Admin/AdminDashboardDetallePedidos.vue') // Vista de productos
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
