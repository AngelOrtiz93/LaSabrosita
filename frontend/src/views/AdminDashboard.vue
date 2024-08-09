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
    
    // Declarar role dentro de setup
    const role = localStorage.getItem('Role'); 

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
        Roles: ['Administrador']
      },
      {
        key: '4',
        label: 'Productos',
        icon: AppstoreOutlined,
        path: '/administrador-dashboard/productos',
        Roles: ['Administrador', 'Empleado']
      },
      {
        key: '6',
        label: 'Roles',
        icon: SolutionOutlined,
        path: '/administrador-dashboard/roles',
        Roles: ['Administrador']
      },
      {
        key: '7',
        label: 'Permisos',
        icon: SafetyOutlined,
        path: '/administrador-dashboard/permisos',
        Roles: ['Administrador']
      },
      {
        key: '9',
        label: 'Pedidos',
        icon: ShoppingCartOutlined,
        path: '/administrador-dashboard/pedidos',
        Roles: ['Administrador', 'Empleado', 'Domiciliario']
      },
      {
        key: '10',
        label: 'Detalles Pedidos',
        icon: SettingOutlined,
        path: '/administrador-dashboard/detalles-pedidos',
        Roles: ['Administrador', 'Empleado']
      }
    ]);

    // Filtrar ítems según el rol del usuario
    const filteredItems = computed(() => {
      return items.value.filter(item => item.Roles.includes(role));
    });

    return {
      state,
      headerSelectedKeys,
      siderSelectedKeys,
      toggleCollapsed,
      navigateTo,
      navigateToProfile,
      logout,
      filteredItems,
      role  // Asegúrate de devolver role
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
