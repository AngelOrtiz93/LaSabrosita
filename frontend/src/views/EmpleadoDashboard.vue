<template>
  <a-layout class="empleado-dashboard-layout">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="1">Home</a-menu-item>
        <a-menu-item key="2">Pedidos Asignados</a-menu-item>
        <a-menu-item key="3">Pedidos Completados</a-menu-item>
        <a-menu-item key="4" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
      <div class="site-layout-content">
        <h1>Pedidos Asignados</h1>
        <a-row :gutter="16">
          <a-col :span="8" v-for="pedido in pedidosAsignados" :key="pedido.id">
            <a-card :title="pedido.nombre">
              <p>{{ pedido.descripcion }}</p>
              <p>{{ pedido.fechaPedido }}</p>
            </a-card>
          </a-col>
        </a-row>
        <h1>Pedidos Completados</h1>
        <p>Total: {{ pedidosCompletadosCount }}</p>
      </div>
    </a-layout-content>
    <a-layout-footer class="footer">Fast Food Restaurant ©2024</a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { getPedidosAsignadosEmpleado, countPedidosCompletadosEmpleado } from '@/api/pedido';
import { useRouter } from 'vue-router';

const pedidosAsignados = ref([]);
const pedidosCompletadosCount = ref(0);
const router = useRouter();

const token = localStorage.getItem('token');
const empleadoId = localStorage.getItem('empleadoId'); // Asegúrate de que este valor esté almacenado en el localStorage

const fetchPedidosAsignados = async () => {
  try {
    const response = await getPedidosAsignadosEmpleado(empleadoId, token);
    pedidosAsignados.value = response.data;
  } catch (error) {
    message.error('Error loading assigned pedidos');
  }
};

const fetchPedidosCompletadosCount = async () => {
  try {
    const response = await countPedidosCompletadosEmpleado(empleadoId, token);
    pedidosCompletadosCount.value = response.data.count;
  } catch (error) {
    message.error('Error counting completed pedidos');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('empleadoId'); 
  router.push('/login');
};

onMounted(() => {
  fetchPedidosAsignados();
  fetchPedidosCompletadosCount();
});
</script>

<style scoped>
.empleado-dashboard-layout {
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
  flex-direction: column;
  align-items: center;
}
.site-layout-content {
  width: 100%;
  max-width: 1200px;
}
.footer {
  text-align: center;
}
</style>
