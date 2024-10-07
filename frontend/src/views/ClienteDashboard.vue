<template>
  <a-layout class="client-dashboard-layout">
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :selected-keys="headerSelectedKeys"
      >
        <a-menu-item key="1" @click="navigateTo('/cliente-dashboard', '1')">Home</a-menu-item>
        <!-- Uso del ID del usuario desde localStorage para navegar al perfil, solo si localStorage está disponible -->
        <a-menu-item key="2" @click="navigateTo(profilePath, '2')">Perfil</a-menu-item>
        <a-menu-item key="3" @click="navigateTo('/cliente-dashboard/pedidos', '3')">Mis Pedidos</a-menu-item>        
        <a-menu-item key="logout" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
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

export default {
  setup() {
    const router = useRouter();
    const headerSelectedKeys = ref(['1']);

    const navigateTo = (path, key) => {
      router.push(path);
      headerSelectedKeys.value = [key];
    };

    const logout = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleNames');
    localStorage.removeItem('roleIds');
    localStorage.removeItem('permissions');
  }
  router.push('/login');
  headerSelectedKeys.value = ['logout'];
};


    // Calcula la ruta del perfil solo si localStorage está disponible
    const profilePath = computed(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const userId = localStorage.getItem('userId');
        return `/cliente-dashboard/profile/${userId}`;
      }
      return '/cliente-dashboard/profile'; // Ruta por defecto si localStorage no está disponible
    });

    return {
      headerSelectedKeys,
      navigateTo,
      logout,
      profilePath
    };
  }
};
</script>

<style scoped>
.client-dashboard-layout {
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
</style>
