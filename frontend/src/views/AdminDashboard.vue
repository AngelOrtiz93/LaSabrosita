<template>
  <a-layout class="admin-dashboard-layout">
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="1" @click="navigateTo('/administrador-dashboard')">Home</a-menu-item>
        <a-menu-item key="2" @click="navigateTo('/empleado-dashboard/profile')">Profile</a-menu-item>
        <a-menu-item key="3" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <!-- El colapso se maneja en el Sider -->
      <a-layout-sider v-model:collapsed="state.collapsed" collapsible>
        <div class="trigger" @click="toggleCollapsed">
          <component :is="state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
        </div>
        <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          theme="dark"
        >
          <!-- La clave se aplica al template que envuelve v-for -->
          <template v-for="item in items" :key="item.key">
            <a-menu-item @click="item.onClick">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

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
      selectedKeys: []
    });

    const toggleCollapsed = () => {
      state.value.collapsed = !state.value.collapsed;
    };

    const navigateTo = (path) => {
      router.push(path);
    };

    const logout = () => {
      localStorage.removeItem('token'); // Eliminar token
      router.push('/login'); // Redirigir a la página de inicio de sesión
    };

    // Define los items del menú de acuerdo a tus necesidades
    const items = ref([
      {
        key: '3',
        label: 'Products',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/products')
      },
      {
        key: '4',
        label: 'Clientes',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/clientes')
      },
      {
        key: '5',
        label: 'Empleados',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/empleados')
      },
      {
        key: '6',
        label: 'Roles',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/roles')
      },
      {
        key: '7',
        label: 'Permisos',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/permisos')
      },
      {
        key: '8',
        label: 'Domiciliarios',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/domiciliarios')
      },
      {
        key: '9',
        label: 'Pedidos',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/pedidos')
      },
      {
        key: '10',
        label: 'Detalles Pedidos',
        icon: 'MenuUnfoldOutlined',
        onClick: () => navigateTo('/administrador-dashboard/detalles-pedidos')
      }
    ]);

    return {
      state,
      toggleCollapsed,
      navigateTo,
      logout,
      items
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
