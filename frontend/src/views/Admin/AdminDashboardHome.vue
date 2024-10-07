<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Panel de Administración</h1>
    </header>
    <main class="dashboard-main">
      <!-- Estadísticas -->
      <section class="dashboard-stats">
        <div class="stat-card">
          <h3>Total de Usuarios</h3>
          <p>{{ totalUsuarios }}</p>
        </div>
        <div class="stat-card">
          <h3>Total de Pedidos</h3>
          <p>{{ totalPedidos }}</p>
        </div>
        <div class="stat-card">
          <h3>Total de Productos</h3>
          <p>{{ totalProductos }}</p>
        </div>
        <!-- Puedes añadir más tarjetas de estadísticas aquí -->
      </section>
      
      <!-- Tablas de Datos -->
      <section class="dashboard-tables">
        <h2>Usuarios</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td>{{ usuario.id }}</td>
              <td>{{ usuario.nombre }}</td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.rol }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pedidos y Productos se mantienen como ejemplo -->
        <h2>Pedidos</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.id">
              <td>{{ pedido.id }}</td>
              <td>{{ pedido.cliente }}</td>
              <td>{{ pedido.fecha }}</td>
              <td>{{ pedido.total }}</td>
            </tr>
          </tbody>
        </table>

        <h2>Productos</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td>{{ producto.id }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.precio }}</td>
              <td>{{ producto.stock }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variables para estadísticas
const totalUsuarios = ref(0);
const totalPedidos = ref(0);
const totalProductos = ref(0);

// Datos para tablas
const usuarios = ref([]);
const pedidos = ref([]);
const productos = ref([]);

// Función para obtener usuarios
const fetchUsuarios = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verifica el token
    const response = await axios.get('http://localhost:3001/usuarios', {
      headers: { Authorization: `Bearer ${token}` }, // Asegúrate de que el token esté en el formato correcto
    });
    console.log('Usuarios Response:', response); // Verifica la respuesta completa
    usuarios.value = response.data;
    totalUsuarios.value = response.data.length;
  } catch (error) {
    console.error('Error al obtener usuarios:', error.response ? error.response.data : error.message);
  }
};

// Función para obtener pedidos
const fetchPedidos = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3001/pedidos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    pedidos.value = response.data;
    totalPedidos.value = response.data.length;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
  }
};

// Función para obtener productos
const fetchProductos = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3001/productos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    productos.value = response.data;
    totalProductos.value = response.data.length;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};

// Llamar a las funciones para cargar los datos al montar el componente
const fetchData = async () => {
  await Promise.all([fetchUsuarios(), fetchPedidos(), fetchProductos()]);
};

onMounted(fetchData);
</script>

<style scoped>
.dashboard-container {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.dashboard-header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.dashboard-main {
  margin-top: 20px;
}

.dashboard-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-card {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  padding: 15px;
  width: 30%;
  text-align: center;
}

.stat-card h3 {
  margin: 0;
  font-size: 1.2em;
}

.stat-card p {
  font-size: 1.5em;
  margin: 10px 0 0;
}

.dashboard-tables {
  margin-top: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table thead {
  background-color: #f8f9fa;
}

.data-table th, .data-table td {
  padding: 10px;
  border: 1px solid #e9ecef;
  text-align: left;
}

.data-table th {
  font-weight: bold;
}
</style>
