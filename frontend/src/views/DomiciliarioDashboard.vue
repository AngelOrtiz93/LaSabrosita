<template>
  <a-layout class="domiciliario-dashboard-layout">
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="1" @click="navigateTo('/domiciliario-dashboard')">Inicio</a-menu-item>
        <a-menu-item key="2" @click="navigateTo('/domiciliario-dashboard/tareas')">Tareas</a-menu-item>
        <a-menu-item key="3" @click="navigateTo('/domiciliario-dashboard/perfil')">Perfil</a-menu-item>
        <a-menu-item key="4" @click="logout">Cerrar Sesión</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">Fast Food Restaurant ©2024</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.domiciliario-dashboard-layout {
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #001529;
  padding: 0 20px;
  height: 64px;
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
  padding: 50px;
  display: flex;
  justify-content: center;
}
.footer {
  text-align: center;
}
</style>
