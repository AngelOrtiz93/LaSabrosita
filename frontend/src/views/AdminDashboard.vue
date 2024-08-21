<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :selected-keys="headerSelectedKeys"
      >
        <a-menu-item key="1" @click="navigateTo('/administrador-dashboard', '1')">Home</a-menu-item>
        <a-menu-item key="2" @click="navigateToProfile('2')">Profile</a-menu-item>
        <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider v-model:collapsed="state.collapsed" collapsible>
        <div class="trigger" @click="toggleCollapsed">
          <component :is="state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </div>
        <a-menu
          v-model:openKeys="state.openKeys"
          :selected-keys="siderSelectedKeys"
          mode="inline"
          theme="dark"
        >
          <template v-for="item in filteredItems" :key="item.key">
            <a-menu-item @click="navigateTo(item.path, item.key, 'sider')">
              <component :is="item.icon" />
              <span>{{ item.label }}</span>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="footer">Fast Food Restaurant ©2024</a-layout-footer>
  </a-layout>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SafetyOutlined,
  SolutionOutlined,
} from '@ant-design/icons-vue';

export default {
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup() {
    const router = useRouter();
    const state = ref({
      collapsed: false,
      openKeys: [],
    });

    const headerSelectedKeys = ref(['1']);
    const siderSelectedKeys = ref([]);

    const userPermissions = JSON.parse(localStorage.getItem('permissions')) || [];

    const navigateTo = (path, key, menuType = 'header') => {
      router.push(path);
      if (menuType === 'header') {
        headerSelectedKeys.value = [key];
        siderSelectedKeys.value = [];
      } else if (menuType === 'sider') {
        siderSelectedKeys.value = [key];
        headerSelectedKeys.value = [];
      }
    };

    const navigateToProfile = (key) => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        router.push(`/administrador-dashboard/profile/${userId}`);
        headerSelectedKeys.value = [key];
        siderSelectedKeys.value = [];
      } else {
        console.error('User ID no disponible');
      }
    };

    const toggleCollapsed = () => {
      state.value.collapsed = !state.value.collapsed;
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('permissions');
      router.push('/login');
      headerSelectedKeys.value = ['logout'];
      siderSelectedKeys.value = [];
    };

    const items = ref([
      {
        key: '3',
        label: 'Usuarios',
        icon: UserOutlined,
        path: '/administrador-dashboard/usuarios',
        permissions: ['Obtener Todos los Usuarios']
      },
      {
        key: '4',
        label: 'Productos',
        icon: AppstoreOutlined,
        path: '/administrador-dashboard/productos',
        permissions: ['Obtener Todos los Productos', 'Actualizar Producto', 'Crear Producto', 'Eliminar Producto']
      },
      {
        key: '6',
        label: 'Roles',
        icon: SolutionOutlined,
        path: '/administrador-dashboard/roles',
        permissions: ['Obtener Todos los Roles', 'Crear Rol', 'Actualizar Rol', 'Eliminar Rol']
      },
      {
        key: '7',
        label: 'Permisos',
        icon: SafetyOutlined,
        path: '/administrador-dashboard/permisos',
        permissions: ['Obtener Todos los Permisos', 'Crear Permiso', 'Actualizar Permiso', 'Eliminar Permiso']
      },
      {
        key: '9',
        label: 'Pedidos',
        icon: ShoppingCartOutlined,
        path: '/administrador-dashboard/pedidos',
        permissions: ['Obtener Todos los Pedidos', 'Actualizar Pedido', 'Crear Pedido', 'Eliminar Pedido']
      },
      {
        key: '10',
        label: 'Detalles Pedidos',
        icon: SettingOutlined,
        path: '/administrador-dashboard/detalles-pedidos',
        permissions: ['Obtener Todos los Detalles de Pedido', 'Actualizar Detalle de Pedido', 'Crear Detalle de Pedido', 'Eliminar Detalle de Pedido']
      }
    ]);

    const hasPermission = (requiredPermissions) => {
      return requiredPermissions.some(permission => userPermissions.includes(permission));
    };

    const filteredItems = computed(() => {
      return items.value.filter(item => hasPermission(item.permissions));
    });

    return {
      state,
      headerSelectedKeys,
      siderSelectedKeys,
      toggleCollapsed,
      navigateTo,
      navigateToProfile,
      logout,
      filteredItems
    };
  }
};
</script>

<style scoped>
.admin-dashboard-layout {
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.logo {
  width: 260px;
  height: 50px;
  display: flex;
  align-items: center;
}
.logo img {
  width: 100%;
  height: auto;
}

.content {
  margin: 16px;
}

.footer {
  text-align: center;
}

.trigger {
  padding: 16px;
  cursor: pointer;
}
</style>
