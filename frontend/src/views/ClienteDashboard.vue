<template>
    <a-layout class="cliente-dashboard-layout">
      <a-layout-header class="header">
        <div class="logo" />
        <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="1">Home</a-menu-item>
          <a-menu-item key="2">Products</a-menu-item>
          <a-menu-item key="3">Profile</a-menu-item>
          <a-menu-item key="4" @click="logout">Logout</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content class="content">
        <div class="site-layout-content">
          <h1>Our Menu</h1>
          <a-row :gutter="16">
            <a-col :span="8" v-for="product in products" :key="product.id">
              <a-card :title="product.nombre">
                <p>{{ product.descripcion }}</p>
                <p>{{ product.precio | currency }}</p>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
      <a-layout-footer class="footer">Fast Food Restaurant ©2024</a-layout-footer>
    </a-layout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { getProducts } from '@/api/producto';
  import { useRouter } from 'vue-router';
  
  const products = ref([]);
  
  const token = localStorage.getItem('token');
  
  const router = useRouter();
  
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  
  onMounted(async () => {
    try {
      const response = await getProducts(token);
      products.value = response.data;
    } catch (error) {
      message.error('Error loading products');
    }
  });
  </script>
  
  <style scoped>
  .cliente-dashboard-layout {
    min-height: 100vh;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .content {
    padding: 50px;
    display: flex;
    justify-content: center;
  }
  .site-layout-content {
    width: 100%;
    max-width: 1200px;
  }
  .footer {
    text-align: center;
  }
  </style>
  