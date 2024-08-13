<template>
  <a-layout class="cliente-dashboard-layout">
    <a-layout-header class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="1" @click="navigateTo('/cliente-dashboard')">Home</a-menu-item>
        <a-menu-item key="2" @click="navigateTo('/cliente-dashboard/products')">Products</a-menu-item>
        <a-menu-item key="3" @click="navigateToProfile()">Profile</a-menu-item>
        <a-menu-item key="4" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">Restaurante La Sabrosita ©2024</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  router.push('/login');
};

const navigateTo = (path) => {
  router.push(path);
};

const navigateToProfile = () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    router.push(`/cliente-dashboard/profile/${userId}`);
  } else {
    console.error('User ID no disponible');
  }
};
</script>

<style scoped>
.cliente-dashboard-layout {
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
